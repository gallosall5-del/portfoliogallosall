import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaStar, FaFire, FaExternalLinkAlt } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

interface GitHubProps {
  isDark: boolean;
}

const stats = [
  { icon: FaCodeBranch, label: 'Repositories', value: '15+', color: 'from-blue-500 to-cyan-400' },
  { icon: FaStar, label: 'Contributions', value: '200+', color: 'from-violet-500 to-purple-400' },
  { icon: FaFire, label: 'Streak', value: '30+', color: 'from-orange-500 to-amber-400' },
  { icon: FaGithub, label: 'Followers', value: '10+', color: 'from-emerald-500 to-teal-400' },
];

const languages = [
  { name: 'JavaScript', percentage: 30, color: '#f7df1e' },
  { name: 'PHP', percentage: 25, color: '#777bb4' },
  { name: 'Dart', percentage: 20, color: '#0175c2' },
  { name: 'TypeScript', percentage: 15, color: '#3178c6' },
  { name: 'HTML/CSS', percentage: 10, color: '#e34f26' },
];

export default function GitHub({ isDark }: GitHubProps) {
  return (
    <section id="github" className={`py-20 sm:py-28 relative ${isDark ? 'bg-dark-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="GitHub Activité"
          subtitle="Mon activité et mes contributions sur GitHub."
          isDark={isDark}
        />

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className={`group relative p-5 sm:p-6 rounded-2xl text-center transition-all duration-300 ${
                isDark
                  ? 'bg-dark-800/40 border border-dark-700/50 hover:border-primary-500/30'
                  : 'bg-white border border-dark-200 hover:border-primary-300 hover:shadow-xl'
              }`}
            >
              <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white shadow-lg mb-3`}>
                <stat.icon size={20} />
              </div>
              <div className={`text-2xl sm:text-3xl font-black mb-1 ${isDark ? 'text-white' : 'text-dark-900'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-dark-500'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages & Contribution graph */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Most used languages */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-6 sm:p-8 rounded-2xl ${
              isDark
                ? 'bg-dark-800/40 border border-dark-700/50'
                : 'bg-white border border-dark-200'
            }`}
          >
            <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-dark-900'}`}>
              <FaCodeBranch className="text-primary-500" />
              Langages les plus utilisés
            </h3>

            {/* Languages bar */}
            <div className="h-4 rounded-full overflow-hidden flex mb-6">
              {languages.map((lang) => (
                <motion.div
                  key={lang.name}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{ backgroundColor: lang.color }}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                />
              ))}
            </div>

            {/* Language list */}
            <div className="space-y-3">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className={`text-sm font-medium ${isDark ? 'text-dark-200' : 'text-dark-700'}`}>
                      {lang.name}
                    </span>
                  </div>
                  <span className={`text-sm font-mono font-bold ${isDark ? 'text-dark-400' : 'text-dark-500'}`}>
                    {lang.percentage}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contribution activity */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-6 sm:p-8 rounded-2xl ${
              isDark
                ? 'bg-dark-800/40 border border-dark-700/50'
                : 'bg-white border border-dark-200'
            }`}
          >
            <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-dark-900'}`}>
              <FaFire className="text-orange-500" />
              Activité de contributions
            </h3>

            {/* Contribution grid simulation */}
            <div className="grid grid-cols-12 gap-1 mb-6">
              {Array.from({ length: 84 }, (_, i) => {
                const intensity = Math.random();
                let bgColor: string;
                if (intensity > 0.8) bgColor = isDark ? 'bg-emerald-400' : 'bg-emerald-500';
                else if (intensity > 0.6) bgColor = isDark ? 'bg-emerald-500/70' : 'bg-emerald-400/70';
                else if (intensity > 0.4) bgColor = isDark ? 'bg-emerald-600/50' : 'bg-emerald-300/70';
                else if (intensity > 0.2) bgColor = isDark ? 'bg-emerald-700/40' : 'bg-emerald-200/70';
                else bgColor = isDark ? 'bg-dark-700/50' : 'bg-dark-100';
                
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.01 }}
                    className={`aspect-square rounded-sm ${bgColor}`}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs ${isDark ? 'text-dark-500' : 'text-dark-400'}`}>
                Dernières 12 semaines
              </span>
              <div className="flex items-center gap-1">
                <span className={`text-xs mr-1 ${isDark ? 'text-dark-500' : 'text-dark-400'}`}>Moins</span>
                {[0.1, 0.3, 0.5, 0.7, 0.9].map((v, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      v > 0.7
                        ? isDark ? 'bg-emerald-400' : 'bg-emerald-500'
                        : v > 0.5
                          ? isDark ? 'bg-emerald-500/70' : 'bg-emerald-400/70'
                          : v > 0.3
                            ? isDark ? 'bg-emerald-600/50' : 'bg-emerald-300/70'
                            : v > 0.1
                              ? isDark ? 'bg-emerald-700/40' : 'bg-emerald-200/70'
                              : isDark ? 'bg-dark-700/50' : 'bg-dark-100'
                    }`}
                  />
                ))}
                <span className={`text-xs ml-1 ${isDark ? 'text-dark-500' : 'text-dark-400'}`}>Plus</span>
              </div>
            </div>

            <motion.a
              href="https://github.com/gallosall5-del"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-medium shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
            >
              <FaGithub size={18} />
              Voir mon profil GitHub
              <FaExternalLinkAlt size={12} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
