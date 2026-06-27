import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// --- FINAL CTA SECTION ---
function FinalCTASection() {
  const sectionRef = useRef(null);

  // Hook into scroll progress specifically for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center 40%"] // Slightly extended target window
  });

  // Extended transparency curve: stays highly faint (1% to 20%) for the first 75% of the scroll track,
  // then resolves to full visibility as it approaches the final viewing position.
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [0.01, 0.2, 1]);

  // Apply spring physics to ensure the transition is smooth across all devices
  const smoothOpacity = useSpring(opacity, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001
  });

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: smoothOpacity }}
      className="py-32 relative overflow-hidden bg-[#050505] flex items-center justify-center"
    >
      {/* Background Radial Sweep */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[800px] h-[400px] rounded-full bg-emerald-500/10 blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Symmetrical Rainbow Headline */}
        <h2 className="relative text-center font-extrabold tracking-tight mb-6 select-none leading-[1.08] text-[3.2rem] sm:text-[4rem] min-[71.25rem]:text-[4rem]">
          <span className="bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Your Next Opponent ⚔️
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 via-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Is Waiting! 🏆
          </span>
        </h2>

        {/* Narrative Callout with Embedded Color Accents */}
        <p className="max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed font-light text-neutral-400">
          🎮 Matches deploy{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-medium">
            immediately ⚡
          </span>
          . Claim{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-medium">
            absolute control 🔒
          </span>{" "}
          of your wagering experience without the interference of arbitrary house odds! ⚖️💎📈
        </p>

        {/* Action Trigger Button */}
        <div className="max-w-sm mx-auto">
          <button className="w-full relative group overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 via-cyan-500 to-indigo-500 hover:from-emerald-400 hover:to-indigo-400 text-[#050505] font-black text-sm py-4 px-8 transition-all duration-300 shadow-[0_10px_30px_rgba(34,197,94,0.3)] uppercase tracking-wider cursor-pointer">
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2 text-neutral-950 font-black">
              🚀 Play Now & Win 🏆💰
            </span>
          </button>
        </div>

        {/* Live Tracking Information Ticker */}
        <div className="mt-8 text-[11px] font-mono tracking-widest uppercase flex items-center justify-center gap-2 font-black">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="bg-gradient-to-r from-rose-400 via-amber-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            🔴 4,129 ACTIVE MATCHES RIGHT NOW 📡🔥⚔️
          </span>
        </div>
      </div>
    </motion.section>
  );
}

export default FinalCTASection;