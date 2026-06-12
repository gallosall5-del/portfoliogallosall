import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  isDark: boolean;
}

export default function SectionTitle({ title, subtitle, isDark }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-dark-900'}`}>
        {title.split(' ').map((word, i) => (
          i === 0 ? (
            <span key={i} className="gradient-text">{word} </span>
          ) : (
            <span key={i}>{word} </span>
          )
        ))}
      </h2>
      <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-dark-400' : 'text-dark-500'}`}>
        {subtitle}
      </p>
      <div className="flex items-center justify-center gap-2 mt-6">
        <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary-500 to-cyan-400" />
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
        <div className="w-12 h-1 rounded-full bg-gradient-to-r from-violet-500 to-primary-500" />
      </div>
    </motion.div>
  );
}
