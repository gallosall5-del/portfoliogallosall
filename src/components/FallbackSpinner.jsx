import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

const styles = {
  spinnerContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    height: '100%',
    padding: '2rem 1rem',
  },
};

// Au-delà de ce délai, on considère que le contenu n'a pas pu être chargé.
const TIMEOUT_MS = 10000;

function FallbackSpinner() {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setTimedOut(true), TIMEOUT_MS);
    return () => clearTimeout(id);
  }, []);

  return (
    <div style={styles.spinnerContainerStyle} role="status" aria-live="polite">
      {timedOut ? (
        <>
          <p style={{ margin: 0 }}>Le contenu met du temps à charger. Vérifiez votre connexion.</p>
          <button type="button" className="btn-pill btn-ghost" onClick={() => window.location.reload()}>
            Réessayer
          </button>
        </>
      ) : (
        <Spinner animation="grow" aria-label="Chargement" />
      )}
    </div>
  );
}

export default FallbackSpinner;
