/* eslint-disable react/no-unknown-property, react/jsx-props-no-spreading, no-param-reassign
   -- props et objets Three.js manipulés par React Three Fiber */
import React, {
  forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';

// Robot « RobotExpressive » de Quaternius (CC0), avec ses animations.
const URL = 'models/robot_expressive.glb';
// Le modèle mesure ~3,9 unités debout ; on le ramène à ~50 cm.
const SCALE = 0.13;
// L'animation « Sitting » assoit le robot par terre : on le surélève jusqu'au
// siège et on compense le recul des hanches.
const SEAT_LIFT = 0.34;
const SEAT_BACK = 0.086;
// Hauteur du siège : le robot se lève debout sur la chaise.
const SEAT_TOP = 0.45;

// Scénario de la remise d'un objet (secondes depuis le clic).
const T_STAND = 0.45; // se lève en se tournant vers l'objet
const T_REACH = 0.4; // tend le bras
const T_FLY = 0.6; // l'objet part du bureau…
const T_GRAB = 1.0; // …et arrive dans la main
const T_TURN = 1.5; // s'est retourné vers la caméra, fait son geste
const T_GIVE = 1.9; // tend l'objet vers nous
const T_END = 2.8; // l'objet est devant la caméra : la page s'ouvre

// Os du bas du corps : exclus des gestes faits en restant assis.
const LOWER_BODY = /Leg|Foot|Hips|Body|Abdomen|RobotArmature|^Bone/;

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2);
const clamp01 = (t) => Math.min(1, Math.max(0, t));
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const lerpAngle = (a, b, k) => a + wrap(b - a) * k;

