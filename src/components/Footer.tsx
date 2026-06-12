import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative py-12 ${isDark ? 'bg-dark-950' : 'bg-white'}`}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToTop(); }}
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text"
          >
            {'<GS />'}
          </motion.a>

          {/* Social links */}
          <div className="flex items-center gap-4">
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
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className={`text-center text-sm ${isDark ? 'text-dark-500' : 'text-dark-400'}`}>
            <p className="flex items-center justify-center gap-1">
              © {new Date().getFullYear()} Gallo Sall. Fait avec{' '}
              <FaHeart className="text-red-500 text-xs" /> et React.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow"
          aria-label="Retour en haut"
        >
          <FaArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
