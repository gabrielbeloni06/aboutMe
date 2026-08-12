import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function ModeToggle({ mode, setMode }) {
  const isInteractive = mode === 'interactive';

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 pointer-events-auto">
      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 hidden md:block">
        {isInteractive ? 'Modo Interativo' : 'Modo Padrão'}
      </span>

      <button
        onClick={() => setMode(isInteractive ? 'normal' : 'interactive')}
        className="relative w-16 h-8 rounded-full border border-white/10 bg-[#030303]/70 backdrop-blur-md flex items-center px-1"
      >
        <motion.div
          animate={{ x: isInteractive ? 32 : 0 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
          className="w-6 h-6 rounded-full bg-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.8)] flex items-center justify-center"
        >
          <Sparkles size={12} className="text-black" />
        </motion.div>
      </button>
    </div>
  );
}