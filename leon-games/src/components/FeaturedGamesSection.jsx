import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Icons } from "./GeneralVariables/Icons";

import predictionDuel from "../assets/images/prediction-duel.png";
import reactionSignal from "../assets/images/reaction-signal.png";
import penaltyShootout from "../assets/images/penalty-shootout.png";
import rockPaperScissors from "../assets/images/rock-paper-scissors.png";
import ticTacToe from "../assets/images/tic-tac-toe.png";
// --- DESIGN-SAFE GAME DATA CONFIGURATION (VISUALLY ENHANCED) ---
const GAME_DATA = [
  {
    id: "rps",
    title: "Rock Paper Scissors",
    tagline: "🧠 Mind games only. Outwit or get read.",
    shortDesc: (
      <span>
        ⚡ <strong className="text-cyan-400">Simultaneous decision matrix</strong>. Outpredict your opponent in a rapid psychological faceoff.
      </span>
    ),
    image: rockPaperScissors,
    previewText: "Deterministic gesture clash ✊✋",
    details: {
      howItWorks: (
        <span>
          Both players simultaneously select <strong className="text-amber-400">✊ Rock</strong>, <strong className="text-emerald-400">✋ Paper</strong>, or <strong className="text-rose-400">✌️ Scissors</strong> inside the match viewport interface.
        </span>
      ),
      rules: (
        <span>
          💥 <strong className="text-amber-400">Rock</strong> crushes <strong className="text-rose-400">Scissors</strong>. <strong className="text-rose-400">Scissors</strong> cuts <strong className="text-emerald-400">Paper</strong>. <strong className="text-emerald-400">Paper</strong> wraps <strong className="text-amber-400">Rock</strong>. Selecting identical options results in a draw 🤝 prompting an <strong className="text-cyan-400">immediate round replay</strong>.
        </span>
      ),
      whyItWorks: (
        <span>
          Pure <strong className="text-emerald-400">cognitive reading</strong> and behavioral analysis 📈. Because outcomes are entirely dependent on user selection history, players win by spotting hidden patterns, executing tactical bluffs 🎭, and breaking their own predictability trends.
        </span>
      ),
    }
  },
  {
    id: "shootout",
    title: "Penalty Shootout",
    tagline: "🎯 Outsmart the keeper. 5 tactical shots to win.",
    shortDesc: (
      <span>
        🥅 Alternate roles between <strong className="text-cyan-400">Shooter</strong> and <strong className="text-amber-400">Keeper</strong> to find and exploit defensive blindspots.
      </span>
    ),
    image: penaltyShootout,
    previewText: "Directional vector clash ⚽🧤",
    details: {
      howItWorks: (
        <span>
          One player acts as the <strong className="text-cyan-400">⚽ Shooter</strong> while the other acts as the <strong className="text-rose-400">🧤 Goalkeeper</strong>. Both select <strong className="text-amber-400">Left</strong>, <strong className="text-emerald-400">Center</strong>, or <strong className="text-rose-400">Right</strong> vector positions.
        </span>
      ),
      rules: (
        <span>
          🛑 Matching directions result in a <strong className="text-rose-400">goalkeeper save</strong>. 🎯 Divergent directions result in a <strong className="text-emerald-400">goal</strong>. Roles switch systematically after every shot sequence. First to score <strong className="text-cyan-400">2 points</strong> wins.
        </span>
      ),
      whyItWorks: (
        <span>
          An intense <strong className="text-amber-400">bluffing system</strong> 🧠. Success relies on parsing real-time decision patterns under heavy psychological pressure, forcing players to cycle strategies logically to bypass human anticipation ⚡.
        </span>
      ),
    }
  },
  {
    id: "reaction",
    title: "Reaction Challenge",
    tagline: "⚡ Millisecond precision wins. Absolute focus.",
    shortDesc: (
      <span>
        ⏱️ Test pure <strong className="text-emerald-400">neuro-reflex speeds</strong> in a latency-compensated competitive match.
      </span>
    ),
    image: reactionSignal,
    previewText: "Visual stimulus matching 🟢⏱️",
    details: {
      howItWorks: (
        <span>
          Players focus on a unified center signal 🎯. The trigger <strong className="text-emerald-400">🟢 Green Light</strong>, visual flash, or <strong className="text-cyan-400">"GO"</strong> indicator displays at an unpredictable, randomized interval.
        </span>
      ),
      rules: (
        <span>
          ⚡ Tapping the screen first immediately <strong className="text-emerald-400">after</strong> the signal wins the round. Any premature tap before the signal results in an <strong className="text-rose-500">automatic round forfeit</strong> 🛑.
        </span>
      ),
      whyItWorks: (
        <span>
          Pure <strong className="text-amber-400">neuromuscular reflex</strong> and focus 🧠. There is no guesswork or platform variance. Players with the sharpest focus, best hand-eye coordination, and local connection stability take the match.
        </span>
      ),
    }
  },
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    tagline: "🧩 Perfect strategy. No room for simple mistakes.",
    shortDesc: (
      <span>
        📐 A battle of mathematical foresight on a classic <strong className="text-emerald-400">3x3 strategic matrix</strong>.
      </span>
    ),
    image: ticTacToe,
    previewText: "Combinatorial matrix calculation ❌⭕",
    details: {
      howItWorks: (
        <span>
          Players alternate placing their markers (<strong className="text-rose-400">❌ X</strong> or <strong className="text-cyan-400">⭕ O</strong>) onto a standard 3x3 geometric grid layout 🗺️.
        </span>
      ),
      rules: (
        <span>
          🏅 Achieve <strong className="text-emerald-400">three markers in a row</strong> (horizontally, vertically, or diagonally) to win the round. A completely filled grid with no lines results in a draw 🤝 and triggers an immediate replay.
        </span>
      ),
      whyItWorks: (
        <span>
          Complete <strong className="text-amber-400">mathematical determinism</strong> 📐. The game leaves zero room for chance. Mastery relies on thinking multiple moves ahead, forcing defensive blockings, and capitalizing on opponent tactical errors.
        </span>
      ),
    }
  },
  {
    id: "prediction",
    title: "Number Prediction",
    tagline: "🔢 Dynamic spatial analysis. Read the pattern.",
    shortDesc: (
      <span>
        🔮 Select and target numerical space to out-proximity your opponent's calculated choice.
      </span>
    ),
    image: predictionDuel,
    previewText: "Proximity variance estimation 🔢🔮",
    details: {
      howItWorks: (
        <span>
          Both players choose a single hidden integer 🔢 within a designated range of <strong className="text-cyan-400">1 to 10</strong>.
        </span>
      ),
      rules: (
        <span>
          🎯 The player whose choice is numerically <strong className="text-emerald-400">closest</strong> to their opponent's choice wins the round. Equal distance selections or duplicate numbers result in a draw 🤝 and trigger a replay.
        </span>
      ),
      whyItWorks: (
        <span>
          Strategic <strong className="text-amber-400">probabilistic matrix modeling</strong> 📊. Players calculate psychological boundaries and analyze patterns to determine previous selection trends to outrange their opponent.
        </span>
      ),
    }
  }
];


const sliderColVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 70, damping: 16 }
  }
};



// --- DESIGN-SAFE SCROLL-PROGRESS TRANSFORM MAPPINGS ---
export function FeaturedGamesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("details"); // "details" | "media"
  const [isMobile, setIsMobile] = useState(false);

  const activeGame = GAME_DATA[activeIdx];

  // Detect viewport size dynamically to scale translation limits
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? GAME_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === GAME_DATA.length - 1 ? 0 : prev + 1));
  };

  // 1. Establish Container Scroll Timeline
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 2. Pass progress through physics spring to eliminate mobile touch micro-stutters
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001
  });

  // 3. Map Section Header (Left Title / Right Description)
  const headerTitleX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [isMobile ? -20 : -60, 0, 0, isMobile ? -15 : -40]);
  const headerTitleOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  const headerDescX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [isMobile ? 20 : 60, 0, 0, isMobile ? 15 : 40]);
  const headerDescOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);



  // 4. Map Left Column Slider Container
  const leftColX = useTransform(smoothProgress, [0, 0.38, 0.75, 1], [isMobile ? -40 : -140, 0, 0, isMobile ? -45 : -100]);
  const leftColOpacity = useTransform(smoothProgress, [0, 0.34, 0.85, 1], [0, 1, 1, 0]);

  // 5. Map Individual Card Items (Scroll-Progressive Stagger)
  const cardTransforms = GAME_DATA.map((_, idx) => {
    const startReveal = 0.12 + idx * 0.04;
    const endReveal = 0.32 + idx * 0.04;

    const y = useTransform(smoothProgress, [0, startReveal, endReveal, 0.85, 1], [isMobile ? 15 : 40, isMobile ? 15 : 40, 0, 0, isMobile ? -10 : -20]);
    const opacity = useTransform(smoothProgress, [0, startReveal, endReveal, 0.9, 1], [0, 0, 1, 1, 0]);
    return { y, opacity };
  });

  // 6. Map Right Column Container
  const rightPanelX = useTransform(smoothProgress, [0, 0.38, 0.75, 1], [isMobile ? 40 : 140, 0, 0, isMobile ? 45 : 100]);
  const rightPanelOpacity = useTransform(smoothProgress, [0, 0.34, 0.85, 1], [0, 1, 1, 0]);

  // 7. Map Staggered Detail Tab Sub-Elements (Alert, Grid, Footer)
  const detailAlertY = useTransform(smoothProgress, [0, 0.22, 0.42, 0.85, 1], [25, 25, 0, 0, -15]);
  const detailAlertOpacity = useTransform(smoothProgress, [0, 0.22, 0.42, 0.9, 1], [0, 0, 1, 1, 0]);

  const detailGridY = useTransform(smoothProgress, [0, 0.27, 0.47, 0.85, 1], [25, 25, 0, 0, -15]);
  const detailGridOpacity = useTransform(smoothProgress, [0, 0.27, 0.47, 0.9, 1], [0, 0, 1, 1, 0]);

  const detailFooterY = useTransform(smoothProgress, [0, 0.32, 0.52, 0.85, 1], [25, 25, 0, 0, -15]);
  const detailFooterOpacity = useTransform(smoothProgress, [0, 0.32, 0.52, 0.9, 1], [0, 0, 1, 1, 0]);

  // 8. Map Media View elements
  const mediaContentY = useTransform(smoothProgress, [0, 0.25, 0.45, 0.85, 1], [30, 30, 0, 0, -15]);
  const mediaContentOpacity = useTransform(smoothProgress, [0, 0.25, 0.45, 0.9, 1], [0, 0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="games"
      className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/[0.04]"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-emerald-500/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header (VIBRANT REDESIGN) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
          <motion.div style={{ x: headerTitleX, opacity: headerTitleOpacity }} className="flex flex-col">
            {/* Dynamic Segment Status Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/30 text-[10px] font-mono tracking-wider mb-4">
              <span className="text-emerald-400 font-bold">⚔️ LIVE ARENA</span>
              <span className="text-neutral-600">//</span>
              <span className="text-cyan-400 animate-pulse">5 SKILL CHALLENGES 🏆</span>
            </div>

            {/* High-Impact Gradient Title */}
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight select-none">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                5 Legendary Titles!⚡
              </span>
            </h2>
          </motion.div>

          {/* Color-Vocal Description with Key Terms Highlighted */}
          <motion.p
            style={{ x: headerDescX, opacity: headerDescOpacity }}
            className="text-neutral-300 max-w-lg text-sm md:text-base leading-relaxed font-light"
          >
            Every battle resolves through <strong className="text-cyan-400">100% deterministic mathematical frameworks</strong>. Victory depends strictly on your <span className="text-yellow-400">reflex speeds</span>, <span className="text-emerald-400">psychological bluffs</span>, and <span className="text-red-400">tactical execution</span>. No luck. No house edge! 🧠🛑💡
          </motion.p>
        </div>

        {/* Dual Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT COLUMN: VERTICAL GAME SLIDER */}
          <motion.div
            style={{ x: !isMobile ? sliderColVariants.hidden.x : 0, opacity: !isMobile ? sliderColVariants.hidden.opacity : 1 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.12 }}
            transition={{ type: "spring", stiffness: 70, damping: 16 }}
            className="lg:col-span-5 flex flex-col justify-between bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-4 md:p-6 shadow-xl relative overflow-hidden"
          >

            {/* Header / Nav Controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.04] relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">
                  SELECT BATTLE [{activeIdx + 1}/5]
                </span>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous Game"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next Game"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Vertical Slider Stack Container with Staggered Scroll Transforms */}
            <div className="relative flex flex-col gap-3 h-[420px] overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              <AnimatePresence mode="popLayout">
                {GAME_DATA.map((game, idx) => {
                  const isActive = idx === activeIdx;
                  const { y, opacity } = cardTransforms[idx];

                  return (
                    <motion.div
                      key={game.id}
                      onClick={() => setActiveIdx(idx)}
                      style={{ y, opacity }}
                      className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all duration-300 origin-center ${isActive
                        ? "bg-[#111111] border-emerald-500/40 shadow-[0_4px_25px_rgba(34,197,94,0.08)] scale-[1.01]"
                        : "bg-transparent border-white/[0.04] hover:border-white/[0.1] opacity-65 hover:opacity-100"
                        }`}
                      whileTap={{ scale: 0.99 }}
                    >
                      {/* Left thumbnail marker */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/[0.08] relative">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-full h-full object-cover grayscale opacity-80"
                        />
                        <div className="absolute inset-0 bg-neutral-950/20" />
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-lg animate-pulse" />
                        )}
                      </div>

                      {/* Content block */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-mono font-bold text-neutral-500">0{idx + 1}</span>
                          <h3 className={`text-sm font-bold truncate transition-colors ${isActive ? "text-emerald-400" : "text-white"}`}>
                            {game.title}
                          </h3>
                        </div>
                        <div className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {game.shortDesc}
                        </div>
                      </div>

                      {/* Accent highlight light dot */}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: DYNAMIC GAME INFORMATION CONTAINER (DOMINANT PANEL) */}
          <motion.div
            style={{ x: rightPanelX, opacity: rightPanelOpacity }}
            className="lg:col-span-7 flex flex-col bg-[#0A0A0A] border border-white/[0.06] rounded-2xl shadow-2xl relative overflow-hidden"
          >

            {/* Dynamic visual overlay background matching game color themes slightly */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

            {/* Panel Tabs Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] relative z-10">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`relative px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${activeTab === "details" ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                >
                  <span className="relative z-10">Game Details & Rules</span>
                  {activeTab === "details" && (
                    <motion.div
                      layoutId="panel-tab-indicator"
                      className="absolute inset-0 bg-white/[0.03] border border-white/[0.06] rounded-md"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("media")}
                  className={`relative px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${activeTab === "media" ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                >
                  <span className="relative z-10">Media View</span>
                  {activeTab === "media" && (
                    <motion.div
                      layoutId="panel-tab-indicator"
                      className="absolute inset-0 bg-white/[0.03] border border-white/[0.06] rounded-md"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              </div>

              {/* Match rule flag status pill */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/10 text-[9px] font-mono text-cyan-400">
                <span>BEST-OF-3 FORMAT</span>
              </div>
            </div>

            {/* Dynamic Content Display Window */}
            <div className="p-6 md:p-8 flex-grow relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === "details" ? (
                  <div className="flex flex-col justify-between h-full space-y-8">
                    {/* Universal Format Alert Box - Scroll Progressive */}
                    <motion.div
                      style={{ y: detailAlertY, opacity: detailAlertOpacity }}
                      className="bg-[#111111]/80 border border-white/[0.04] p-4 rounded-xl flex items-start gap-3.5 shadow-inner"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                          UNIVERSAL ARENA MATCH SYSTEM
                        </h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                          Matches execute in systematic sequential rounds. A round win awards 1 point. The first player to reach <strong className="text-emerald-400 font-semibold">2 points</strong> wins the match. Draw rounds trigger automatic replays.
                        </p>
                      </div>
                    </motion.div>

                    {/* Left/Right Text Grid split - Scroll Progressive */}
                    <motion.div
                      style={{ y: detailGridY, opacity: detailGridOpacity }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"
                    >
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                            HOW IT WORKS
                          </span>
                          <div className="text-xs text-neutral-300 leading-relaxed font-light">
                            {activeGame.details.howItWorks}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                            SPECIFIC MATCH RULES
                          </span>
                          <div className="text-xs text-neutral-300 leading-relaxed font-light">
                            {activeGame.details.rules}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/[0.04] pt-4 md:pt-0 md:pl-6">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                            PSYCHOLOGY & COMPETITION SYSTEM
                          </span>
                          <div className="text-xs text-neutral-300 leading-relaxed font-light mb-3">
                            {activeGame.details.whyItWorks}
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#111] border border-white/[0.04] text-[9px] font-mono text-neutral-400 uppercase">
                            <span className="w-1 h-1 rounded-full bg-cyan-400" /> No Randomness-Based Output
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Quick Start Action Row - Scroll Progressive */}
                    <motion.div
                      style={{ y: detailFooterY, opacity: detailFooterOpacity }}
                      className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-xs text-neutral-400 block font-light">Current Arena Focus</span>
                        <h4 className="text-sm font-bold text-white">{activeGame.title}</h4>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.60, y: 4 }}
                        transition={{ type: "spring", stiffness: 360, damping: 12 }}
                        className="group relative overflow-hidden rounded-lg bg-[#22C55E] text-[#050505] font-black text-xs py-3.5 px-6 transition-all duration-300 shadow-[0_4px_20px_rgba(34,197,94,0.25)] hover:shadow-[0_6px_25px_rgba(34,197,94,0.4)] flex items-center justify-center cursor-pointer border border-transparent border-b-2 group-hover:border-b-4 group-hover:border-white whitespace-nowrap"
                      >
                        <span className="absolute inset-x-0 bottom-0 h-full bg-[#111111] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
                        <span className="relative z-10 flex items-center gap-1.5 uppercase tracking-wider transition-colors duration-500 group-hover:text-white text-[#050505]">
                          Find Lobby Opponent
                          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H4" />
                          </svg>
                        </span>
                      </motion.button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="w-full h-full min-h-[300px] flex flex-col justify-between relative">
                    {/* Simulated Cinematic Video Preview Window - Scroll Progressive */}
                    <motion.div
                      style={{ y: mediaContentY, opacity: mediaContentOpacity }}
                      className="w-full h-[280px] bg-neutral-950 border border-white/[0.06] rounded-xl relative overflow-hidden flex items-center justify-center group/media shadow-inner"
                    >

                      {/* Active wallpaper */}
                      <img
                        src={activeGame.image}
                        alt={`${activeGame.title} Cinematic View`}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity scale-[1.02] group-hover/media:scale-105 transition-transform duration-700"
                      />

                      {/* Color grading overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                      <div className="absolute inset-0 bg-emerald-500/[0.03] mix-blend-color" />

                      {/* Interactive graphic HUD marks */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase px-2 py-1 rounded bg-black/60 border border-white/[0.08] backdrop-blur-sm">
                          CH: 0{activeIdx + 1} // RESOLUTION MAPPING
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end">
                        <div>
                          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold mb-1">
                            {activeGame.previewText}
                          </span>
                          <h4 className="text-sm font-bold text-white leading-none">
                            {activeGame.title} Preview Frame
                          </h4>
                        </div>
                        <span className="text-[9px] font-mono text-neutral-400 px-1.5 py-0.5 rounded bg-black/40">
                          60 FPS
                        </span>
                      </div>

                      {/* Micro Center Play Overlay */}
                      <div className="w-12 h-12 rounded-full bg-white/5 group-hover/media:bg-emerald-500 hover:scale-110 border border-white/10 group-hover/media:border-transparent flex items-center justify-center backdrop-blur-sm text-white group-hover/media:text-neutral-950 transition-all duration-300 relative z-10">
                        <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </motion.div>

                    <p className="text-[11px] text-neutral-500 text-center font-mono mt-4">
                      SIMULATION CAPTURE SYSTEM NODE — REAL-TIME COMPILER ACTIVE
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}