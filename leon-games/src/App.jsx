import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import predictionDuel from "./assets/images/prediction-duel.png";
import reactionSignal from "./assets/images/reaction-signal.png";
import penaltyShootout from "./assets/images/penalty-shootout.png";
import rockPaperScissors from "./assets/images/rock-paper-scissors.png";
import ticTacToe from "./assets/images/tic-tac-toe.png";

// --- CUSTOM HIGH-QUALITY SVG ICONS (Inline to avoid dependency issues) ---
const Icons = {
  Shield: () => (
    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Scale: () => (
    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Play: () => (
    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
};

export default function LeonGamesLanding() {
  return (
    <div className="bg-[#050505] text-white font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-400 min-h-screen overflow-x-hidden relative">
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 opacity-80" />

      <Navigation />
      <HeroSection />
      <MatchmakingSection />
      <FeaturedGamesSection />
      <HowItWorksSection />
      <LiveActivitySection />
      <PaymentsSection />
      <TrustSection />
      <WorldwideSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}

// --- PREMIUM NAV UTILITIES & ICONS ---
const NavIcons = {
  Terminal: () => (
    <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  NetworkNode: () => (
    <svg className="w-3.5 h-3.5 text-cyan-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  ),
  MenuOpen: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="20" y2="12" />
      <line x1="12" y1="18" x2="20" y2="18" />
    </svg>
  ),
  MenuClose: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
};

const NAV_LINKS = [
  { label: "Arena Games", href: "#games" },
  { label: "Flow Engine", href: "#how-it-works" },
  { label: "Vault Security", href: "#security" },
  { label: "Global Node Network", href: "#worldwide" }
];

export function Navigation() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const lastScrollY = useRef(0);

  // Monitor scroll dynamics to adjust compression and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine background state
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine scroll direction for compression changes
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Micro spring-physics presets
  const springTransition = { type: "spring", stiffness: 380, damping: 30 };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          height: scrollDirection === "down" && scrolled ? "64px" : "80px"
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 transition-all duration-300 ${scrolled
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-transparent"
          }`}
      >
        {/* Dynamic Highlight Sweep Line */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent pointer-events-none" />
        )}

        {/* 1. BRAND LOGO - Subtle scale & mechanical hover */}
        <div className="flex items-center gap-6">
          <motion.a
            href="#"
            className="flex items-center gap-3 group pointer-events-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Structural geometric logo mark with dynamic radial background glow */}
            <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#111111] border border-white/[0.08] transition-colors group-hover:border-emerald-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="font-mono font-black text-sm text-neutral-100 group-hover:text-emerald-400 transition-colors tracking-tighter">
                L//G
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-widest text-white leading-none">
                LEON <span className="text-emerald-400 font-light">GAMES</span>
              </span>
              <span className="text-[9px] font-mono tracking-wider text-neutral-500 group-hover:text-neutral-400 transition-colors mt-0.5">
                AMS-NODE // ONLINE
              </span>
            </div>
          </motion.a>

          {/* Real-time latency node status pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.04] text-[10px] text-neutral-400 font-mono">
            <NavIcons.NetworkNode />
            <span>PING: <strong className="text-emerald-400 font-medium">12ms</strong></span>
          </div>
        </div>

        {/* 2. DESKTOP NAVIGATION - Shared layout ID underline */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="relative px-4 py-2 text-xs font-medium uppercase tracking-wider text-neutral-400 hover:text-white transition-colors duration-200"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="relative z-10">{link.label}</span>
              {hoveredIndex === idx && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute inset-0 bg-white/[0.03] border-b-2 border-emerald-500 rounded-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={springTransition}
                />
              )}
            </a>
          ))}
        </nav>

        {/* 3. CTA CONTROLS - Tactile spring-based interactions */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ x: -2 }}
            className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors py-2 px-3"
          >
            <NavIcons.Terminal />
            <span>Log In</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={springTransition}
            className="relative group overflow-hidden rounded-md bg-[#111] hover:bg-[#151515] text-white border border-white/[0.08] hover:border-emerald-500/30 text-xs font-mono uppercase tracking-widest py-2.5 px-5 transition-colors duration-200"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              Start Match <Icons.ArrowRight />
            </span>
          </motion.button>
        </div>

        {/* MOBILE MENU TRIGGER BUTTON */}
        <div className="flex md:hidden items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-md bg-white/[0.02] border border-white/[0.06] text-white hover:text-emerald-400 transition-colors"
          >
            {isMobileOpen ? <NavIcons.MenuClose /> : <NavIcons.MenuOpen />}
          </motion.button>
        </div>
      </motion.header>

      {/* 4. PREMIUM MOBILE DRAWER PANEL - Spring transitions & layered blur */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-lg flex flex-col justify-between pt-24 px-6 pb-12 md:hidden"
          >
            {/* Background geometric grid texture for depth */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />

            {/* Staggered Navigation Items */}
            <div className="flex flex-col gap-6 relative z-10 mt-6">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                SYSTEM MODULES
              </span>
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -10, opacity: 0 }}
                    transition={{ delay: idx * 0.08, type: "spring", stiffness: 150 }}
                    className="text-2xl font-bold tracking-tight text-neutral-300 hover:text-emerald-400 flex items-center justify-between group py-2 border-b border-white/[0.03]"
                  >
                    <span>{link.label}</span>
                    <span className="text-neutral-600 text-xs font-mono group-hover:text-emerald-400 transition-colors">
                      [0{idx + 1}]
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile Actions Panel */}
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-6 mb-4 text-xs font-mono text-neutral-500">
                <span>GATEWAY: LIVE-NET</span>
                <span>PING: 12ms</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="py-3.5 bg-white/[0.02] border border-white/[0.08] hover:border-neutral-700 rounded-md text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="py-3.5 bg-emerald-500 text-[#050505] rounded-md text-xs font-mono font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center justify-center gap-1.5 shadow-[0_4px_20px_rgba(34,197,94,0.2)]"
                >
                  Start Match <Icons.ArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- RESPONSIVE ANIMATION VARIANT GENERATOR ---
// --- ENHANCED RESPONSIVE ANIMATION VARIANT GENERATOR ---
const getHeroVariants = (direction, isMobile) => {
  const travelDist = isMobile ? 12 : 35;

  const directions = {
    left: { x: -travelDist, y: 0 },
    right: { x: travelDist, y: 0 },
    top: { x: 0, y: -travelDist },
    bottom: { x: 0, y: travelDist }
  };

  const startState = directions[direction] || { x: 0, y: 0 };

  return {
    hidden: {
      opacity: 0,
      ...startState,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: isMobile ? 150 : 100,
        damping: isMobile ? 20 : 15,
        mass: 1,
        duration: 0.8
      }
    }
  };
};

// --- HIGH-PERFORMANCE MAINBOARD BACKGROUND ILLUSTRATION ---
function FaceOffBackground() {
  return (
    <svg
      className="w-full h-full text-neutral-900/30"
      viewBox="0 0 1000 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="glow-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="glow-emerald" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Schematic grid mesh lines */}
      <path d="M 100,0 L 100,600 M 300,0 L 300,600 M 500,0 L 500,600 M 700,0 L 700,600 M 900,0 L 900,600" stroke="#1f2937" strokeWidth="0.5" strokeOpacity="0.3" />
      <path d="M 0,100 L 1000,100 M 0,300 L 1000,300 M 0,500 L 1000,500" stroke="#1f2937" strokeWidth="0.5" strokeOpacity="0.3" />

      {/* Abstract faceoff target circles */}
      <circle cx="250" cy="300" r="180" stroke="url(#glow-cyan)" strokeWidth="1" strokeDasharray="5 10" />
      <circle cx="750" cy="300" r="180" stroke="url(#glow-emerald)" strokeWidth="1" strokeDasharray="5 10" />

      {/* Central data nodes */}
      <line x1="250" y1="300" x2="750" y2="300" stroke="#374151" strokeWidth="1" strokeDasharray="4 8" strokeOpacity="0.4" />
      <circle cx="500" cy="300" r="6" fill="#10b981" fillOpacity="0.3" />
      <circle cx="500" cy="300" r="15" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.2" />
    </svg>
  );
}

// --- EXACT UPLOADED IMAGES ---
const SLIDER_IMAGES = [
  predictionDuel, // Prediction Duel
  reactionSignal, // Reaction Signal
  penaltyShootout, // Penalty Shootout
  rockPaperScissors, // Rock Paper Scissors
  ticTacToe  // Tic Tac Toe
];
// --- TYPEWRITER CONFIGURATION ---
const TYPE_WORDS = [
  { text: "Creators", color: "text-cyan-400" },
  { text: "Founders", color: "text-purple-400" },
  { text: "Developers", color: "text-emerald-400" },
  { text: "Dreamers", color: "text-orange-400" },
  { text: "Innovators", color: "text-pink-400" }
];

// --- FLOATING DECORATIVE EMOJIS (Controlled Chaos Configuration) ---
const FLOATING_EMOJIS = [
  { char: "✨", top: "10%", left: "4%", scale: 1.3, duration: 8, delay: 0 },
  { char: "🔥", top: "72%", left: "6%", scale: 1.1, duration: 9, delay: 1 },
  { char: "💫", top: "12%", left: "88%", scale: 1.2, duration: 7, delay: 0.5 },
  { char: "💡", top: "58%", left: "92%", scale: 1.0, duration: 10, delay: 3 },
  { char: "😎", top: "82%", left: "38%", scale: 1.3, duration: 12, delay: 1.5 },
  { char: "🌈", top: "48%", left: "12%", scale: 0.9, duration: 13, delay: 2.5 },
  { char: "⚡", top: "32%", left: "82%", scale: 1.5, duration: 8.5, delay: 0.8 }
];

// --- AMBIENT GLOW/SPARK DECORATIVE ACCENTS (Pure CSS/SVG) ---
function TechSparkle({ className }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg className="w-6 h-6 text-emerald-400 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
}
// --- SPECIFIED GIFS & STICKERS ---
const PLATFORM_GIFS = {
  moneyPenguin: "https://media.tenor.com/7-G9wshYmPAAAAAM/money-penguin-bag.gif",
  greenDancer: "https://i.gifer.com/y5.gif",
  jumpingPikachu: "https://i.gifer.com/6vw5.gif"
};
// --- REVISED CINEMATIC RESPONSIVE HERO SECTION ---
function HeroSection() {
  const wagersCount = useAnimatedNumber(1.2, 1, 100, "M+");
  const matchesCount = useAnimatedNumber(250, 0, 80, "K+");
  const countriesCount = useAnimatedNumber(100, 0, 50, "+");

  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

  const containerRef = useRef(null);

  // --- TYPEWRITER STATE SYSTEM ---
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPE_WORDS[wordIndex].text;
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length - 1));
      }, 60);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentWord.substring(0, typedText.length + 1));
      }, 100);
    }

    if (!isDeleting && typedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % TYPE_WORDS.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  // Responsive device classification
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slider transition loop
  useEffect(() => {
    if (isSliderHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isSliderHovered]);

  // --- SCROLL DRIVEN ASSEMBLY/TEARING SYSTEMS ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    restDelta: 0.001
  });

  const statsX = useTransform(smoothProgress, [0, 1], [0, isMobile ? 10 : 55]);
  const statsY = useTransform(smoothProgress, [0, 1], [0, isMobile ? 30 : 95]);
  const statsOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);

  const contentAreaX = useTransform(smoothProgress, [0, 1], [0, isMobile ? -30 : -110]);
  const contentAreaY = useTransform(smoothProgress, [0, 1], [0, isMobile ? 20 : 65]);
  const contentAreaRotate = useTransform(smoothProgress, [0, 1], [0, isMobile ? -1 : -4]);
  const contentAreaOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);

  const sliderFrameX = useTransform(smoothProgress, [0, 1], [0, isMobile ? 30 : 130]);
  const sliderFrameY = useTransform(smoothProgress, [0, 1], [0, isMobile ? 40 : 95]);
  const sliderFrameRotate = useTransform(smoothProgress, [0, 1], [0, isMobile ? 2 : 8]);
  const sliderFrameOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0]);

  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.8], [0.85, 0]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const getMotionProps = (direction) => {
    const variants = getHeroVariants(direction, isMobile);
    if (isMobile) {
      return {
        variants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: false, amount: 0.1 }
      };
    }
    return { variants };
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen lg:h-screen lg:min-h-[650px] lg:max-h-[920px] flex items-center justify-center px-6 lg:px-12 pt-28 lg:pt-16 pb-12 overflow-hidden z-10"
    >

      {/* 1. LAYERED SCHEMATIC BACKGROUND */}
      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <FaceOffBackground />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/[0.04] blur-[140px] mix-blend-screen" />
        <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/[0.04] blur-[120px] mix-blend-screen" />
      </motion.div>

      {/* 2. SPARKLE & GLOW TECH ACCENTS */}
      <TechSparkle className="top-24 left-[20%] animate-pulse" />
      <TechSparkle className="bottom-32 right-[45%] [animation-delay:1.5s]" />
      <TechSparkle className="top-1/2 right-[12%] [animation-delay:0.8s]" />

      {/* 3. FLOATING DECORATIVE EMOJIS (Integrated background layout path) */}
      {FLOATING_EMOJIS.map((emoji, index) => {
        const isLeft = parseFloat(emoji.left) < 50;
        const driftX = isLeft ? -1.5 : 1.5;

        return (
          <motion.div
            key={index}
            style={{
              top: emoji.top,
              left: emoji.left,
              x: useTransform(smoothProgress, [0, 1], [0, isLeft ? -100 : 100]),
              y: useTransform(smoothProgress, [0, 1], [0, -70]),
              opacity: useTransform(smoothProgress, [0, 0.8], [1, 0])
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, driftX * 4, 0],
              scale: [emoji.scale, emoji.scale * 1.05, emoji.scale]
            }}
            transition={{
              repeat: Infinity,
              duration: emoji.duration,
              delay: emoji.delay,
              ease: "easeInOut"
            }}
            className="absolute pointer-events-none select-none text-2xl z-10 opacity-60"
          >
            {emoji.char}
          </motion.div>
        );
      })}

      {/* 4. BALANCED SPLIT LAYOUT GRID */}
      <motion.div
        variants={!isMobile ? containerVariants : undefined}
        initial={!isMobile ? "hidden" : undefined}
        whileInView={!isMobile ? "visible" : undefined}
        viewport={!isMobile ? { once: false, amount: 0.25 } : undefined}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-20"
      >

        {/* LEFT COMPARTMENT: TYPOGRAPHY & ACTIONS */}
        <motion.div
          style={!isMobile ? { x: contentAreaX, y: contentAreaY, rotate: contentAreaRotate, opacity: contentAreaOpacity } : undefined}
          className="lg:col-span-6 flex flex-col justify-center gap-6 lg:gap-8 relative"
        >
          {/* Platform Status Pill with Integrated Emojis */}
          <motion.div
            {...getMotionProps("left")}
            className="order-1 lg:order-none self-center lg:self-start flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111]/90 border border-white/[0.08] shadow-[inset_0_1px_12px_rgba(255,255,255,0.02)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] uppercase tracking-widest font-black text-neutral-300 font-mono">
              ⚡ LIVE GATEWAY: 12,042 IN ARENA 🚀
            </span>
          </motion.div>

          {/* Heading Block with Integrated Typewriter & Sparkle Emojis */}
          {/* Heading Block */}
          <motion.h1
            {...getMotionProps("left")}
            className="order-2 lg:order-none text-center lg:text-left font-black text-[3rem] sm:text-[4rem] min-[71.25rem]:text-[4.5rem] leading-[1.08] tracking-tight select-none"
          >
            <span className="block bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              Challenge. ✨
            </span>
            <span className="block bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">
              Compete. 🔥
            </span>
            <span className="block h-[1.2em] overflow-hidden whitespace-nowrap">
              <span className="text-white">For </span>
              <span className={`transition-colors duration-500 ${TYPE_WORDS[wordIndex].color}`}>
                {typedText}
              </span>
              <span className="animate-pulse font-light text-neutral-400">|</span>
            </span>
          </motion.h1>

          {/* Narrative Details with Integrated Trophy Emoji */}
          <motion.p
            {...getMotionProps("left")}
            className="order-3 lg:order-none text-neutral-400 text-center lg:text-left text-sm sm:text-base leading-relaxed font-light max-w-lg mx-auto lg:mx-0"
          >
            Play skill-based games against real players worldwide. Stake dollars. Win the prize pool. <strong className="text-white font-medium">No luck. No house advantage. 🏆</strong>
          </motion.p>

          {/* Call-to-Action Controls with Integrated Emojis */}
          <motion.div
            {...getMotionProps("bottom")}
            className="order-4 lg:order-none flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto lg:mx-0 justify-center lg:justify-start relative"
          >
            <button className="w-full sm:w-auto relative group overflow-hidden rounded-lg bg-[#22C55E] hover:bg-emerald-400 text-[#050505] font-black text-xs py-3.5 px-6 transition-all duration-300 shadow-[0_4px_20px_rgba(34,197,94,0.25)] hover:shadow-[0_6px_25px_rgba(34,197,94,0.4)] flex items-center justify-center">
              <span className="relative z-10 flex items-center gap-1.5 uppercase tracking-wider">Start Playing Now 🔥 <Icons.ArrowRight /></span>
            </button>
            <button className="w-full sm:w-auto rounded-lg bg-[#111111] hover:bg-[#171717] border border-white/[0.08] text-white font-semibold text-xs py-3.5 px-6 transition-all duration-200 flex items-center justify-center gap-2">
              <Icons.Play /> Watch Demo Video
            </button>
          </motion.div>

        </motion.div>

        {/* RIGHT COMPARTMENT: ATTACHED SIDEBAR COMPOSITE WIDGET */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">

          {/* GREEN DANCING CHARACTER STICKER */}
          {!isMobile && (
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-16 -right-10 w-24 h-24 pointer-events-none z-30 select-none drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)] right-[40px]"
            >
              <img src={PLATFORM_GIFS.greenDancer} alt="Dancing Alien" className="w-full h-full object-contain" />
            </motion.div>
          )}

          {/* JUMPING PIKACHU STICKER */}
          {!isMobile && (
            <motion.div
              animate={{ x: [0, 5, 0], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -bottom-10 right-12 w-20 h-20 pointer-events-none z-30 select-none drop-shadow-[0_10px_20px_rgba(234,179,8,0.3)]"
            >
              <img src={PLATFORM_GIFS.jumpingPikachu} alt="Jumping Pikachu" className="w-full h-full object-contain" />
            </motion.div>
          )}

          {/* Connected Layout Flex Container */}
          <div className="flex flex-col lg:flex-row items-center justify-center lg:items-stretch gap-4 lg:gap-0 w-full max-w-md mx-auto origin-center" style={{ rotate: "350deg" }}>

            {/* Performance Statistics (Connected Left Column) */}
            <motion.div
              style={!isMobile ? { x: statsX, y: statsY, opacity: statsOpacity } : undefined}
              {...getMotionProps("bottom")}
              className="order-2 lg:order-1 flex flex-col justify-around gap-4 border border-white/[0.08] bg-[#0A0A0A]/95 p-5 w-[75vw] sm:w-[320px] lg:w-[130px] xl:w-[145px] rounded-2xl lg:rounded-r-none border-b lg:border-b-white/[0.08] lg:border-r-0 backdrop-blur z-20"
            >
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-[1.2rem] xl:text-[1.35rem] font-black text-white font-mono leading-none">{wagersCount}</div>
                <div className="text-[9px] text-neutral-500 uppercase tracking-widest mt-1.5 leading-none">Total Stake 💰</div>
              </div>
              <div className="text-center lg:text-left border-t lg:border-t border-white/[0.06] pt-3.5 lg:pt-2">
                <div className="text-xl sm:text-2xl lg:text-[1.2rem] xl:text-[1.35rem] font-black text-white font-mono leading-none">{matchesCount}</div>
                <div className="text-[9px] text-neutral-500 uppercase tracking-widest mt-1.5 leading-none">Matches Done 🥊</div>
              </div>
              <div className="text-center lg:text-left border-t lg:border-t border-white/[0.06] pt-3.5 lg:pt-2">
                <div className="text-xl sm:text-2xl lg:text-[1.2rem] xl:text-[1.35rem] font-black text-white font-mono leading-none">{countriesCount}</div>
                <div className="text-[9px] text-neutral-500 uppercase tracking-widest mt-1.5 leading-none">Active Regions 🌐</div>
              </div>
            </motion.div>

            {/* Image Slider Frame (Right Component) */}
            <motion.div
              style={!isMobile ? { x: sliderFrameX, y: sliderFrameY, rotate: sliderFrameRotate, opacity: sliderFrameOpacity } : undefined}
              {...getMotionProps("right")}
              className="order-1 lg:order-2 w-[75vw] sm:w-[320px] lg:w-[270px] xl:w-[305px] aspect-[10/15] relative group rounded-2xl lg:rounded-l-none overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#111] z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10 pointer-events-none" />
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded bg-[#050505]/80 border border-white/[0.08] backdrop-blur text-[8px] font-mono text-neutral-300 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LOBBY FEED // CH: 0{currentSlide + 1}
              </div>

              {/* Slide Images */}
              <div className="w-full h-full relative">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={currentSlide}
                    src={SLIDER_IMAGES[currentSlide]}
                    alt={`Gameplay Highlight 0${currentSlide + 1}`}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1.02 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                  />
                </AnimatePresence>
              </div>

              {/* Micro Navigation Dot Bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {SLIDER_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-emerald-400 w-4" : "bg-neutral-500 hover:bg-neutral-300"
                      }`}
                  />
                ))}
              </div>

              {/* Slide Manual Controls */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#050505]/70 hover:bg-emerald-500 hover:text-black border border-white/[0.05] text-neutral-400 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 duration-300 text-xs"
              >
                ◀
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#050505]/70 hover:bg-emerald-500 hover:text-black border border-white/[0.05] text-neutral-400 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 duration-300 text-xs"
              >
                ▶
              </button>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none select-none z-20"
      >
        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">SCROLL</span>
        <motion.svg
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-3.5 h-3.5 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
        </motion.svg>
      </motion.div>

    </section>
  );
}

