import React, { Suspense, useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import {
  BookOpen, Certificate, GraduationCap, MathOperations,
} from '@phosphor-icons/react';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/timeline.css';

// Les noms d'icônes d'education.json correspondent aux composants Phosphor.
const ICONS = {
  BookOpen, Certificate, GraduationCap, MathOperations,
};

const EducationStairs = React.lazy(() => import('./three/EducationStairs'));

function Education(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.education, {
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
            <EducationStairs education={data.education} />
          </Suspense>
          <Fade triggerOnce>
            <div className="tl tl--education">
              {data.education?.map((item) => (
                <div className="tl-item" key={item.cardTitle + item.title}>
                  <div className="tl-node--icon">
                    {React.createElement(ICONS[item.icon] || GraduationCap, {
                      size: 24, weight: 'duotone', 'aria-hidden': true,
                    })}
                  </div>
                  <div className="tl-card">
                    <div className="tl-date">{item.title}</div>
                    <h3 className="tl-title">{item.cardTitle}</h3>
                    <div className="tl-subtitle">
                      <span className="accent">{item.cardSubtitle}</span>
                    </div>
                    {item.cardDetailedText && (
                      <div className="tl-detail">{item.cardDetailedText}</div>
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

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
