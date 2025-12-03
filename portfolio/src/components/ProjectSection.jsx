import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import back2 from '../assets/img/background2.jpg';
import shadow from '../assets/img/shadowlevel.png';
import mylist from '../assets/img/mylistit.png';
import razer from '../assets/img/razerweb.png';
import skynex from '../assets/img/skynex.png';

const projects = [
  { id: 1, title: "ShadowLevel", category: "AI", img:shadow},
  { id: 2, title: "MyListIt", category: "MUSIC", img: mylist },
  { id: 3, title: "RazerWeb", category: "ECOMMERCE", img: razer},
  { id: 4, title: "Skynex", category: "3D", img: skynex },
];

export default function ProjectSection() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section className="min-h-screen flex items-center justify-center p-8 md:p-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
            src={back2}
            alt="Background Texture" 
            className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-lg border border-white/10 shadow-2xl group">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeProject.id}
              src={activeProject.img}
              alt={activeProject.title}
              initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent w-full">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mix-blend-overlay opacity-80">
              {activeProject.title}
            </h2>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
            <div className="flex justify-between text-xs text-gray-400 uppercase border-b border-gray-800 pb-4 mb-8 tracking-widest">
                <span>Meus Projetos</span>
                <span>2024 — 2025</span>
            </div>
            
            {projects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProject(project)}
                className="group cursor-pointer flex justify-between items-end py-6 border-b border-gray-900 hover:border-white/50 transition-colors duration-300"
              >
                <div className="flex items-center gap-6">
                    <span 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeProject.id === project.id ? 'bg-blue-500 scale-125' : 'bg-gray-800 group-hover:bg-white'
                        }`} 
                    />
                    <span 
                        className={`text-2xl md:text-4xl font-light uppercase tracking-widest transition-all duration-300 ${
                            activeProject.id === project.id ? 'text-white translate-x-2' : 'text-gray-600 group-hover:text-gray-200'
                        }`}
                    >
                    {project.title}
                    </span>
                </div>
                <span className="text-xs font-mono text-gray-700 group-hover:text-gray-400">
                  {project.category}
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}