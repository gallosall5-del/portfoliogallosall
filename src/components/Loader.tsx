import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          className="relative w-20 h-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 border-r-cyan-400" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-violet-500 border-l-primary-400 animate-[spin_1.5s_linear_infinite_reverse]" />
          <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-cyan-400 animate-[spin_1s_linear_infinite]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold gradient-text">Gallo Sall</h2>
          <p className="text-dark-400 text-sm mt-1">Chargement du portfolio...</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
