import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Instagram } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 md:p-12 overflow-y-auto md:overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 w-full max-w-7xl mx-auto items-center py-10">
        
        <div className="md:col-span-5 flex flex-col justify-center text-left space-y-8 h-full">
          <div>
            <h2 className="text-sm font-mono text-[#00E5FF] tracking-widest uppercase mb-3 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">
              QUEM SOU EU
            </h2>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
              GABRIEL BELONI
            </h1>
          </div>
          
          <p className="text-sm md:text-lg text-gray-300 font-mono leading-relaxed bg-[#030303]/80 p-6 border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            EU SOU UM DESENVOLVEDOR E CRIADOR MOVIDO PELA INTERSECÇÃO ENTRE A LÓGICA COMPUTACIONAL E A EXPERIÊNCIA IMERSIVA. MINHA JORNADA COMEÇOU NO INÍCIO DE 2023, ONDE OS PRIMEIROS CÓDIGOS ACENDERAM UMA PAIXÃO QUE ME GUIA ATÉ HOJE.
          </p>

          <div className="flex flex-col gap-4 pt-4">
            <span className="text-xs text-[#00E5FF] uppercase tracking-widest opacity-70">Conexões</span>
            
            <a href="https://www.linkedin.com/in/devgabrielbeloni" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-lg text-gray-300 hover:text-[#00E5FF] transition-colors group w-max">
              <Linkedin size={20} /> LinkedIn 
              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300"/>
            </a>
            
            <a href="https://github.com/gabrielbeloni06" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-lg text-gray-300 hover:text-[#00E5FF] transition-colors group w-max">
              <Github size={20} /> GitHub 
              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300"/>
            </a>
            
            <a href="https://www.instagram.com/gabrielbeloni_" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-lg text-gray-300 hover:text-[#00E5FF] transition-colors group w-max">
              <Instagram size={20} /> Instagram 
              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300"/>
            </a>
          </div>
        </div>

        <div className="md:col-span-7 relative grid grid-cols-2 gap-6 items-center mt-12 md:mt-0">
          
          <div className="relative col-start-2 row-start-1 flex items-end">
            <img 
              src="/img1.jpg" 
              alt="Gabriel - Visão Imersiva (2026)" 
              className="w-full h-72 md:h-[350px] object-cover border-2 border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            />
            <div className="absolute -right-4 md:-right-6 top-[65%] bg-[#030303] p-4 text-xs font-mono border border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.6)] w-60 z-20">
                <span className="text-[#00E5FF] font-bold">DESENVOLVEDOR</span> - Criando experiências que transportam o usuário.
            </div>
            <p className="absolute bottom-2 left-2 text-[10px] text-white/50 font-mono drop-shadow-md bg-black/40 px-1">
              Gabriel, confident, look from era 2026
            </p>
          </div>

          <div className="relative col-start-1 row-start-2 -mt-10 z-10 flex flex-col items-center">
            <img 
              src="/img2.jpg" 
              alt="Gabriel - Arquitetura na Vivo (2025)" 
              className="w-full h-80 md:h-[400px] object-cover border border-purple-600/60 shadow-[0_0_20px_rgba(147,51,234,0.2)]"
            />
            <div className="absolute -left-6 md:-left-10 bottom-[20%] bg-[#030303] p-4 text-xs font-mono border border-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)] w-56 z-20">
                <span className="text-purple-400 font-bold">ESTRUTURANDO O FUTURO</span> - Da base em Ciência da Computação à otimização na Vivo.
            </div>
            <p className="absolute bottom-2 right-2 text-[10px] text-white/50 font-mono drop-shadow-md bg-black/40 px-1">
              Gabriel, focused on data, look from era 2025/Vivo
            </p>
          </div>

          <div className="relative col-start-2 row-start-3 -mt-16 flex items-start">
             <img 
              src="/img3.jpg" 
              alt="Gabriel - Base em Ciência (2023)" 
              className="w-full h-48 md:h-[350px] object-cover border border-gray-800 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
            />
            <div className="absolute left-[-20%] top-1/2 -translate-y-1/2 bg-[#030303] p-4 text-xs font-mono border border-gray-700 shadow-[0_0_10px_rgba(0,0,0,0.4)] w-40 z-20">
                <span className="text-gray-400 font-bold">BASE</span> - Onde tudo começou.
            </div>
            <p className="absolute top-2 left-2 text-[10px] text-white/50 font-mono drop-shadow-md bg-black/40 px-1">
              Gabriel, beginning, look from era 2024/2025
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}