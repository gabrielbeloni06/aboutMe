import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useTexture, Stars } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';

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

export default function EarthSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-black">
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

          <div className="flex-grow w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ width: '100%', height: '100%' }}>
              <Suspense fallback={null}>
                <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
                <SimpleEarth />
              </Suspense>
              <OrbitControls enablePan={false} enableZoom={true} minDistance={2.5} maxDistance={8} autoRotate={false} />
            </Canvas>
          </div>

          <div className="absolute bottom-6 w-full text-center text-[10px] text-gray-600 font-mono tracking-widest uppercase z-20 pointer-events-none">
            © 2026 Gabriel Beloni // Portfólio.
          </div>
        </motion.div>

      </div>
    </section>
  );
}