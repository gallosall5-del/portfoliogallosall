/* eslint-disable react/no-unknown-property -- props Three.js de React Three Fiber */
import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import Stage3D from './Stage3D';
import useStageColors from './useStageColors';

// Contour simplifié de la presqu'île du Cap-Vert (longitude, latitude).
const COAST = [
  [-17.16, 14.835], [-17.25, 14.81], [-17.33, 14.79], [-17.40, 14.775],
  [-17.46, 14.765], [-17.49, 14.758], [-17.515, 14.752], [-17.535, 14.744],
  [-17.525, 14.73], [-17.50, 14.722], [-17.49, 14.71], [-17.475, 14.69],
  [-17.465, 14.676], [-17.45, 14.662], [-17.432, 14.652], [-17.425, 14.663],
  [-17.428, 14.678], [-17.41, 14.69], [-17.385, 14.705], [-17.35, 14.72],
  [-17.30, 14.725], [-17.25, 14.722], [-17.16, 14.73],
];
const CENTER = [-17.40, 14.74];
const SCALE = 13;

const project = ([lon, lat]) => [(lon - CENTER[0]) * SCALE, (lat - CENTER[1]) * SCALE];

// Lieux affichés sur la carte. `match` relie un repère à une expérience du JSON.
const PLACES = [
  {
    match: 'Namastech', coords: [-17.442, 14.758], color: '#818cf8', labelY: 1.35,
  },
  {
    match: 'ITEA', coords: [-17.475, 14.752], color: '#22c55e', labelY: 0.6,
  },
  {
    match: null, coords: [-17.452, 14.728], color: '#f59e0b', labelY: 0.95, title: 'Grand Yoff', subtitle: "C'est ici que je vis",
  },
];

function Land() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    COAST.forEach((c, i) => {
      const [x, y] = project(c);
      if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    });
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.04, bevelSegments: 3,
    });
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      <mesh geometry={geometry} position={[0, 0.002, 0]}>
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Ocean() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.material.opacity = 0.55 + Math.sin(clock.elapsedTime) * 0.05;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
      <planeGeometry args={[40, 40, 1, 1]} />
      <meshStandardMaterial color="#0c4a6e" transparent opacity={0.55} roughness={0.2} metalness={0.3} />
    </mesh>
  );
}

function Pin({
  place, selected, onSelect,
}) {
  const ring = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const [x, z] = project(place.coords);
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.8) % 1;
    ring.current.scale.setScalar(1 + t * 2.5);
    ring.current.material.opacity = 0.8 * (1 - t);
  });
  const open = selected || hovered;
  return (
    <group position={[x, 0.16, -z]} scale={0.7}>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.11, 32]} />
        <meshBasicMaterial color={place.color} transparent />
      </mesh>
      <group
        onClick={(e) => { e.stopPropagation(); onSelect(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial color={place.color} emissive={place.color} emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.34, 8]} />
          <meshBasicMaterial color={place.color} />
        </mesh>
      </group>
      {place.labelY > 0.8 && (
        <mesh position={[0, (place.labelY + 0.35) / 2, 0]}>
          <cylinderGeometry args={[0.004, 0.004, place.labelY - 0.35, 6]} />
          <meshBasicMaterial color={place.color} transparent opacity={0.6} />
        </mesh>
      )}
      <Html position={[0, place.labelY, 0]} center zIndexRange={[20, 0]}>
        {open ? (
          <div className="stage3d-card">
            <strong>{place.title}</strong>
            <span>{place.subtitle}</span>
            {place.detail && <div>{place.detail}</div>}
          </div>
        ) : (
          <div className="stage3d-label">{place.title}</div>
        )}
      </Html>
    </group>
  );
}

Pin.propTypes = {
  place: PropTypes.shape({
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    color: PropTypes.string.isRequired,
    labelY: PropTypes.number.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    detail: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function DakarMap({ experiences }) {
  const [selected, setSelected] = useState(null);
  const colors = useStageColors();
  const places = PLACES.map((p) => {
    const exp = p.match && experiences.find((e) => e.subtitle.includes(p.match));
    if (!exp) return p;
    return {
      ...p,
      title: exp.subtitle,
      subtitle: `${exp.title} · ${exp.dateText}`,
      detail: exp.workDescription[0].replace(/\*\*/g, ''),
    };
  });
  return (
    <Stage3D
      camera={{ position: [0, 3.4, 3.6], fov: 45 }}
      hint="📍 Cliquez sur un repère · 🖱️ Faites glisser pour tourner autour de Dakar"
    >
      <fog attach="fog" args={[colors.background, 6, 13]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 2]} intensity={1.3} />
      <Ocean />
      <Land />
      {places.map((p, i) => (
        <Pin
          key={p.title}
          place={p}
          selected={selected === i}
          onSelect={() => setSelected(selected === i ? null : i)}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={selected === null}
        autoRotateSpeed={0.5}
        minPolarAngle={0.5}
        maxPolarAngle={1.2}
        target={[-0.5, 0, 0]}
      />
    </Stage3D>
  );
}

DakarMap.propTypes = {
  experiences: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    dateText: PropTypes.string,
    workDescription: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};

export default DakarMap;
