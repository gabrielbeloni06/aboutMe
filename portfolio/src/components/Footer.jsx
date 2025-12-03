import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[60vh]">
        <div>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-[12vw] leading-[0.8] font-bold tracking-tighter mix-blend-difference opacity-80"
           >
             TALK TO ME
           </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-20 border-t border-white/10 pt-10">
           <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Gabriel Beloni</h3>
              <p className="text-gray-500 max-w-sm">
                 Desenvolvedor Full-Stack & Estudante de Ciência da Computação.
              </p>
           </div>
           <div className="flex flex-col gap-4">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Contact</span>
              <a href="#" className="flex items-center gap-2 text-lg hover:text-gray-400 transition-colors group">
                 <Linkedin size={20} /> LinkedIn <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
              </a>
              <a href="#" className="flex items-center gap-2 text-lg hover:text-gray-400 transition-colors group">
                 <Github size={20} /> GitHub <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
              </a>
              <a href="mailto:gabrielbelonibr@gmail.com" className="flex items-center gap-2 text-lg hover:text-gray-400 transition-colors group">
                 <Mail size={20} /> Email <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
              </a>
           </div>
           <div className="flex flex-col gap-4">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Languages</span>
              <div className="flex flex-col gap-2 text-gray-400">
                 <p>Português (Nativo)</p>
                 <p>Inglês (Avançado)</p>
                 <p>Espanhol (Intermediário)</p>
                 <p className="mt-4 text-white">Belo Horizonte, Brasil - 2025</p>
              </div>
           </div>
        </div>
        <div className="mt-20 flex justify-between items-center text-xs text-gray-700 uppercase">
           <span>© 2025 Gabriel Beloni</span>
           <span>Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}