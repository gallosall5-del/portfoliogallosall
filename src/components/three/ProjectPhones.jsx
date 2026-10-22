/* eslint-disable react/no-unknown-property -- props Three.js de React Three Fiber */
import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useFrame } from '@react-three/fiber';
import {
  ContactShadows, Float, RoundedBox, useCursor, useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import Stage3D from './Stage3D';

const PHONE_W = 1;
const PHONE_H = 2.05;
const SCREEN_W = 0.9;
const SCREEN_H = 1.9;
const RING = 2.6;

// Recadre l'image comme un « object-fit: cover » sur l'écran du téléphone.
function useCoverTexture(texture, fit, background) {
  return useMemo(() => {
    const img = texture.image;
    const canvas = document.createElement('canvas');
    canvas.width = 540;
    canvas.height = Math.round(540 * (SCREEN_H / SCREEN_W));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = background || '#0b1220';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const scale = fit === 'contain'
      ? Math.min(canvas.width / img.width, canvas.height / img.height)
      : Math.max(canvas.width / img.width, canvas.height / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, [texture, fit, background]);
}

function Phone({
  project, texture, angle, active, onSelect,
}) {
  const screen = useCoverTexture(texture, project.imageFit, project.imageBackground);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && !active);
  const x = Math.sin(angle) * RING;
  const z = Math.cos(angle) * RING;
  return (
    <group position={[x, 0, z]} rotation={[0, angle, 0]}>
      <Float speed={active ? 2 : 1} rotationIntensity={active ? 0.25 : 0.1} floatIntensity={0.4}>
        <group
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <RoundedBox args={[PHONE_W, PHONE_H, 0.1]} radius={0.09} smoothness={6}>
            <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.3} />
          </RoundedBox>
          <mesh position={[0, 0, 0.051]}>
            <planeGeometry args={[SCREEN_W, SCREEN_H]} />
            <meshBasicMaterial map={screen} toneMapped={false} />
          </mesh>
          {/* encoche */}
          <mesh position={[0, PHONE_H / 2 - 0.1, 0.053]}>
            <planeGeometry args={[0.28, 0.06]} />
            <meshBasicMaterial color="#000" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

Phone.propTypes = {
  project: PropTypes.shape({
    imageFit: PropTypes.string,
    imageBackground: PropTypes.string,
  }).isRequired,
  texture: PropTypes.instanceOf(THREE.Texture).isRequired,
  angle: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function Carousel({ projects, index, setIndex }) {
  const textures = useTexture(projects.map((p) => p.image));
  const group = useRef();
  const step = (Math.PI * 2) / Math.max(projects.length, 3);

  useFrame((_, delta) => {
    const target = -index * step;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, target, 4, delta);
  });

  return (
    <group ref={group} position={[0, 0.15, -RING]}>
      {projects.map((p, i) => (
        <Phone
          key={p.title}
          project={p}
          texture={textures[i]}
          angle={i * step}
          active={i === index}
          onSelect={() => setIndex(i)}
        />
      ))}
    </group>
  );
}

Carousel.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
};

function ProjectPhones({ projects }) {
  const withImages = projects.filter((p) => p.image);
  const [index, setIndex] = useState(0);
  if (!withImages.length) return null;
  const n = withImages.length;
  const current = withImages[index];
  return (
    <div className="stage3d-wrap">
      <Stage3D camera={{ position: [0, 0.2, 3.6], fov: 45 }} hint="Cliquez sur un téléphone ou utilisez les flèches">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <pointLight position={[-3, 1, 2]} intensity={2} color="#818cf8" />
        <Carousel projects={withImages} index={index} setIndex={setIndex} />
        <ContactShadows position={[0, -1.05, 0]} opacity={0.45} scale={8} blur={2.5} />
      </Stage3D>
      <div className="stage3d-caption">
        <h3>{current.title}</h3>
        <p>{current.tags?.join(' · ')}</p>
      </div>
      <button type="button" className="stage3d-nav stage3d-nav--prev" aria-label="Projet précédent" onClick={() => setIndex((index - 1 + n) % n)}>‹</button>
      <button type="button" className="stage3d-nav stage3d-nav--next" aria-label="Projet suivant" onClick={() => setIndex((index + 1) % n)}>›</button>
    </div>
  );
}

ProjectPhones.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default ProjectPhones;
