/* eslint-disable react/jsx-props-no-spreading -- options transmises telles quelles au Canvas */
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
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
        <Suspense fallback={<Progress />}>{children}</Suspense>
      </Canvas>
      {hint && <p className="stage3d-hint">{hint}</p>}
    </div>
  );
}

Stage3D.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  hint: PropTypes.string,
  className: PropTypes.string,
};

Stage3D.defaultProps = {
  height: 'min(70vh, 560px)',
  hint: null,
  className: '',
};

export default Stage3D;
