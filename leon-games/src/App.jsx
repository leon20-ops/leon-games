import React, { useState, useEffect, useRef } from "react";
import { faker } from "@faker-js/faker";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import predictionDuel from "./assets/images/prediction-duel.png";
import reactionSignal from "./assets/images/reaction-signal.png";
import penaltyShootout from "./assets/images/penalty-shootout.png";
import rockPaperScissors from "./assets/images/rock-paper-scissors.png";
import ticTacToe from "./assets/images/tic-tac-toe.png";
import nigeriaVideo from "./assets/videos/nigeria-zoom-out-to-world.mp4";

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
      <FeaturedGamesSection />
      <VideoAdSection />
      <HowItWorksSection />
      <LiveActivitySection />
      <PaymentsSection />
      <TrustSection />
      <GrowthSection />
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

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

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

  // --- DETECT HOVER & SMOOTH FOLLOW AXIS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring physics configuration for clean, organic movement
  const followX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.5 });
  const followY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (isMobile) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative coordinates mapped from center (-0.5 to 0.5)
    const offsetX = (e.clientX - rect.left) / width - 0.5;
    const offsetY = (e.clientY - rect.top) / height - 0.5;

    // Constrain maximum displacement range to 16 pixels
    const maxDisplacement = 16;
    mouseX.set(offsetX * maxDisplacement);
    mouseY.set(offsetY * maxDisplacement);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
        animate: "visible"
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
        variants={containerVariants}
        initial="hidden"
        animate={isMobile ? "visible" : undefined}
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

          {/* Centered Flex Container mapping to content width */}
          <div className="flex justify-center lg:justify-start w-full order-2 lg:order-none">
            <div className="relative inline-block max-w-full px-6 sm:px-12 md:px-0">
              <motion.h1
                {...getMotionProps("left")}
                className="relative text-center lg:text-left font-black text-[3.5rem] sm:text-[4rem] min-[71.25rem]:text-[4rem] leading-[1.08] tracking-tight select-none"
              >
                <span className="block bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent ">
                  Challenge. ✨
                </span>
                <span className="block bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent ">
                  Compete. 🔥
                </span>
                <span className="block h-[1.2em] overflow-hidden whitespace-nowrap">
                  <span className="text-white">For </span>
                  <span className={`transition-colors duration-500 text-[2rem] sm:text-[3rem] min-[71.25rem]:text-[3.5rem] ${TYPE_WORDS[wordIndex].color}`}>
                    {typedText}
                  </span>
                  <span className="animate-pulse font-light text-neutral-400 text-[2rem] sm:text-[3rem] min-[71.25rem]:text-[3.5rem]">|</span>
                </span>
              </motion.h1>

              {/* Green Dancer Sticker */}
              <motion.div
                animate={{ y: [0, 6, 0], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute pointer-events-none z-30 select-none lg:hidden drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)]
                  /* 700px and Below (Increased Corner Accent Mode): */
                  max-md:-top-10 max-md:-right-2 max-md:w-15 max-md:h-15
                  /* 701px to 1023px (Increased Side-aligned Space Filler): */
                  md:top-1/2 md:-translate-y-1/2 md:-right-30 md:w-30 md:h-30
                  /* Maximize tablet scale where horizontal space is generous: */
                  md:min-[850px]:-right-45 md:min-[850px]:w-40 md:min-[850px]:h-40"
              >
                <img src={PLATFORM_GIFS.greenDancer} alt="Dancing Alien" className="w-full h-full object-contain" />
              </motion.div>

              {/* Jumping Pikachu Sticker */}
              <motion.div
                animate={{ x: [0, 4, 0], y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute pointer-events-none z-30 select-none lg:hidden drop-shadow-[0_10px_20px_rgba(234,179,8,0.3)]
                  /* 700px and Below (Increased Corner Accent Mode): */
                  max-md:-bottom-8 max-md:-left-2 max-md:w-18 max-md:h-18 
                  /* 701px to 1023px (Increased Side-aligned Space Filler): */
                  md:top-1/2 md:-translate-y-1/2 md:-left-40 md:w-45 md:h-45
                  /* Maximize tablet scale where horizontal space is generous: */
                  md:min-[850px]:-left-50 md:min-[850px]:w-55 md:min-[850px]:h-55"
              >
                <img src={PLATFORM_GIFS.jumpingPikachu} alt="Jumping Pikachu" className="w-full h-full object-contain" />
              </motion.div>
            </div>
          </div>

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
            <motion.button
              whileTap={{ scale: 0.60, y: 4 }}
              transition={{ type: "spring", stiffness: 360, damping: 12 }}
              className="w-full sm:w-auto relative group overflow-hidden rounded-lg bg-[#22C55E] text-[#050505] font-black text-xs py-3.5 px-6 transition-all duration-300 shadow-[0_4px_20px_rgba(34,197,94,0.25)] hover:shadow-[0_6px_25px_rgba(34,197,94,0.4)] flex items-center justify-center cursor-pointer border border-transparent border-b-2 group-hover:border-b-4 group-hover:border-white whitespace-nowrap"
            >
              <span className="absolute inset-x-0 bottom-0 h-full bg-[#111111] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
              <span className="relative z-10 flex items-center gap-1.5 uppercase tracking-wider transition-colors duration-500 group-hover:text-white text-[#050505]">Start Playing Now 🔥 <Icons.ArrowRight /></span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.60, y: 4 }}
              transition={{ type: "spring", stiffness: 360, damping: 12 }}
              className="w-full sm:w-auto relative group overflow-hidden rounded-lg bg-[#111111] border border-white/[0.08] text-white font-semibold text-xs py-3.5 px-6 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span className="absolute inset-x-0 bottom-0 h-full bg-orange-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
              <span className="relative z-10 flex items-center gap-2 uppercase tracking-[0.02em] whitespace-nowrap transition-colors duration-500 group-hover:text-black text-white">
                <Icons.Play /> Watch Demo Video
              </span>
            </motion.button>
          </motion.div>

        </motion.div>

        {/* RIGHT COMPARTMENT: ATTACHED SIDEBAR COMPOSITE WIDGET */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">

          {/* GREEN DANCING CHARACTER STICKER */}
          {!isMobile && (
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-16 -right-10 w-20 h-20 pointer-events-none z-30 select-none drop-shadow-[0_8px_16px_rgba(16,185,129,0.3)] right-[40px]"
            >
              <img src={PLATFORM_GIFS.greenDancer} alt="Dancing Alien" className="w-full h-full object-contain" />
            </motion.div>
          )}

          {/* JUMPING PIKACHU STICKER */}
          {!isMobile && (
            <motion.div
              animate={{ x: [0, 5, 0], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="absolute -bottom-10 right-12 w-24 h-24 pointer-events-none z-30 select-none drop-shadow-[0_10px_20px_rgba(234,179,8,0.3)]"
            >
              <img src={PLATFORM_GIFS.jumpingPikachu} alt="Jumping Pikachu" className="w-full h-full object-contain" />
            </motion.div>
          )}

          {/* Connected Layout Flex Container with Premium Hover Follow */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              x: !isMobile ? followX : 0,
              y: !isMobile ? followY : 0,
              rotate: isMobile ? 0 : 350,
              transformOrigin: "center center",
              cursor: !isMobile ? "move" : "default"
            }}
            className="stats-slider-container flex flex-col lg:flex-row items-center justify-center lg:items-stretch gap-4 lg:gap-0 w-full max-w-md mx-auto origin-center"
          >

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

          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none select-none z-20 max-[1023px]:bottom-[10px]"
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
              <span className="text-emerald-400 font-bold">⚔️ LIVE ARENA CATALOG</span>
              <span className="text-neutral-600">//</span>
              <span className="text-cyan-400 animate-pulse">5 DETERMINISTIC SKILL CHALLENGES 🏆</span>
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
                      <button className="py-3 px-6 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer">
                        Find Lobby Opponent
                      </button>
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
              <span className="text-neutral-600">//</span>
              <span className="text-emerald-400 animate-pulse">🟢 LIVE MATCHES ACTIVATED</span>
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
              <button className="py-3.5 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-[#050505] font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_30px_rgba(16,185,129,0.55)] cursor-pointer flex items-center gap-1.5 hover:scale-[1.01]">
                👉 Start Your Journey 🔥
              </button>
              <button className="py-3.5 px-6 rounded-lg bg-[#111] hover:bg-[#151515] border border-white/[0.08] hover:border-cyan-500/30 text-cyan-400 hover:text-cyan-300 font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5">
                🌟 Join the Discord Hub 💬
              </button>
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

// --- DYNAMIC ACTIVITY FEED GENERATOR ---
const GAMES_AND_ACTIONS = [
  { name: "Rock Paper Scissors ✊", actions: ["Flawless Bluff 🧠", "Match Winner 🏆", "Double Stake Win 💎", "Daily Streak 🔥"] },
  { name: "Penalty Shootout ⚽", actions: ["Golden Boot 🥇", "Perfect Goalkeeper 🧤", "Decisive Penalty 🎯", "High-Roller Win 💰"] },
  { name: "Reaction Challenge ⏱️", actions: ["Reflex God ⭐", "Latency Defier ⚡", "0.12s Response 🟢", "Streak Maintained 🔥"] },
  { name: "Tic Tac Toe ❌", actions: ["Grandmaster Play 🧩", "Matrix Solved 📐", "Victory Royal 🏆", "Escrow Win 🔒"] },
  { name: "Number Prediction 🔢", actions: ["Perfect Proximity 🔮", "Data Analyst 📊", "Close-Range Win 🎯", "Lobby Sweeper 🚀"] }
];

const createFakeActivity = () => {
  const selectedGame = faker.helpers.arrayElement(GAMES_AND_ACTIONS);
  const action = faker.helpers.arrayElement(selectedGame.actions);
  const baseAmount = faker.number.int({ min: 10, max: 480 });

  // Format username with letters, underscores, and numbers
  const rawUser = faker.internet.username();
  const cleanUser = rawUser.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  const numSuffix = faker.number.int({ min: 11, max: 999 });
  const player = `${cleanUser}_${numSuffix}`;

  return {
    id: faker.string.uuid(),
    player,
    game: `${selectedGame.name} // ${action}`,
    amount: baseAmount,
    time: faker.helpers.arrayElement(["Just now", "1m ago", "2m ago", "3m ago", "4m ago"])
  };
};

export function LiveActivitySection() {
  // Initialize with 30 unique dynamic items
  const [feed, setFeed] = useState(() =>
    Array.from({ length: 30 }, () => createFakeActivity())
  );

  const handleLoopReset = () => {
    // Regenerate a completely fresh set of 30 unique items at the exact frame the loop resets
    setFeed(Array.from({ length: 30 }, () => createFakeActivity()));
  };

  return (
    <section className="py-12 bg-[#050505] overflow-hidden border-b border-white/[0.04] z-10">
      <div className="w-full flex flex-col gap-4">
        <div className="text-center mb-2">
          <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-black flex items-center justify-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            🔴 Live Arena Action
          </span>
        </div>

        {/* Infinite Marquee Feed Container */}
        <div className="relative flex overflow-x-hidden w-full group mask-gradient">
          <div
            onAnimationIteration={handleLoopReset} // Intercepts the loop reset frame to swap data seamlessly
            className="animate-marquee flex whitespace-nowrap gap-6 py-2"
          >
            {feed.concat(feed).map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="inline-flex items-center gap-3 bg-[#111111] border border-white/[0.06] rounded-full py-2.5 px-6 shadow-md transition-all duration-300"
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

// --- SPORTSBOOK-STYLE DEPOSIT INFRASTRUCTURE DATA (RAINBOW ACCENTS & EMOJIS) ---
const DEPOSIT_METHODS = [
  {
    id: "cards",
    name: (
      <span>
        💳 Secure <span className="text-emerald-400">Debit</span> & <span className="text-cyan-400">Credit Cards</span>
      </span>
    ),
    icon: "💳",
    logoText: "Visa 🔴 // Mastercard 🟡 // Verve 🔵",
    shortDesc: (
      <span>
        Use your debit or credit card for <strong className="text-yellow-400 font-semibold">instant deposits</strong> ⚡.
      </span>
    ),
    details: {
      desc: (
        <span>
          Fund your account immediately using your local or international bank card. This payment gateway handles <strong className="text-emerald-400">end-to-end authentication</strong> securely with zero manual delays. 🔒
        </span>
      ),
      benefits: [
        "Encrypted card storage for fast recurring loads 🔒",
        "3D-Secure multi-factor authentication (verified by Visa/Mastercard ID Check) 🛡️",
        "Zero manual processing delay, immediate balance sync ⚡"
      ],
      speed: "Instantaneous ⚡",
      availability: "24/7/365 🟢",
      security: "PCI-DSS Level-1 Compliant Pipeline 💎"
    }
  },
  {
    id: "bank_transfer",
    name: (
      <span>
        🏦 Automated <span className="text-yellow-400">Direct Transfer</span>
      </span>
    ),
    icon: "🏦",
    logoText: "Ledger Auto-Route 🔄",
    shortDesc: (
      <span>
        Transfer directly from your bank account with <strong className="text-emerald-400 font-semibold">automatic confirmation</strong> 🔄.
      </span>
    ),
    details: {
      desc: (
        <span>
          Generate a custom, single-use <strong className="text-cyan-400">dynamic virtual account number</strong> to transfer funds from any online banking app or ATM portal.
        </span>
      ),
      benefits: [
        "Instant automated validation of inbound transfer volume 🤖",
        "Zero card disclosure, direct banking-rail security 🔒",
        "No browser redirects or external gateway links required 📈"
      ],
      speed: "Under 60 seconds ⏱️",
      availability: "24/7/365 🟢",
      security: "Audited Ledger Escrow 💎"
    }
  },
  {
    id: "bank_payment",
    name: (
      <span>
        🏛️ Direct <span className="text-teal-400">Core Bank</span> Payment
      </span>
    ),
    icon: "🏛️",
    logoText: "Secure Bank App Rails 🔗",
    shortDesc: (
      <span>
        Pay securely through your preferred <strong className="text-teal-400 font-semibold">Nigerian bank</strong>.
      </span>
    ),
    details: {
      desc: (
        <span>
          Log directly into your personal bank's secure customer portal to authorize deposits. This bypasses cards entirely. 📲
        </span>
      ),
      benefits: [
        "Direct processing with Access Bank, GTBank, Zenith, UBA, and others 🏛️",
        "Native biometrics or OTP confirmation directly inside bank app 🔑",
        "Exceptional transfer reliability and high success rates 📈"
      ],
      speed: "Instant ⚡",
      availability: "24/7/365 🟢",
      security: "Direct Core Banking Integration 💎"
    }
  },
  {
    id: "ussd",
    name: (
      <span>
        📱 Offline <span className="text-orange-400">USSD Code</span> Billing
      </span>
    ),
    icon: "📱",
    logoText: "No Internet Required 📶",
    shortDesc: (
      <span>
        Complete deposits without internet banking using your bank's <strong className="text-orange-400 font-semibold">USSD code</strong> 📶.
      </span>
    ),
    details: {
      desc: (
        <span>
          Bypass internet connections entirely. Simply dial your bank's designated USSD code on your registered mobile number to confirm. 💬
        </span>
      ),
      benefits: [
        "Zero cellular data required to execute balance loads 📶",
        "Ideal for spot funding during unstable network outages ⚡",
        "Instant SMS receipt alerts sent automatically 💬"
      ],
      speed: "Instant ⚡",
      availability: "24/7/365 🟢",
      security: "SIM-Card Bind Security Protocol 💎"
    }
  },
  {
    id: "zap",
    name: (
      <span>
        ⚡ Lightning <span className="text-pink-500">Zap by Paystack</span>
      </span>
    ),
    icon: "⚡",
    logoText: "One-Tap Rapid Checkout 🚀",
    shortDesc: (
      <span>
        Enjoy faster checkout with <strong className="text-pink-400 font-semibold">one-tap payments</strong> through Zap 🚀.
      </span>
    ),
    details: {
      desc: (
        <span>
          Leverage Paystack's state-of-the-art Zap channel to authorize payments in a single tap using securely stored credentials. 🔑
        </span>
      ),
      benefits: [
        "Industry-leading authorization speeds 🚀",
        "Saves credentials using top-tier encryption 🔒",
        "Native, frictionless mobile layout 📱"
      ],
      speed: "Instantaneous ⚡",
      availability: "24/7/365 🟢",
      security: "Paystack Shield Level-1 Protection 💎"
    }
  },
  {
    id: "crypto",
    name: (
      <span>
        🪙 Global <span className="text-purple-400">Cryptocurrency</span> Gateway
      </span>
    ),
    icon: "🪙",
    logoText: "BTC, ETH, USDT, USDC, LTC, BNB, etc. 🌐",
    shortDesc: (
      <span>
        Deposit securely using cryptocurrency with <strong className="text-purple-400 font-semibold">fast blockchain confirmations</strong> 🌐.
      </span>
    ),
    details: {
      desc: (
        <span>
          Access borderless global payment paths. Securely route blockchain assets directly into our system. Supports BTC, ETH, USDT, USDC, LTC, and BNB. 🌍
        </span>
      ),
      benefits: [
        "Direct decentralized processing, fully censorship-resistant 🌍",
        "Zero card numbers or banking credentials disclosed 🔒",
        "Automatic USD conversion at active spot exchange rates 📊"
      ],
      speed: "1 Blockchain Confirmation 🌐",
      availability: "24/7/365 🟢",
      security: "Cryptographically Secured Ledger 💎"
    }
  }
];

// --- SPORTSBOOK-STYLE WITHDRAWAL METHOD DATA (RAINBOW ACCENTS & EMOJIS) ---
const WITHDRAWAL_METHODS = [
  {
    id: "bank_withdrawal",
    name: (
      <span>
        🏦 Bank <span className="text-emerald-400">Direct Outflow</span>
      </span>
    ),
    icon: "🏦",
    logoText: "Direct Bank Transfer 🏛️",
    desc: "Withdraw funds directly to your personal bank account by entering your banking details and submitting a withdrawal request.",
    bullets: [
      "Fast processing, secure verification, and direct bank settlement 🏛️",
      "Automatic routing mapping all primary financial systems 🤖",
      "Directly integrated secure bank gateway payout tracks ⚡"
    ],
    speed: "Under 2 Hours ⏱️",
    security: "Secured Direct Bank Rails 💎"
  },
  {
    id: "crypto_withdrawal",
    name: (
      <span>
        🪙 Crypto <span className="text-cyan-400">Decentralized Payout</span>
      </span>
    ),
    icon: "🪙",
    logoText: "Blockchain Transfers 🌐",
    desc: "Withdraw using cryptocurrency by entering your wallet address and selecting your preferred supported network.",
    bullets: [
      "Secure blockchain payouts with transparent transaction ledger tracking 🔒",
      "Supports USDT (TRC20, ERC20), BTC, ETH, and other major chains 🌐",
      "Automated cryptographic validation for near-instant settlement ⚡"
    ],
    speed: "Instant Payout ⚡",
    security: "Ledger-Signed Smart Contracts 💎"
  }
];

export function PaymentsSection() {
  const [activeTab, setActiveTab] = useState("deposit"); // "deposit" | "withdrawal"
  const [selectedId, setSelectedId] = useState("cards");
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const depositSliderRef = useRef(null);
  const depositItemRefs = useRef({});

  // Scroll the deposit slider by one card width (direction: -1 left, 1 right)
  const scrollDeposit = (direction) => {
    const slider = depositSliderRef.current;
    if (!slider) return;
    const keys = Object.keys(depositItemRefs.current || {});
    let step = 320;
    if (keys.length) {
      const first = depositItemRefs.current[keys[0]];
      if (first && first.offsetWidth) {
        const style = window.getComputedStyle(first);
        const marginRight = parseFloat(style.marginRight || 0);
        step = first.offsetWidth + (isNaN(marginRight) ? 0 : marginRight);
      }
    }
    slider.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  // Monitor scroll dynamics to adjust compression and visibility
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile || activeTab !== "deposit" || !depositSliderRef.current) return;

    const slider = depositSliderRef.current;
    const items = Object.values(depositItemRefs.current).filter(Boolean);

    // Use IntersectionObserver to reliably detect which card is most visible
    // (more resilient to fast flick/scroll gestures than scroll+rAF calculations)
    let currentSelected = selectedId;
    const observer = new IntersectionObserver(
      (entries) => {
        // choose the entry with the largest intersectionRatio
        let best = { ratio: 0, id: null };
        entries.forEach((entry) => {
          const id = entry.target.dataset.depositId;
          if (!id) return;
          if (entry.intersectionRatio > best.ratio) {
            best = { ratio: entry.intersectionRatio, id };
          }
        });

        if (best.id && best.id !== currentSelected) {
          currentSelected = best.id;
          window.requestAnimationFrame(() => setSelectedId(best.id));
        }
      },
      {
        root: slider,
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    items.forEach((el) => observer.observe(el));

    // initial alignment fallback (center-distance) for older browsers or edge-cases
    const chooseNearestCard = () => {
      const sliderRect = slider.getBoundingClientRect();
      const sliderCenter = sliderRect.left + sliderRect.width / 2;
      let nearestId = selectedId;
      let nearestDistance = Infinity;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(itemCenter - sliderCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestId = item.dataset.depositId;
        }
      });

      if (nearestId && nearestId !== selectedId) setSelectedId(nearestId);
    };

    chooseNearestCard();

    return () => {
      observer.disconnect();
    };
  }, [isMobile, activeTab, selectedId]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001
  });

  const headerTitleX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [isMobile ? -20 : -60, 0, 0, isMobile ? -15 : -40]);
  const headerTitleOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  const headerDescX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [isMobile ? 20 : 60, 0, 0, isMobile ? 15 : 40]);
  const headerDescOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  // --- SCROLL-TRIGGERED ANIMATIONS FOR PAYMENTS INFRASTRUCTURE ---

  // 1. Deposit Method Tag (Below Deposit Method Heading)
  const depositHeaderTagY = useTransform(smoothProgress, [0, 0.35, 0.75, 1], [isMobile ? 15 : 30, 0, 0, isMobile ? -10 : -20]);
  const depositHeaderTagOpacity = useTransform(smoothProgress, [0, 0.28, 0.8, 1], [0, 1, 1, 0]);

  // 2. Deposit Columns / Mobile Slider
  const depositSliderX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [isMobile ? -30 : -80, 0, 0, isMobile ? -15 : -40]);
  const depositSliderOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  // 3. Deposit Details Container
  const depositDetailsX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [isMobile ? 30 : 80, 0, 0, isMobile ? 15 : 40]);
  const depositDetailsOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  // 4. Withdrawal Containers (Left and Right)
  const withdrawalLeftX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [isMobile ? -30 : -80, 0, 0, isMobile ? -15 : -40]);
  const withdrawalLeftOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  const withdrawalRightX = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [isMobile ? 30 : 80, 0, 0, isMobile ? 15 : 40]);
  const withdrawalRightOpacity = useTransform(smoothProgress, [0, 0.32, 0.85, 1], [0, 1, 1, 0]);

  // 5. Shared Security & Trust Section
  const securityY = useTransform(smoothProgress, [0, 0.45, 0.85, 1], [isMobile ? 25 : 50, 0, 0, isMobile ? -15 : -30]);
  const securityOpacity = useTransform(smoothProgress, [0, 0.35, 0.9, 1], [0, 1, 1, 0]);

  // 6. Action Button (Below Security & Trust)
  const ctaButtonX = useTransform(smoothProgress, [0, 0.5, 0.9, 1], [isMobile ? 30 : 120, 0, 0, isMobile ? 15 : 60]);
  const ctaButtonOpacity = useTransform(smoothProgress, [0, 0.4, 0.95, 1], [0, 1, 1, 0]);

  const activeMethod = DEPOSIT_METHODS.find((item) => item.id === selectedId) || DEPOSIT_METHODS[0];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#0A0A0A] relative overflow-hidden border-y border-white/[0.04] z-10"
    >
      {/* Visual Ambience Backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.015] blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.015] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Dynamic Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-8">
          <motion.div
            style={{ x: headerTitleX, opacity: headerTitleOpacity }}
            className="flex flex-col"
          >
            {/* Dynamic Segment Status Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/30 text-[10px] font-mono tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">💳 PAYMENT INFRASTRUCTURE PROTOCOL // ⚡ LIVE CHANNELS</span>
            </div>

            {/* High-Impact Gradient Title */}
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight select-none">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Deposit Methods 💳⚡
              </span>
            </h2>
          </motion.div>

          {/* Side-aligned Narrative Block */}
          <motion.p
            style={{ x: headerDescX, opacity: headerDescOpacity }}
            className="text-neutral-300 max-w-lg text-sm md:text-base leading-relaxed font-light"
          >
            Experience <strong className="text-yellow-400">lightning-fast</strong> transactions powered by secure <strong className="text-emerald-400">banking rails</strong>, digital wallets, <strong className="text-purple-400">cryptocurrency networks</strong>, and automated <strong className="text-cyan-400">settlement systems</strong>. Every payment channel is optimized for <strong className="text-teal-300">speed</strong>, reliability, and maximum account <strong className="text-amber-400">security</strong>. 🔒💸🚀
          </motion.p>
        </div>

        {/* Premium Shared Layout Tab Switcher */}
        <motion.div style={{ y: depositHeaderTagY, opacity: depositHeaderTagOpacity }} className="flex justify-center mb-12">
          <div className="bg-[#111111]/80 p-1 rounded-xl border border-white/[0.06] flex gap-2 relative">
            {["deposit", "withdrawal"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer focus:outline-none ${activeTab === tab ? "text-[#050505]" : "text-neutral-400 hover:text-neutral-200"
                  }`}
              >
                <span className="relative z-10">{tab} methods</span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-pay-tab"
                    className="absolute inset-0 bg-emerald-400 rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Horizontal Sliding Content Area Wrapper */}
        <div className="relative w-full mb-12">
          <motion.div
            animate={{ x: activeTab === "deposit" ? "0%" : "-50%" }} // Adjusted to slide to 50% correctly
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            className="flex w-[200%] items-stretch"
          >
            {/* PANEL 1: DEPOSIT PORTAL (Left Half) */}
            <div
              className="w-1/2 pr-0 lg:pr-2 shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch transition-opacity duration-300"
              style={{ opacity: activeTab === "deposit" ? 1 : 0 }}
            >

              {/* Left Side: Large Interactive Grid/Horizontal Slider of Deposit Options */}
              <div className="lg:col-span-7 relative w-full">
                <motion.div
                  ref={depositSliderRef}
                  style={{ x: depositSliderX, opacity: depositSliderOpacity }}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent pb-4 lg:pb-0 lg:overflow-visible lg:grid lg:grid-cols-2 gap-4 max-w-full"
                >
                  {/* Left Spacer: Dynamically calculates margin needed to center the first card */}
                  <div className="shrink-0 w-[calc(50vw-140px-24px)] sm:w-[calc(50vw-160px-24px)] lg:hidden" />

                  {DEPOSIT_METHODS.map((method) => {
                    const isActive = method.id === selectedId;
                    return (
                      <button
                        key={method.id}
                        data-deposit-id={method.id}
                        ref={(el) => {
                          depositItemRefs.current[method.id] = el;
                        }}
                        onClick={() => setSelectedId(method.id)}
                        className={`flex flex-col justify-between text-left p-5 rounded-xl border transition-colors duration-300 relative overflow-hidden group cursor-pointer shrink-0 w-[280px] sm:w-[320px] snap-center lg:w-full lg:shrink h-[180px] lg:h-auto min-h-[180px] ${isActive
                            ? "bg-[#111111] border-emerald-500/40 shadow-[0_4px_25px_rgba(34,197,94,0.1)]"
                            : "bg-[#111111]/40 border-white/[0.04] hover:border-white/[0.1] hover:bg-[#111111]/60"
                          }`}
                      >
                        {isActive && (
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.02] rounded-full blur-2xl pointer-events-none" />
                        )}

                        <div className="flex items-center gap-3.5 mb-3.5 relative z-10">
                          <span className="text-2xl">{method.icon}</span>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                              {method.name}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500 tracking-wider">
                              {method.logoText}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-neutral-400 leading-relaxed font-light relative z-10">
                          {method.shortDesc}
                        </p>

                        <div className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 ${isActive ? "bg-emerald-500" : "bg-transparent"
                          }`} />
                      </button>
                    );
                  })}

                  {/* Right Spacer: Dynamically calculates margin needed to center the last card */}
                  <div className="shrink-0 w-[calc(50vw-140px-24px)] sm:w-[calc(50vw-160px-24px)] lg:hidden" />
                </motion.div>

                {/* Emoji control buttons (left/right) positioned at the slider sides */}
                <button
                  onClick={() => scrollDeposit(-1)}
                  aria-label="Previous deposit"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#050505]/70 hover:bg-emerald-500 hover:text-black border border-white/[0.06] text-neutral-200 flex items-center justify-center transition-colors shadow-md"
                >
                  <span className="text-lg select-none">◀️</span>
                </button>

                <button
                  onClick={() => scrollDeposit(1)}
                  aria-label="Next deposit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#050505]/70 hover:bg-emerald-500 hover:text-black border border-white/[0.06] text-neutral-200 flex items-center justify-center transition-colors shadow-md"
                >
                  <span className="text-lg select-none">▶️</span>
                </button>
              </div>

              {/* Right Side: Dynamic, Premium Details Panel */}
              <motion.div
                style={{ x: depositDetailsX, opacity: depositDetailsOpacity }}
                className="lg:col-span-5 flex"
              >
                <div className="w-full bg-[#111111] border border-white/[0.08] rounded-xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.015] rounded-full blur-[70px] pointer-events-none" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMethod.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 relative z-10"
                    >
                      <div className="flex items-center gap-4 pb-4 border-b border-white/[0.04]">
                        <span className="text-4xl">{activeMethod.icon}</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest leading-none mb-1.5">
                            GATEWAY ACTIVE
                          </span>
                          <h4 className="text-lg md:text-xl font-black text-white leading-none">
                            {activeMethod.name}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
                        {activeMethod.details.desc}
                      </p>

                      <div className="space-y-3.5">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block">
                          KEY GATEWAY BENEFITS
                        </span>
                        <div className="space-y-2.5">
                          {activeMethod.details.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                              <span className="text-neutral-300 text-xs font-light leading-relaxed">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 pt-6 border-t border-white/[0.04] sm:grid-cols-3">
                        <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg flex flex-col justify-center">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                            SPEED
                          </span>
                          <span className="text-xs font-bold text-white font-mono leading-none">
                            {activeMethod.details.speed}
                          </span>
                        </div>
                        <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg flex flex-col justify-center">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                            AVAILABILITY
                          </span>
                          <span className="text-xs font-bold text-white font-mono leading-none">
                            {activeMethod.details.availability}
                          </span>
                        </div>
                        <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg flex flex-col justify-center">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                            PROTOCOL
                          </span>
                          <span className="text-[10px] font-black text-emerald-400 font-mono leading-none truncate">
                            SECURE 🔒
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                    <span>GATEWAY IDENTIFIER // {activeMethod.id.toUpperCase()}</span>
                    <span className="text-emerald-500 animate-pulse">● ONLINE</span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* PANEL 2: WITHDRAWAL PORTAL (Right Half) */}
            {/* PANEL 2: WITHDRAWAL PORTAL (Right Half) */}
            <div
              className="w-1/2 pl-0 lg:pl-2 shrink-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: activeTab === "withdrawal" ? 1 : 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full items-stretch">
                {WITHDRAWAL_METHODS.map((method, idx) => {
                  const isFirst = idx === 0;
                  return (
                    <motion.div
                      key={method.id}
                      style={{
                        x: isFirst ? withdrawalLeftX : withdrawalRightX,
                        opacity: isFirst ? withdrawalLeftOpacity : withdrawalRightOpacity
                      }}
                      className="bg-[#111111]/90 border border-white/[0.08] hover:border-emerald-500/30 rounded-xl p-6 md:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/[0.01] rounded-full blur-[50px] pointer-events-none" />

                      <div className="space-y-6 relative z-10">
                        {/* Header with icon & labels */}
                        <div className="flex items-center gap-4 pb-4 border-b border-white/[0.04]">
                          <span className="text-4xl">{method.icon}</span>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest leading-none mb-1.5">
                              OUTFLOW GATEWAY
                            </span>
                            <h4 className="text-base md:text-lg font-black text-white leading-none">
                              {method.name}
                            </h4>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-neutral-400 leading-relaxed font-light">
                          {method.desc}
                        </p>

                        {/* Bullet points benefits */}
                        <div className="space-y-3">
                          {method.bullets.map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                              <span className="text-neutral-300 text-[11px] font-light leading-relaxed">
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Metadata indicators */}
                      <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/[0.04] mt-8 relative z-10">
                        <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg flex flex-col justify-center">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                            AVG SPEED
                          </span>
                          <span className="text-xs font-bold text-white font-mono leading-none">
                            {method.speed}
                          </span>
                        </div>
                        <div className="bg-white/[0.01] border border-white/[0.04] p-3 rounded-lg flex flex-col justify-center">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                            AVAILABILITY
                          </span>
                          <span className="text-xs font-bold text-emerald-400 font-mono leading-none">
                            {method.security}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        </div>

        {/* SECURITY & TRUST SECTION (Fintech Glassmorphism Panel - Static) */}
        <motion.div
          style={{ y: securityY, opacity: securityOpacity }}
          className="bg-gradient-to-r from-white/[0.01] via-white/[0.03] to-white/[0.01] border border-white/[0.06] rounded-2xl p-6 md:p-8 backdrop-blur shadow-xl relative overflow-hidden mb-12"
        >
          <div className="absolute inset-0 bg-emerald-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Secure Transactions
              </h5>
              <p className="text-[10px] text-neutral-400 font-light">
                Direct bank-grade processing 🏦
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 border-t md:border-t-0 md:border-l border-white/[0.04] pt-4 md:pt-0">
              <span className="text-2xl">🔒</span>
              <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                SSL Encrypted
              </h5>
              <p className="text-[10px] text-neutral-400 font-light">
                AES-256 military standard security 🖥️
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 border-t md:border-t-0 md:border-l border-white/[0.04] pt-4 md:pt-0">
              <span className="text-2xl">⚡</span>
              <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Instant Deposits
              </h5>
              <p className="text-[10px] text-neutral-400 font-light">
                Real-time account balance updates 📈
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 border-t md:border-t-0 md:border-l border-white/[0.04] pt-4 md:pt-0">
              <span className="text-2xl">💸</span>
              <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Fast Withdrawals
              </h5>
              <p className="text-[10px] text-neutral-400 font-light">
                Unmatched rapid payout rails 🚀
              </p>
            </div>
          </div>
        </motion.div>

        {/* PRIMARY CALL TO ACTION (Static) */}
        <div className="flex justify-center">
          <motion.div style={{ x: ctaButtonX, opacity: ctaButtonOpacity }}>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-black text-sm uppercase tracking-wider py-4 px-12 transition-all duration-300 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.45)] cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Start Betting Now 🔥
              </span>
            </motion.button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

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
              <span className="text-emerald-400 font-bold">🛡️ SECURITY & TRUST PROTOCOLS // CRYPTOGRAPHICALLY SECURE</span>
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
                  🚀 ROADMAP // THE FUTURE OF GLOBAL PLAY 🌍🗺️📡
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

