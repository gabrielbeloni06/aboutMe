import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const experiences = [
  { id: 1, role: "Estagiário de Desenvolvimento", company: "Vivo", period: "2025", desc: "Otimização de software e interfaces de alto nível." },
  { id: 2, role: "Desenvolvedor Júnior FullStack", company: "—", period: "2026", desc: "Início da carreira profissional em desenvolvimento web." },
];

function StarRainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let stars = [];
    let comet = null;
    let nextCometAt = performance.now() + 4000 + Math.random() * 6000;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnStreak = () => ({
      x: Math.random() * canvas.width,
      y: -20,
      len: 60 + Math.random() * 80,
      speed: 4 + Math.random() * 6,
      opacity: 0.3 + Math.random() * 0.5,
    });

    for (let i = 0; i < 6; i++) {
      const s = spawnStreak();
      s.y = Math.random() * canvas.height;
      stars.push(s);
    }

    const spawnComet = () => ({
      x: -100,
      y: canvas.height * (0.15 + Math.random() * 0.3),
      vx: 6 + Math.random() * 2,
      vy: 1.5,
      trail: [],
    });

    const loop = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len * 0.3, s.y - s.len);
        ctx.stroke();
        s.x -= s.speed * 0.5;
        s.y += s.speed;
        if (s.y > canvas.height + 50 || s.x < -50) {
          Object.assign(s, spawnStreak());
        }
      });

      if (!comet && time > nextCometAt) {
        comet = spawnComet();
      }
      if (comet) {
        comet.trail.push({ x: comet.x, y: comet.y });
        if (comet.trail.length > 40) comet.trail.shift();

        comet.trail.forEach((p, i) => {
          const t = i / comet.trail.length;
          ctx.fillStyle = `rgba(0,229,255,${t * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, t * 4, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(comet.x, comet.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = '#00E5FF';
        ctx.shadowBlur = 20;

        comet.x += comet.vx;
        comet.y += comet.vy;

        if (comet.x > canvas.width + 100) {
          comet = null;
          nextCometAt = time + 15000 + Math.random() * 15000;
        }
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative min-h-screen w-full bg-[#030303] overflow-hidden py-32">
      <StarRainCanvas />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mb-24">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#00E5FF] font-mono text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]"
        >
          /// Constelação de Carreira
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white"
        >
          Experiências
        </motion.h3>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col gap-10">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="relative flex items-start gap-6 bg-[#030303]/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#00E5FF]/50 transition-colors duration-500"
          >
            <div className="relative flex-shrink-0 mt-1">
              <div className="w-4 h-4 rounded-full bg-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.9)]" />
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-[#00E5FF] animate-ping opacity-40" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest">{exp.period}</span>
              <h4 className="text-2xl font-bold text-white mt-1">{exp.role}</h4>
              <p className="text-sm text-purple-400 font-mono mb-3">{exp.company}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}