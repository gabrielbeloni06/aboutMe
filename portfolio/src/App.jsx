import React, { useRef } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlackHoleBackground from './components/BlackHoleBackground';
import ProjectSection from './components/ProjectSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacityHole = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <ReactLenis root>
      <main ref={containerRef} className="bg-black text-white relative">
        <motion.div 
          style={{ opacity: opacityHole }} 
          className="fixed inset-0 z-0 h-screen w-full pointer-events-none"
        >
           <BlackHoleBackground />
        </motion.div>

        <div className="relative z-10">
          <section className="h-screen flex flex-col items-center justify-center relative px-4">
              <div className="z-10 text-center mix-blend-difference flex flex-col items-center">
                  <h1 className="text-[10vw] md:text-[8vw] font-bold leading-[0.8] tracking-tighter text-white uppercase text-center">
                      Gabriel Beloni
                  </h1>
                  <div className="flex items-center gap-4 mt-6 md:mt-4">
                    <span className="h-[1px] w-12 bg-white/50 hidden md:block"></span>
                    <h2 className="text-xl md:text-3xl font-light tracking-[0.4em] text-gray-300 uppercase">
                        Portfolio
                    </h2>
                    <span className="h-[1px] w-12 bg-white/50 hidden md:block"></span>
                  </div>
              </div>
          </section>
          <div className="relative z-20 border-t border-white/5">
             <ProjectSection />
          </div>
          <AboutSection />
          <Footer />

        </div>
      </main>
    </ReactLenis>
  );
}