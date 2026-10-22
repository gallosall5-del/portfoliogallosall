import { useContext } from 'react';
import AppContext from '../../AppContext';

// Couleurs des scènes 3D selon le thème du site (sombre / clair).
export default function useStageColors() {
  const { darkMode } = useContext(AppContext);
  const dark = darkMode?.value ?? true;
  return dark
    ? { background: '#05070d', floor: '#0d1424', dark: true }
    : { background: '#e6e9f2', floor: '#c9d0de', dark: false };
}
