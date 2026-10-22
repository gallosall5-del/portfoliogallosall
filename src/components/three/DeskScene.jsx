/* eslint-disable react/no-unknown-property, react/jsx-props-no-spreading, no-param-reassign
   -- props et objets Three.js manipulés par React Three Fiber */
import React, {
  Suspense, useEffect, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows, Html, RoundedBox, useCursor, useGLTF, useProgress, useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import usePerformance from './usePerformance';
import useStageColors from './useStageColors';
import Robot from './Robot';
import '../../css/desk3d.css';

// Modèles Poly Haven (CC0), unités en mètres. Le plateau du bureau est à 0.788 m.
const DESK_TOP = 0.788;
const model = (id) => `models/${id}.glb`;

// Écran du portable : texte dessiné sur un canvas.
function useScreenTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 680;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 1024, 680);
    grad.addColorStop(0, '#0b1220');
    grad.addColorStop(1, '#13233d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 680);
    ctx.fillStyle = '#22c55e';
    ctx.font = '500 34px "JetBrains Mono", monospace';
    ctx.fillText('~/gallo-sall $ whoami', 60, 110);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 92px Inter, sans-serif';
    ctx.fillText('Gallo SALL', 60, 260);
    ctx.fillStyle = '#93c5fd';
    ctx.font = '500 46px Inter, sans-serif';
    ctx.fillText('Développeur Full-Stack & Mobile', 60, 340);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 34px "JetBrains Mono", monospace';
    ctx.fillText('Flutter · React · Laravel · Node.js', 60, 430);
    ctx.fillStyle = '#22c55e';
    ctx.fillText('> Cliquez pour voir mes projets_', 60, 560);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
  }, []);
}

// Objet cliquable : léger soulèvement + étiquette au survol.
function Interactive({
  label, onClick, onHover, children, ...props
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [taken, setTaken] = useState(false);
  useCursor(hovered);
  const hover = (on) => {
    setHovered(on);
    onHover(on ? ref.current.getWorldPosition(new THREE.Vector3()) : null);
  };
  useFrame((_, delta) => {
    // Pendant que le robot tient l'objet, c'est lui qui le déplace.
    if (!ref.current || ref.current.userData.held) return;
    const target = hovered ? 0.03 : 0;
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, target, 8, delta);
  });
  return (
    <group {...props}>
      <group
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); hover(true); }}
        onPointerOut={() => hover(false)}
        onClick={(e) => {
          e.stopPropagation();
          // L'étiquette disparaît dès que le robot prend l'objet.
          if (onClick(ref.current)) setTaken(true);
        }}
      >
        {children}
      </group>
      {hovered && !taken && (
        <Html center position={[0, 0.42, 0]} className="desk3d-label" zIndexRange={[20, 0]}>
          {label}
        </Html>
      )}
    </group>
  );
}

Interactive.propTypes = {
  label: PropTypes.string.isRequired,
  // Renvoie true si l'objet est emporté (l'étiquette est alors masquée).
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Interactive.defaultProps = {
  onHover: () => {},
};

function Model({ id, ...props }) {
  const { scene } = useGLTF(model(id));
  const clone = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);
  return <primitive object={clone} {...props} />;
}

Model.propTypes = { id: PropTypes.string.isRequired };

function Laptop() {
  const screen = useScreenTexture();
  return (
    <group>
      <Model id="classic_laptop" />
      {/* Écran allumé, posé juste devant la dalle inclinée du portable */}
      <mesh position={[0, 0.315, -0.168]} rotation={[-0.11, 0, 0]}>
        <planeGeometry args={[0.56, 0.37]} />
        <meshBasicMaterial map={screen} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.32, 0.05]} intensity={0.6} distance={1} color="#93c5fd" />
    </group>
  );
}

