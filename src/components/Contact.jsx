import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import {
  EnvelopeSimple, FilePdf, GithubLogo, LinkedinLogo, MapPin, Phone, WhatsappLogo,
} from '@phosphor-icons/react';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/contact.css';

// Les noms d'icônes de contact.json correspondent aux composants Phosphor.
const ICONS = {
  EnvelopeSimple, GithubLogo, LinkedinLogo, MapPin, Phone, WhatsappLogo,
};

function ContactIcon({ name, size }) {
  const Icon = ICONS[name];
  return Icon ? <Icon size={size} weight="duotone" aria-hidden="true" /> : null;
}

ContactIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

function Contact(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.contact, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Fade triggerOnce>
            <div className="bento">
              <div className="tile contact-intro span-6">
                <span className="hero-eyebrow">{data.availability}</span>
                <p>{data.intro}</p>
                <div className="contact-cta">
                  {data.items.filter((item) => item.primary).map((item) => (
                    <a
                      key={item.label}
                      className="btn-pill btn-accent"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ContactIcon name={item.icon} size={20} />
                      {item.label}
                    </a>
                  ))}
                  <a className="btn-pill btn-ghost" href={data.cv} download>
                    <FilePdf size={20} weight="duotone" aria-hidden="true" />
                    Télécharger mon CV
                  </a>
                </div>
              </div>
              {data.items.map((item) => {
                const content = (
                  <>
                    <span className="contact-card__icon"><ContactIcon name={item.icon} size={28} /></span>
                    <span className="contact-card__label">{item.label}</span>
                    <span className="contact-card__value">{item.value}</span>
                  </>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    className="tile tile--interactive contact-card span-2"
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="tile contact-card span-2">{content}</div>
                );
              })}
            </div>
          </Fade>
        </div>
      ) : <FallbackSpinner />}
    </>
  );
}

Contact.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Contact;
