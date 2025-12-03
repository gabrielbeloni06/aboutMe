import React, { useRef, useState } from 'react';
import { Code2, Cpu, Database, Globe, Terminal, Zap } from 'lucide-react';
import foto from '../assets/img/perfil.jpg';
const GlowingBorderCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl overflow-hidden bg-white/10 ${className} p-[1px] group`}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 1), transparent 40%)`,
        }}
      />
      <div className="relative h-full bg-black/80 backdrop-blur-xl rounded-[11px] z-10 p-8 h-full">
         {children}
      </div>
    </div>
  );
};

const techStack = [
  { icon: <Globe size={20} />, name: "Frontend", desc: "React, Tailwind, Three.js" },
  { icon: <Database size={20} />, name: "Backend", desc: "Node.js, Java, Python" },
  { icon: <Cpu size={20} />, name: "Hardware", desc: "Architecture & Performance" },
  { icon: <Terminal size={20} />, name: "Tools", desc: "Git, Docker, Windows, Linux" },
  { icon: <Zap size={20} />, name: "DevOps", desc: "AWS, Azure" },
  { icon: <Code2 size={20} />, name: "Languages", desc: "C, Java, Python" },
  { icon: <Database size={20} />, name: "Databases", desc: "SQL, Oracle" }
];
export default function AboutSection() {
  return (
    <section className="min-h-screen flex items-center justify-center p-6 py-20 relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2670&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/80" /> 
      </div>
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlowingBorderCard className="md:col-span-2 flex flex-col justify-center">
          <div className="absolute top-6 right-6 text-white/10 rotate-12">
            <Code2 size={80} />
          </div>
          <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-4">
            Sobre Mim
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Desenvolvedor Full Stack <br/> & Estudante de Ciência da Computação
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl font-light z-20 relative">
            Atualmente estagiário de planejamento na <strong>Vivo</strong>. 
            Desenvolvo soluções onde a otimização de software encontra o design visual. 
            Focado em criar sistemas robustos e interfaces de alto design.
          </p>
        </GlowingBorderCard>
        <GlowingBorderCard className="md:col-span-1 min-h-[300px] relative p-0 overflow-hidden">
             <div className="absolute inset-0 z-0">
               <img 
                 src={foto}
                 alt="Foto"
                 className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105"
               />
             </div>
             <div className="absolute bottom-4 left-4 z-10">
                <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20">
                  ONLINE NOW
                </span>
             </div>
        </GlowingBorderCard>
        <GlowingBorderCard className="md:col-span-3">
           <div className="flex items-center gap-3 mb-6">
              <Zap className="text-white fill-white" size={20} />
              <h3 className="text-xl font-bold text-white tracking-wide">Habilidades</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {techStack.map((tech, i) => (
                <div key={i} className="flex items-start gap-4 p-2 rounded transition-colors">
                   <div className="mt-1 text-gray-400 group-hover:text-white transition-colors">
                      {tech.icon}
                   </div>
                   <div>
                       <h4 className="text-white font-medium text-sm">{tech.name}</h4>
                       <p className="text-xs text-gray-500 font-mono">{tech.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </GlowingBorderCard>
      </div>
    </section>
  );
}