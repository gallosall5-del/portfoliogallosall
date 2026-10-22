/* eslint-disable react/no-unknown-property -- props Three.js de React Three Fiber */
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import '../../css/stage3d.css';

const COUNT = 900;

function Dust() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.x = state.pointer.y * 0.05;
    ref.current.position.x = state.pointer.x * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#818cf8" transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Poussière lumineuse discrète derrière tout le site.
function ParticlesBackground() {
  return (
    <div className="particles-bg" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 60 }} gl={{ alpha: true }}>
        <Dust />
      </Canvas>
    </div>
  );
}

export default ParticlesBackground;
