import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";

// --- RICH ARCHITECTURAL STEPS FOR THE FLOW ENGINE (VISUALLY ENHANCED) ---
const HOW_IT_WORKS_STEPS = [
  {
    num: "01",
    shortTitle: "Liquidity",
    title: (
      <span>
        Secure <span className="text-emerald-400">Liquidity Ingestion</span> 📥
      </span>
    ),
    tagline: "⚙️ GATEWAY INTEGRATION // SECURE DEPOSIT 💳",
    desc: (
      <span>
        Connect traditional <strong className="text-emerald-300">fiat card networks</strong> or decentralized <strong className="text-cyan-400 font-semibold">Web3 wallets</strong> to load your gaming balance instantly ⚡. Funds are routed securely through encrypted pipelines directly into isolated, audited <strong className="text-amber-400 font-semibold">multi-signature vaults</strong>. No platform-side custody risks! 🛡️
      </span>
    ),
    bullets: [
      <span>Zero-friction processing using <strong className="text-emerald-400">bank-grade transit standards</strong> 🏦</span>,
      <span>Automated conversion to unified, stable <strong className="text-cyan-400">USD valuation units</strong> 🪙</span>,
      <span>Cold-vault containment protocols to <strong className="text-amber-400">mitigate platform exploits</strong> 🔒</span>
    ],
    stat: "99.99% 📈",
    statLabel: "🟢 Ingestion Success",
    color: "from-emerald-500/20 to-emerald-500/0",
    borderAccent: "border-emerald-500/30",
    textAccent: "text-emerald-400"
  },
  {
    num: "02",
    shortTitle: "Selection",
    title: (
      <span>
        Deterministic <span className="text-cyan-400">Match Selection</span> 🎯
      </span>
    ),
    tagline: "⚔️ ENGINE INDEXING // ARENA LOBBY RESOLUTION 🗺️",
    desc: (
      <span>
        Identify your target battlefield 🎮. Filter through our live catalog using <strong className="text-cyan-300 font-semibold">precise skill parameters</strong>, custom staking limits, and transparent mechanics where final match results rely strictly on <strong className="text-emerald-400 font-semibold">user inputs and tactical reaction times</strong>. No house algorithms! 🧠
      </span>
    ),
    bullets: [
      <span>Strictly <strong className="text-cyan-400">non-random system architectures</strong> across all modes 📐</span>,
      <span>Dynamic lobby validation before any <strong className="text-amber-400">capital commitment</strong> 💎</span>,
      <span>Direct, ultra-low-latency routing connections to <strong className="text-emerald-400">peer-to-peer nodes</strong> ⚡</span>
    ],
    stat: "0.0% 🛑",
    statLabel: "⚡ Randomness Variance",
    color: "from-cyan-500/20 to-cyan-500/0",
    borderAccent: "border-cyan-500/30",
    textAccent: "text-cyan-400"
  },
  {
    num: "03",
    shortTitle: "Escrow",
    title: (
      <span>
        Isolated <span className="text-amber-400">Escrow Matching</span> 🔒
      </span>
    ),
    tagline: "🔮 MATCHMAKING PROTOCOL // LEDGER HOLD 🤝",
    desc: (
      <span>
        Commit your selected stakes directly into a secure, <strong className="text-amber-400 font-semibold">cryptographically isolated escrow contract</strong>. Our matchmaking engine coordinates instantly, pairing you synchronously against a verified live opponent locking the <strong className="text-emerald-400 font-semibold">exact same stake value</strong>. Safe, fair, and seamless. 🤝
      </span>
    ),
    bullets: [
      <span>Secured balance holds managed with <strong className="text-amber-400">complete public transparency</strong> 📝</span>,
      <span>Continuous connection status checks to <strong className="text-rose-400">prevent manual tampering</strong> 🚫</span>,
      <span>Automated priority queues to <strong className="text-cyan-400">eliminate unnecessary wait times</strong> ⏳</span>
    ],
    stat: "< 3.2s ⚡",
    statLabel: "🎯 Lobby Match Delta",
    color: "from-amber-500/20 to-amber-500/0",
    borderAccent: "border-amber-500/30",
    textAccent: "text-amber-400"
  },
  {
    num: "04",
    shortTitle: "Payouts",
    title: (
      <span>
        Automated <span className="text-purple-400">Instant Payouts</span> 🏆
      </span>
    ),
    tagline: "💎 LEDGER AUDIT // OUTFLOW SETTLEMENT 💸",
    desc: (
      <span>
        Clash in head-to-head rounds 🥊. Once the match engine calculates the final winner, the <strong className="text-purple-400 font-semibold">automated audited balance payouts</strong> execute instantly. The entire prize pool transitions directly to your profile wallet balance without platform-side delays or holds! 💸
      </span>
    ),
    bullets: [
      <span>Direct, real-time settlement accessible through <strong className="text-purple-400">your profile wallet</strong> 🪙</span>,
      <span>Immutable <strong className="text-emerald-400">public transaction logging</strong> for every match outcome 📊</span>,
      <span>Instant, unhindered cashout pipelines active <strong className="text-cyan-400">24/7/365 globally</strong> 🌍</span>
    ],
    stat: "< 1.5s 🚀",
    statLabel: "✨ Ledger Settlement",
    color: "from-purple-500/20 to-purple-500/0",
    borderAccent: "border-purple-500/30",
    textAccent: "text-purple-400"
  }
];



