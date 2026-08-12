import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stars, OrbitControls } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import * as THREE from 'three';

const skillsData = [
  { name: 'React', radius: 3.2, speed: 0.25, tilt: 0.15, color: '#61DAFB' },
  { name: 'Next.js', radius: 3.2, speed: 0.25, tilt: -0.2, color: '#ffffff' },
  { name: 'TypeScript', radius: 4, speed: 0.2, tilt: 0.3, color: '#3178C6' },
  { name: 'JavaScript', radius: 4, speed: 0.2, tilt: -0.1, color: '#F7DF1E' },
  { name: 'Node.js', radius: 4.8, speed: 0.17, tilt: 0.1, color: '#8CC84B' },
  { name: 'Python', radius: 4.8, speed: 0.17, tilt: -0.35, color: '#4B8BBE' },
  { name: 'Java', radius: 5.6, speed: 0.14, tilt: 0.25, color: '#E76F00' },
  { name: 'SQL', radius: 5.6, speed: 0.14, tilt: -0.15, color: '#00E5FF' },
  { name: 'AWS', radius: 6.4, speed: 0.12, tilt: 0.4, color: '#FF9900' },
  { name: 'Docker', radius: 6.4, speed: 0.12, tilt: -0.25, color: '#2496ED' },
  { name: 'C', radius: 7.2, speed: 0.1, tilt: 0.2, color: '#A8B9CC' },
  { name: 'C++', radius: 7.2, speed: 0.1, tilt: -0.3, color: '#00599C' },
  { name: 'C#', radius: 8, speed: 0.08, tilt: 0.15, color: '#9B4F96' },
  { name: 'Design Web', radius: 8, speed: 0.08, tilt: -0.2, color: '#EC4899' },
];

function EventHorizon() {
  const glowRef = useRef();
  useFrame((state) => {
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
      glowRef.current.scale.setScalar(pulse);
    }
  });
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.55, 64, 64]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.75, 0.015, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function AccretionDisk() {
  const ref = useRef();
  const particles = useMemo(() => {
    const count = 6000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorHot = new THREE.Color('#ffffff');
    const colorMid = new THREE.Color('#00E5FF');
    const colorCool = new THREE.Color('#7C3AED');

    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.pow(Math.random(), 1.5) * 4.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 0.15 * (r / 3);

      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * r;

      const t = Math.min((r - 1.8) / 3, 1);
      const c = t < 0.5
        ? colorHot.clone().lerp(colorMid, t * 2)
        : colorMid.clone().lerp(colorCool, (t - 0.5) * 2);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group ref={ref} rotation={[0.35, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particles.positions.length / 3} array={particles.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particles.colors.length / 3} array={particles.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} vertexColors transparent opacity={0.85} depthWrite={false} sizeAttenuation />
      </points>
    </group>
  );
}

function SkillOrbit({ skill }) {
  const groupRef = useRef();
  const nodeRef = useRef();
  const angle = useRef(Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    angle.current += delta * skill.speed;
    if (nodeRef.current) {
      nodeRef.current.position.x = Math.cos(angle.current) * skill.radius;
      nodeRef.current.position.z = Math.sin(angle.current) * skill.radius;
    }
  });

  return (
    <group ref={groupRef} rotation={[skill.tilt, 0, skill.tilt * 0.5]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[skill.radius, 0.006, 8, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
      </mesh>
      <group ref={nodeRef}>
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color={skill.color} />
        </mesh>
        <Html distanceFactor={11} center zIndexRange={[100, 0]}>
          <div
            className="font-mono font-bold text-[10px] whitespace-nowrap px-2 py-0.5 rounded pointer-events-none"
            style={{ color: skill.color, textShadow: `0 0 8px ${skill.color}` }}
          >
            {skill.name}
          </div>
        </Html>
      </group>
    </group>
  );
}

function Scene() {
  const groupRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <EventHorizon />
      <AccretionDisk />
      {skillsData.map((skill) => (
        <SkillOrbit key={skill.name} skill={skill} />
      ))}
    </group>
  );
}

export default function BlackHoleSkills() {
  const containerRef = useRef(null);
  const controlsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.85]);

  const handleZoom = (direction) => {
    const controls = controlsRef.current;
    if (!controls) return;
    if (direction === 'in') {
      controls.dollyIn(1.15);
    } else {
      controls.dollyOut(1.15);
    }
    controls.update();
  };

  return (
    <section id="skills" ref={containerRef} className="relative h-[150vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#010314] via-purple-950/20 to-black pointer-events-none" />

        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0 z-10 w-full h-full flex flex-col pointer-events-none"
        >
          <div className="pt-24 flex flex-col items-center text-center">
            <h2 className="text-[#00E5FF] font-mono text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
              /// Horizonte de Conhecimento
            </h2>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
              Minhas <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00E5FF]">Skills</span>
            </h3>
            <p className="text-gray-400 mt-4 font-mono text-sm max-w-md">
              Arraste pra orbitar. Use os botões ao lado pra dar zoom.
            </p>
          </div>

          <div className="flex-grow w-full relative cursor-grab active:cursor-grabbing pointer-events-auto">
            <Canvas camera={{ position: [0, 6, 16], fov: 50 }}>
              <Stars radius={100} depth={50} count={2500} factor={4} fade speed={0.5} />
              <Scene />
              <OrbitControls
                ref={controlsRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.5}
                autoRotate
                autoRotateSpeed={0.3}
                minDistance={6}
                maxDistance={30}
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
          </div>
        </motion.div>

      </div>
    </section>
  );
}