// --- MATCHMAKING SECTION ---
function MatchmakingSection() {
  const [matchState, setMatchState] = useState("idle"); // idle, searching, found, staging
  const timerRef = useRef(null);

  const startSimulation = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMatchState("searching");

    // Match Found trigger after 3.5s
    timerRef.current = setTimeout(() => {
      setMatchState("found");

      // Reset back to idle or show live action loop after a bit
      timerRef.current = setTimeout(() => {
        setMatchState("staging");
      }, 5000);
    }, 3500);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0A0A] border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Direct Matchmaking
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Real Competitors. Instantly Connected.
          </h2>
          <p className="text-neutral-400">
            Our high-frequency Matchmaking Engine pairs you with globally ranked opponents of equivalent skill in under 5 seconds.
          </p>
        </div>

        {/* Live Simulation Arena */}
        <div className="relative bg-[#111111] border border-white/[0.08] rounded-2xl p-6 md:p-12 overflow-hidden shadow-2xl max-w-4xl mx-auto">

          {/* Action Trigger Button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={startSimulation}
              disabled={matchState === "searching" || matchState === "found"}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-bold text-xs rounded-md transition-colors duration-150 shadow-md"
            >
              {matchState === "searching" && "FINDING OPPONENT..."}
              {matchState === "found" && "MATCH CONCLUDED"}
              {(matchState === "idle" || matchState === "staging") && "TEST SIMULATOR"}
            </button>
          </div>

          <div className="relative min-h-[300px] flex flex-col justify-between items-center z-10 py-4">

            {/* The Staging Layout */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 relative">

              {/* Player Card Left */}
              <motion.div
                className="w-full md:w-64 bg-[#171717] rounded-xl p-5 border border-white/[0.08] relative overflow-hidden"
                animate={
                  matchState === "found"
                    ? { x: [0, 40, 0], scale: 1.05 }
                    : matchState === "searching"
                      ? { x: [-10, 0, -10], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }
                      : { x: 0 }
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-cyan-600 flex items-center justify-center font-bold text-xs">
                    P1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Alex_D</h4>
                    <span className="text-[10px] text-emerald-500 font-mono">STAKE: $50.00</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-between text-[11px] text-neutral-400">
                  <span>Ping: 14ms</span>
                  <span>Rank: Gold II</span>
                </div>
                {/* Glowing Side bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400" />
              </motion.div>

              {/* Center Stage / Pulse / VS */}
              <div className="relative flex flex-col items-center justify-center w-24 h-24">
                <AnimatePresence mode="wait">
                  {matchState === "searching" && (
                    <motion.div
                      key="searching"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex flex-col items-center justify-center"
                    >
                      <div className="relative flex h-10 w-10 items-center justify-center mb-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
                        <div className="h-6 w-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                      </div>
                      <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider animate-pulse">Searching</span>
                    </motion.div>
                  )}

                  {matchState === "found" && (
                    <motion.div
                      key="found"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: [1.2, 1], opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center relative z-20"
                    >
                      <div className="bg-emerald-500 text-[#050505] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-bounce">
                        MATCH FOUND
                      </div>
                      <div className="text-xs text-neutral-400 mt-2 font-mono">PRIZE POOL</div>
                      <div className="text-xl font-black text-emerald-400 font-mono">$100.00</div>
                    </motion.div>
                  )}

                  {(matchState === "idle" || matchState === "staging") && (
                    <motion.div
                      key="vs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <span className="text-3xl font-black tracking-widest text-neutral-600 block italic">VS</span>
                      <span className="text-[9px] text-neutral-400 uppercase tracking-widest">Wager $50</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Player Card Right */}
              <motion.div
                className="w-full md:w-64 bg-[#171717] rounded-xl p-5 border border-white/[0.08] relative overflow-hidden"
                animate={
                  matchState === "found"
                    ? { x: [0, -40, 0], scale: 1.05 }
                    : matchState === "searching"
                      ? { x: [10, 0, 10], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }
                      : { x: 0 }
                }
              >
                <div className="flex items-center gap-3 justify-end md:justify-start">
                  <div className="md:order-1 text-right md:text-left">
                    <h4 className="text-sm font-bold text-white">Slayer_X</h4>
                    <span className="text-[10px] text-emerald-500 font-mono">STAKE: $50.00</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-xs md:order-none">
                    P2
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-between text-[11px] text-neutral-400">
                  <span>Ping: 22ms</span>
                  <span>Rank: Gold I</span>
                </div>
                {/* Glowing Side bar */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-emerald-400" />
              </motion.div>

            </div>

            {/* Simulated Match Process Steps */}
            <div className="w-full mt-12 grid grid-cols-4 gap-2 border-t border-white/[0.04] pt-8">
              <StepIndicator step={1} title="Join Match" active={matchState === "searching" || matchState === "found" || matchState === "staging"} />
              <StepIndicator step={2} title="Ready Up" active={matchState === "found" || matchState === "staging"} />
              <StepIndicator step={3} title="Compete" active={matchState === "found" || matchState === "staging"} />
              <StepIndicator step={4} title="Winner Paid" active={matchState === "staging"} highlight />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function StepIndicator({ step, title, active, highlight }) {
  return (
    <div className="text-center flex flex-col items-center">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${active
        ? highlight ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]" : "bg-cyan-500 text-black"
        : "bg-[#171717] text-neutral-600 border border-white/[0.04]"
        }`}>
        {step}
      </div>
      <span className={`text-[10px] md:text-xs mt-2 font-medium transition-colors ${active ? "text-white" : "text-neutral-600"
        }`}>{title}</span>
    </div>
  );
}

// --- FEATURED GAMES SECTION ---
const GAMES = [
  {
    id: "rps",
    title: "Rock Paper Scissors",
    tagline: "High stakes gesture war. Mind games only.",
    component: RPSPreview
  },
  {
    id: "shootout",
    title: "Penalty Shootout",
    tagline: "Outsmart the keeper. 5 shots to take the pot.",
    component: PenaltyPreview
  },
  {
    id: "reaction",
    title: "Reaction Challenge",
    tagline: "Millisecond precision wins. Absolute focus.",
    component: ReactionPreview
  },
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    tagline: "Perfect strategy. No room for simple mistakes.",
    component: TicTacToePreview
  },
  {
    id: "connectfour",
    title: "Connect Four",
    tagline: "Visual grid planning. Build the path to victory.",
    component: ConnectFourPreview
  }
];

function FeaturedGamesSection() {
  const [hoveredGame, setHoveredGame] = useState(null);

  return (
    <section id="games" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              5 Competitive Titles
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Skill Only. No Chance.
            </h2>
          </div>
          <p className="text-neutral-400 max-w-md">
            All battles run purely on CSS-state machines and deterministic logic frameworks. Zero house bias, ever.
          </p>
        </div>

        {/* CSS/Framer Motion Interactive Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map((game, idx) => {
            const GameDemo = game.component;
            return (
              <motion.div
                key={game.id}
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
                className="relative bg-[#0A0A0A] rounded-xl border border-white/[0.08] p-6 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between min-h-[400px] overflow-hidden group shadow-lg"
                whileHover={{ y: -4 }}
              >
                {/* Micro Animated Background gradient shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-500/[0.01] pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 font-mono">
                      0{idx + 1} / Arena
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-6">
                    {game.tagline}
                  </p>
                </div>

                {/* Simulated Game Board Viewport */}
                <div className="w-full h-44 bg-[#111111] border border-white/[0.04] rounded-lg relative overflow-hidden flex items-center justify-center">
                  <GameDemo isHovered={hoveredGame === game.id} />
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors flex items-center gap-1.5">
                    Select Game <Icons.ArrowRight />
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500/80 bg-emerald-500/5 px-2.5 py-1 rounded-full border border-emerald-500/10">
                    STAKES $1 - $500
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- MICRO DEMO PLAYERS (Pure CSS & Framer Motion Previews) ---

function RPSPreview({ isHovered }) {
  return (
    <div className="relative w-full h-full flex items-center justify-around px-4">
      <motion.div
        animate={isHovered ? { x: [0, 10, 0] } : {}}
        transition={{ repeat: Infinity, duration: 1 }}
        className="text-4xl"
      >
        ✊
      </motion.div>
      <div className="text-xs font-black text-neutral-600">VS</div>
      <motion.div
        animate={isHovered ? { x: [0, -10, 0], scale: [1, 1.2, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1 }}
        className="text-4xl"
      >
        ✋
      </motion.div>
      {isHovered && (
        <div className="absolute bottom-2 text-[9px] text-emerald-400 font-mono animate-pulse">
          Paper wraps Rock. Player 2 Wins.
        </div>
      )}
    </div>
  );
}

function PenaltyPreview({ isHovered }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center px-6">
      <div className="w-40 h-20 border-b-0 border-2 border-dashed border-neutral-700 relative rounded-t-md flex items-center justify-center">
        {/* Goalie glove */}
        <motion.div
          animate={isHovered ? { x: [-30, 30, -30] } : { x: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-4 h-4 bg-red-500 rounded-sm absolute top-2 flex items-center justify-center text-[8px] font-bold"
        >
          🧤
        </motion.div>

        {/* Football */}
        <motion.div
          animate={isHovered ? { y: [40, -20, 40], scale: [1, 0.4, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute bottom-[-10px] text-lg"
        >
          ⚽
        </motion.div>
      </div>
    </div>
  );
}

function ReactionPreview({ isHovered }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={isHovered ? {
          backgroundColor: ["#EF4444", "#EF4444", "#10B981", "#10B981"],
          scale: [1, 1, 1.1, 1]
        } : { backgroundColor: "#EF4444" }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="w-16 h-16 rounded-full flex flex-col items-center justify-center text-center p-2 cursor-pointer shadow-lg"
      >
        <span className="text-[10px] font-black text-black select-none">
          {isHovered ? "WAIT..." : "READY"}
        </span>
      </motion.div>
      {isHovered && (
        <div className="absolute bottom-2 text-[10px] font-mono text-cyan-400">
          Reaction Time: 182ms
        </div>
      )}
    </div>
  );
}

function TicTacToePreview({ isHovered }) {
  return (
    <div className="grid grid-cols-3 gap-1 w-24 h-24">
      {[...Array(9)].map((_, i) => {
        let draw = "";
        if (i === 0) draw = "X";
        if (i === 4) draw = "O";
        if (i === 8 && isHovered) draw = "X";
        return (
          <div key={i} className="bg-[#171717] rounded flex items-center justify-center border border-white/[0.04]">
            <span className={`text-sm font-black ${draw === "X" ? "text-emerald-400" : "text-cyan-400"}`}>
              {draw}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ConnectFourPreview({ isHovered }) {
  return (
    <div className="w-28 h-24 bg-neutral-900 border border-neutral-800 rounded p-1 flex flex-col justify-end gap-1">
      <div className="grid grid-cols-4 gap-1">
        {[...Array(12)].map((_, i) => {
          const filled = i > 4;
          const isPlayerOne = i % 2 === 0;
          return (
            <div key={i} className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
              {filled && (
                <div className={`w-4 h-4 rounded-full ${isPlayerOne ? "bg-emerald-500" : "bg-cyan-500"}`} />
              )}
              {!filled && isHovered && i === 3 && (
                <motion.div
                  animate={{ y: [-15, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-4 h-4 rounded-full bg-emerald-500"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- HOW IT WORKS SECTION ---
const STEPS = [
  {
    num: "01",
    title: "Deposit Funds",
    desc: "Connect your card, PayPal or Web3 wallet. Load instantly with absolute top-tier security measures."
  },
  {
    num: "02",
    title: "Choose Game",
    desc: "Pick your competitive weapon from our catalog of pure deterministic skill titles."
  },
  {
    num: "03",
    title: "Join Match",
    desc: "Stake your wager. Match instantly with another player risking the same amount."
  },
  {
    num: "04",
    title: "Winner Paid",
    desc: "Execute best of three rounds. Instant execution. Smart contract transfers pot immediately."
  }
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-[#0A0A0A] border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Flow Engine
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-neutral-400">
            Four streamlined stages built to maximize velocity and guarantees of safe funds transfer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-[#111111] border border-white/[0.08] rounded-xl p-6 h-full relative z-10 hover:border-emerald-500/20 transition-all duration-300">
                <span className="block font-mono font-bold text-emerald-500 text-sm mb-4">
                  STEP {step.num}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>

              {/* Connector lines visual (Desktop) */}
              {idx < 3 && (
                <div className="hidden lg:block absolute top-1/2 right-[-16px] w-[32px] h-[1px] bg-gradient-to-r from-emerald-500/40 to-transparent z-0 pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- LIVE ACTIVITY FEED ---
const LIVE_WINS = [
  { player: "Valkyrie_44", game: "Rock Paper Scissors", amount: 120, time: "Just now" },
  { player: "MagePro", game: "Penalty Shootout", amount: 240, time: "2m ago" },
  { player: "Zero_Cool", game: "Reaction Challenge", amount: 45, time: "4m ago" },
  { player: "Shadow_Step", game: "Connect Four", amount: 90, time: "5m ago" },
  { player: "GridLord", game: "Tic Tac Toe", amount: 110, time: "8m ago" },
  { player: "Cipher_9", game: "Penalty Shootout", amount: 300, time: "10m ago" }
];

function LiveActivitySection() {
  return (
    <section className="py-12 bg-[#050505] overflow-hidden border-b border-white/[0.04]">
      <div className="w-full flex flex-col gap-4">
        <div className="text-center mb-2">
          <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-black">
            🔴 Live Arena Action
          </span>
        </div>

        {/* Infinite Marquee Feed Container */}
        <div className="relative flex overflow-x-hidden w-full group mask-gradient">
          <div className="animate-marquee flex whitespace-nowrap gap-6 py-2">
            {LIVE_WINS.concat(LIVE_WINS).map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-3 bg-[#111111] border border-white/[0.06] rounded-full py-2.5 px-6 shadow-md"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-white">{item.player}</span>
                <span className="text-[10px] text-neutral-500 uppercase font-bold">{item.game}</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  +${item.amount}.00
                </span>
                <span className="text-[9px] text-neutral-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- PAYMENTS SECTION ---
const PAYMENT_METHODS = [
  { name: "Visa / Mastercard", logo: "💳" },
  { name: "PayPal", logo: "🅿️" },
  { name: "Bitcoin", logo: "₿" },
  { name: "Ethereum", logo: "Ξ" },
  { name: "USDT", logo: "₮" }
];

function PaymentsSection() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Lightning Settlement
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Deposit in Seconds.<br />Withdraw Globally.
            </h2>
            <p className="text-neutral-400 mb-8 leading-relaxed">
              We settle accounts in real-time. Whether utilizing traditional banking infrastructure or secure layer-2 blockchain assets, balances remain constantly visible and stable in USD equivalent valuations.
            </p>

            <div className="flex flex-wrap gap-3">
              {PAYMENT_METHODS.map((method, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-[#111111] border border-white/[0.06] rounded-lg py-2 px-4 text-xs font-semibold text-neutral-300"
                >
                  <span className="text-sm">{method.logo}</span>
                  {method.name}
                </div>
              ))}
            </div>
          </div>

          {/* Secure Deposit Panel Visual */}
          <div className="bg-[#111111] border border-white/[0.08] rounded-xl p-8 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-6 mb-6">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Instant Deposit Interface
              </span>
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded">
                SECURE ENDPOINT
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-2">Select Currency</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="bg-[#171717] hover:bg-neutral-800 border border-emerald-500/40 text-white rounded-lg py-3 text-xs font-bold transition-all">
                    🇺🇸 USD
                  </button>
                  <button className="bg-[#171717] hover:bg-[#202020] border border-transparent text-neutral-400 rounded-lg py-3 text-xs font-bold transition-all">
                    🪙 USDT
                  </button>
                  <button className="bg-[#171717] hover:bg-[#202020] border border-transparent text-neutral-400 rounded-lg py-3 text-xs font-bold transition-all">
                    ⚡ BTC
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-2">Amount (USD)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 font-bold">$</div>
                  <input
                    type="text"
                    readOnly
                    value="150.00"
                    className="w-full bg-[#171717] border border-white/[0.06] rounded-lg py-3 pl-8 pr-4 text-sm font-bold font-mono focus:outline-none focus:border-emerald-500/40 text-white"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-black text-xs rounded-lg uppercase tracking-wider transition-colors duration-150">
                  Execute Deposit
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-neutral-500">
                <Icons.Lock /> Protected by SSL AES-256 standard encryption.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- TRUST SECTION ---
const TRUST_CARDS = [
  {
    icon: Icons.Scale,
    title: "Skill-Based Outcomes",
    desc: "Every battle resolves entirely on player input. Randomness factors do not exist. May the absolute best operator win."
  },
  {
    icon: Icons.Lock,
    title: "Secure Payments",
    desc: "Transactions pass through standard fintech processors. All active platform balances remain isolated in secure custody accounts."
  },
  {
    icon: Icons.Users,
    title: "Global Matchmaking",
    desc: "Round-the-clock availability with high speed connection points across EU, US, ASIA, and LATAM."
  },
  {
    icon: Icons.Shield,
    title: "No House Participation",
    desc: "We operate exclusively as facilitators of matches. We never gamble or trade against players."
  }
];

function TrustSection() {
  return (
    <section id="security" className="py-24 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Secured Integrity
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Pure Play. Safe Settlement.
          </h2>
          <p className="text-neutral-400">
            We are not a casino. The house has zero edge because the house is not in the match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_CARDS.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#111111]/60 border border-white/[0.06] hover:border-emerald-500/20 rounded-xl p-6 transition-all duration-300"
              >
                <div className="mb-4">
                  <IconComponent />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- WORLDWIDE SECTION (SVG MAP) ---
function WorldwideSection() {
  return (
    <section id="worldwide" className="py-24 bg-[#0A0A0A] relative overflow-hidden border-y border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-4">
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Decentralized Nodes
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Globally Scalable Infrastructure
            </h2>
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
              We leverage an optimized global routing network minimizing regional lag. Play high-stakes matches synchronously from 100+ countries with millisecond accuracy.
            </p>
            <div className="border-t border-white/[0.06] pt-6 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500 font-medium">Average Match Latency:</span>
                <span className="text-emerald-400 font-mono font-semibold">18ms</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500 font-medium">Uptime Guarantee:</span>
                <span className="text-emerald-400 font-mono font-semibold">99.99%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500 font-medium">Matchmaking nodes:</span>
                <span className="text-emerald-400 font-mono font-semibold">Edge Locations Global</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 relative">
            {/* Animated SVG minimalist vector map */}
            <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 shadow-2xl overflow-hidden flex items-center justify-center">
              <svg
                className="w-full h-auto max-h-[350px] text-neutral-800 opacity-90"
                viewBox="0 0 1000 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Simplified Continent Paths for vector aesthetic */}
                <path d="M150,150 L200,120 L250,150 L300,100 L350,160 L400,140 L380,250 L250,380 L200,320 Z" fill="#202020" />
                <path d="M450,120 L550,80 L650,120 L750,90 L850,140 L900,220 L800,350 L750,450 L650,380 L550,350 Z" fill="#1A1A1A" />
                <path d="M50,220 L100,200 L120,250 L80,300 Z" fill="#1E1E1E" />

                {/* Dynamic connection lines (SVG paths with moving strokes) */}
                <motion.path
                  d="M 230 140 C 350 180, 500 200, 620 130"
                  stroke="url(#cyan-gradient)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />

                <motion.path
                  d="M 620 130 C 650 250, 750 300, 770 330"
                  stroke="url(#emerald-gradient)"
                  strokeWidth="1.5"
                  strokeDasharray="8 8"
                  initial={{ strokeDashoffset: -100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                />

                <motion.path
                  d="M 230 140 C 250 250, 200 320, 250 380"
                  stroke="url(#cyan-gradient)"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />

                {/* Pulsing City node markers */}
                <circle cx="230" cy="140" r="4" fill="#00E5FF" />
                <circle cx="230" cy="140" r="10" stroke="#00E5FF" strokeWidth="1.5" fill="none" className="animate-ping" style={{ transformOrigin: '230px 140px', animationDuration: '3s' }} />

                <circle cx="620" cy="130" r="4" fill="#22C55E" />
                <circle cx="620" cy="130" r="10" stroke="#22C55E" strokeWidth="1.5" fill="none" className="animate-ping" style={{ transformOrigin: '620px 130px', animationDuration: '2.5s' }} />

                <circle cx="770" cy="330" r="4" fill="#00E5FF" />
                <circle cx="250" cy="380" r="4" fill="#22C55E" />

                {/* Definitions for Gradients */}
                <defs>
                  <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- FINAL CTA SECTION ---
function FinalCTASection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#050505] flex items-center justify-center">
      {/* Background Radial Sweep */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[800px] h-[400px] rounded-full bg-emerald-500/10 blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6">
          Your Next Opponent<br />Is Waiting.
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
          Matches deploy immediately. Claim absolute control of your wagering experience without the interference of arbitrary house odds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
          <button className="w-full relative group overflow-hidden rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-black text-sm py-4 px-8 transition-all duration-300 shadow-[0_10px_30px_rgba(34,197,94,0.3)]">
            Play Now
          </button>
          <button className="w-full rounded-lg bg-[#111111] hover:bg-[#171717] border border-white/[0.08] text-white font-semibold text-sm py-4 px-8 transition-all duration-200">
            Learn More
          </button>
        </div>

        {/* Real-time ticker feedback */}
        <div className="mt-8 text-[11px] text-neutral-500 font-mono tracking-widest uppercase flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          4,129 ACTIVE MATCHES RIGHT NOW
        </div>
      </div>
    </section>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.04] pt-16 pb-12 text-sm text-neutral-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-7 h-7 flex items-center justify-center rounded bg-gradient-to-br from-emerald-500 to-cyan-400 p-[1.5px]">
              <div className="bg-[#0A0A0A] w-full h-full rounded-[3px] flex items-center justify-center font-black text-xs text-white">
                L
              </div>
            </div>
            <span className="font-bold text-white tracking-wider">
              LEON GAMES
            </span>
          </div>
          <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
            The premium international 1v1 skill matchmaking framework. Built for raw competitive capability, protected value custody, and clear transparency.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Games</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#games" className="hover:text-white transition-colors">Rock Paper Scissors</a></li>
            <li><a href="#games" className="hover:text-white transition-colors">Penalty Shootout</a></li>
            <li><a href="#games" className="hover:text-white transition-colors">Reaction Speed</a></li>
            <li><a href="#games" className="hover:text-white transition-colors">Tic Tac Toe</a></li>
            <li><a href="#games" className="hover:text-white transition-colors">Connect Four</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">System</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#security" className="hover:text-white transition-colors">Security Controls</a></li>
            <li><a href="#worldwide" className="hover:text-white transition-colors">Global Network</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Edge Infrastructure</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Regulatory</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Responsible Skill-Gaming</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Framework</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
        <div>
          © {new Date().getFullYear()} Leon Games Inc. All international rights protected.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">Telegram</a>
        </div>
      </div>
    </footer>
  );
}

// --- HELPER COMPONENT FOR LIVE NUMBER GROWING ---
function useAnimatedNumber(target, startValue = 0, speed = 80, suffix = "") {
  const [num, setNum] = useState(startValue);

  useEffect(() => {
    let current = startValue;
    const increment = (target - startValue) / speed;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(interval);
        setNum(target);
      } else {
        setNum(current);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [target, startValue, speed]);

  if (Number.isInteger(target)) {
    return `${Math.floor(num)}${suffix}`;
  }
  return `${num.toFixed(1)}${suffix}`;
}