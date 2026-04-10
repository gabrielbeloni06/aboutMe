import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import BlueGalaxyBackground from './BlueGalaxyBackground';
import shadow from '../assets/img/shadowlevel.png';
import mylist from '../assets/img/mylistit.png';
import razer from '../assets/img/razerweb.png';
import skynex from '../assets/img/skynex.png';

const projects = [
  { id: 1, title: "ShadowLevel", category: "IA / Python", year: "2025", img: shadow, demo: "#", github: "#", layout: "col-span-1 md:col-span-6 mt-0" },
  { id: 2, title: "MyListIt", category: "React / Node", year: "2024", img: mylist, demo: "#", github: "#", layout: "col-span-1 md:col-span-5 md:mt-32" },
  { id: 3, title: "RazerWeb", category: "E-Commerce", year: "2024", img: razer, demo: "#", github: "#", layout: "col-span-1 md:col-span-5 mt-12" },
  { id: 4, title: "Skynex", category: "Three.js", year: "2026", img: skynex, demo: "#", github: "#", layout: "col-span-1 md:col-span-6 md:-mt-20" },
];

export default function ProjectSection() {
  return (
    <section className="relative min-h-screen py-32 w-full overflow-hidden bg-[#010314]">
      
      <BlueGalaxyBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        
        <div className="flex flex-col mb-24 border-b border-[#0088FF]/20 pb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[#00E5FF] font-mono text-xl tracking-[0.3em] uppercase mb-2 drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]"
          >
            /// Arquivo de Projetos
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-[9rem] font-black uppercase tracking-tighter text-white leading-none"
          >
            MEUS <br/> PROJETOS
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-11 gap-x-8 gap-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`${project.layout} group relative flex flex-col bg-[#030303]/40 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-[#0088FF] transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,136,255,0.2)]`}
            >
              <div className="relative h-80 md:h-[400px] w-full overflow-hidden p-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-[#010314] via-transparent to-transparent z-10 opacity-90" />
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover rounded-xl filter grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 z-0"
                />
                
                <div className="absolute bottom-4 right-4 z-20 bg-[#00E5FF] text-black text-xs font-black px-3 py-1 font-mono uppercase">
                  {project.category} <span className="ml-2 bg-black text-[#00E5FF] px-1">{project.year}</span>
                </div>
              </div>

              <div className="p-8 relative z-20 flex flex-col flex-grow bg-gradient-to-b from-transparent to-[#010314]">
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-tight group-hover:text-[#00E5FF] transition-colors">
                  {project.title}
                </h4>
                
                <div className="flex items-center gap-4 mt-auto">
                  <a href={project.demo} className="flex items-center justify-center gap-2 flex-1 py-3 text-sm font-bold uppercase tracking-widest bg-white text-black hover:bg-[#00E5FF] hover:text-black transition-all duration-300">
                    <ExternalLink size={16} /> Demo
                  </a>
                  <a href={project.github} className="flex items-center justify-center gap-2 flex-1 py-3 text-sm font-bold uppercase tracking-widest border border-white/20 text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all duration-300">
                    <Github size={16} /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}