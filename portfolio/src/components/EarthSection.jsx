import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture, Stars } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Linkedin, Github, Send, MapPin, GraduationCap } from 'lucide-react';

function getCoordinates(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

function SimpleEarth() {
  const earthRef = useRef();
  const colorMap = useTexture('/earth_color.jpg');
  const bhPosition = getCoordinates(-19.9167, -43.9345, 2.02);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} />
      <mesh ref={earthRef} rotation={[0.2, -0.8, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={colorMap} />
        <Html position={bhPosition} center distanceFactor={10} zIndexRange={[100, 0]}>
          <div className="relative flex items-center justify-center pointer-events-none">
            <div className="absolute w-8 h-8 bg-[#00E5FF] rounded-full animate-ping opacity-70" />
            <div className="relative w-2 h-2 bg-[#00E5FF] rounded-full shadow-[0_0_10px_#00E5FF]" />
            <div className="absolute left-6 top-[-10px] bg-[#030303]/80 backdrop-blur-sm border border-[#00E5FF]/40 px-3 py-1 rounded text-xs font-mono text-white whitespace-nowrap drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]">
              &gt; ALVO: BELO HORIZONTE, MG
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

const glassCard = "bg-[#030303]/70 backdrop-blur-xl border border-[#00E5FF]/25 rounded-xl shadow-[0_0_25px_rgba(0,229,255,0.1)]";

function ContactLinks() {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <a href="mailto:seuemail@exemplo.com" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#00E5FF] transition-colors font-mono">
        <Mail size={16} className="text-[#00E5FF]" />
        <span>Email</span>
      </a>
      <a href="https://www.linkedin.com/in/devgabrielbeloni" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#00E5FF] transition-colors font-mono">
        <Linkedin size={16} className="text-[#00E5FF]" />
        <span>LinkedIn</span>
      </a>
      <a href="https://github.com/gabrielbeloni06" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#00E5FF] transition-colors font-mono">
        <Github size={16} className="text-[#00E5FF]" />
        <span>GitHub</span>
      </a>
    </div>
  );
}

function SendButton({ className }) {
  return (
    <a href="mailto:seuemail@exemplo.com" className={className}>
      <Send size={14} />
      <span>Send a Message</span>
    </a>
  );
}

function FrontPanel({ scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0.4, 0.58], [0, 1]);
  const y = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-30 flex items-center justify-center md:justify-end px-6 md:pr-16 pointer-events-none"
    >
      <div className={"w-full max-w-sm p-8 pointer-events-auto " + glassCard}>
        <span className="text-[#00E5FF] font-mono text-xs tracking-[0.4em] uppercase">Earth</span>
        <div className="h-px w-full bg-gradient-to-r from-[#00E5FF]/60 to-transparent my-3" />
        <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-1">Get in Touch</h4>
        <p className="text-sm text-gray-400 font-mono leading-relaxed mb-6">
          Have a project in mind? Let's make it happen.
        </p>
        <ContactLinks />
        <SendButton className="flex items-center justify-center gap-2 w-full py-3 bg-[#00E5FF] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-lg mb-6" />
        <div className="h-px w-full bg-white/10 mb-4" />
        <div className="text-xs font-mono text-gray-500 space-y-1">
          <p>Belo Horizonte, Brazil</p>
          <p>PUC Minas — Ciência da Computação</p>
        </div>
      </div>
    </motion.div>
  );
}

function OrbitCard({ positionClass, delay, scrollYProgress, children }) {
  const start = 0.42 + delay;
  const end = 0.56 + delay;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.85, 1]);

  return (
    <motion.div style={{ opacity, scale }} className={"absolute z-30 pointer-events-auto " + positionClass}>
      {children}
    </motion.div>
  );
}

