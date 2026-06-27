import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Icons } from "./GeneralVariables/Icons";

// --- VIDEO ADVERTISEMENT SECTION (VIBRANT REDESIGN + SCROLL ANIMATED) ---
function VideoAdSection() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // Detect viewport size dynamically to scale transformation bounds safely
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1. Establish Container Scroll Timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 2. Pass progress through a spring to eliminate touch micro-stutters and add inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001
  });

  // 3. Map Progressive Assembly Transforms (Safe, UX-Friendly limits)
  // Left Column Layout Assembly (Slide in from Left)
  const leftColX = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [isMobile ? -15 : -60, 0, 0, isMobile ? -15 : -40]);
  const leftColOpacity = useTransform(smoothProgress, [0, 0.28, 0.85, 1], [0, 1, 1, 0]);

  // Nested Text Content Assembly (Slide Up)
  const textY = useTransform(smoothProgress, [0, 0.35, 0.78, 1], [isMobile ? 10 : 30, 0, 0, isMobile ? -10 : -20]);
  const textOpacity = useTransform(smoothProgress, [0, 0.3, 0.85, 1], [0, 1, 1, 0]);

  // Nested Feature List Assembly (Staggered Slide Up)
  const featuresY = useTransform(smoothProgress, [0, 0.4, 0.82, 1], [isMobile ? 15 : 45, 0, 0, isMobile ? -10 : -20]);
  const featuresOpacity = useTransform(smoothProgress, [0, 0.34, 0.88, 1], [0, 1, 1, 0]);

  // Call-To-Action Row Assembly (Staggered Slide Up)
  const ctaY = useTransform(smoothProgress, [0, 0.45, 0.85, 1], [isMobile ? 20 : 60, 0, 0, isMobile ? -10 : -20]);
  const ctaOpacity = useTransform(smoothProgress, [0, 0.38, 0.9, 1], [0, 1, 1, 0]);

  // Right Column Video Frame Assembly (Slide in from Right + Scale Align)
  const videoX = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [isMobile ? 15 : 80, 0, 0, isMobile ? 15 : 40]);
  const videoScale = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [0.97, 1, 1, 0.97]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.28, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#050505] relative overflow-hidden border-t border-white/[0.04]"
    >
      {/* High-Impact Multi-Color Radial Backdrops */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] rounded-full bg-emerald-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] rounded-full bg-cyan-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-purple-500/[0.015] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Progressive Text Assembly */}
          <motion.div
            style={{ x: leftColX, opacity: leftColOpacity }}
            className="lg:col-span-5 flex flex-col justify-center"
          >

            {/* Colorful Multi-Segment Status Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 via-amber-500/10 to-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono tracking-wider mb-6">
              <span className="text-red-400">🎬 PLAY FEED</span>
              <span className="text-neutral-600">//</span>
              <span className="text-amber-400">🔥 HOT PROMO</span>
            </div>

            {/* Dynamic Multi-Color Gradient Headline */}
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight select-none">
              <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-green-500 bg-clip-text text-transparent mt-1">
                See the Ultimate Action! ⚔️🔥
              </span>
            </h2>

            <motion.p
              style={{ y: textY, opacity: textOpacity }}
              className="text-neutral-400 text-sm md:text-base mb-6 leading-relaxed font-light"
            >
              Step into an outstanding competitive universe mapped around raw coordination, processing velocity, and structural tactics. Look at our platform demonstration showcase to see how matchmaking networks, security layers, and real-time settlement assets align. <strong className="text-white font-medium">No algorithmic delays. No system overrides. ⚡🏆🛡️</strong>
            </motion.p>

            {/* Strategic Highlight Callout Box */}
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="bg-amber-500/[0.03] border border-amber-500/20 rounded-xl p-4 mb-6 flex items-start gap-3.5 shadow-[inset_0_1px_12px_rgba(245,158,11,0.02)]"
            >
              <span className="text-xl">⚠️</span>
              <div>
                <h5 className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest mb-1">
                  Skill-Based Matchmaking Matrix 🧠🛡️
                </h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Platform protocols guarantee <strong className="text-white font-semibold">zero random variables</strong> or house advantages. Success relies exclusively on your inputs, tactical calculation, and mechanical speed! 🥊💎
                </p>
              </div>
            </motion.div>

            {/* Colorful & Descriptive Feature List with Custom Icons */}
            <motion.div
              style={{ y: featuresY, opacity: featuresOpacity }}
              className="space-y-4 mb-8 border-l-2 border-dashed border-neutral-800 pl-4"
            >

              {/* Feature Item 1: RED Accent */}
              <div className="flex items-start gap-3">
                <span className="text-xl text-red-500">⚔️</span>
                <div>
                  <h4 className="text-xs font-mono font-black text-red-400 uppercase tracking-widest">
                    Fast-Paced Direct Battles! 🥊⚡
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5 font-light">
                    Face off against verified live opponents globally. Show your speed under <span className="text-red-300 font-medium">pressure conditions</span>! 🛑
                  </p>
                </div>
              </div>

              {/* Feature Item 2: YELLOW Accent */}
              <div className="flex items-start gap-3">
                <span className="text-xl text-yellow-500">🏆</span>
                <div>
                  <h4 className="text-xs font-mono font-black text-yellow-400 uppercase tracking-widest">
                    Transparent Settlement Guaranteed! 🥇💸
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5 font-light">
                    Automated ledger distributions execute <span className="text-yellow-300 font-medium">immediately</span> upon round validation. Instant tracking visibility. 🛡️
                  </p>
                </div>
              </div>

              {/* Feature Item 3: CYAN Accent */}
              <div className="flex items-start gap-3">
                <span className="text-xl text-cyan-400">🌍</span>
                <div>
                  <h4 className="text-xs font-mono font-black text-cyan-400 uppercase tracking-widest">
                    Decentralized Gateway Lobbies! 🗺️🛰️
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5 font-light">
                    Low-latency routing connections active across a <span className="text-cyan-300 font-medium">global node infrastructure</span>. Play from anywhere! ⚡
                  </p>
                </div>
              </div>

            </motion.div>

            {/* Strategic Call to Action Buttons */}
            <motion.div
              style={{ y: ctaY, opacity: ctaOpacity }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileTap={{ scale: 0.30, y: 4 }}
                transition={{ type: "spring", stiffness: 360, damping: 12 }}
                className="w-full sm:w-auto relative group overflow-hidden rounded-lg bg-[#22C55E] text-[#050505] font-black text-xs py-3.5 px-6 transition-all duration-300 shadow-[0_4px_20px_rgba(34,197,94,0.25)] hover:shadow-[0_6px_25px_rgba(34,197,94,0.4)] flex items-center justify-center cursor-pointer border border-transparent border-b-2 group-hover:border-b-4 group-hover:border-white whitespace-nowrap"
              >
                <span className="absolute inset-x-0 bottom-0 h-full bg-[#111111] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
                <span className="relative z-10 flex items-center gap-1.5 uppercase tracking-wider transition-colors duration-500 group-hover:text-white text-[#050505]">Start Your Journey 🔥 <Icons.ArrowRight /></span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.30, y: 4 }}
                transition={{ type: "spring", stiffness: 360, damping: 12 }}
                className="w-full sm:w-auto relative group overflow-hidden rounded-lg bg-[#111111] border border-white/[0.08] text-white font-semibold text-xs py-3.5 px-6 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span className="absolute inset-x-0 bottom-0 h-full bg-orange-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
                <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.02em] whitespace-nowrap transition-colors duration-500 group-hover:text-black text-white">
                  <Icons.Play /> Join the Discord Hub 💬
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: Premium Neon Video Player Container */}
          <motion.div
            style={{ x: videoX, scale: videoScale, opacity: videoOpacity }}
            className="lg:col-span-7"
          >
            {/* Visual glow frame wrapping the player border */}
            <div className="relative bg-gradient-to-br from-emerald-500/20 via-neutral-900 to-cyan-500/20 p-[1.5px] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)]">

              <div className="relative bg-[#111111] rounded-2xl p-2 md:p-3 overflow-hidden aspect-video group">

                {/* Active HUD Corner Indicators */}
                <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-emerald-400 pointer-events-none z-10" />
                <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-10" />
                <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
                <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-emerald-400 pointer-events-none z-10" />

                {/* Premium Animated HUD Status Overlay (Centered) */}

                {/* Video Elements Container */}
                <div className="w-full h-full rounded-xl overflow-hidden bg-black relative border border-white/[0.04]">
                  <iframe
                    className="w-full h-full object-cover"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Leon Games Competitive Arena Presentation Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

              </div>
            </div>

            <p className="text-[10px] text-neutral-500 text-center font-mono mt-4 uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              🎥 REAL-TIME VIDEO PLAYER FEED SECURED // CRYPTO-HASH PROTOCOL ACTIVE 📡🟢
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default VideoAdSection;
