import React, { Suspense, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import {
  FilePdf, FilmSlate, Palette, SoccerBall, Translate,
} from '@phosphor-icons/react';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/about.css';

// Les noms d'icônes des loisirs (about.json) correspondent aux composants Phosphor.
const HOBBY_ICONS = { FilmSlate, Palette, SoccerBall };

const AboutCard = React.lazy(() => import('./three/AboutCard'));

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        {data ? (
          <>
            <Suspense fallback={<FallbackSpinner />}>
              <AboutCard image={data.imageSource} />
            </Suspense>
            <Fade triggerOnce>
            <div className="bento">
              <div className="tile about-bio-tile span-4 rspan-2">
                <ReactMarkdown>{data.about}</ReactMarkdown>
              </div>
              {/* La photo est déjà dans la scène 3D : ici, les chiffres clés et les actions. */}
              <div className="tile about-stats-tile span-2 rspan-2">
                {data.stats?.map((stat) => (
                  <div key={stat.label} className="about-stat">
                    <span className="about-stat__value">{stat.value}</span>
                    <span className="about-stat__label">{stat.label}</span>
                  </div>
                ))}
                <div className="about-actions">
                  <Link className="btn-pill btn-accent" to="/contact">Me contacter</Link>
                  <a className="btn-pill btn-ghost" href="CV_Gallo_Sall.pdf" download>
                    <FilePdf size={20} weight="duotone" aria-hidden="true" />
                    Mon CV
                  </a>
                </div>
              </div>
              {data.languages && (
                <div className="tile span-3">
                  <h3 className="about-subtitle">Langues</h3>
                  <div className="about-chips">
                    {data.languages.map((lang) => (
                      <span key={lang.name} className="about-chip">
                        <Translate size={18} weight="duotone" aria-hidden="true" />
                        <strong>{lang.name}</strong>
                        <small>{lang.level}</small>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.hobbies && (
                <div className="tile span-3">
                  <h3 className="about-subtitle">Loisirs</h3>
                  <div className="about-chips">
                    {data.hobbies.map((hobby) => (
                      <span key={hobby.label} className="about-chip">
                        {HOBBY_ICONS[hobby.icon] && React.createElement(HOBBY_ICONS[hobby.icon], {
                          size: 18, weight: 'duotone', 'aria-hidden': true,
                        })}
                        <strong>{hobby.label}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </Fade>
          </>
        ) : <FallbackSpinner />}
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
