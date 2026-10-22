import { useEffect, useRef, useState } from 'react';

const isLowPower = () => typeof window !== 'undefined'
  && window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

// Réglages de rendu adaptés à l'appareil, et pause des scènes 3D hors de l'écran.
export default function usePerformance() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  const [lowPower] = useState(isLowPower);

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
    // Le rendu s'arrête quand la scène n'est pas visible.
    frameloop: visible ? 'always' : 'never',
    dpr: lowPower ? [1, 1.25] : [1, 1.75],
  };
}
