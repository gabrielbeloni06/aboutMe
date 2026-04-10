import React, { useRef } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import GalaxyBackground from './components/GalaxyBackground'; 
import TimelineSection from './components/TimelineSection';
import AboutSection from './components/AboutSection';
import ProjectSection from './components/ProjectSection'; 
import SkillsConstellation from './components/SkillsConstellation';
import Footer from './components/Footer';
import EarthSection from './components/EarthSection';

export default function App() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacityTitle = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleTitle = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);
  const yTitle = useTransform(scrollYProgress, [0, 0.15], [0, -150]);

  const opacityAbout = useTransform(scrollYProgress, [0.8, 0.9, 0.98, 1.0], [0, 1, 1, 0]);
  const yAbout = useTransform(scrollYProgress, [0.8, 0.9], [50, 0]);

  return (
    <ReactLenis root>
      <main ref={containerRef} className="bg-[#030303] text-white relative h-[500vh]">
        
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GalaxyBackground scrollYProgress={scrollYProgress} />
        </div>

        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          <motion.div 
            style={{ opacity: opacityTitle, scale: scaleTitle, y: yTitle }} 
            className="absolute z-10 text-center mix-blend-difference flex flex-col items-center"
          >
            <h1 className="text-[10vw] md:text-[8vw] font-bold leading-[0.8] tracking-tighter text-white uppercase text-center drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Gabriel Beloni
            </h1>
            <div className="flex items-center gap-4 mt-6 md:mt-4">
              <span className="h-[1px] w-12 bg-white/50 hidden md:block"></span>
              <h2 className="text-xl md:text-3xl font-light tracking-[0.4em] text-[#00E5FF] uppercase">
                Portfolio
              </h2>
              <span className="h-[1px] w-12 bg-white/50 hidden md:block"></span>
            </div>
          </motion.div>

          <TimelineSection scrollYProgress={scrollYProgress} />

          <motion.div style={{ opacity: opacityAbout, y: yAbout }} className="absolute z-20 w-full h-full flex items-center justify-center pointer-events-auto">
             <AboutSection />
          </motion.div>

        </div>
      </main>
      
      <div className="relative z-30">
          <ProjectSection />
          <SkillsConstellation />
      </div>
      <div>
        <EarthSection />
      </div>
    </ReactLenis>
  );
}