export function HowItWorksSection() {
  // 1. Declare all states first at the very top
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragY = useMotionValue(0);

  // 2. Declare refs next
  const sectionRef = useRef(null);

  // 3. Declare scroll hooks and motion calculations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001
  });

  // Header Animations
  const headerTitleX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [isMobile ? -20 : -60, 0, 0, isMobile ? -15 : -40]);
  const headerTitleOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  const headerDescX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [isMobile ? 20 : 60, 0, 0, isMobile ? 15 : 40]);
  const headerDescOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  // Center Column (Slider Card) Progress Mapping
  const sliderY = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [isMobile ? 0 : 80, 0, 0, isMobile ? 0 : -50]);
  const sliderX = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [isMobile ? 40 : 0, 0, 0, isMobile ? -30 : 0]);
  const sliderOpacity = useTransform(smoothProgress, [0, 0.25, 0.85, 1], [0, 1, 1, 0]);

  // Left Column (Phase Selectors) Progress Mapping
  const phasesX = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [-80, 0, 0, -50]);
  const phasesOpacity = useTransform(smoothProgress, [0, 0.25, 0.85, 1], [0, 1, 1, 0]);

  // Right Column (Step Counter & Pagination Controls) Progress Mapping
  const controlsX = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [isMobile ? 0 : 80, 0, 0, isMobile ? 0 : 50]);
  const controlsY = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [isMobile ? 40 : 0, 0, 0, isMobile ? -30 : 0]);
  const controlsOpacity = useTransform(smoothProgress, [0, 0.25, 0.85, 1], [0, 1, 1, 0]);

  // 4. Use effects
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);

    const touchMedia = window.matchMedia("(hover: none) and (pointer: coarse)");
    const handleTouchMedia = (event) => setIsTouchDevice(event.matches);
    touchMedia.addEventListener("change", handleTouchMedia);

    return () => {
      window.removeEventListener("resize", handleResize);
      touchMedia.removeEventListener("change", handleTouchMedia);
    };
  }, []);

  const handleStepChange = (targetIdx) => {
    if (targetIdx === activeIdx) return;
    setDirection(targetIdx > activeIdx ? 1 : -1);
    setActiveIdx(targetIdx);
  };

  const handleNext = () => {
    if (activeIdx < HOW_IT_WORKS_STEPS.length - 1) {
      setDirection(1);
      setActiveIdx((prev) => prev + 1);
    } else {
      // Loop back with transition downward
      setDirection(1);
      setActiveIdx(0);
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      setDirection(-1);
      setActiveIdx((prev) => prev - 1);
    } else {
      // Loop to end with transition upward
      setDirection(-1);
      setActiveIdx(HOW_IT_WORKS_STEPS.length - 1);
    }
  };

  const activeStep = HOW_IT_WORKS_STEPS[activeIdx];

  const dragThreshold = 70;
  const updateStepFromDrag = (offsetY) => {
    if (offsetY < -dragThreshold) {
      handleNext();
    } else if (offsetY > dragThreshold) {
      handlePrev();
    }
  };

  // Motion Configuration for Premium Vertical Slides
  const slideVariants = {
    initial: (dir) => ({
      y: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 18,
        mass: 0.8,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: (dir) => ({
      y: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  };

  // Content children staggered transitions
  const childVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-24 bg-[#0A0A0A] relative overflow-hidden border-y border-white/[0.04] z-10"
    >
      {/* Background Architectural Grid and Spotlights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-500/[0.01] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 gap-8">
          <motion.div
            style={{ x: headerTitleX, opacity: headerTitleOpacity }}
            className="flex flex-col"
          >
            {/* Dynamic Segment Status Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/30 text-[10px] font-mono tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">PLATFORM ENGINE PROTOCOLS</span>
            </div>

            {/* High-Impact Gradient Title */}
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight select-none">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                How It Works ⚙️🔥
              </span>
            </h2>
          </motion.div>

          {/* Side-aligned Narrative Block */}
          <motion.p
            style={{ x: headerDescX, opacity: headerDescOpacity }}
            className="text-neutral-300 max-w-lg text-sm md:text-base leading-relaxed font-light"
          >
            Four streamlined <strong className="text-cyan-400 font-normal">execution layers</strong> ⚙️ built to guarantee <span className="text-yellow-400 font-medium">lightning speed</span> ⚡, secure <span className="text-emerald-400 font-medium">capital matching</span> 💎, and immediate <span className="text-purple-400 font-medium">ledger settlements</span> 💸. Zero system delays! 🚀🔒
          </motion.p>
        </div>

        {/* Core Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">

          {/* COLUMN 1: VERTICAL PAGINATION LADDER (Desktop / Left Side with Scroll Reveal) */}
          <motion.div
            style={{ x: phasesX, opacity: phasesOpacity }}
            className="hidden lg:flex lg:col-span-3 flex-col justify-center pr-4 border-r border-white/[0.03]"
          >
            <div className="relative flex flex-col gap-6">
              {/* Dynamic Connecting Under-line */}
              <div className="absolute left-4 top-4 bottom-4 w-[1px] bg-white/[0.04]">
                <motion.div
                  className="absolute top-0 w-full bg-gradient-to-b from-emerald-500 to-cyan-400"
                  style={{
                    height: `${((activeIdx) / (HOW_IT_WORKS_STEPS.length - 1)) * 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 80, damping: 20 }}
                />
              </div>

              {HOW_IT_WORKS_STEPS.map((step, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={step.num}
                    onClick={() => handleStepChange(idx)}
                    className="flex items-center gap-4 text-left group focus:outline-none cursor-pointer"
                  >
                    {/* Architectural Bullet Circle with Dynamic Accent Colors */}
                    <div
                      className={`relative w-8.5 h-8.5 rounded-full flex items-center justify-center border font-mono text-[10px] font-black tracking-tighter transition-all duration-350 z-10 ${isActive
                          ? `bg-neutral-900 ${step.borderAccent} ${step.textAccent} shadow-[0_0_15px_rgba(16,185,129,0.15)]`
                          : "bg-black border-white/[0.04] text-neutral-600 group-hover:border-white/[0.15] group-hover:text-neutral-400"
                        }`}
                    >
                      {step.num}
                    </div>

                    <div className="flex flex-col">
                      <span
                        className={`text-[9px] font-mono tracking-widest leading-none mb-1 ${isActive ? "text-neutral-500" : "text-neutral-600"
                          }`}
                      >
                        PHASE 0{idx + 1}
                      </span>
                      <span
                        className={`text-xs font-bold tracking-tight transition-colors duration-300 ${isActive ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
                          }`}
                      >
                        {step.shortTitle} ...
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* COLUMN 3: ALIGNED SLIDE CONTROL HUB (Mobile first above slider, Desktop right side) */}
          <motion.div
            style={{ x: controlsX, y: controlsY, opacity: controlsOpacity }}
            className="lg:col-span-2 flex flex-row lg:flex-col justify-between lg:justify-center items-center gap-6 mb-6 lg:mb-0 order-1 lg:order-3 px-2"
          >

            {/* Interactive Progress Tracking Pill */}
            <div className="flex flex-col items-start lg:items-center text-left lg:text-center">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">SYSTEM STEP</span>
              <div className="text-sm font-black font-mono text-white">
                0{activeIdx + 1} <span className="text-neutral-600">/</span> 0{HOW_IT_WORKS_STEPS.length}
              </div>
            </div>

            {/* Tactile Control Buttons Stack */}
            <div className="flex flex-row lg:flex-col gap-3">
              {/* UP/PREV */}
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-[#111111] hover:bg-[#151515] border border-white/[0.06] hover:border-emerald-500/20 text-neutral-400 hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer group shadow-lg"
                aria-label="Previous step"
              >
                <span className="text-xs transition-transform group-hover:-translate-y-0.5 duration-200">↑ PREV</span>
              </button>

              {/* DOWN/NEXT */}
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-[#111111] hover:bg-[#151515] border border-white/[0.06] hover:border-emerald-500/20 text-neutral-400 hover:text-emerald-400 flex items-center justify-center transition-all cursor-pointer group shadow-lg"
                aria-label="Next step"
              >
                <span className="text-xs transition-transform group-hover:translate-y-0.5 duration-200">NEXT ↓</span>
              </button>
            </div>

            {/* Mobile Visual Dot Line Tracker */}
            <div className="flex lg:hidden gap-1.5">
              {HOW_IT_WORKS_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${idx === activeIdx ? "bg-emerald-400 w-4" : "bg-neutral-800 w-1.5"
                    }`}
                />
              ))}
            </div>

          </motion.div>

          {/* COLUMN 2: THE CENTRAL STORYTELLING FOCUS CARD (With Adaptive Scroll Reveal) */}
          <motion.div
            style={{ x: sliderX, y: sliderY, opacity: sliderOpacity }}
            className="lg:col-span-7 flex items-center min-h-[460px] relative order-2 lg:order-2"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                drag={isTouchDevice ? false : "y"}
                dragConstraints={isTouchDevice ? undefined : { top: -120, bottom: 120 }}
                dragElastic={isTouchDevice ? 0 : 0.18}
                dragMomentum={false}
                dragTransition={isTouchDevice ? undefined : { bounceStiffness: 550, bounceDamping: 30 }}
                style={{ y: dragY, cursor: isTouchDevice ? "default" : isDragging ? "grabbing" : "grab" }}
                onDragStart={() => {
                  if (!isTouchDevice) setIsDragging(true);
                }}
                onDragEnd={(_, info) => {
                  if (!isTouchDevice) {
                    setIsDragging(false);
                    dragY.set(0);
                    updateStepFromDrag(info.offset.y);
                  }
                }}
                onDrag={() => {
                  if (!isTouchDevice && !isDragging) setIsDragging(true);
                }}
                className={`w-full bg-[#111111]/90 border border-white/[0.08] rounded-2xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden flex flex-col justify-between`}
              >
                {/* Visual Glow Gradient Accent */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${activeStep.color} rounded-full blur-[70px] pointer-events-none opacity-40`} />

                {/* Card Top: Large Architectural Watermark & Phase Subhead */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <motion.div variants={childVariants} className="flex flex-col">
                    <span className={`text-[10px] font-mono tracking-[0.25em] font-black uppercase ${activeStep.textAccent}`}>
                      {activeStep.tagline}
                    </span>
                    <h3 className="text-xl md:text-3xl font-black tracking-tight text-white mt-1 leading-tight">
                      {activeStep.title}
                    </h3>
                  </motion.div>

                  {/* Subtle Big Stamp Number */}
                  <div className="text-6xl md:text-8xl font-black font-mono tracking-tighter text-white/[0.02] select-none leading-none">
                    {activeStep.num}
                  </div>
                </div>

                {/* Card Middle: Primary Explanatory Text */}
                <motion.p
                  variants={childVariants}
                  className="text-neutral-400 text-xs md:text-sm leading-relaxed mb-8 relative z-10 font-light"
                >
                  {activeStep.desc}
                </motion.p>

                {/* Card Bottom: Features & Stat Multi-Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-white/[0.04] relative z-10 items-center">

                  {/* Feature Bullets Column */}
                  <motion.div variants={childVariants} className="md:col-span-8 space-y-3.5">
                    {activeStep.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className={`text-xs mt-0.5 ${activeStep.textAccent}`}>⚡</span>
                        <span className="text-neutral-300 text-[11px] leading-relaxed font-light">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorksSection;