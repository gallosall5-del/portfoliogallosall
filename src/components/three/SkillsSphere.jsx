/* eslint-disable react/no-unknown-property -- props Three.js de React Three Fiber */
import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFrame, useLoader } from '@react-three/fiber';
import {
  Billboard, Html, OrbitControls, useCursor,
} from '@react-three/drei';
import * as THREE from 'three';
import { HandGrabbing } from '@phosphor-icons/react';
import Stage3D from './Stage3D';

const RADIUS = 2.1;

// Répartition régulière des points sur une sphère (spirale de Fibonacci).
function fibonacciSphere(n) {
  const points = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i += 1) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS));
  }
  return points;
}

function SkillIcon({
  position, texture, title, dimmed,
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  useFrame((_, delta) => {
    let target = 1;
    if (hovered) target = 1.45;
    else if (dimmed === false) target = 1.25;
    else if (dimmed) target = 0.7;
    const s = THREE.MathUtils.damp(ref.current.scale.x, target, 10, delta);
    ref.current.scale.setScalar(s);
  });
  return (
    <Billboard position={position}>
      <group
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <mesh>
          <circleGeometry args={[0.27, 40]} />
          <meshBasicMaterial
            color={hovered ? '#c7d2fe' : '#f1f5f9'}
            transparent
            opacity={dimmed ? 0.18 : 1}
          />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.34, 0.34]} />
          <meshBasicMaterial map={texture} transparent opacity={dimmed ? 0.2 : 1} toneMapped={false} />
        </mesh>
      </group>
      {hovered && (
        <Html center position={[0, -0.6, 0]} className="stage3d-label" zIndexRange={[20, 0]}>
          {title}
        </Html>
      )}
    </Billboard>
  );
}

SkillIcon.propTypes = {
  position: PropTypes.instanceOf(THREE.Vector3).isRequired,
  texture: PropTypes.instanceOf(THREE.Texture).isRequired,
  title: PropTypes.string.isRequired,
  // true = estompé, false = mis en avant, null = normal.
  dimmed: PropTypes.bool,
};

SkillIcon.defaultProps = { dimmed: null };

function Cloud({ items, highlight }) {
  // Les SVG sans taille fixe s'affichent vides en texture : on les dessine
  // d'abord sur un canvas carré.
  const images = useLoader(THREE.ImageLoader, items.map((i) => i.icon));
  const textures = useMemo(() => images.map((img) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const ratio = (img.width && img.height) ? img.width / img.height : 1;
    const w = ratio >= 1 ? 256 : 256 * ratio;
    const h = ratio >= 1 ? 256 / ratio : 256;
    ctx.drawImage(img, (256 - w) / 2, (256 - h) / 2, w, h);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }), [images]);
  const points = useMemo(() => fibonacciSphere(items.length), [items.length]);
  return (
    <group>
      {items.map((item, i) => (
        <SkillIcon
          key={item.title}
          position={points[i]}
          texture={textures[i]}
          title={item.title}
          dimmed={highlight ? !highlight.includes(item.title) : null}
        />
      ))}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.92, 32, 32]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

Cloud.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  highlight: PropTypes.arrayOf(PropTypes.string),
};

Cloud.defaultProps = { highlight: null };

function SkillsSphere({ items, highlight }) {
  return (
    <Stage3D
      camera={{ position: [0, 0, 6.2], fov: 50 }}
      hint={(
        <>
          <HandGrabbing size={16} weight="duotone" aria-hidden="true" />
          {' Faites tourner la sphère · Survolez un logo pour voir son nom'}
        </>
      )}
    >
      <Cloud items={items} highlight={highlight} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
    </Stage3D>
  );
}

SkillsSphere.propTypes = Cloud.propTypes;
SkillsSphere.defaultProps = Cloud.defaultProps;

export default SkillsSphere;
