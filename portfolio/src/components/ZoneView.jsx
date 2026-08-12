import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ZoneView({ onClose, children }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full"
    >
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-[#030303]/80 backdrop-blur-md border border-white/20 text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
        aria-label="Voltar ao mapa"
      >
        <X size={20} />
      </button>
      <div className="fixed top-6 left-6 z-[60] text-[10px] font-mono text-gray-400 border border-white/10 bg-[#030303]/70 backdrop-blur-md rounded px-2 py-1 pointer-events-none">
        ESC pra voltar
      </div>
      {children}
    </motion.div>
  );
}