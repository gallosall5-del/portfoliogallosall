import React from 'react';
import { Link } from 'react-router-dom';
import '../css/contact.css';

// Pied de page commun : contact rapide et CV sur toutes les pages.
function Footer() {
  return (
    <footer className="site-footer">
      <span>{`© ${new Date().getFullYear()} Gallo SALL · Dakar, Sénégal`}</span>
      <nav aria-label="Liens de contact">
        <Link to="/contact">Me contacter</Link>
        <a href="https://wa.me/221708204868" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href="mailto:gallosall5@gmail.com">E-mail</a>
        <a href="https://www.linkedin.com/in/gallo-sall-27873b354" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="CV_Gallo_Sall.pdf" download>CV (PDF)</a>
      </nav>
    </footer>
  );
}

export default Footer;
