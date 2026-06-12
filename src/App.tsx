import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Education from './components/Education';
import GitHub from './components/GitHub';
import Contact from './components/Contact';
import Footer, { BackToTop } from './components/Footer';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-dark-950 text-white' : 'bg-white text-dark-900'
    }`}>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />
          <main>
            <Hero isDark={isDark} />
            <About isDark={isDark} />
            <Skills isDark={isDark} />
            <Services isDark={isDark} />
            <Projects isDark={isDark} />
            <Education isDark={isDark} />
            <GitHub isDark={isDark} />
            <Contact isDark={isDark} />
          </main>
          <Footer isDark={isDark} />
          <BackToTop />
        </>
      )}
    </div>
  );
}

export default App;
