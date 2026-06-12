import { motion } from 'framer-motion';
import { services } from '../data/portfolio';
import SectionTitle from './SectionTitle';

interface ServicesProps {
  isDark: boolean;
}

export default function Services({ isDark }: ServicesProps) {
  return (
    <section id="services" className={`py-20 sm:py-28 relative ${isDark ? 'bg-dark-900/50' : 'bg-dark-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Services Proposés"
          subtitle="Des solutions complètes pour vos projets numériques, du concept à la réalisation."
          isDark={isDark}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative p-6 sm:p-8 rounded-2xl transition-all duration-500 overflow-hidden ${
                isDark
                  ? 'bg-dark-800/30 border border-dark-700/50 hover:border-primary-500/30'
                  : 'bg-white border border-dark-200 hover:border-primary-300 hover:shadow-2xl'
              }`}
            >
              {/* Background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white shadow-lg mb-5`}
                >
                  <service.icon size={24} />
                </motion.div>

                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-dark-900'}`}>
                  {service.title}
                </h3>

                <p className={`text-sm leading-relaxed ${isDark ? 'text-dark-400' : 'text-dark-500'}`}>
                  {service.description}
                </p>

                <motion.div
                  className={`mt-5 flex items-center gap-2 text-sm font-medium ${
                    isDark ? 'text-primary-400' : 'text-primary-600'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <span>En savoir plus</span>
                  <span>→</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
