import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Stars, Torus } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Rocket, User } from 'lucide-react';
import * as THREE from 'three';

const zones = [
  { id: 'about', label: 'Sobre Mim', desc: 'Quem sou eu', pos: [0, 0, 4], type: 'about' },
  { id: 'projects', label: 'Sistema de Projetos', desc: 'Órbita criativa', pos: [-7, 0, -4], type: 'solar' },
  { id: 'skills', label: 'Horizonte de Skills', desc: 'Buraco negro do conhecimento', pos: [7, 0, -4], type: 'blackhole' },
  { id: 'earth', label: 'Planeta Terra', desc: 'Localização atual', pos: [0, 0, -12], type: 'earth' },
  { id: 'experience', label: 'Constelação de Carreira', desc: 'Experiências profissionais', pos: [-7, 0, 6], type: 'stars' },
];

const BOUNDS = 13;
const REACH = 2.2;

function MiniAbout() {
  const ref = useRef();
  useFrame((s, d) => { if (ref.current) ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.6) * 0.3; });
  return (
    <group ref={ref}>
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.3} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function MiniSolar() {
  const ref = useRef();
  useFrame((s, d) => { if (ref.current) ref.current.rotation.y += d * 0.4; });
  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[0.35, 16, 16]} /><meshBasicMaterial color="#ffffff" /></mesh>
      {[0.8, 1.2, 1.6].map((r, i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
          <mesh position={[r, 0, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshBasicMaterial color={['#00E5FF', '#8B5CF6', '#EC4899'][i]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function MiniBlackHole() {
  const ref = useRef();
  useFrame((s, d) => { if (ref.current) ref.current.rotation.z += d * 0.5; });
  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[0.4, 16, 16]} /><meshBasicMaterial color="#000000" /></mesh>
      <Torus args={[0.9, 0.05, 8, 40]} rotation={[Math.PI / 2.3, 0, 0]}>
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} />
      </Torus>
    </group>
  );
}

function MiniEarth() {
  const ref = useRef();
  useFrame((s, d) => { if (ref.current) ref.current.rotation.y += d * 0.3; });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.7, 24, 24]} />
      <meshStandardMaterial color="#1D4ED8" emissive="#00E5FF" emissiveIntensity={0.15} roughness={0.7} />
    </mesh>
  );
}

function MiniStars() {
  const ref = useRef();
  useFrame((s, d) => { if (ref.current) ref.current.rotation.y += d * 0.2; });
  return (
    <group ref={ref}>
      {[...Array(6)].map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.7, Math.sin(i) * 0.3, Math.sin(a) * 0.7]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        );
      })}
    </group>
  );
}

const zoneIcon = { about: MiniAbout, solar: MiniSolar, blackhole: MiniBlackHole, earth: MiniEarth, stars: MiniStars };

function ZoneMarker({ zone, isNear }) {
  const Icon = zoneIcon[zone.type];
  return (
    <group position={zone.pos}>
      <Icon />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[REACH - 0.05, REACH, 48]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={isNear ? 0.35 : 0.1} side={THREE.DoubleSide} />
      </mesh>
      <Html distanceFactor={13} position={[0, 1.4, 0]} center zIndexRange={[100, 0]}>
        <div className="text-center pointer-events-none">
          <div className="text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-sm border border-white/20 px-2 py-1 rounded-full whitespace-nowrap">
            {zone.label}
          </div>
        </div>
      </Html>
    </group>
  );
}

function Ship({ posRef, angleRef }) {
  const groupRef = useRef();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(posRef.current.x, 0, posRef.current.z);
      groupRef.current.rotation.y = angleRef.current;
    }
  });

  return (
    <group ref={groupRef}>
      <group>
        
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 1.3, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.6} />
        </mesh>

        <mesh position={[0, 0, -0.65]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.25, 0.5, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.13, -0.85]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.08, 0.2, 16]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.8} />
        </mesh>

        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh position={[0.23, 0.1, 0.1]}>
              <boxGeometry args={[0.05, 0.4, 0.5]} />
              <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.6} />
            </mesh>
          </group>
        ))}

        <mesh position={[0, 0.2, -0.1]}>
          <boxGeometry args={[0.1, 0.05, 0.6]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.8} />
        </mesh>

        <mesh position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.4} />
        </mesh>

        <mesh position={[0, -0.05, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.1, 0.5, 8]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, -0.05, 1.0]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.05, 0.3, 8]} />
          <meshBasicMaterial color="#EC4899" transparent opacity={0.6} />
        </mesh>

      </group>

      <pointLight color="#00E5FF" intensity={1.5} distance={5} />
      
      <Html distanceFactor={13} position={[0, 1.5, 0]} center zIndexRange={[100, 0]}>
        <div className="text-center pointer-events-none">
          <div className="text-[10px] font-mono text-[#00E5FF] bg-black/80 border border-[#00E5FF]/40 px-2 py-1 rounded whitespace-nowrap shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            Gabriel Beloni — Dev FullStack
          </div>
        </div>
      </Html>
    </group>
  );
}

