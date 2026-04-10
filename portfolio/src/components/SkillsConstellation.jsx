import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, Html, OrbitControls } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';

const skillsData = [
  { id: 0, name: 'React', pos: [-2.5, 1, 1.5] },
  { id: 1, name: 'Next.js', pos: [-3.5, 0, 0] },
  { id: 2, name: 'TypeScript', pos: [-2, -1.5, 1] },
  { id: 3, name: 'JavaScript', pos: [-1, 0, 2] },
  { id: 4, name: 'Node.js', pos: [1, 1.5, 1] },
  { id: 5, name: 'Python', pos: [2.5, 2, -1] },
  { id: 6, name: 'Java', pos: [3.5, 0, -2] },
  { id: 7, name: 'SQL', pos: [1, -2, 0.5] },
  { id: 8, name: 'AWS', pos: [0, 2.5, -1.5] },
  { id: 9, name: 'Docker', pos: [0.5, 0, -2.5] },
  { id: 10, name: 'C', pos: [-1.5, -2, -2] },
  { id: 11, name: 'C++', pos: [-2.5, -1, -3] },
  { id: 12, name: 'C#', pos: [2, -1.5, -2] },
  { id: 13, name: 'Design Web', pos: [-4, 2, -1] },
];

const connections = [
  [0, 1], [0, 3], [3, 2], [0, 2], [13, 0], [13, 1], 
  [3, 4], [4, 5], [4, 7], [5, 6],                  
  [4, 8], [8, 9], [4, 9],                           
  [10, 11], [11, 12], [6, 12], [10, 6],           
  [9, 2], [7, 10], [5, 8]
];

function StarNode({ position, name }) {
  const [hovered, setHover] = useState(false);

  const handleOver = (e) => {
    e.stopPropagation();
    setHover(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handleOut = () => {
    setHover(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={position}>
      
      <mesh onPointerOver={handleOver} onPointerOut={handleOut}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      <Sphere args={[hovered ? 0.2 : 0.1, 32, 32]}>
        <meshBasicMaterial color="#ffffff" />
      </Sphere>

      {hovered && (
        <Sphere args={[0.4, 32, 32]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </Sphere>
      )}

      <Html distanceFactor={12} center zIndexRange={[100, 0]}>
        <div 
          className={`font-mono font-bold whitespace-nowrap transition-all duration-300 pointer-events-none px-2 py-1 rounded
          ${hovered 
            ? 'text-white scale-150 drop-shadow-[0_0_15px_rgba(255,255,255,1)] opacity-100 bg-white/10 backdrop-blur-sm border border-white/30' 
            : 'text-white/40 scale-100 opacity-60 text-xs'}`}
        >
          {name}
        </div>
      </Html>
    </group>
  );
}

function ConstellationGroup() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map(([start, end], i) => (
        <Line
          key={`line-${i}`}
          points={[skillsData[start].pos, skillsData[end].pos]}
          color="rgba(255, 255, 255, 0.2)"
          lineWidth={1}
          transparent
        />
      ))}

      {skillsData.map((skill) => (
        <StarNode key={skill.id} position={skill.pos} name={skill.name} />
      ))}
    </group>
  );
}

export default function SkillsConstellation() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 50]); 

  return (
    <section ref={containerRef} className="relative h-[150vh] w-full bg-black">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-screen h-screen object-cover z-0 opacity-40 mix-blend-screen scale-[1.1]"
        >
          <source src="/galaxia.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#010314] via-purple-900/10 to-[#010314] pointer-events-none" />
        
        <motion.div 
          style={{ opacity, scale, y }} 
          className="absolute inset-0 z-10 w-full h-full origin-center flex flex-col pointer-events-none"
        >
          
          <div className="pt-32 flex flex-col items-center text-center">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#00E5FF] font-mono text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]"
            >
              /// Mapa de Conhecimento
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white"
            >
              Minhas <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white">Skills</span>
            </motion.h3>
            <p className="text-gray-400 mt-4 font-mono text-sm max-w-md">
              Arraste o espaço para girar. Aponte para as estrelas para revelar as tecnologias.
            </p>
          </div>

          <div className="flex-grow w-full relative cursor-grab active:cursor-grabbing pointer-events-auto">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <ambientLight intensity={1} />
              <ConstellationGroup />
              <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />
            </Canvas>
          </div>
          
        </motion.div>

      </div>
    </section>
  );
}