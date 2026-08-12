import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Fingerprint, MapPin, Code2, Crosshair, Cpu, Rocket, User } from 'lucide-react';

const images = [
  { src: '/img1.jpg', alt: 'Gabriel - Visão Imersiva (2026)', label: 'VISÃO IMERSIVA / 2026' },
  { src: '/img2.jpg', alt: 'Gabriel - Arquitetura na Vivo (2025)', label: 'ESTRUTURANDO O FUTURO / 2025' },
  { src: '/img3.jpg', alt: 'Gabriel - Base em Ciência (2023)', label: 'BASE CIENTÍFICA / 2023' }
];

export default function AboutInteractive() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: 'url("/backnave.png")' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#030303]/90 via-[#030303]/70 to-[#030303]/90 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center">
        <div className="flex items-center justify-between border-b border-[#00E5FF]/30 pb-4 mb-8 relative">
          <div className="flex items-center gap-4">
            <Fingerprint className="text-[#00E5FF] animate-pulse" size={32} />
            <div>
              <h2 className="text-[#00E5FF] font-mono text-sm tracking-[0.3em]">CREW MEMBER #01</h2>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-widest uppercase">
                Identity Card
              </h1>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-xs font-mono text-gray-400">STATUS</div>
            <div className="text-[#00E5FF] font-mono font-bold animate-pulse">ONLINE / ACTIVE</div>
          </div>
          <motion.div 
            className="absolute -bottom-[1px] left-0 h-[2px] bg-[#00E5FF]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 relative group">
            <div className="absolute -inset-2 border border-white/10 bg-[#030303]/50 backdrop-blur-sm z-0">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00E5FF]"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00E5FF]"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00E5FF]"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00E5FF]"></div>
            </div>

            <div className="relative z-10 aspect-[3/4] overflow-hidden bg-black/80 flex items-center justify-center border border-white/5">
              
              <motion.div 
                className="absolute inset-0 w-full h-[2px] bg-[#00E5FF]/50 shadow-[0_0_15px_#00E5FF] z-20 pointer-events-none"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </AnimatePresence>

              <div className="absolute inset-0 flex items-center justify-between p-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={prevImage} className="p-1.5 bg-black/60 border border-white/20 text-white hover:text-[#00E5FF] hover:border-[#00E5FF] backdrop-blur-md transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextImage} className="p-1.5 bg-black/60 border border-white/20 text-white hover:text-[#00E5FF] hover:border-[#00E5FF] backdrop-blur-md transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 p-2 text-center z-30">
                <p className="text-[10px] font-mono text-[#00E5FF] tracking-widest uppercase">
                  {images[currentIndex].label}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-6 font-mono relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#030303]/80 backdrop-blur-sm border border-white/10 p-4 hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-2 tracking-widest">
                  <User size={12} /> NOME
                </div>
                <div className="text-xl text-white font-bold tracking-wider">GABRIEL BELONI</div>
                <div className="text-xs text-[#00E5FF] mt-1">Full-Stack Developer</div>
              </div>

              <div className="bg-[#030303]/80 backdrop-blur-sm border border-white/10 p-4 hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-2 tracking-widest">
                  <Code2 size={12} /> ROLE
                </div>
                <div className="text-sm text-white uppercase">Computer Science Student</div>
                <div className="text-xs text-gray-400 mt-1">PUC Minas</div>
              </div>

              <div className="bg-[#030303]/80 backdrop-blur-sm border border-white/10 p-4 hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-2 tracking-widest">
                  <Cpu size={12} /> SPECIALTY
                </div>
                <div className="text-sm text-white uppercase">Software Development</div>
                <div className="text-xs text-gray-400 mt-1">Immersive UI & 3D Web</div>
              </div>

              <div className="bg-[#030303]/80 backdrop-blur-sm border border-white/10 p-4 hover:border-[#00E5FF]/50 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-2 tracking-widest">
                  <MapPin size={12} /> BASED IN
                </div>
                <div className="text-sm text-white uppercase">Belo Horizonte, MG</div>
                <div className="text-xs text-[#00E5FF] mt-1">Brazil // Earth</div>
              </div>
            </div>

            <div className="bg-[#030303]/80 backdrop-blur-sm border border-white/10 p-4 hover:border-[#00E5FF]/50 transition-colors">
              <div className="flex items-center gap-2 text-gray-400 text-[10px] mb-2 tracking-widest">
                <Crosshair size={12} /> INTERESTS
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                <span className="bg-white/5 px-2 py-1 border border-white/10">Technology</span>
                <span className="bg-white/5 px-2 py-1 border border-white/10">Games</span>
                <span className="bg-white/5 px-2 py-1 border border-white/10">Motorcycles</span>
                <span className="bg-white/5 px-2 py-1 border border-white/10">Astrophotography</span>
                <span className="bg-white/5 px-2 py-1 border border-white/10">Volleyball</span>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-sm border border-[#00E5FF]/30 p-4 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              <div className="flex items-center gap-2 text-[#00E5FF] text-[10px] mb-2 tracking-widest animate-pulse">
                <Rocket size={12} /> CURRENT MISSION
              </div>
              <p className="text-sm text-white uppercase tracking-wider">
                Building the next thing.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}