function OrbitPanel({ scrollYProgress }) {
  return (
    <>
      <OrbitCard positionClass="top-28 left-4 md:left-10 w-44" delay={0} scrollYProgress={scrollYProgress}>
        <a href="mailto:seuemail@exemplo.com" className={"flex items-center gap-2 px-4 py-3 text-xs font-mono text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/60 transition-colors " + glassCard}>
          <Mail size={15} className="text-[#00E5FF] shrink-0" />
          <span>Email</span>
        </a>
      </OrbitCard>

      <OrbitCard positionClass="top-28 right-4 md:right-10 w-44" delay={0.03} scrollYProgress={scrollYProgress}>
        <a href="https://www.linkedin.com/in/devgabrielbeloni" target="_blank" rel="noreferrer" className={"flex items-center gap-2 px-4 py-3 text-xs font-mono text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/60 transition-colors " + glassCard}>
          <Linkedin size={15} className="text-[#00E5FF] shrink-0" />
          <span>LinkedIn</span>
        </a>
      </OrbitCard>

      <OrbitCard positionClass="bottom-32 left-4 md:left-10 w-44" delay={0.06} scrollYProgress={scrollYProgress}>
        <a href="https://github.com/gabrielbeloni06" target="_blank" rel="noreferrer" className={"flex items-center gap-2 px-4 py-3 text-xs font-mono text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/60 transition-colors " + glassCard}>
          <Github size={15} className="text-[#00E5FF] shrink-0" />
          <span>GitHub</span>
        </a>
      </OrbitCard>

      <OrbitCard positionClass="bottom-32 right-4 md:right-10 w-52" delay={0.09} scrollYProgress={scrollYProgress}>
        <div className={"px-4 py-3 text-xs font-mono text-gray-400 space-y-1.5 " + glassCard}>
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-[#00E5FF] shrink-0" />
            <span>Belo Horizonte, Brazil</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap size={13} className="text-[#00E5FF] shrink-0" />
            <span>PUC Minas — Ciência da Computação</span>
          </div>
        </div>
      </OrbitCard>

      <OrbitCard positionClass="bottom-16 left-1/2 -translate-x-1/2 w-52" delay={0.12} scrollYProgress={scrollYProgress}>
        <SendButton className="flex items-center justify-center gap-2 w-full py-3 bg-[#00E5FF] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-lg" />
      </OrbitCard>
    </>
  );
}

export default function EarthSection({ variant = 'orbit' }) {
  const containerRef = useRef(null);
  const isFront = variant === 'front';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.25], [100, 0]);

const frontGlobeOpacity = useTransform(scrollYProgress, [0.4, 0.58], [1, 0.3]);
const frontGlobeScale = useTransform(scrollYProgress, [0.4, 0.6], [1, 0.8]);
const frontGlobeShiftX = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "-20%"]);

const globeStyle = isFront
  ? { opacity: frontGlobeOpacity, scale: frontGlobeScale, x: frontGlobeShiftX }
  : {};

  return (
    <section ref={containerRef} className="relative h-[280vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 z-10 w-full h-full flex flex-col"
        >
          <div className="absolute top-20 left-6 md:left-12 z-20 pointer-events-none">
            <h2 className="text-[#00E5FF] font-mono text-sm tracking-[0.3em] uppercase mb-2 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
              /// Localização Atual
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
              Planeta <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">Terra</span>
            </h3>
          </div>

          <motion.div style={globeStyle} className="flex-grow w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ width: '100%', height: '100%' }}>
              <Suspense fallback={null}>
                <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
                <SimpleEarth />
              </Suspense>
              <OrbitControls enablePan={false} enableZoom={true} minDistance={2.5} maxDistance={8} autoRotate={false} />
            </Canvas>
          </motion.div>

          <div className="absolute bottom-6 w-full text-center text-[10px] text-gray-600 font-mono tracking-widest uppercase z-20 pointer-events-none">
            © 2026 Gabriel Beloni // Portfólio.
          </div>
        </motion.div>

        {isFront && <FrontPanel scrollYProgress={scrollYProgress} />}
        {!isFront && <OrbitPanel scrollYProgress={scrollYProgress} />}

      </div>
    </section>
  );
}