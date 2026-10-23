import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import endpoints from './constants/endpoints';

const ParticlesBackground = React.lazy(() => import('./components/three/ParticlesBackground'));

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <Suspense fallback={null}>
        <ParticlesBackground />
      </Suspense>
      <NavBar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            {data
              && data.sections.map((route) => {
                const SectionComponent = React.lazy(() => import(`./components/${route.component}.jsx`));
                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    element={<SectionComponent header={route.headerTitle} />}
                  />
                );
              })}
            {data && <Route path="*" element={<NotFound />} />}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default MainApp;
