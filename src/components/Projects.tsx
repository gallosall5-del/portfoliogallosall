import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { projects } from '../data/portfolio';
import SectionTitle from './SectionTitle';

interface ProjectsProps {
  isDark: boolean;
}

export default function Projects({ isDark }: ProjectsProps) {
  return (
    <section id="projects" className={`py-20 sm:py-28 relative ${isDark ? 'bg-dark-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Projets Réalisés"
          subtitle="Une sélection de projets qui démontrent mes compétences et ma passion pour le développement."
          isDark={isDark}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                isDark
                  ? 'bg-dark-800/40 border border-dark-700/50 hover:border-primary-500/30'
                  : 'bg-white border border-dark-200 hover:border-primary-300 hover:shadow-2xl'
              }`}
            >
              {/* Project image/gradient header */}
              <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                  >
                    <FaCode size={32} className="text-white" />
                  </motion.div>
                </div>
                {/* Mesh gradient overlay */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                }} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-dark-900'}`}>
                  {project.title}
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-dark-400' : 'text-dark-500'}`}>
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4 space-y-1.5">
                  {project.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 flex-shrink-0" />
                      <span className={`text-xs ${isDark ? 'text-dark-400' : 'text-dark-500'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Techs */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        isDark
                          ? 'bg-dark-700/50 text-dark-300 border border-dark-600/50'
                          : 'bg-dark-100 text-dark-600 border border-dark-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isDark
                        ? 'bg-dark-700/50 text-dark-300 hover:bg-dark-700 hover:text-white'
                        : 'bg-dark-100 text-dark-600 hover:bg-dark-200 hover:text-dark-900'
                    }`}
                  >
                    <FaGithub size={14} />
                    GitHub
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-primary-500 to-cyan-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
                  >
                    <FaExternalLinkAlt size={12} />
                    Démo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
