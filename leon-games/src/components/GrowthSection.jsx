import React, { useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import nigeriaVideo from "../assets/videos/nigeria-zoom-out-to-world.mp4";

// --- GROWTH ROADMAP SECTION (TRANSFORMED FROM WORLDWIDE) ---
export function GrowthSection() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // Unified Scroll Timelines for the section components
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001
  });

  // 1. Coordinated Header Group Animations (Slide in from Left, Fade In)
  const headerX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [-45, 0, 0, -25]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.35, 0.85, 1], [0, 1, 1, 0]);

  // 2. Map Container Animations (Slide in from Right, Fade In)
  const mapX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [45, 0, 0, 25]);
  const mapOpacity = useTransform(smoothProgress, [0, 0.35, 0.85, 1], [0, 1, 1, 0]);

  // 3. Staggered Growth Status Cards Animations (Fade in + Slide from Left sequence)
  // Card 1: Nigeria
  const card1X = useTransform(smoothProgress, [0.05, 0.42, 0.85, 1], [-45, 0, 0, 15]);
  const card1Opacity = useTransform(smoothProgress, [0.05, 0.38, 0.85, 1], [0, 1, 1, 0]);

  // Connector Arrow 1
  const arrow1Opacity = useTransform(smoothProgress, [0.08, 0.41, 0.85, 1], [0, 1, 1, 0]);

  // Card 2: Africa
  const card2X = useTransform(smoothProgress, [0.1, 0.47, 0.85, 1], [-45, 0, 0, 15]);
  const card2Opacity = useTransform(smoothProgress, [0.1, 0.43, 0.85, 1], [0, 1, 1, 0]);

  // Connector Arrow 2
  const arrow2Opacity = useTransform(smoothProgress, [0.13, 0.46, 0.85, 1], [0, 1, 1, 0]);

  // Card 3: Global
  const card3X = useTransform(smoothProgress, [0.15, 0.52, 0.85, 1], [-45, 0, 0, 15]);
  const card3Opacity = useTransform(smoothProgress, [0.15, 0.48, 0.85, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const promise = video.play();
          if (promise !== undefined) {
            promise.catch(() => { });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="worldwide" 
      className="py-24 bg-[#0A0A0A] relative overflow-hidden border-y border-white/[0.04]"
    >
      {/* Dynamic Background Spotlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.015] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT COLUMN: Premium Roadmap Side Panel */}
          <div className="lg:col-span-4 flex flex-col justify-center">

            {/* Coordinated Header Animation Group */}
            <motion.div 
              style={{ x: headerX, opacity: headerOpacity }}
              className="flex flex-col"
            >
              {/* Status Segment Indicator */}
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-blue-500/10 border border-cyan-500/30 text-[10px] font-mono tracking-wider mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent font-bold">
                  ROADMAP // THE FUTURE OF GLOBAL PLAY 🌍
                </span>
              </div>

              {/* Premium Gradient Headline */}
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight select-none">
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent block">
                  The Journey Has Just Begun! 🚀✨🗺️
                </span>
              </h2>

              {/* Narrative Roadmap Copy */}
              <p className="text-neutral-400 text-xs md:text-sm mb-8 leading-relaxed font-light">
                We're building the <span className="text-cyan-400 font-medium">next generation gaming platform</span> 🎮, starting with <span className="text-emerald-400 font-medium">Nigeria 🇳🇬</span> and expanding to players across <span className="text-amber-400 font-medium">Africa 🌍</span> and <span className="text-indigo-400 font-medium">beyond 🛰️⚡</span>.
              </p>
            </motion.div>

            {/* Vertical Flow Growth Cards Stack */}
            <div className="flex flex-col w-full">

              {/* Card 1: Nigeria (Live Now) */}
              <motion.div 
                style={{ x: card1X, opacity: card1Opacity }}
                className="bg-[#111111]/90 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between shadow-[0_4px_20px_rgba(16,185,129,0.03)] hover:border-emerald-500/40 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label="Nigeria"><img
                    src="https://flagcdn.com/w40/ng.png"
                    alt="Nigeria"
                    className="w-8 h-auto"
                  /></span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white tracking-wide">Nigeria 🇳🇬 🔥</span>
                    <span className="text-[9px] font-mono text-emerald-400 tracking-wider">Primary Seed Node 📡🌱</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest leading-none">
                    LIVE NOW 🟢✨
                  </span>
                </div>
              </motion.div>

              {/* Connecting Down Arrow 1 */}
              <motion.div 
                style={{ opacity: arrow1Opacity }}
                className="flex justify-center my-2.5"
              >
                <svg className="w-4 h-4 text-cyan-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </motion.div>

              {/* Card 2: Africa (Coming Soon) */}
              <motion.div 
                style={{ x: card2X, opacity: card2Opacity }}
                className="bg-[#111111]/60 border border-amber-500/10 rounded-xl p-4 flex items-center justify-between hover:border-amber-500/20 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label="Africa">🌍</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-amber-300 tracking-wide">Africa 🌍 ✨</span>
                    <span className="text-[9px] font-mono text-amber-400 tracking-wider">Continental Scaling 📈🛰️</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[9px] font-mono font-black text-amber-400 uppercase tracking-widest leading-none">
                    COMING SOON ⏳💥
                  </span>
                </div>
              </motion.div>

              {/* Connecting Down Arrow 2 */}
              <motion.div 
                style={{ opacity: arrow2Opacity }}
                className="flex justify-center my-2.5"
              >
                <svg className="w-4 h-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </motion.div>

              {/* Card 3: Global (In Progress) */}
              <motion.div 
                style={{ x: card3X, opacity: card3Opacity }}
                className="bg-[#111111]/30 border border-white/[0.04] rounded-xl p-4 flex items-center justify-between hover:border-white/[0.08] transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label="Global">🌐</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-indigo-300 tracking-wide">Global 🌐 💫</span>
                    <span className="text-[9px] font-mono text-indigo-400 tracking-wider">Decentralized Clusters 🖧💎</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/10">
                  <span className="text-[9px] font-mono font-black text-cyan-400 uppercase tracking-widest leading-none">
                    IN PROGRESS 🏗️🚀
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* RIGHT COLUMN: The Dominant Vector Map Layout (Maintained exact positioning and animated paths) */}
          <motion.div 
            style={{ x: mapX, opacity: mapOpacity }}
            className="lg:col-span-8 relative"
          >
            <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 shadow-2xl overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-full h-full object-cover max-h-[350px] rounded-xl"
                src={nigeriaVideo}
                loop
                muted
                playsInline
                preload="metadata"
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}