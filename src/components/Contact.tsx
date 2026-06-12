import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa';
import { contactInfo } from '../data/portfolio';
import SectionTitle from './SectionTitle';

interface ContactProps {
  isDark: boolean;
}

export default function Contact({ isDark }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:gallosall5@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.open(mailto);
  };

  const inputClasses = `w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none ${
    isDark
      ? 'bg-dark-800/50 border border-dark-700/50 text-white placeholder-dark-500 focus:border-primary-500/50 focus:bg-dark-800'
      : 'bg-dark-50 border border-dark-200 text-dark-900 placeholder-dark-400 focus:border-primary-400 focus:bg-white'
  }`;

  return (
    <section id="contact" className={`py-20 sm:py-28 relative ${isDark ? 'bg-dark-900/50' : 'bg-dark-50'}`}>
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Contact"
          subtitle="N'hésitez pas à me contacter pour discuter de vos projets ou opportunités."
          isDark={isDark}
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-dark-900'}`}>
              Restons en <span className="gradient-text">contact</span>
            </h3>
            <p className={`mb-8 ${isDark ? 'text-dark-400' : 'text-dark-500'}`}>
              Je suis toujours ouvert aux nouvelles opportunités et collaborations intéressantes.
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-800/30 border border-dark-700/50 hover:border-primary-500/30 hover:bg-dark-800/50'
                      : 'bg-white border border-dark-200 hover:border-primary-300 hover:shadow-lg'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isDark
                      ? 'bg-primary-500/10 text-primary-400'
                      : 'bg-primary-50 text-primary-600'
                  }`}>
                    <info.icon size={18} />
                  </div>
                  <div>
                    <div className={`text-xs font-medium mb-0.5 ${isDark ? 'text-dark-500' : 'text-dark-400'}`}>
                      {info.label}
                    </div>
                    <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-dark-900'}`}>
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className={`flex items-center gap-3 p-4 rounded-xl ${
                isDark
                  ? 'bg-dark-800/20 border border-dark-700/30'
                  : 'bg-primary-50/50 border border-primary-100'
              }`}
            >
              <FaMapMarkerAlt className={isDark ? 'text-primary-400' : 'text-primary-600'} />
              <span className={`text-sm ${isDark ? 'text-dark-300' : 'text-dark-600'}`}>
                Sénégal
              </span>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-dark-300' : 'text-dark-700'}`}>
                    Nom complet
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom"
                    className={inputClasses}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-dark-300' : 'text-dark-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    className={inputClasses}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-dark-300' : 'text-dark-700'}`}>
                  Sujet
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sujet du message"
                  className={inputClasses}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-dark-300' : 'text-dark-700'}`}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Votre message..."
                  className={`${inputClasses} resize-none`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all flex items-center justify-center gap-2"
              >
                <FaPaperPlane size={14} />
                Envoyer le message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
