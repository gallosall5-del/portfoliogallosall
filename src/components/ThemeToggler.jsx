import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../AppContext';

// Bouton soleil / lune léger (remplace react-dark-mode-toggle et son moteur lottie).
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
      {isDark ? (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="currentColor" d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
        </svg>
      )}
    </button>
  );
}

ThemeToggler.propTypes = {
  onClick: PropTypes.func,
};

export default ThemeToggler;