// Téléphone posé sur un petit support, écran tourné vers le visiteur.
function usePhoneScreen() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#4f46e5');
    grad.addColorStop(1, '#7c3aed');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 512);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = '120px sans-serif';
    ctx.fillText('💬', 128, 250);
    ctx.font = '700 40px Inter, sans-serif';
    ctx.fillText('Contact', 128, 340);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function Phone() {
  const screen = usePhoneScreen();
  return (
    <group rotation={[-0.35, 0, 0]} position={[0, 0.075, 0]}>
      <RoundedBox args={[0.075, 0.15, 0.009]} radius={0.008} smoothness={4} castShadow>
        <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.0047]}>
        <planeGeometry args={[0.066, 0.138]} />
        <meshBasicMaterial map={screen} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.06, -0.03]} rotation={[0.9, 0, 0]}>
        <boxGeometry args={[0.05, 0.004, 0.07]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Cadre photo : on remplace l'illustration par la photo de profil.
function PhotoFrame() {
  const { scene } = useGLTF(model('standing_picture_frame_01'));
  const photo = useTexture('images/about/profile.webp');
  const clone = useMemo(() => {
    photo.colorSpace = THREE.SRGBColorSpace;
    photo.flipY = false;
    const c = scene.clone(true);
    c.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      const swapped = mats.map((m) => {
        if (m.name.includes('artwork')) {
          return new THREE.MeshStandardMaterial({
            map: photo, emissiveMap: photo, emissive: '#ffffff', emissiveIntensity: 0.35, roughness: 0.6,
          });
        }
        if (m.name.includes('glass')) {
          return new THREE.MeshStandardMaterial({
            transparent: true, opacity: 0.06, roughness: 0.05, depthWrite: false,
          });
        }
        return m;
      });
      o.material = Array.isArray(o.material) ? swapped : swapped[0];
    });
    return c;
  }, [scene, photo]);
  return <primitive object={clone} />;
}

function Lamp({ onToggle, onHover }) {
  const [on, setOn] = useState(true);
  return (
    <Interactive
      label={on ? '💡 Éteindre la lampe' : '💡 Allumer la lampe'}
      onClick={(object) => {
        setOn(!on);
        onToggle(object);
        return false;
      }}
      onHover={onHover}
      position={[0.72, DESK_TOP, -0.2]}
      rotation={[0, -0.6, 0]}
    >
      <Model id="desk_lamp_arm_01" />
      <spotLight
        position={[0, 0.7, 0.2]}
        angle={0.7}
        penumbra={0.6}
        intensity={on ? 6 : 0}
        distance={3}
        color="#ffd9a0"
        castShadow
      />
    </Interactive>
  );
}

Lamp.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
};

// Léger mouvement de caméra qui suit la souris.
function CameraRig() {
  useFrame((state, delta) => {
    const { camera, pointer, size } = state;
    // Recule la caméra sur les écrans étroits pour garder tout le bureau dans le cadre.
    const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
    const distance = Math.max(2.45, 0.95 / (Math.tan(halfFov) * (size.width / size.height)));
    camera.position.z = THREE.MathUtils.damp(camera.position.z, distance, 3, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.35, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.4 + pointer.y * 0.15, 3, delta);
    camera.lookAt(0.1, 0.78, 0.2);
  });
  return null;
}

const CHAIR_POS = [0.62, 0, 0.72];
const CHAIR_ROT = Math.PI + 0.75;

