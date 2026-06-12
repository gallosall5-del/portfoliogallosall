import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaDownload, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { heroRoles } from '../data/portfolio';
import avatar from '../assets/avatar.png';

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = heroRoles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % heroRoles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
  }));

  return (
    <section id="hero" className={`relative min-h-screen flex items-center overflow-hidden ${isDark ? 'bg-dark-950' : 'bg-white'}`}>
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -50, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]"
        />

        {/* Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${isDark ? 'bg-primary-400/20' : 'bg-primary-400/10'}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Grid */}
        <div
          className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                  isDark
                    ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                    : 'bg-primary-50 text-primary-600 border border-primary-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Disponible pour de nouvelles opportunités
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 ${
                isDark ? 'text-white' : 'text-dark-900'
              }`}
            >
              Salut, je suis{' '}
              <span className="gradient-text">Gallo Sall</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-base sm:text-lg mb-2 ${isDark ? 'text-dark-400' : 'text-dark-500'}`}
            >
              Étudiant en BTS2 Développement d'Applications Mobile
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-12 sm:h-14 flex items-center justify-center lg:justify-start mb-8"
            >
              <span className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDark ? 'text-cyan-400' : 'text-primary-600'}`}>
                {displayText}
                <span className="cursor-blink ml-1 text-primary-500">|</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
              >
                Voir mes projets
              </motion.a>
              <motion.a
                href="/CV_Gallo_Sall.pdf"
                download="CV_Gallo_Sall.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 sm:px-8 sm:py-3.5 font-semibold rounded-xl border-2 transition-colors flex items-center gap-2 ${
                  isDark
                    ? 'border-dark-700 text-dark-300 hover:border-primary-500 hover:text-primary-400'
                    : 'border-dark-200 text-dark-600 hover:border-primary-500 hover:text-primary-600'
                }`}
              >
                <FaDownload size={14} />
                Télécharger CV
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 sm:px-8 sm:py-3.5 font-semibold rounded-xl transition-colors flex items-center gap-2 ${
                  isDark
                    ? 'bg-dark-800 text-white hover:bg-dark-700'
                    : 'bg-dark-100 text-dark-700 hover:bg-dark-200'
                }`}
              >
                <FaEnvelope size={14} />
                Me contacter
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-4 mt-8 justify-center lg:justify-start"
            >
              {[
                { icon: FaGithub, href: 'https://github.com/gallosall5-del', label: 'GitHub' },
                { icon: FaLinkedin, href: 'https://www.linkedin.com/in/gallo-sall-27873b354', label: 'LinkedIn' },
                { icon: FaEnvelope, href: 'mailto:gallosall5@gmail.com', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-xl transition-colors ${
                    isDark
                      ? 'bg-dark-800/50 text-dark-400 hover:text-primary-400 hover:bg-dark-800'
                      : 'bg-dark-100 text-dark-500 hover:text-primary-600 hover:bg-dark-200'
                  }`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right - Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 sm:-inset-4 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #3b82f6, #06b6d4, #8b5cf6, #3b82f6)',
                  filter: 'blur(2px)',
                  opacity: 0.6,
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 sm:-inset-8 rounded-full border border-dashed border-primary-500/20"
              />
              {/* Avatar image */}
              <div className={`relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 ${
                isDark ? 'border-dark-800 bg-dark-800/50' : 'border-white bg-primary-50'
              } shadow-2xl`}>
                <img
                  src={avatar}
                  alt="Gallo Sall"
                  className="w-full h-full object-cover object-center scale-110 pt-2"
                />
              </div>
              {/* Status badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className={`absolute -bottom-2 -right-2 sm:bottom-2 sm:right-2 px-4 py-2 rounded-xl shadow-lg ${
                  isDark ? 'bg-dark-800 border border-dark-700' : 'bg-white border border-dark-200'
                }`}
              >
                <span className="text-sm font-semibold gradient-text">BTS2 Dev Mobile</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, y: { duration: 2, repeat: Infinity } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className={`text-xs ${isDark ? 'text-dark-500' : 'text-dark-400'}`}>Défiler vers le bas</span>
          <FaArrowDown className={`text-sm ${isDark ? 'text-dark-500' : 'text-dark-400'}`} />
        </motion.div>
      </div>
    </section>
  );
}
