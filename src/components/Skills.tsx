import { motion } from 'framer-motion';
import { skillCategories } from '../data/portfolio';
import SectionTitle from './SectionTitle';

interface SkillsProps {
  isDark: boolean;
}

export default function Skills({ isDark }: SkillsProps) {
  return (
    <section id="skills" className={`py-20 sm:py-28 relative ${isDark ? 'bg-dark-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Compétences Techniques"
          subtitle="Les technologies et outils que je maîtrise pour créer des solutions complètes."
          isDark={isDark}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative p-6 rounded-2xl transition-all duration-500 ${
                isDark
                  ? 'bg-dark-800/40 border border-dark-700/50 hover:border-primary-500/30'
                  : 'bg-white border border-dark-200 hover:border-primary-300 hover:shadow-xl'
              }`}
            >
              {/* Gradient top bar */}
              <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${category.gradient} rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white shadow-lg`}>
                  <category.icon size={20} />
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-dark-900'}`}>
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <skill.icon className={`text-sm ${isDark ? 'text-dark-400' : 'text-dark-500'}`} />
                        <span className={`text-sm font-medium ${isDark ? 'text-dark-200' : 'text-dark-700'}`}>
                          {skill.name}
                        </span>
                      </div>
                      <span className={`text-xs font-mono font-bold ${isDark ? 'text-dark-500' : 'text-dark-400'}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-dark-700' : 'bg-dark-100'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.05, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
