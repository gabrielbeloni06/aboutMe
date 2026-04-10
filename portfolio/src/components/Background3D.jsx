import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function Starfield() {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(7000), { radius: 3 }));
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 30;
    ref.current.rotation.y -= delta / 40;
    
    ref.current.position.y = scrollY * 0.0015;
    ref.current.position.z = (scrollY * 0.002) % 2; 
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#00E5FF"
          size={0.004} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={0.7} 
        />
      </Points>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 bg-[#030303] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1.5] }}>
        <Starfield />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303] opacity-80" />
    </div>
  );
}