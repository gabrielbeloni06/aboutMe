import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';

const sections = [
  { id: 'hero', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'experience', label: 'Experiência' },
  { id: 'projects', label: 'Projetos' },
  { id: 'skills', label: 'Skills' },
  { id: 'earth', label: 'Contato' },
];

export default function NavigationMenu({ isInteractive }) {
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isInteractive) {
      setVisible(true);
      return;
    }

    const onScroll = () => setVisible(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [isInteractive]);

  const scrollTo = (id) => {
    if (isInteractive) return;
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
      className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none"
    >
      <nav className="flex items-center gap-1 bg-[#030303]/70 backdrop-blur-md border border-white/10 rounded-full px-2 py-2 shadow-[0_0_25px_rgba(0,229,255,0.15)] pointer-events-auto">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            disabled={isInteractive}
            className={`relative px-4 py-2 text-xs font-mono uppercase tracking-widest rounded-full transition-colors duration-300
              ${isInteractive ? 'text-gray-600 cursor-default' : active === s.id ? 'text-black' : 'text-gray-400 hover:text-white'}`}
          >
            {!isInteractive && active === s.id && (
              <motion.div
                layoutId="navPill"
                className="absolute inset-0 bg-[#00E5FF] rounded-full -z-10"
                transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
              />
            )}
            {s.label}
          </button>
        ))}
      </nav>
    </motion.div>
  );
}