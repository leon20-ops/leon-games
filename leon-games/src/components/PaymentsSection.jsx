import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";

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
      id = "payments"
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
              <span className="text-emerald-400 font-bold">💳 PAYMENT PROTOCOL // ⚡ LIVE CHANNELS</span>
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
              whileTap={{ scale: 0.60, y: 4 }}
              transition={{ type: "spring", stiffness: 360, damping: 12 }}
              className="w-full sm:w-auto relative group overflow-hidden rounded-lg bg-[#22C55E] text-[#050505] font-black text-xs py-3.5 px-6 transition-all duration-300 shadow-[0_4px_20px_rgba(34,197,94,0.25)] hover:shadow-[0_6px_25px_rgba(34,197,94,0.4)] flex items-center justify-center cursor-pointer border border-transparent border-b-2 group-hover:border-b-4 group-hover:border-white whitespace-nowrap"
            >
              <span className="absolute inset-x-0 bottom-0 h-full bg-[#111111] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none z-0" />
              <span className="relative z-10 flex items-center gap-1.5 uppercase tracking-wider transition-colors duration-500 group-hover:text-white text-[#050505]">
                Start Betting Now 🔥
              </span>
            </motion.button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
