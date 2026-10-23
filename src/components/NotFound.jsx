import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function NotFound() {
  return (
    <div className="section-content-container" style={{ alignItems: 'center', textAlign: 'center' }}>
      <Header title="Page introuvable" />
      <p>Cette page n&apos;existe pas ou a été déplacée.</p>
      <Link className="btn-pill btn-accent" to="/">Retour à l&apos;accueil</Link>
    </div>
  );
}

export default NotFound;
