/* eslint-disable react/no-unknown-property -- props Three.js de React Three Fiber */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFrame } from '@react-three/fiber';
import {
  ContactShadows, Float, Html, RoundedBox, useCursor,
} from '@react-three/drei';
import * as THREE from 'three';
import Stage3D from './Stage3D';

const STEP_W = 1.5;
const STEP_H = 0.45;
const STEP_D = 1.1;
const COLORS = ['#334155', '#3f3f9a', '#4f46e5', '#7c3aed'];

function Step({
  index, item, total, active, onSelect,
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const height = STEP_H * (index + 1);
  const x = (index - (total - 1) / 2) * (STEP_W + 0.05);
  useFrame((_, delta) => {
    const lift = active || hovered ? 0.06 : 0;
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, height / 2 + lift, 8, delta);
  });
  return (
    <group position={[x, 0, 0]}>
      <group
        ref={ref}
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox args={[STEP_W, height, STEP_D]} radius={0.05} smoothness={4}>
          <meshStandardMaterial
            color={COLORS[index % COLORS.length]}
            emissive={active ? '#6366f1' : '#000000'}
            emissiveIntensity={active ? 0.35 : 0}
            roughness={0.5}
            metalness={0.2}
          />
        </RoundedBox>
        <Html
          position={[0, 0, STEP_D / 2 + 0.01]}
          transform
          distanceFactor={2.2}
          className="stairs-year"
        >
          {item.title}
        </Html>
      </group>
      {index === total - 1 && (
        <Float speed={2} floatIntensity={0.6}>
          <mesh position={[0, height + 0.45, 0]} rotation={[0.3, 0.6, 0]}>
            <octahedronGeometry args={[0.18]} />
            <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.8} />
          </mesh>
        </Float>
      )}
      {active && (
        <Html position={[0, height + 0.95, 0]} center zIndexRange={[20, 0]}>
          <div className="stage3d-card">
            <strong>{item.cardTitle}</strong>
            <span>{item.cardSubtitle}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

Step.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cardTitle: PropTypes.string.isRequired,
    cardSubtitle: PropTypes.string,
  }).isRequired,
};

// La caméra glisse doucement vers la marche sélectionnée.
function CameraFollow({ index, total }) {
  useFrame(({ camera, pointer }, delta) => {
    const x = (index - (total - 1) / 2) * (STEP_W + 0.05) * 0.55 + pointer.x * 0.3;
    const y = 1.4 + STEP_H * (index + 1) * 0.6 + pointer.y * 0.15;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, x, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, y, 3, delta);
    camera.lookAt(x * 0.8, STEP_H * (index + 1) * 0.7, 0);
  });
  return null;
}

CameraFollow.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

function EducationStairs({ education }) {
  // Du plus ancien (en bas) au plus récent (en haut).
  const steps = [...education].reverse();
  const [active, setActive] = useState(steps.length - 1);
  return (
    <Stage3D
      camera={{ position: [0, 2.2, 5.2], fov: 50 }}
      hint="Cliquez sur une marche pour voir le diplôme"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 4]} intensity={1.4} />
      <pointLight position={[-3, 2, 2]} intensity={3} color="#818cf8" />
      {steps.map((item, i) => (
        <Step
          key={item.cardTitle}
          index={i}
          item={item}
          total={steps.length}
          active={active === i}
          onSelect={() => setActive(i)}
        />
      ))}
      <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={10} blur={2.4} />
      <CameraFollow index={active} total={steps.length} />
    </Stage3D>
  );
}

EducationStairs.propTypes = {
  education: PropTypes.arrayOf(Step.propTypes.item).isRequired,
};

export default EducationStairs;
