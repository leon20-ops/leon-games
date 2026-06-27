import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// --- CUSTOM TRUST-GRID ICONS ---
const TrustIcons = {
  Security: () => (
    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  Withdrawal: () => (
    <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  Fairness: () => (
    <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  ),
  Support: () => (
    <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.774-3.414c0-.143.01-.285.03-.426C4.122 15.908 3 14.072 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  )
};

export function TrustSection() {
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

  // Animated header layout displacements
  const headerTitleX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [-50, 0, 0, -30]);
  const headerTitleOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  const headerDescX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [50, 0, 0, 30]);
  const headerDescOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  // --- NEW: INDEPENDENT SCROLL TRANSFORMS FOR EACH QUADRANT ---

  // Quadrant 1 (Top Left): Slide in from Left, Fade In
  const topLeftX = useTransform(smoothProgress, [0.1, 0.45, 0.85, 1], [-30, 0, 0, -15]);
  const topLeftOpacity = useTransform(smoothProgress, [0.1, 0.38, 0.85, 1], [0, 1, 1, 0]);

  // Quadrant 2 (Top Right): Slide in from Right, Fade In
  const topRightX = useTransform(smoothProgress, [0.1, 0.45, 0.85, 1], [30, 0, 0, 15]);
  const topRightOpacity = useTransform(smoothProgress, [0.1, 0.38, 0.85, 1], [0, 1, 1, 0]);

  // Quadrant 3 (Bottom Left): Slide in from Left, Fade In (Slightly Staggered)
  const bottomLeftX = useTransform(smoothProgress, [0.15, 0.52, 0.85, 1], [-30, 0, 0, -15]);
  const bottomLeftOpacity = useTransform(smoothProgress, [0.15, 0.45, 0.85, 1], [0, 1, 1, 0]);

  // Quadrant 4 (Bottom Right): Slide in from Right, Fade In (Slightly Staggered)
  const bottomRightX = useTransform(smoothProgress, [0.15, 0.52, 0.85, 1], [30, 0, 0, 15]);
  const bottomRightOpacity = useTransform(smoothProgress, [0.15, 0.45, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="security"
      className="py-32 bg-[#050505] relative z-10 overflow-hidden"
    >
      {/* Structural Background Ambiences */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-500/[0.015] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Replacement Header Structure */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 lg:mb-24 gap-8">
          <motion.div
            style={{ x: headerTitleX, opacity: headerTitleOpacity }}
            className="flex flex-col"
          >
            {/* Dynamic Segment Status Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/30 text-[10px] font-mono tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">🛡️ PROTECTION // END-TO-END SECURE 🔒</span>
            </div>

            {/* High-Impact Gradient Title */}
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight select-none">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Engineered for Trust 🛡️✨
              </span>
            </h2>
          </motion.div>

          {/* Side-aligned Narrative Block */}
          <motion.p
            style={{ x: headerDescX, opacity: headerDescOpacity }}
            className="text-neutral-300 max-w-lg text-sm md:text-base leading-relaxed font-light"
          >
            Experience high-end gaming backed by an enterprise-grade <strong className="text-emerald-400 font-normal">trust infrastructure 🔐</strong>. Our platform integrates state-of-the-art encryption protocols, automated ledger auditing, and <strong className="text-cyan-400 font-normal">transparent algorithms 📈</strong> to safeguard your capital and ensure unmatched competitive integrity.
          </motion.p>
        </div>

        {/* 2x2 Connected Trust Grid Container */}
        <div className="relative max-w-5xl mx-auto py-8">

          {/* DESKTOP SYSTEM: Symmetrical 2D Divider Lines (Extend beyond layout boundaries with fade-out gradients) */}

          {/* Continuous Horizontal Grid Line (Left to Right, fades dynamically at limits) */}
          <div className="absolute left-[-160px] right-[-160px] top-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 via-cyan-500/20 to-transparent hidden md:block pointer-events-none -translate-y-1/2" />
          <div className="absolute left-[-160px] right-[-160px] top-1/2 h-[3px] bg-gradient-to-r from-transparent via-emerald-500/10 via-cyan-500/10 to-transparent blur-[2px] hidden md:block pointer-events-none -translate-y-1/2" />

          {/* Continuous Vertical Grid Line (Top to Bottom, fades dynamically at limits) */}
          <div className="absolute top-[-160px] bottom-[-160px] left-1/2 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/20 via-cyan-500/20 to-transparent hidden md:block pointer-events-none -translate-x-1/2" />
          <div className="absolute top-[-160px] bottom-[-160px] left-1/2 w-[3px] bg-gradient-to-b from-transparent via-emerald-500/10 via-cyan-500/10 to-transparent blur-[2px] hidden md:block pointer-events-none -translate-x-1/2" />

          {/* Symmetrical Intersection Central Glow Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center hidden md:flex pointer-events-none z-20">
            <div className="absolute w-4 h-4 rounded-full bg-emerald-500/20 animate-ping" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          </div>

          {/* MOBILE SYSTEM: Linear Continuous Vertical Connector (Centered timeline-style track) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/15 via-cyan-500/15 to-transparent md:hidden pointer-events-none" />

          {/* Core Quad Grid Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-0 gap-x-0 relative z-10">

            {/* Quadrant 1: Top Left - Bank-Level Security */}
            <motion.div
              style={{ x: topLeftX, opacity: topLeftOpacity }}
              className="md:pr-16 md:pb-16 flex flex-col items-center text-center justify-between min-h-[160px]"
            >
              <div className="mb-5 p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_12px_rgba(255,255,255,0.01)] flex items-center justify-center">
                <TrustIcons.Security />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold tracking-wider text-emerald-400 uppercase font-mono">
                  🔒 Bank-Level Security
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
                  Your <span className="text-emerald-400">deposits</span> and <span className="text-cyan-400">withdrawals</span> are protected with <strong className="text-white">advanced encryption protocols 🛡️💎</strong>.
                </p>
              </div>
            </motion.div>

            {/* Quadrant 2: Top Right - Fast Withdrawals */}
            <motion.div
              style={{ x: topRightX, opacity: topRightOpacity }}
              className="md:pl-16 md:pb-16 flex flex-col items-center text-center justify-between min-h-[160px]"
            >
              <div className="mb-5 p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_12px_rgba(255,255,255,0.01)] flex items-center justify-center">
                <TrustIcons.Withdrawal />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold tracking-wider text-cyan-400 uppercase font-mono">
                  ⚡ Fast Withdrawals
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
                  Most payouts are <span className="text-cyan-400 font-medium">validated and processed</span> in minutes directly to your destination account <strong className="text-white">without friction ⏱️💸</strong>.
                </p>
              </div>
            </motion.div>

            {/* Quadrant 3: Bottom Left - Fair & Transparent */}
            <motion.div
              style={{ x: bottomLeftX, opacity: bottomLeftOpacity }}
              className="md:pr-16 md:pt-16 flex flex-col items-center text-center justify-between min-h-[160px] md:border-t-0"
            >
              <div className="mb-5 p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_12px_rgba(255,255,255,0.01)] flex items-center justify-center">
                <TrustIcons.Fairness />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold tracking-wider text-teal-400 uppercase font-mono">
                  🎮 Fair & Transparent
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
                  Match resolution pipelines are powered by <span className="text-teal-400 font-medium">fully certified</span> and audit-tested RNG architectures <strong className="text-white">with zero bias 🎲📐</strong>.
                </p>
              </div>
            </motion.div>

            {/* Quadrant 4: Bottom Right - 24/7 Support */}
            <motion.div
              style={{ x: bottomRightX, opacity: bottomRightOpacity }}
              className="md:pl-16 md:pt-16 flex flex-col items-center text-center justify-between min-h-[160px] md:border-t-0"
            >
              <div className="mb-5 p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] shadow-[inset_0_1px_12px_rgba(255,255,255,0.01)] flex items-center justify-center">
                <TrustIcons.Support />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold tracking-wider text-emerald-500 uppercase font-mono">
                  💬 24/7 Support
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
                  Real platform operators are <span className="text-emerald-400 font-medium">available round-the-clock</span> to coordinate, advise, and support <strong className="text-white">your lobby queries 🤝📞</strong>.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}