import React, { Suspense, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/timeline.css';
import '../css/projects.css';

const DakarMap = React.lazy(() => import('./three/DakarMap'));

function Experience(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.experiences, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.experiences))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Suspense fallback={<FallbackSpinner />}>
            <DakarMap experiences={data} />
          </Suspense>
          <Fade triggerOnce>
            <div className="tl tl--experience">
              {data.map((item) => (
                <div className="tl-item" key={item.title + item.dateText}>
                  <div className="tl-node--dot" />
                  <div className="tl-card">
                    <div className="tl-date">
                      {item.period ? `${item.period} · ${item.dateText}` : item.dateText}
                    </div>
                    <h3 className="tl-title">{item.title}</h3>
                    <div className="tl-subtitle">
                      <span className="accent">{item.subtitle}</span>
                      {item.workType ? ` · ${item.workType}` : ''}
                    </div>
                    <ul className="tl-list">
                      {item.workDescription.map((point) => (
                        <li key={point}>
                          <ReactMarkdown components={{ p: 'span' }}>
                            {point}
                          </ReactMarkdown>
                        </li>
                      ))}
                    </ul>
                    {item.tech?.length > 0 && (
                      <div className="tl-tech">
                        <span className="tl-tech__label">Technologies utilisées</span>
                        <div className="project-card__tags">
                          {item.tech.map((t) => <span key={t} className="project-tag">{t}</span>)}
                        </div>
                      </div>
                    )}
                    {item.project && (
                      <Link className="proj-link tl-project" to="/projects">
                        {`Voir le projet ${item.project} →`}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      ) : <FallbackSpinner /> }
    </>
  );
}

Experience.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Experience;
