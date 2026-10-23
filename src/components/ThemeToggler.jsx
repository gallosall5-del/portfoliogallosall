import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Moon, Sun } from '@phosphor-icons/react';
import AppContext from '../AppContext';

// Bouton soleil / lune (icônes Phosphor).
function ThemeToggler({ onClick = () => {} }) {
  const { darkMode } = useContext(AppContext);
  const isDark = darkMode.value;

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      onClick={() => {
        darkMode.toggle();
        onClick();
      }}
    >
      {isDark
        ? <Sun size={20} weight="duotone" aria-hidden="true" />
        : <Moon size={20} weight="duotone" aria-hidden="true" />}
    </button>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};

export default ThemeToggler;
