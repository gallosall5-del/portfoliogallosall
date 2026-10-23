/* eslint-disable react/no-unknown-property, react/jsx-props-no-spreading
   -- props Three.js de React Three Fiber */
import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useFrame } from '@react-three/fiber';
import {
  Float, RoundedBox, Sparkles, useGLTF, useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import Stage3D from './Stage3D';

// Drapeau du Sénégal dessiné sur un canvas : vert, jaune, rouge + étoile verte.
function useFlagTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 600;
    c.height = 400;
    const ctx = c.getContext('2d');
    ['#00853f', '#fdef42', '#e31b23'].forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * 200, 0, 200, 400);
    });
    ctx.fillStyle = '#00853f';
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const r = i % 2 === 0 ? 70 : 28;
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      ctx.lineTo(300 + Math.cos(a) * r, 200 + Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function Flag(props) {
  const texture = useFlagTexture();
  const mesh = useRef();
  const base = useRef();
  useFrame(({ clock }) => {
    const geo = mesh.current.geometry;
    const pos = geo.attributes.position;
    if (!base.current) base.current = Float32Array.from(pos.array);
    const t = clock.elapsedTime;
    for (let i = 0; i < pos.count; i += 1) {
      const x = base.current[i * 3];
      const y = base.current[i * 3 + 1];
      const amp = (x + 0.9) * 0.12;
      pos.setZ(i, Math.sin(x * 3 + t * 3) * amp + Math.sin(y * 2 + t * 2) * amp * 0.3);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });
  return (
    <group {...props}>
      <mesh position={[-0.92, -0.45, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 2.2, 12]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh ref={mesh}>
        <planeGeometry args={[1.8, 1.2, 30, 20]} />
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} roughness={0.7} />
      </mesh>
    </group>
  );
}

function Football(props) {
  const { scene } = useGLTF('models/dirty_football.glb');
  // Copie locale : agrandir le modèle partagé changerait aussi le ballon du bureau.
  const ball = useMemo(() => scene.clone(true), [scene]);
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.8;
    ref.current.rotation.x += delta * 0.3;
  });
  return (
    <Float speed={2.5} floatIntensity={1.2} {...props}>
      <group ref={ref}>
        <primitive object={ball} position={[0, -0.29, 0]} scale={2.6} />
      </group>
    </Float>
  );
}

// Carte photo qui s'incline en suivant la souris.
function PhotoCard({ image }) {
  const cached = useTexture(image);
  // Copie locale : le cadre du bureau met flipY à false sur la texture partagée.
  const photo = useMemo(() => {
    const t = cached.clone();
    t.flipY = true;
    t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  }, [cached]);
  const ref = useRef();
  useFrame(({ pointer }, delta) => {
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, pointer.x * 0.45, 5, delta);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -pointer.y * 0.3, 5, delta);
  });
  return (
    <group ref={ref}>
      <RoundedBox args={[2.1, 2.1, 0.08]} radius={0.12} smoothness={6}>
        <meshStandardMaterial color="#4f46e5" metalness={0.5} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[1.95, 1.95]} />
        <meshStandardMaterial map={photo} roughness={0.5} />
      </mesh>
    </group>
  );
}

PhotoCard.propTypes = { image: PropTypes.string.isRequired };

function AboutCard({ image }) {
  return (
    <Stage3D
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      hint="🖱️ Bougez la souris pour incliner la carte"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={1.3} />
      <pointLight position={[-2, 1, 3]} intensity={3} color="#818cf8" />
      <PhotoCard image={image} />
      <Flag position={[-2.5, 0.75, -1.2]} rotation={[0, 0.35, 0]} scale={0.9} />
      <Football position={[2.35, -0.6, -0.4]} />
      <Sparkles count={60} scale={[7, 4, 3]} size={2.5} speed={0.4} color="#a5b4fc" />
    </Stage3D>
  );
}

AboutCard.propTypes = { image: PropTypes.string.isRequired };

export default AboutCard;
