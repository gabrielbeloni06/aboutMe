import React from 'react';
import { motion, useTransform } from 'framer-motion';

const timelineData = [
  { year: "2006", title: "Início", desc: "O início de tudo." },
  { year: "2025", title: "Faculdade", desc: "Meu começo na faculdade de Ciência da Computação." },
  { year: "2025", title: "Primeiras Impressões", desc: "Estágio na Vivo, otimização de software e interfaces de alto nível." },
  { year: "2026", title: "Dev", desc: "Começo da carreira como Desenvolvedor Júnior FullStack" }
];

export default function TimelineSection({ scrollYProgress }) {
  const sectionOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.7, 0.85], [0, 1, 1, 0]);
  
  const scrollStart = 0.2;
  const scrollEnd = 0.6;
  const lineWidth = useTransform(scrollYProgress, [scrollStart, scrollEnd], ["0%", "100%"]);

  return (
    <motion.div 
      style={{ opacity: sectionOpacity }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto pointer-events-auto px-4"
    >
      <div className="absolute top-10 md:top-24 text-center w-full">
        <h2 className="text-sm font-mono text-[#00E5FF] tracking-widest uppercase mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">
          Experiência
        </h2>
        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
          Minha Trajetória
        </h3>
      </div>

      <div className="relative w-full flex items-center h-[400px] mt-32">
        <div className="absolute left-0 right-0 h-[1px] bg-white/10 top-1/2 -translate-y-1/2" />
        
        <motion.div 
          style={{ width: lineWidth }}
          className="absolute left-0 h-[2px] bg-gradient-to-r from-[#00E5FF] to-purple-600 top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(0,229,255,0.5)] origin-left z-0" 
        />

        <div className="relative z-10 w-full flex justify-between items-center">
          {timelineData.map((item, index) => {
            const isTop = index % 2 === 0;
            const positionPercentage = index / (timelineData.length - 1); 
            const triggerPoint = scrollStart + (scrollEnd - scrollStart) * positionPercentage;
            
            const scaleDot = useTransform(scrollYProgress, [triggerPoint, triggerPoint + 0.02], [0, 1]);
            
            const itemOpacity = useTransform(scrollYProgress, [triggerPoint + 0.02, triggerPoint + 0.06], [0, 1]);
            const itemY = useTransform(scrollYProgress, [triggerPoint + 0.02, triggerPoint + 0.06], [isTop ? -20 : 20, 0]);

            return (
              <div key={index} className="relative flex flex-col items-center justify-center w-48 group">
                
                {isTop && (
                  <motion.div 
                    style={{ opacity: itemOpacity, y: itemY }}
                    className="absolute bottom-full mb-1 flex flex-col items-center"
                  >
                    <div className="text-center pb-2">
                      <h4 className="text-4xl font-black text-white drop-shadow-md">{item.year}</h4>
                      <h5 className="text-lg font-bold text-[#00E5FF] mt-1">{item.title}</h5>
                      <p className="text-xs text-gray-400 font-mono mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="w-[1px] bg-[#00E5FF]/40 h-16" />
                  </motion.div>
                )}

                <motion.div 
                  style={{ scale: scaleDot }}
                  className="w-4 h-4 rounded-full bg-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.8)] border-2 border-[#030303] z-20 relative" 
                />

                {!isTop && (
                  <motion.div 
                    style={{ opacity: itemOpacity, y: itemY }}
                    className="absolute top-full mt-1 flex flex-col items-center"
                  >
                    <div className="w-[1px] bg-[#00E5FF]/40 h-16" />
                    <div className="text-center pt-2">
                      <h4 className="text-4xl font-black text-white drop-shadow-md">{item.year}</h4>
                      <h5 className="text-lg font-bold text-[#00E5FF] mt-1">{item.title}</h5>
                      <p className="text-xs text-gray-400 font-mono mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}