function CameraRig({ posRef, zoomRef }) {
  const { camera } = useThree();
  useFrame(() => {
    const targetX = posRef.current.x;
    const targetZ = posRef.current.z + zoomRef.current;
    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.z += (targetZ + 10 - camera.position.z) * 0.06;
    camera.position.y += (zoomRef.current * 0.4 + 7 - camera.position.y) * 0.06;
    camera.lookAt(posRef.current.x, 0, posRef.current.z);
  });
  return null;
}

function MovementController({ posRef, angleRef, keysRef }) {
  useFrame((state, delta) => {
    let dx = 0, dz = 0;
    if (keysRef.current['w'] || keysRef.current['arrowup']) dz -= 1;
    if (keysRef.current['s'] || keysRef.current['arrowdown']) dz += 1;
    if (keysRef.current['a'] || keysRef.current['arrowleft']) dx -= 1;
    if (keysRef.current['d'] || keysRef.current['arrowright']) dx += 1;

    if (dx !== 0 || dz !== 0) {
      const len = Math.hypot(dx, dz);
      dx /= len; dz /= len;
      posRef.current.x = THREE.MathUtils.clamp(posRef.current.x + dx * delta * 5, -BOUNDS, BOUNDS);
      posRef.current.z = THREE.MathUtils.clamp(posRef.current.z + dz * delta * 5, -BOUNDS, BOUNDS);
      angleRef.current = Math.atan2(dx, dz) - Math.PI;
    }
  });
  return null;
}

function Scene({ posRef, angleRef, keysRef, zoomRef, nearZone }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Stars radius={80} depth={40} count={2000} factor={4} fade speed={0.5} />
      <MovementController posRef={posRef} angleRef={angleRef} keysRef={keysRef} />
      <Ship posRef={posRef} angleRef={angleRef} />
      {zones.map((z) => (
        <ZoneMarker key={z.id} zone={z} isNear={nearZone === z.id} />
      ))}
      <CameraRig posRef={posRef} zoomRef={zoomRef} />
    </>
  );
}

export default function HubSection({ onEnterZone }) {
  const posRef = useRef({ x: 0, z: 0 });
  const angleRef = useRef(0);
  const keysRef = useRef({});
  const zoomRef = useRef(10);

  const [zoomTick, setZoomTick] = useState(0);
  const [nearZone, setNearZone] = useState(null);
  const [activePrompt, setActivePrompt] = useState(null);

  useEffect(() => {
    const down = (e) => { keysRef.current[e.key.toLowerCase()] = true; };
    const up = (e) => { keysRef.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const p = posRef.current;
      let found = null;
      for (const z of zones) {
        const dx = p.x - z.pos[0];
        const dz = p.z - z.pos[2];
        if (Math.hypot(dx, dz) < REACH) { found = z.id; break; }
      }
      setNearZone(found);
      setActivePrompt(found ? zones.find((z) => z.id === found) : null);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (activePrompt && (e.key === 'Enter' || e.key.toLowerCase() === 'e')) {
        onEnterZone(activePrompt.id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activePrompt, onEnterZone]);

  const handleZoom = (dir) => {
    zoomRef.current = THREE.MathUtils.clamp(zoomRef.current + (dir === 'in' ? -1.5 : 1.5), 4, 20);
    setZoomTick((t) => t + 1);
  };

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <h2 className="text-[#00E5FF] font-mono text-sm tracking-[0.3em] uppercase mb-2 drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]">
          /// Mapa de Navegação
        </h2>
        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
          Explore o <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00E5FF]">Universo</span>
        </h3>
        <p className="text-gray-400 mt-2 font-mono text-xs">
          WASD ou setas pra mover · Enter perto de um destino pra entrar
        </p>
      </div>

      <Canvas camera={{ position: [0, 7, 10], fov: 55 }}>
        <Scene
          posRef={posRef}
          angleRef={angleRef}
          keysRef={keysRef}
          zoomRef={zoomRef}
          nearZone={nearZone}
          key={zoomTick}
        />
      </Canvas>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button onClick={() => handleZoom('in')} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#030303]/70 backdrop-blur-md border border-white/10 text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors" aria-label="Aproximar">
          <Plus size={18} />
        </button>
        <button onClick={() => handleZoom('out')} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#030303]/70 backdrop-blur-md border border-white/10 text-white hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors" aria-label="Afastar">
          <Minus size={18} />
        </button>
      </div>

        <AnimatePresence>
        {activePrompt && (
            <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => onEnterZone(activePrompt.id)}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3 bg-[#030303]/85 backdrop-blur-md border border-[#00E5FF]/50 rounded-full px-6 py-3 shadow-[0_0_25px_rgba(0,229,255,0.25)] hover:border-[#00E5FF] transition-colors w-max mx-auto"
            >
            {activePrompt.type === 'about' ? <User size={18} className="text-[#00E5FF] shrink-0" /> : <Rocket size={18} className="text-[#00E5FF] shrink-0" />}
            <span className="text-sm font-mono text-white whitespace-nowrap">
                Entrar em <span className="text-[#00E5FF] font-bold">{activePrompt.label}</span>
            </span>
            <span className="text-[10px] font-mono text-gray-400 border border-white/20 rounded px-1.5 py-0.5 shrink-0">ENTER</span>
            </motion.button>
        )}
        </AnimatePresence>
    </section>
  );
}