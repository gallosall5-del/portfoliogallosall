import { motion } from 'framer-motion';
import { FaCode, FaLightbulb, FaUsers, FaPuzzlePiece, FaRocket, FaGraduationCap } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

interface AboutProps {
  isDark: boolean;
}

const qualities = [
  { icon: FaLightbulb, title: 'Curiosité', description: 'Toujours à la recherche de nouvelles technologies et approches innovantes.' },
  { icon: FaGraduationCap, title: 'Apprentissage continu', description: "Engagement constant dans l'amélioration de mes compétences techniques." },
  { icon: FaUsers, title: 'Travail en équipe', description: 'Collaboration efficace avec les équipes pour atteindre des objectifs communs.' },
  { icon: FaPuzzlePiece, title: 'Résolution de problèmes', description: 'Approche analytique et créative pour résoudre les défis techniques.' },
  { icon: FaRocket, title: 'Applications modernes', description: "Développement d'applications performantes avec les dernières technologies." },
  { icon: FaCode, title: 'Code propre', description: 'Écriture de code maintenable, testé et bien documenté.' },
];

export default function About({ isDark }: AboutProps) {
  return (
    <section id="about" className={`py-20 sm:py-28 relative ${isDark ? 'bg-dark-900/50' : 'bg-dark-50'}`}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="À propos"
          subtitle="Découvrez qui je suis et ce qui me motive dans le développement logiciel."
          isDark={isDark}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
          >
            <div className={`space-y-6 text-base sm:text-lg leading-relaxed ${isDark ? 'text-dark-300' : 'text-dark-600'}`}>
              <p>
                Je suis <span className="font-semibold gradient-text">Gallo Sall</span>, un étudiant passionné en{' '}
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-dark-900'}`}>
                  BTS2 Développement d'Applications Mobile
                </span>. 
                Mon parcours est guidé par une passion profonde pour le développement logiciel et les nouvelles technologies.
              </p>
              <p>
                Spécialisé en développement <span className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-primary-600'}`}>Full Stack</span> et{' '}
                <span className={`font-semibold ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>Mobile</span>, 
                je maîtrise un large éventail de technologies allant de React et Laravel à Flutter. 
                Mon objectif est de créer des solutions numériques innovantes et performantes.
              </p>
              <p>
                Je suis également passionné par l'<span className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-primary-600'}`}>Intelligence Artificielle</span> et 
                son intégration dans les applications modernes, ce qui me permet d'apporter une valeur ajoutée unique à mes projets.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { value: '10+', label: 'Projets réalisés' },
                { value: '6+', label: 'Technologies' },
                { value: '2+', label: "Ans d'expérience" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-center p-4 rounded-2xl ${
                    isDark ? 'bg-dark-800/50 border border-dark-700/50' : 'bg-white border border-dark-200'
                  }`}
                >
                  <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
                  <div className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-dark-400' : 'text-dark-500'}`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Qualities grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {qualities.map((q, i) => (
              <motion.div
                key={q.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`group p-5 rounded-2xl transition-all duration-300 ${
                  isDark
                    ? 'bg-dark-800/30 border border-dark-700/50 hover:border-primary-500/30 hover:bg-dark-800/60'
                    : 'bg-white border border-dark-200 hover:border-primary-300 hover:shadow-lg'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isDark
                    ? 'bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20'
                    : 'bg-primary-50 text-primary-600 group-hover:bg-primary-100'
                }`}>
                  <q.icon size={18} />
                </div>
                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark-900'}`}>{q.title}</h3>
                <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-dark-500'}`}>{q.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
