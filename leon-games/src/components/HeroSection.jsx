import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Icons } from "./GeneralVariables/Icons";
import predictionDuel from "../assets/images/prediction-duel.png";
import reactionSignal from "../assets/images/reaction-signal.png";
import penaltyShootout from "../assets/images/penalty-shootout.png";
import rockPaperScissors from "../assets/images/rock-paper-scissors.png";
import ticTacToe from "../assets/images/tic-tac-toe.png";

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

export default HeroSection;
