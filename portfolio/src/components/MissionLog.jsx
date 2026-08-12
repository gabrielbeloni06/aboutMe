import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, Circle } from 'lucide-react';

const missions = [
  {
    code: 'MISSION_01',
    codename: 'GÊNESE',
    role: 'Início na Ciência da Computação',
    org: 'Faculdade',
    year: '2025',
    status: 'completed',
    duration: '—',
    details: 'Primeiro contato formal com lógica, algoritmos e estruturas de dados. A base que sustenta toda a trajetória seguinte.',
  },
  {
    code: 'MISSION_02',
    codename: 'VIVO',
    role: 'Estagiário de Desenvolvimento',
    org: 'Vivo',
    year: '2025',
    status: 'completed',
    duration: '8 meses',
    details: 'Otimização de software e interfaces de alto nível em ambiente corporativo real. Contato direto com times de produto e arquitetura de sistemas em escala.',
  },
  {
    code: 'MISSION_03',
    codename: 'FULLSTACK',
    role: 'Desenvolvedor Júnior FullStack',
    org: '—',
    year: '2026',
    status: 'active',
    duration: 'Em andamento',
    details: 'Início da carreira profissional como desenvolvedor, atuando em frontend e backend de forma integrada.',
  },
];

function SystemsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.5 + Math.random() * 1,
      speed: 0.1 + Math.random() * 0.25,
      opacity: 0.15 + Math.random() * 0.25,
    });

    for (let i = 0; i < 40; i++) particles.push(spawnParticle());

    let sweepAngle = 0;

    const loop = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxR = Math.hypot(canvas.width, canvas.height) / 2;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      sweepAngle += 0.006;
      const grad = ctx.createConicGradient
        ? ctx.createConicGradient(sweepAngle, cx, cy)
        : null;
      if (grad) {
        grad.addColorStop(0, 'rgba(0, 229, 255, 0.12)');
        grad.addColorStop(0.06, 'rgba(0, 229, 255, 0.03)');
        grad.addColorStop(0.15, 'rgba(0, 229, 255, 0)');
        grad.addColorStop(1, 'rgba(0, 229, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
      [0.25, 0.5, 0.75, 1].forEach((f) => {
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * f * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      });

      particles.forEach((p) => {
        ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.speed;
        if (p.y < -10) Object.assign(p, spawnParticle(), { y: canvas.height + 10 });
      });

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70 z-0" />;
}

function StatusBadge({ status }) {
  const isActive = status === 'active';
  return (
    <div className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border
      ${isActive ? 'text-[#00E5FF] border-[#00E5FF]/40 bg-[#00E5FF]/5' : 'text-gray-400 border-white/10 bg-white/5'}`}
    >
      {isActive ? <Circle size={8} className="fill-[#00E5FF] text-[#00E5FF] animate-pulse" /> : <CheckCircle2 size={10} />}
      {isActive ? 'Em andamento' : 'Concluída'}
    </div>
  );
}

function MissionEntry({ mission, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="relative z-10"
    >
      <button
        onClick={onToggle}
        className={`w-full text-left bg-[#030303]/60 backdrop-blur-xl border rounded-xl p-5 md:p-6 transition-all duration-300
          ${isOpen ? 'border-[#00E5FF]/60 shadow-[0_0_30px_rgba(0,229,255,0.12)]' : 'border-white/10 hover:border-white/25'}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <span className="text-[11px] font-mono text-[#00E5FF]/70 shrink-0">{mission.code}</span>
            <div className="min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h4 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight truncate">
                  {mission.codename}
                </h4>
                <span className="text-xs font-mono text-gray-500">{mission.year}</span>
              </div>
              <p className="text-sm text-gray-400 font-mono mt-0.5 truncate">{mission.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <StatusBadge status={mission.status} />
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronRight size={18} className="text-gray-500" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Log</span>
                  <p className="text-sm text-gray-300 font-mono leading-relaxed mt-1">{mission.details}</p>
                </div>
                <div className="flex flex-col gap-3 text-xs font-mono">
                  <div>
                    <span className="text-gray-500 uppercase tracking-widest text-[10px]">Organização</span>
                    <p className="text-white mt-0.5">{mission.org}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase tracking-widest text-[10px]">Duração</span>
                    <p className="text-white mt-0.5">{mission.duration}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function MissionLog() {
  const [openId, setOpenId] = useState(missions[missions.length - 1].code);

  return (
    <section id="experience" className="relative min-h-screen w-full bg-[#030303] overflow-hidden py-32">
      
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"
      >
        <source src="/backlog.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,229,255,0.05),transparent_60%)] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#00E5FF] font-mono text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]"
        >
          /// Flight Log
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white"
        >
          Registro de Missões
        </motion.h3>
        <p className="text-gray-500 font-mono text-xs mt-4">Toque em uma entrada para expandir os detalhes</p>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="relative bg-[#050508]/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 md:p-4 shadow-[0_0_60px_rgba(0,0,0,0.4)] overflow-hidden">
          
          <SystemsBackground />

          <div className="relative z-10 flex items-center gap-2 px-3 py-2 border-b border-white/5 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="text-[10px] font-mono text-gray-500 ml-2 tracking-widest">TERMINAL_LOG.SYS</span>
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            {missions.map((mission, i) => (
              <MissionEntry
                key={mission.code}
                mission={mission}
                index={i}
                isOpen={openId === mission.code}
                onToggle={() => setOpenId(openId === mission.code ? null : mission.code)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}