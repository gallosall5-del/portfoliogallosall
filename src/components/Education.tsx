import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import { education } from '../data/portfolio';
import SectionTitle from './SectionTitle';

interface EducationProps {
  isDark: boolean;
}

export default function Education({ isDark }: EducationProps) {
  return (
    <section id="education" className={`py-20 sm:py-28 relative ${isDark ? 'bg-dark-900/50' : 'bg-dark-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Formation Académique"
          subtitle="Mon parcours éducatif et mes certifications professionnelles."
          isDark={isDark}
        />

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className={`absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 ${
              isDark ? 'bg-dark-700' : 'bg-dark-200'
            }`}>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="w-full bg-gradient-to-b from-primary-500 via-cyan-400 to-violet-500"
              />
            </div>

            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative pl-16 sm:pl-20 pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, type: 'spring' }}
                  className={`absolute left-3.5 sm:left-5.5 w-5 h-5 rounded-full bg-gradient-to-r ${edu.gradient} shadow-lg shadow-primary-500/30 z-10 flex items-center justify-center`}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </motion.div>

                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
                    isDark
                      ? 'bg-dark-800/40 border border-dark-700/50 hover:border-primary-500/30'
                      : 'bg-white border border-dark-200 hover:border-primary-300 hover:shadow-xl'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${edu.gradient}`}>
                      <FaGraduationCap className="text-white" size={16} />
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                      isDark
                        ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                        : 'bg-primary-50 text-primary-600 border border-primary-200'
                    }`}>
                      <FaCalendarAlt size={10} />
                      {edu.period}
                    </div>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-dark-900'}`}>
                    {edu.degree}
                  </h3>
                  <p className={`text-sm font-medium mb-3 ${isDark ? 'text-cyan-400' : 'text-primary-600'}`}>
                    {edu.school}
                  </p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-dark-400' : 'text-dark-500'}`}>
                    {edu.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}

            {/* Future placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative pl-16 sm:pl-20"
            >
              <div className={`absolute left-3.5 sm:left-5.5 w-5 h-5 rounded-full border-2 border-dashed z-10 flex items-center justify-center ${
                isDark ? 'border-dark-600 bg-dark-800' : 'border-dark-300 bg-dark-50'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-dark-600' : 'bg-dark-300'}`} />
              </div>
              <div className={`p-6 rounded-2xl border-2 border-dashed ${
                isDark ? 'border-dark-700/50 bg-dark-800/20' : 'border-dark-200 bg-dark-50/50'
              }`}>
                <p className={`text-sm italic ${isDark ? 'text-dark-500' : 'text-dark-400'}`}>
                  Prochaines formations et certifications à venir...
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
