/* eslint-disable react/jsx-props-no-spreading -- options transmises telles quelles au Canvas */
import React, { Suspense, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import usePerformance from './usePerformance';
import useStageColors from './useStageColors';
import '../../css/stage3d.css';

function Progress() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="stage3d-progress">{`${Math.round(progress)} %`}</span>
    </Html>
  );
}

// Sur un cadre plus haut que large (mobile), recule la caméra pour que la
// scène et ses étiquettes restent entières au lieu d'être coupées sur les côtés.
function ResponsiveCamera() {
  const camera = useThree((s) => s.camera);
  const aspect = useThree((s) => s.size.width / s.size.height);
  const initial = useRef(null);
  useEffect(() => {
    if (!initial.current) initial.current = camera.position.clone();
    const factor = aspect < 1 ? Math.min(1.6, 1 / aspect ** 0.6) : 1;
    camera.position.copy(initial.current).multiplyScalar(factor);
  }, [camera, aspect]);
  return null;
}

// Cadre commun des scènes 3D des pages : fond sombre, chargement, légende.
function Stage3D({
  children, height, hint, className, ...canvasProps
}) {
  const { ref, frameloop, dpr } = usePerformance();
  const colors = useStageColors();
  return (
    <div
      ref={ref}
      className={`stage3d ${colors.dark ? '' : 'stage3d--light'} ${className}`}
      style={{ height, background: colors.background }}
    >
      <Canvas dpr={dpr} frameloop={frameloop} {...canvasProps}>
        <color attach="background" args={[colors.background]} />
        <ResponsiveCamera />
        <Suspense fallback={<Progress />}>{children}</Suspense>
      </Canvas>
      {hint && <p className="stage3d-hint">{hint}</p>}
    </div>
  );
}

Stage3D.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  hint: PropTypes.node,
  className: PropTypes.string,
};

Stage3D.defaultProps = {
  height: 'min(70vh, 560px)',
  hint: null,
  className: '',
};

export default Stage3D;
