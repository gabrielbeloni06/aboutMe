import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stars, OrbitControls, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Plus, Minus } from 'lucide-react';
import shadow from '../assets/img/shadowlevel.png';
import mylist from '../assets/img/mylistit.png';
import razer from '../assets/img/razerweb.png';
import skynex from '../assets/img/skynex.png';

const projects = [
  { id: 1, title: "ShadowLevel", category: "IA / Python", year: "2025", img: shadow, demo: "#", github: "#", radius: 3.5, speed: 0.15, size: 0.55, color: "#00E5FF" },
  { id: 2, title: "MyListIt", category: "React / Node", year: "2024", img: mylist, demo: "#", github: "#", radius: 5, speed: 0.1, size: 0.65, color: "#0088FF" },
  { id: 3, title: "RazerWeb", category: "E-Commerce", year: "2024", img: razer, demo: "#", github: "#", radius: 6.5, speed: 0.07, size: 0.5, color: "#8B5CF6" },
  { id: 4, title: "Skynex", category: "Three.js", year: "2026", img: skynex, demo: "#", github: "#", radius: 8, speed: 0.05, size: 0.7, color: "#EC4899" },
];

function OrbitPath({ radius }) {
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    points.push(Math.cos(a) * radius, 0, Math.sin(a) * radius);
  }
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={new Float32Array(points)} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </line>
  );
}

function Planet({ project, onSelect, isSelected }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const angle = useRef(Math.random() * Math.PI * 2);
  const texture = useTexture(project.img);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    angle.current += delta * project.speed;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle.current) * project.radius;
      groupRef.current.position.z = Math.sin(angle.current) * project.radius;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={() => onSelect(project)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isSelected || hovered ? 1.25 : 1}
      >
        <sphereGeometry args={[project.size, 48, 48]} />
        <meshStandardMaterial map={texture} emissive={project.color} emissiveIntensity={0.15} roughness={0.6} />
      </mesh>
      <mesh scale={1.4}>
        <sphereGeometry args={[project.size, 32, 32]} />
        <meshBasicMaterial color={project.color} transparent opacity={hovered || isSelected ? 0.15 : 0} side={2} />
      </mesh>
      <Html distanceFactor={11} center zIndexRange={[100, 0]}>
        <button
          onClick={() => onSelect(project)}
          className="whitespace-nowrap text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-sm border border-white/20 px-2 py-1 rounded-full mt-8 hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors pointer-events-auto"
        >
          {project.title}
        </button>
      </Html>
    </group>
  );
}

function Sun() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh scale={1.6}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.12} side={2} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffffff" distance={30} />
    </group>
  );
}

function Scene({ selected, setSelected }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <Sun />
      {projects.map((p) => (
        <React.Fragment key={p.id}>
          <OrbitPath radius={p.radius} />
          <Suspense fallback={null}>
            <Planet project={p} onSelect={setSelected} isSelected={selected?.id === p.id} />
          </Suspense>
        </React.Fragment>
      ))}
    </>
  );
}

export default function ProjectsInteractive() {
  const [selected, setSelected] = useState(null);
  const controlsRef = useRef(null);

  const handleZoom = (direction) => {
    const controls = controlsRef.current;
    if (!controls) return;
    if (direction === 'in') controls.dollyIn(1.15);
    else controls.dollyOut(1.15);
    controls.update();
  };

  return (
    <section id="projects" className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute top-24 left-6 md:left-12 z-20 pointer-events-none">
        <h2 className="text-[#00E5FF] font-mono text-sm tracking-[0.3em] uppercase mb-2">
          /// Sistema de Projetos
        </h2>
        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
          Órbita <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">Criativa</span>
        </h3>
        <p className="text-gray-400 mt-2 font-mono text-xs max-w-xs">
          Clique em qualquer planeta pra abrir o projeto.
        </p>
      </div>

      <Canvas camera={{ position: [0, 8, 16], fov: 50 }}>
        <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
        <Scene selected={selected} setSelected={setSelected} />
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          minDistance={6}
          maxDistance={26}
          rotateSpeed={0.5}
        />
      </Canvas>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={() => handleZoom('in')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#030303]/70 backdrop-blur-md border border-white/10 text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
          aria-label="Aproximar"
        >
          <Plus size={18} />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#030303]/70 backdrop-blur-md border border-white/10 text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
          aria-label="Afastar"
        >
          <Minus size={18} />
        </button>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute top-0 right-0 h-full w-full md:w-96 bg-[#030303]/95 backdrop-blur-md border-l border-white/10 z-30 p-8 flex flex-col"
          >
            <button onClick={() => setSelected(null)} className="self-end text-gray-400 hover:text-white mb-6">
              <X size={20} />
            </button>
            <img src={selected.img} alt={selected.title} className="w-full h-48 object-cover rounded-xl mb-6" />
            <h4 className="text-3xl font-bold text-white mb-2 uppercase">{selected.title}</h4>
            <p className="text-[#00E5FF] font-mono text-xs uppercase tracking-widest mb-6">
              {selected.category} · {selected.year}
            </p>
            <div className="flex gap-3 mt-auto">
              <a href={selected.demo} className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black text-sm font-bold uppercase hover:bg-[#00E5FF] transition-colors">
                <ExternalLink size={16} /> Demo
              </a>
              <a href={selected.github} className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 text-white text-sm font-bold uppercase hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors">
                <Github size={16} /> Code
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}