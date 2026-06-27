import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "./GeneralVariables/Icons";
import logo from "../assets/images/logo.png";

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
  { label: "| Games", href: "#games", sectionId: "games" },
  { label: "HowItWorks", href: "#how-it-works", sectionId: "how-it-works" },
  { label: "Payments", href: "#payments", sectionId: "payments" },
  { label: "Security |", href: "#security", sectionId: "security" }
];

function getInitialActiveSection() {
  if (typeof window === "undefined") return null;

  const hash = window.location.hash.replace("#", "");
  return NAV_LINKS.some((link) => link.sectionId === hash) ? hash : null;
}

export function Navigation() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [activeSection, setActiveSection] = useState(getInitialActiveSection);
  const lastScrollY = useRef(0);

  const handleSectionSelect = (sectionId) => {
    setActiveSection(sectionId);
    if (window.location.hash !== `#${sectionId}`) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionElements = NAV_LINKS.map((link) => document.getElementById(link.sectionId)).filter(Boolean);

    if (!sectionElements.length) return;

    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.25;

      const visibleSections = sectionElements
        .map((section) => {
          const rect = section.getBoundingClientRect();
          const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
          return { id: section.id, visibleHeight };
        })
        .filter((section) => section.visibleHeight >= threshold)
        .sort((a, b) => b.visibleHeight - a.visibleHeight);

      setActiveSection(visibleSections[0] ? visibleSections[0].id : null);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
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
            href="/"
            className="flex items-center gap-3 group pointer-events-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Logo */}
            <img
              src={logo}
              alt="Leon Games logo"
              className="w-20 h-20 object-contain"
            />
          </motion.a>
        </div>

        {/* 2. DESKTOP NAVIGATION - Shared layout ID underline */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, idx) => {
            const isActive = activeSection === link.sectionId;

            return (
              <a
                key={idx}
                href={link.href}
                className={`relative px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors duration-200 whitespace-nowrap ${
                  isActive ? "text-white" : "text-neutral-400 hover:text-white"
                }`}
                onClick={() => handleSectionSelect(link.sectionId)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className="relative z-10">{link.label}</span>
                {(hoveredIndex === idx || isActive) && (
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
            );
          })}
        </nav>

        {/* 3. CTA CONTROLS - Tactile spring-based interactions */}
        <div className="hidden md:flex items-center gap-4">
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
                {NAV_LINKS.map((link, idx) => {
                  const isActive = activeSection === link.sectionId;

                  return (
                    <motion.a
                      key={idx}
                      href={link.href}
                      onClick={() => {
                        handleSectionSelect(link.sectionId);
                        setIsMobileOpen(false);
                      }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -10, opacity: 0 }}
                      transition={{ delay: idx * 0.08, type: "spring", stiffness: 150 }}
                      className={`text-2xl font-bold tracking-tight flex items-center justify-between group py-2 border-b border-white/[0.03] ${
                        isActive ? "text-emerald-400" : "text-neutral-300 hover:text-emerald-400"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className={`text-xs font-mono transition-colors ${isActive ? "text-emerald-400" : "text-neutral-600 group-hover:text-emerald-400"}`}>
                        [0{idx + 1}]
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Mobile Actions Panel */}
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-6 mb-4 text-xs font-mono text-neutral-500">
                <span>GATEWAY: LIVE-NET</span>
                <span>PING: 12ms</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
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