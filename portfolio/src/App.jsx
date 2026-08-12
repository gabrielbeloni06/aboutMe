import React, { useRef, useState } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import GalaxyBackground from './components/GalaxyBackground';
import TimelineSection from './components/TimelineSection';
import HubSection from './components/HubSection';
import ZoneView from './components/ZoneView';
import RocketTimeline from './components/RocketTimeline';
import MissionLog from './components/MissionLog';
import AboutSection from './components/AboutSection';
import AboutInteractive from './components/AboutInteractive';
import ExperienceSection from './components/ExperienceSection';
import ProjectSection from './components/ProjectSection';
import ProjectsInteractive from './components/ProjectsInteractive';
import SkillsConstellation from './components/SkillsConstellation';
import BlackHoleSkills from './components/BlackHoleSkills';
import EarthSection from './components/EarthSection';
import NavigationMenu from './components/NavigationMenu';
import ModeToggle from './components/ModeToggle';

function NormalHero({ containerRef }) {
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
    <main ref={containerRef} className="bg-[#030303] text-white relative h-[500vh]">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <GalaxyBackground scrollYProgress={scrollYProgress} />
      </div>

      <div id="hero" className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

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

        <motion.div
          id="about"
          style={{ opacity: opacityAbout, y: yAbout }}
          className="absolute z-20 w-full h-full flex items-center justify-center pointer-events-auto"
        >
          <AboutSection />
        </motion.div>

      </div>
    </main>
  );
}
const zoneComponents = {
  about: <AboutInteractive />,
  projects: <ProjectsInteractive />,
  skills: <BlackHoleSkills />,
  earth: <EarthSection />,
  experience: (
    <>
      <RocketTimeline />
      <MissionLog />
    </>
  ),
};

function InteractiveMode({ zone, setZone }) {
  return (
    <AnimatePresence mode="wait">
      {zone === null ? (
        <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <HubSection onEnterZone={setZone} />
        </motion.div>
      ) : (
        <ZoneView key={zone} onClose={() => setZone(null)}>
          {zoneComponents[zone]}
        </ZoneView>
      )}
    </AnimatePresence>
  );
}

function AppContent() {
  const containerRef = useRef(null);
  const [mode, setMode] = useState('normal');
  const [zone, setZone] = useState(null);
  const isInteractive = mode === 'interactive';
  const lenis = useLenis();

  const handleModeChange = (newMode) => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    setZone(null);
    setMode(newMode);
  };
  const showTopUI = !isInteractive || zone === null;

  return (
    <>
      {showTopUI && <NavigationMenu isInteractive={isInteractive} />}
      {showTopUI && <ModeToggle mode={mode} setMode={handleModeChange} />}

      {isInteractive ? (
        <InteractiveMode zone={zone} setZone={setZone} />
      ) : (
        <>
          <NormalHero containerRef={containerRef} />
          <ExperienceSection />
          <div id="projects" className="relative z-30">
            <ProjectSection />
          </div>
          <div id="skills" className="relative z-30">
            <SkillsConstellation />
          </div>
          <div id="earth">
            <EarthSection />
          </div>
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <ReactLenis root>
      <AppContent />
    </ReactLenis>
  );
}