function Scene({ reducedMotion, colors }) {
  const navigate = useNavigate();
  const robot = useRef();
  // Le robot apporte l'objet cliqué, puis la page correspondante s'ouvre.
  const bring = (route, gesture) => (object) => {
    // « Réduire les animations » : pas de chorégraphie, la page s'ouvre directement.
    if (reducedMotion) {
      navigate(route);
      return false;
    }
    // Deuxième clic pendant l'animation : la page s'ouvre tout de suite.
    if (robot.current.busy()) {
      robot.current.skip();
      return false;
    }
    robot.current.give(object, () => navigate(route), gesture);
    return true;
  };
  // Le robot regarde l'objet survolé.
  const look = (point) => robot.current?.lookAt(point);
  const items = { onHover: look };
  return (
    <>
      <color attach="background" args={[colors.background]} />
      <fog attach="fog" args={[colors.background, 4.5, 10]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[2, 4, 3]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <hemisphereLight args={['#93c5fd', '#1e1b4b', 0.4]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[6, 64]} />
        <meshStandardMaterial color={colors.floor} roughness={0.9} />
      </mesh>

      <Model id="metal_office_desk" />
      <Model id="plastic_monobloc_chair_01" position={CHAIR_POS} rotation={[0, CHAIR_ROT, 0]} />
      <Robot ref={robot} position={[CHAIR_POS[0], 0, CHAIR_POS[2]]} seatRotation={CHAIR_ROT} />

      <Interactive {...items} label="💻 Mes projets" onClick={bring('/projects')} position={[0, DESK_TOP, 0.05]}>
        <Laptop />
      </Interactive>
      <Interactive {...items} label="📚 Ma formation" onClick={bring('/education', 'Yes')} position={[-0.92, DESK_TOP, -0.3]}>
        <Model id="book_encyclopedia_set_01" />
      </Interactive>
      <Interactive {...items} label="📁 Mon expérience" onClick={bring('/experience')} position={[-0.55, DESK_TOP, 0.22]} rotation={[0, 0.35, 0]}>
        <Model id="binder_notebook" />
      </Interactive>
      <Interactive {...items} label="🙂 À propos de moi" onClick={bring('/about', 'Wave')} position={[-0.5, DESK_TOP, -0.12]} rotation={[0, -Math.PI / 2 + 0.4, 0]}>
        <PhotoFrame />
      </Interactive>
      <Interactive {...items} label="🛠️ Mes compétences" onClick={bring('/skills', 'Yes')} position={[0.45, DESK_TOP, -0.28]}>
        <Model id="potted_plant_04" />
      </Interactive>
      <Interactive {...items} label="📱 Me contacter" onClick={bring('/contact', 'Wave')} position={[0.22, DESK_TOP, 0.33]} rotation={[0, -0.25, 0]}>
        <Phone />
      </Interactive>
      <Lamp
        onHover={look}
        onToggle={(object) => robot.current.react(object.getWorldPosition(new THREE.Vector3()), 'Wave')}
      />
      <Interactive {...items} label="⚽ Mes loisirs : football, cinéma, art" onClick={bring('/about', 'Wave')} position={[0.5, DESK_TOP, 0.3]}>
        <Model id="dirty_football" />
      </Interactive>

      <ContactShadows position={[0, 0.001, 0]} opacity={0.5} scale={6} blur={2.4} far={2} />
      <CameraRig />
    </>
  );
}

Scene.propTypes = {
  reducedMotion: PropTypes.bool.isRequired,
  colors: PropTypes.shape({
    background: PropTypes.string.isRequired,
    floor: PropTypes.string.isRequired,
  }).isRequired,
};

// Écran de chargement : s'efface tout seul dès que la scène est prête.
function Loader({ onReady }) {
  const { progress, active } = useProgress();
  const ready = !active && progress === 100;
  useEffect(() => {
    if (!ready) return undefined;
    const timer = setTimeout(onReady, 400);
    return () => clearTimeout(timer);
  }, [ready, onReady]);
  return (
    <div className={`desk3d-loader${ready ? ' desk3d-loader--done' : ''}`}>
      <p className="desk3d-loader__title">Gallo SALL</p>
      <div className="desk3d-loader__bar"><span style={{ width: `${progress}%` }} /></div>
      <p className="desk3d-loader__text">{`Chargement de la scène 3D… ${Math.round(progress)} %`}</p>
    </div>
  );
}

Loader.propTypes = { onReady: PropTypes.func.isRequired };

function DeskScene() {
  const [entered, setEntered] = useState(false);
  const {
    ref, frameloop, dpr, lowPower, reducedMotion,
  } = usePerformance();
  const colors = useStageColors();

  return (
    <section ref={ref} className="desk3d" style={{ background: colors.background }}>
      <Canvas shadows={!lowPower} dpr={dpr} frameloop={frameloop} camera={{ position: [0, 1.4, 2.45], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene reducedMotion={reducedMotion} colors={colors} />
        </Suspense>
      </Canvas>
      {!entered && <Loader onReady={() => setEntered(true)} />}
      {entered && (
        <p className="desk3d-hint">👆 Cliquez sur un objet du bureau : le robot vous l'apporte · Faites défiler ↓</p>
      )}
    </section>
  );
}

export default DeskScene;
