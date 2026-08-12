import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket } from 'lucide-react';

const timelineData = [
  { year: "2006", title: "Início", desc: "O início de tudo.", progress: 0.15 },
  { year: "2025", title: "Faculdade", desc: "Meu começo na faculdade de Ciência da Computação.", progress: 0.40 },
  { year: "2025", title: "Primeiras Impressões", desc: "Estágio na Vivo, otimização de software e interfaces de alto nível.", progress: 0.65 },
  { year: "2026", title: "Dev", desc: "Começo da carreira como Desenvolvedor Júnior FullStack", progress: 0.90 },
];

export default function RocketTimeline() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const rocketY = useTransform(scrollYProgress, [0, 1], ["90vh", "20vh"]);
  
  const rocketX = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.40, 0.65, 0.90, 1], 
    ["0px", "15px", "-15px", "15px", "-15px", "0px"]
  );

  const rocketRotate = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.40, 0.65, 0.90, 1], 
    [-45, -30, -60, -30, -60, -45]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = latest * video.duration;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/foguete.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#010314] via-transparent to-[#030303] opacity-90" />

        <motion.div style={{ opacity: sectionOpacity }} className="absolute inset-0 z-10 w-full h-full pointer-events-none">

          <div className="absolute top-16 md:top-24 text-center w-full">
            <h2 className="text-sm font-mono text-[#00E5FF] tracking-widest uppercase mb-4 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">
              Experiência
            </h2>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
              Minha Trajetória
            </h3>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-t from-[#00E5FF]/60 via-purple-600/40 to-transparent" />

          <motion.div
            style={{ y: rocketY, x: rocketX }}
            className="absolute left-1/2 top-0 z-20"
          >
            <motion.div
              style={{ rotate: rocketRotate }}
              className="w-10 h-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
            >
              <Rocket size={32} className="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.9)]" />
            </motion.div>
          </motion.div>

          {timelineData.map((item, index) => {
            const isRight = index % 2 === 0;
            
            const markerOpacity = useTransform(
              scrollYProgress,
              [item.progress - 0.05, item.progress, item.progress + 0.05],
              [0, 1, 1]
            );
            
            const markerXAnim = useTransform(
              scrollYProgress,
              [item.progress - 0.05, item.progress],
              [isRight ? 40 : -40, 0]
            );
            
            const markerY = `${90 - (item.progress * 70)}vh`;

            return (
              <motion.div
                key={index}
                style={{
                  top: markerY,
                  opacity: markerOpacity,
                  x: markerXAnim,
                }}
                className={`absolute w-64 -translate-y-1/2 ${isRight ? 'left-[54%]' : 'right-[54%] text-right'}`}
              >
                <div className={`inline-block ${isRight ? '' : 'text-right'}`}>
                  <h4 className="text-3xl md:text-4xl font-black text-white drop-shadow-md">{item.year}</h4>
                  <h5 className="text-lg font-bold text-[#00E5FF] mt-1">{item.title}</h5>
                  <p className="text-xs text-gray-400 font-mono mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}

        </motion.div>
      </div>
    </section>
  );
}