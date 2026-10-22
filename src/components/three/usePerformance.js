import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () => typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isLowPower = () => typeof window !== 'undefined'
  && window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

// Réglages de rendu adaptés à l'appareil, et pause des scènes 3D hors de l'écran.
export default function usePerformance() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  const [lowPower] = useState(isLowPower);
  const [reducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    lowPower,
    reducedMotion,
    // Le rendu s'arrête hors écran ; avec « réduire les animations », la scène
    // n'est redessinée que lorsqu'on interagit avec elle.
    frameloop: (!visible && 'never') || (reducedMotion && 'demand') || 'always',
    dpr: lowPower ? [1, 1.25] : [1, 1.75],
  };
}
