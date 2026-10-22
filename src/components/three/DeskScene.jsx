/* eslint-disable react/no-unknown-property, react/jsx-props-no-spreading, no-param-reassign
   -- props et objets Three.js manipulés par React Three Fiber */
import React, {
  Suspense, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows, Html, useCursor, useGLTF, useProgress, useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import usePerformance from './usePerformance';
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
  label, onClick, children, ...props
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = hovered ? 0.03 : 0;
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, target, 8, delta);
  });
  return (
    <group {...props}>
      <group
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        {children}
      </group>
      {hovered && (
        <Html center position={[0, 0.42, 0]} className="desk3d-label" zIndexRange={[20, 0]}>
          {label}
        </Html>
      )}
    </group>
  );
}

Interactive.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
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

function Football() {
  const ref = useRef();
  const kick = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    if (kick.current > 0) {
      kick.current = Math.max(0, kick.current - delta);
      const t = 1 - kick.current;
      ref.current.position.y = Math.abs(Math.sin(t * Math.PI * 3)) * 0.35 * (1 - t);
      ref.current.rotation.x -= delta * 8;
    }
  });
  return (
    <Interactive label="⚽ Mon loisir : le football" onClick={() => { kick.current = 1; }} position={[0.5, DESK_TOP, 0.3]}>
      <group ref={ref}><Model id="dirty_football" /></group>
    </Interactive>
  );
}

function Lamp() {
  const [on, setOn] = useState(true);
  return (
    <Interactive label={on ? '💡 Éteindre la lampe' : '💡 Allumer la lampe'} onClick={() => setOn(!on)} position={[0.72, DESK_TOP, -0.2]} rotation={[0, -0.6, 0]}>
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

// Léger mouvement de caméra qui suit la souris.
function CameraRig() {
  useFrame((state, delta) => {
    const { camera, pointer, size } = state;
    // Recule la caméra sur les écrans étroits pour garder tout le bureau dans le cadre.
    const halfFov = THREE.MathUtils.degToRad(camera.fov / 2);
    const distance = Math.max(2.1, 0.85 / (Math.tan(halfFov) * (size.width / size.height)));
    camera.position.z = THREE.MathUtils.damp(camera.position.z, distance, 3, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.35, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.4 + pointer.y * 0.15, 3, delta);
    camera.lookAt(0, 0.95, 0);
  });
  return null;
}

function Scene() {
  const navigate = useNavigate();
  return (
    <>
      <color attach="background" args={['#05070d']} />
      <fog attach="fog" args={['#05070d', 4.5, 10]} />
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
        <meshStandardMaterial color="#0d1424" roughness={0.9} />
      </mesh>

      <Model id="metal_office_desk" />
      <Model id="plastic_monobloc_chair_01" position={[0.1, 0, 0.8]} rotation={[0, Math.PI + 0.25, 0]} />

      <Interactive label="💻 Mes projets" onClick={() => navigate('/projects')} position={[0, DESK_TOP, 0.05]}>
        <Laptop />
      </Interactive>
      <Interactive label="📚 Ma formation" onClick={() => navigate('/education')} position={[-0.92, DESK_TOP, -0.3]}>
        <Model id="book_encyclopedia_set_01" />
      </Interactive>
      <Interactive label="📁 Mon expérience" onClick={() => navigate('/experience')} position={[-0.55, DESK_TOP, 0.22]} rotation={[0, 0.35, 0]}>
        <Model id="binder_notebook" />
      </Interactive>
      <Interactive label="🙂 À propos de moi" onClick={() => navigate('/about')} position={[-0.5, DESK_TOP, -0.12]} rotation={[0, -Math.PI / 2 + 0.4, 0]}>
        <PhotoFrame />
      </Interactive>
      <Interactive label="🛠️ Mes compétences" onClick={() => navigate('/skills')} position={[0.45, DESK_TOP, -0.28]}>
        <Model id="potted_plant_04" />
      </Interactive>
      <Lamp />
      <Football />

      <ContactShadows position={[0, 0.001, 0]} opacity={0.5} scale={6} blur={2.4} far={2} />
      <CameraRig />
    </>
  );
}

function Loader({ onEnter }) {
  const { progress, active } = useProgress();
  const ready = !active && progress === 100;
  return (
    <div className="desk3d-loader">
      <p className="desk3d-loader__title">Gallo SALL</p>
      {ready ? (
        <button type="button" className="btn-pill btn-accent" onClick={onEnter}>
          Entrer
        </button>
      ) : (
        <>
          <div className="desk3d-loader__bar"><span style={{ width: `${progress}%` }} /></div>
          <p className="desk3d-loader__text">{`Chargement de la scène 3D… ${Math.round(progress)} %`}</p>
        </>
      )}
    </div>
  );
}

Loader.propTypes = { onEnter: PropTypes.func.isRequired };

function DeskScene() {
  const [entered, setEntered] = useState(false);
  const {
    ref, frameloop, dpr, lowPower,
  } = usePerformance();

  return (
    <section ref={ref} className="desk3d">
      <Canvas shadows={!lowPower} dpr={dpr} frameloop={frameloop} camera={{ position: [0, 1.4, 2.1], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {!entered && <Loader onEnter={() => setEntered(true)} />}
      {entered && (
        <p className="desk3d-hint">Cliquez sur les objets du bureau pour explorer · Faites défiler pour la suite ↓</p>
      )}
    </section>
  );
}

export default DeskScene;