const Robot = forwardRef(({ seatRotation, ...props }, ref) => {
  const group = useRef();
  const body = useRef();
  const { scene, animations } = useGLTF(URL);
  const model = useMemo(() => {
    const c = SkeletonUtils.clone(scene);
    c.traverse((o) => {
      if (o.isMesh) o.castShadow = true;
    });
    return c;
  }, [scene]);
  // Versions « haut du corps » des gestes, jouables en restant assis.
  const upperClips = useMemo(() => animations.map((clip) => {
    const c = clip.clone();
    c.name = `${clip.name}Upper`;
    c.tracks = c.tracks.filter((track) => !LOWER_BODY.test(track.name));
    return c;
  }), [animations]);
  const { actions } = useAnimations([...animations, ...upperClips], body);
  // Three.js retire les points des noms d'os : « Palm2.R » devient « Palm2R ».
  const hand = useMemo(() => model.getObjectByName('Palm2R'), [model]);
  const head = useMemo(() => model.getObjectByName('Head'), [model]);

  // Les hanches reculent en position assise : on avance le robot d'autant.
  const seatX = props.position[0] + SEAT_BACK * Math.sin(seatRotation);
  const seatZ = props.position[2] + SEAT_BACK * Math.cos(seatRotation);
  const task = useRef(null);
  const lookTarget = useRef(null);
  const headYaw = useRef(0);
  // Dernière rotation appliquée à la tête : évite d'empiler l'angle à chaque image.
  const headApplied = useRef(null);
  const handPos = useMemo(() => new THREE.Vector3(), []);

  const play = useCallback((name, { once = false, fade = 0.25 } = {}) => {
    const next = actions[name];
    if (!next) return;
    Object.values(actions).forEach((a) => { if (a !== next) a.fadeOut(fade); });
    next.reset().setEffectiveWeight(1).fadeIn(fade);
    if (once) {
      next.setLoop(THREE.LoopOnce, 1);
      next.clampWhenFinished = true;
    }
    next.play();
  }, [actions]);

  // Au départ : assis sur la chaise.
  useEffect(() => {
    play('Sitting', { once: true, fade: 0 });
    const sit = actions.Sitting;
    if (sit) sit.time = sit.getClip().duration;
  }, [actions, play]);

  // Angle (autour de Y) pour que le robot regarde un point du monde.
  const yawTo = (point) => Math.atan2(
    point.x - group.current.position.x,
    point.z - group.current.position.z,
  );

  useImperativeHandle(ref, () => ({
    busy: () => task.current !== null,
    // Survol d'un objet : le robot tourne la tête vers lui (null = repos).
    lookAt(point) {
      lookTarget.current = point;
    },
    // Geste fait en restant assis (ex. la lampe), sans se lever.
    react(point, gesture = 'Wave') {
      if (task.current) return;
      lookTarget.current = point;
      const action = actions[`${gesture}Upper`];
      if (!action) return;
      action.reset().setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = false;
      // Poids élevé : le geste domine la pose assise sur le haut du corps.
      action.setEffectiveWeight(10).fadeIn(0.2).play();
    },
    // Deuxième clic pendant l'animation : on ouvre la page tout de suite.
    skip() {
      const job = task.current;
      if (!job) return;
      task.current = null;
      job.onDone();
    },
    // Le robot se lève, attrape l'objet, se retourne et nous le tend.
    give(target, onDone, gesture = 'ThumbsUp') {
      if (task.current) return;
      const size = new THREE.Box3().setFromObject(target).getSize(new THREE.Vector3()).length();
      const startWorld = target.getWorldPosition(new THREE.Vector3());
      task.current = {
        target,
        onDone,
        gesture,
        t: 0,
        stage: 'stand',
        startWorld,
        startScale: target.scale.x,
        heldScale: Math.min(1, 0.45 / size),
        faceObject: yawTo(startWorld),
      };
      target.userData.held = true;
      lookTarget.current = startWorld;
      play('Standing', { once: true, fade: 0.15 });
    },
  }), [actions, play]);

  useFrame((state, rawDelta) => {
    // Plafonné : sur un appareil lent l'animation ralentit un peu au lieu de sauter.
    const delta = Math.min(rawDelta, 1 / 15);
    const job = task.current;

    // La tête se tourne vers l'objet survolé (ou revient au centre).
    let wanted = 0;
    if (lookTarget.current && !job) {
      wanted = THREE.MathUtils.clamp(
        wrap(yawTo(lookTarget.current) - group.current.rotation.y),
        -1.1,
        1.1,
      );
    }
    headYaw.current = THREE.MathUtils.damp(headYaw.current, wanted, 6, delta);
    if (head) {
      // Si l'animation n'a pas réécrit la tête depuis l'image précédente, on
      // repart de la pose de base au lieu d'ajouter l'angle une fois de plus.
      const prev = headApplied.current;
      const base = prev && head.rotation.y === prev.value ? prev.base : head.rotation.y;
      head.rotation.y = base + headYaw.current;
      headApplied.current = { base, value: head.rotation.y };
    }

    if (!job) return;
    job.t += delta;
    const { t, target } = job;
    const cam = state.camera.position;

    // 1. Se lève sur la chaise en se tournant vers l'objet.
    const stand = ease(clamp01(t / T_STAND));
    group.current.position.y = THREE.MathUtils.lerp(SEAT_LIFT, SEAT_TOP, stand);
    group.current.position.x = THREE.MathUtils.lerp(seatX, props.position[0], stand);
    group.current.position.z = THREE.MathUtils.lerp(seatZ, props.position[2], stand);
    if (t < T_GRAB) {
      group.current.rotation.y = lerpAngle(seatRotation, job.faceObject, stand);
    } else {
      // 3. Se retourne vers la caméra.
      const k = ease(clamp01((t - T_GRAB) / (T_TURN - T_GRAB)));
      group.current.rotation.y = lerpAngle(job.faceObject, yawTo(cam), k);
    }

    // 2. Tend le bras (le « coup de poing » allonge le bras vers l'avant).
    if (job.stage === 'stand' && t > T_REACH) {
      play('Punch', { once: true, fade: 0.15 });
      job.stage = 'reach';
    }
    // 4. Geste propre à l'objet.
    if (job.stage === 'reach' && t > T_TURN) {
      play(job.gesture, { once: true });
      job.stage = 'gesture';
    }

    // Trajectoire de l'objet : bureau -> main -> devant la caméra.
    hand.getWorldPosition(handPos);
    const world = new THREE.Vector3();
    if (t < T_FLY) {
      world.copy(job.startWorld);
    } else if (t < T_GRAB) {
      const k = ease(clamp01((t - T_FLY) / (T_GRAB - T_FLY)));
      world.lerpVectors(job.startWorld, handPos, k);
      world.y += Math.sin(k * Math.PI) * 0.12; // petit arc
    } else if (t < T_GIVE) {
      world.copy(handPos);
    } else {
      const k = ease(clamp01((t - T_GIVE) / (T_END - T_GIVE)));
      const front = new THREE.Vector3().subVectors(handPos, cam).multiplyScalar(0.3).add(cam);
      world.lerpVectors(handPos, front, k);
    }
    target.parent.worldToLocal(world);
    target.position.copy(world);

    // Rétrécit doucement pour tenir dans la main, puis grossit en venant vers nous.
    // L'objet garde son orientation : il reste tourné vers le visiteur.
    const shrink = ease(clamp01((t - T_FLY) / (T_GRAB - T_FLY)));
    const grow = ease(clamp01((t - T_GIVE) / (T_END - T_GIVE)));
    const s = THREE.MathUtils.lerp(job.startScale, job.heldScale, shrink);
    target.scale.setScalar(s * (1 + grow * 0.5));

    if (t >= T_END) {
      task.current = null;
      job.onDone();
    }
  });

  return (
    <group
      ref={group}
      position={[seatX, SEAT_LIFT, seatZ]}
      rotation={[0, seatRotation, 0]}
    >
      <group ref={body} scale={SCALE}>
        <primitive object={model} />
      </group>
    </group>
  );
});

Robot.displayName = 'Robot';

Robot.propTypes = {
  seatRotation: PropTypes.number.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

useGLTF.preload(URL);

export default Robot;
