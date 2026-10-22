import React, { Suspense, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/skills.css';

const SkillsSphere = React.lazy(() => import('./three/SkillsSphere'));

function Skills(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  // Catégorie mise en avant dans la sphère (null = toutes).
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, {
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
          <Suspense fallback={<FallbackSpinner />}>
            <SkillsSphere
              items={data.skills.flatMap((c) => c.items)}
              highlight={active
                ? data.skills.find((c) => c.title === active).items.map((i) => i.title)
                : null}
            />
          </Suspense>
          <Fade triggerOnce>
            <div className="bento">
              {data.intro && (
                <div className="tile skills-intro-tile span-6">
                  <ReactMarkdown>{data.intro}</ReactMarkdown>
                  <p className="skills-tip">
                    Cliquez sur une catégorie pour la mettre en avant dans la sphère.
                  </p>
                </div>
              )}
              {data.skills?.map((category, index) => (
                <button
                  type="button"
                  key={category.title}
                  // 3 catégories sur la 1re ligne, 2 plus larges sur la 2e : pas de trou.
                  className={`tile tile--interactive skill-category-tile ${index < 3 ? 'span-2' : 'span-3'}${
                    active === category.title ? ' skill-category-tile--active' : ''}`}
                  aria-pressed={active === category.title}
                  onClick={() => setActive(active === category.title ? null : category.title)}
                >
                  <h3 className="skill-category-title">{category.title}</h3>
                  <div className="skill-grid">
                    {category.items.map((item) => (
                      <div
                        key={item.title}
                        className="skill-item"
                        title={item.usedIn ? `Utilisé dans : ${item.usedIn.join(', ')}` : item.title}
                      >
                        <span className="skill-item__icon"><img src={item.icon} alt="" /></span>
                        <span>{item.title}</span>
                        {item.usedIn && (
                          <span className="skill-item__used">{item.usedIn.join(' · ')}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </Fade>
        </div>
      ) : <FallbackSpinner /> }
    </>
  );
}

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
