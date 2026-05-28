"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Search,
  Bot,
  MapPin,
  Globe,
  Lock,
  Zap,
  Star,
  Settings,
  Target,
  ShieldCheck,
  Store,
  Handshake,
  Hotel,
  Factory,
  Server,
  Vote,
} from "lucide-react";

/* ─── ICONS ─── */
const ChevronRight = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);
const ArrowRight = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 12h14M12 5l7 7-7 7"
    />
  </svg>
);
const CheckIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);
const XIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const EASE = [0.16, 1, 0.3, 1];

const Reveal = ({ children, delay = 0, className = "", x = 0, y = 32 }) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── ANIMATED TYPING DEMO ─── */
const AIDemo = () => {
  const [phase, setPhase] = useState(0);
  // phase 0: typing query, 1: "thinking", 2: showing old result, 3: showing GEO result
  const query =
    "What is the best hotel in Stockholm for a luxury weekend stay?";
  const [typed, setTyped] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    let timeout;
    // Type the query
    if (typed.length < query.length) {
      timeout = setTimeout(
        () => setTyped(query.slice(0, typed.length + 1)),
        80, // Slower character typing pace (from 45ms)
      );
    } else if (!showOld && !thinking && !showNew) {
      timeout = setTimeout(() => setShowOld(true), 800); // Standard read pause
    } else if (showOld && !thinking && !showNew) {
      timeout = setTimeout(() => {
        setShowOld(false);
        setThinking(true);
      }, 3500); // Slower to let the user read the list (from 2000ms)
    } else if (thinking && !showNew) {
      timeout = setTimeout(() => {
        setThinking(false);
        setShowNew(true);
      }, 2500); // Slower to show evaluation state (from 1800ms)
    } else if (showNew) {
      timeout = setTimeout(() => {
        setTyped("");
        setShowOld(false);
        setShowNew(false);
        setThinking(false);
      }, 6000); // Slower to let the user read the recommended result (from 4000ms)
    }
    return () => clearTimeout(timeout);
  }, [typed, showOld, thinking, showNew]);

  return (
    <div className="relative w-full max-w-[580px] mx-auto lg:mx-0">
      {/* Chat window */}
      <div className="rounded-2xl border border-white/10 bg-[#0a1628] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.03]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[11px] font-medium text-white/30 tracking-wide">
            ChatGPT / AI Search
          </span>
        </div>

        <div className="p-5 min-h-[390px] sm:min-h-[320px] md:min-h-[280px]">
          {/* User query */}
          <div className="flex justify-end mb-4">
            <div className="bg-[#3a7fc1]/20 border border-[#3a7fc1]/20 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
              <p className="text-[0.875rem] text-white/80 font-light">
                {typed}
                {typed.length < query.length && (
                  <span className="inline-block w-0.5 h-4 bg-[#7bafd4] ml-0.5 animate-pulse align-middle" />
                )}
              </p>
            </div>
          </div>

          {/* Old SEO result */}
          {showOld && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#e5e7eb] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-[#6b7280]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.28 5 12c0-4.2 3.29-7.27 7.19-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.3 0 9.5-3.44 9.5-9.55 0-1.2-.15-1.35-.4-1.35z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[0.75rem] text-white/30 mb-2 font-medium tracking-wide">
                    OLD SEARCH (SEO) — Google Results
                  </p>
                  <div className="space-y-1.5">
                    {[
                      "1. Top 10 Luxury Hotels in Stockholm | TripAdvisor",
                      "2. Best Boutique Hotels in Stockholm | Booking.com",
                      "3. Stockholm Hotels Guide 2026",
                      "4. Reddit — Best luxury hotel in Stockholm?",
                    ].map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[0.78rem] text-white/40 font-light"
                      >
                        <XIcon />
                        <span className={i > 0 ? "opacity-60" : ""}>{r}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[0.72rem] text-[#e87c7c]/70 italic">
                    Chaotic list. Click, compare, hope for the best.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Thinking state */}
          {thinking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 py-4"
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#7bafd4]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              <span className="text-[0.8rem] text-white/30 italic">
                AI is evaluating hotels based on reviews, reputation, and
                location...
              </span>
            </motion.div>
          )}

          {/* GEO Result */}
          {showNew && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="rounded-xl border border-[#3a7fc1]/30 bg-[#3a7fc1]/8 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-[#3a7fc1] flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <span className="text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#7bafd4]">
                    NOW SEARCH (GEO) — AI Answer
                  </span>
                </div>
                <p className="text-[0.875rem] text-white/85 leading-[1.7] font-light">
                  Based on guest experience, location, online reputation, and
                  luxury hospitality signals, I recommend{" "}
                  <span className="font-semibold text-white bg-[#3a7fc1]/30 px-1.5 py-0.5 rounded-md">
                    Bento Luxe Hotel
                  </span>{" "}
                  — consistently recognized by AI search platforms for its
                  premium suites, exceptional guest satisfaction, and modern
                  luxury experience in central Stockholm.
                </p>
                <div className="mt-3 flex items-center gap-1.5">
                  <CheckIcon />
                  <span className="text-[0.72rem] text-[#7bafd4] font-medium">
                    One business. Cited by name. Zero competition.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating label */}
      <div className="absolute -bottom-4 -right-4 rounded-xl bg-[#3a7fc1] px-4 py-2 shadow-lg">
        <p className="text-[0.72rem] font-bold text-white tracking-wide">
          GEO = You get named
        </p>
      </div>
    </div>
  );
};

/* ─── COUNTER ANIMATION ─── */
const CountUp = ({ target, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame;
    const duration = 1800;
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        * { box-sizing: border-box; }

        .noise::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.04;
          pointer-events: none;
          z-index: 1;
        }

        .geo-gradient {
          background: linear-gradient(135deg, #3a7fc1 0%, #7bafd4 50%, #3a7fc1 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .grid-fade {
          background-image: linear-gradient(rgba(58,127,193,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(58,127,193,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(7,23,42,0.08);
        }

        .pill-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid rgba(58,127,193,0.3);
          color: #7bafd4;
          background: rgba(58,127,193,0.08);
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .eyebrow::before {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
        }

        .step-line {
          position: absolute;
          left: 23px;
          top: 56px;
          bottom: -24px;
          width: 1px;
          background: linear-gradient(to bottom, rgba(58,127,193,0.4), rgba(58,127,193,0));
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .float-slow { animation: float 6s ease-in-out infinite; }
        .float-med { animation: float 4.5s ease-in-out infinite 1s; }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #3980C1;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 14px 28px;
          border-radius: 999px;
          transition: all 0.25s ease;
          letter-spacing: 0.01em;
        }
        .cta-btn:hover {
          background: #2d6aaa;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(58,127,193,0.4);
        }

        .cta-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1.5px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
          font-weight: 500;
          padding: 13px 26px;
          border-radius: 999px;
          transition: all 0.25s ease;
        }
        .cta-outline:hover {
          border-color: rgba(255,255,255,0.5);
          color: white;
          background: rgba(255,255,255,0.05);
        }

        @media (max-width: 768px) {
          .mobile-center { text-align: center; align-items: center; }
        }
      `}</style>

      <div className="min-h-screen bg-[#f8fafc] font-['DM_Sans',sans-serif] overflow-x-hidden">
        {/* ══════════════════════════════════════════════════════
            HERO — The moment someone lands, they KNOW what we do
        ══════════════════════════════════════════════════════ */}
        <section className="noise relative overflow-hidden bg-[#113256] grid-fade pt-[240px] pb-[150px]">
          {/* Ambient glow orbs */}
          <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[700px] w-[700px] bg-[radial-gradient(circle,rgba(58,127,193,0.18)_0%,transparent_65%)]" />
          <div className="pointer-events-none absolute right-[-5%] bottom-[-20%] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(123,175,212,0.1)_0%,transparent_65%)]" />

          <div className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1.25rem,4vw,2rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(4rem,8vw,6rem)] items-center">
              {/* LEFT: Copy */}
              <div>
                <Reveal y={24} delay={0.08}>
                  <h1 className="mb-6 font-['DM_Sans',sans-serif] text-[clamp(2.6rem,5.5vw,4.4rem)] font-light leading-[1.04] tracking-[-0.03em] text-white">
                    Be The Business That{" "}
                    <span className="font-normal text-[#7bafd4]">AI </span>
                    Reccomends
                  </h1>
                </Reveal>

                <Reveal y={20} delay={0.16}>
                  <p className="mb-8 max-w-[520px] text-[clamp(1rem,1.4vw,1.1rem)] font-light leading-[1.8] text-white/55">
                    We built a proprietary AI engine that makes your business
                    the one ChatGPT, Gemini, Perplexity, and Google AI and all
                    the other AI systems recommend
                  </p>
                </Reveal>

                <Reveal y={16} delay={0.22}>
                  <div className="flex flex-wrap gap-4 mb-10">
                    <a href="/audit" className="cta-btn">
                      Get Your Audit Report <ArrowRight />
                    </a>
                  </div>
                </Reveal>

                <Reveal y={12} delay={0.28}>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.82rem] text-white/35 font-light">
                    <span className="flex items-center gap-2">
                      <CheckIcon />
                      <span className="text-white/50">
                        Trusted across Europe
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckIcon />
                      <span className="text-white/50">Proprietary AI</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckIcon />
                      <span className="text-white/50">Live within days</span>
                    </span>
                  </div>
                </Reveal>
              </div>

              {/* RIGHT: Animated AI demo */}
              <Reveal y={32} delay={0.2} className="w-full">
                <AIDemo />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            THE PROBLEM — Visceral, immediate, impossible to skip
        ══════════════════════════════════════════════════════ */}
        <section className="px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,8rem)] bg-white">
          <article className="mx-auto max-w-[1200px]">
            {/* ── TOP: THE HEADLINE PROBLEM ── */}
            <div className="px-[clamp(1.25rem,4vw,2rem)] pt-[] pb-0">
              <div className="mx-auto max-w-[1200px]">
                <Reveal>
                  <div className="text-center mb-[clamp(3rem,6vw,5rem)]">
                    <div className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 text-[#3a7fc1]">
                      <span className="w-5 h-px bg-[#3a7fc1]/40" />
                      The New Reality of Search
                      <span className="w-5 h-px bg-[#3a7fc1]/40" />
                    </div>
                    <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.1] tracking-[-0.03em] text-[#0d2640] mb-5">
                      Millions of customers have already <br />
                      <span className="relative inline-block">
                        <span className="relative z-10">
                          stopped using Google.
                        </span>
                        <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-[#3a7fc1]/20 rounded-full" />
                      </span>
                    </h2>
                    <p className="text-[1.05rem] font-light leading-[1.85] text-[#6b7280] max-w-[620px] mx-auto">
                      They open ChatGPT and ask. The AI answers immediately -
                      and names{" "}
                      <strong className="font-semibold text-[#0d2640]">
                        one business
                      </strong>
                      . If that business isn't yours, you don't exist in that
                      world.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Side-by-side comparison */}
            <Reveal y={40} delay={0.1}>
              <div className="w-full max-w-[920px] mx-auto rounded-[24px] border border-[#e5e9ef] overflow-hidden shadow-2xl bg-white grid grid-cols-1 md:grid-cols-2">
                {/* Left Column: OLD SEARCH (Google SEO) */}
                <div className="bg-[#faf8f5] flex flex-col justify-between">
                  {/* Header */}
                  <div className="p-6 md:p-8 flex items-center gap-4 border-b border-[#e5e9ef]">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#e2e8f0] shadow-sm flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-[#8a8a8a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8a8a8a] mb-0.5">
                        OLD SEARCH
                      </p>
                      <h4 className="text-[1.2rem] font-bold text-[#1c1c1c] tracking-[-0.02em]">
                        Google SEO
                      </h4>
                    </div>
                  </div>

                  {/* Row List */}
                  <div className="flex-1 flex flex-col">
                    {[
                      {
                        boldText: "chaotic list of 20+ links",
                        before: "Customer sees a ",
                        after: " and has to pick",
                      },
                      {
                        boldText: "manually compare",
                        before: "Must click, read, and ",
                        after: " multiple sites",
                      },
                      {
                        boldText: "every click",
                        before: "You compete for ",
                        after: " against dozens of rivals",
                      },
                      {
                        boldText: "drop the moment",
                        before: "Rankings ",
                        after: " you stop investing",
                      },
                      {
                        boldText: "results",
                        before: "No recommendation — just a list of ",
                        after: "",
                      },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        className="px-6 md:px-8 py-5 border-b border-[#e5e9ef]/80 flex items-start gap-4 flex-1"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#fde8e8] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#e53e3e]">
                          <svg
                            className="w-2.5 h-2.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <p className="text-[0.88rem] text-[#5a6b7c] leading-relaxed font-light">
                          {row.before}
                          <strong className="font-semibold text-[#1c1c1c]">
                            {row.boldText}
                          </strong>
                          {row.after}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Warning Box */}
                  <div className="p-6 md:p-8 bg-[#fff0f0] text-[#8f2323] text-[0.88rem] font-light leading-relaxed border-t border-[#fca5a5]/30">
                    Customer spends 20–40 min comparing. Most leave without
                    booking. You were one of twenty options.
                  </div>
                </div>

                {/* Right Column: NOW SEARCH (GEO · AI Visibility) */}
                <div className="bg-[#113256] text-white flex flex-col justify-between md:border-l border-[#e5e9ef]/10">
                  {/* Header */}
                  <div className="p-6 md:p-8 flex items-center gap-4 border-b border-white/10 relative">
                    <div className="w-12 h-12 rounded-xl bg-[#132a45] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#7bafd4]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#7bafd4] mb-0.5">
                        AI ERA SEARCH
                      </p>
                      <h4 className="text-[1.2rem] font-bold text-white tracking-[-0.02em]">
                        GEO · AI Visibility
                      </h4>
                    </div>

                    {/* Visual three dots icon from the image */}
                    <div className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-1 items-center opacity-40">
                      <span className="w-1 h-1 rounded-full bg-white" />
                      <span className="w-1 h-1 rounded-full bg-white" />
                      <span className="w-1 h-1 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Row List */}
                  <div className="flex-1 flex flex-col">
                    {[
                      {
                        boldText: "one business",
                        before: "AI names ",
                        after: " - yours - directly in the answer",
                      },
                      {
                        boldText: "pre-sold",
                        before: "Customer arrives ",
                        after: " - AI already built the trust",
                      },
                      {
                        boldText: "Zero competition",
                        before: "",
                        after: " inside the AI answer",
                      },
                      {
                        boldText: "Compounds over time",
                        before: "",
                        after: " as AI models learn your authority",
                      },
                      {
                        boldText: "recommendation by name",
                        before: "A direct ",
                        after: " — not just a result",
                      },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        className="px-6 md:px-8 py-5 border-b border-white/5 flex items-start gap-4 flex-1"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#132a45] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#7bafd4]">
                          <svg
                            className="w-2.5 h-2.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="text-[0.88rem] text-white/70 leading-relaxed font-light">
                          {row.before ? row.before : ""}
                          <strong className="font-semibold text-white">
                            {row.boldText}
                          </strong>
                          {row.after ? row.after : ""}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Recommendation Box */}
                  <div className="p-6 md:p-8 bg-[#113256] text-[0.88rem] leading-relaxed border-t border-white/5">
                    <strong className="font-semibold text-white">
                      Customer arrives ready to buy.
                    </strong>{" "}
                    <span className="text-[#7bafd4]">
                      The AI already made the recommendation. You're the only
                      option they considered.
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </article>
        </section>

        {/* ══════════════════════════════════════════════════════
            WHAT WE DO — GEO Explained Simply
        ══════════════════════════════════════════════════════ */}
        <section className="px-[clamp(1.25rem,4vw,2rem)] pt-[clamp(5rem,10vw,8rem)] pb-[2rem] bg-[#f8fafc]">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <div className="mb-14">
                <div
                  className="eyebrow text-[#3a7fc1]"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 1,
                      background: "rgba(58,127,193,0.4)",
                      display: "block",
                    }}
                  />
                  What We Do
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                  <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.12] tracking-[-0.03em] text-[#0d2640]">
                    We make your business the answer{" "}
                    <span className="text-[#3a7fc1]">AI gives.</span>
                  </h2>
                  <p className="text-[1rem] font-light leading-[1.85] text-[#6b7280] lg:max-w-[420px]">
                    Not an ad. Not a ranking. The actual recommendation. We
                    built a proprietary AI engine from the ground up — not a
                    plugin, not a third-party tool — specifically to solve one
                    problem.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* GEO explanation cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Search,
                  label: "Traditional SEO",
                  title: "Get Found on Google",
                  desc: "Automated, continuous, intelligent optimization for every page. Every search query. You win on the traditional front too because we do both simultaneously.",
                  accent: "#6b7280",
                },
                {
                  icon: Bot,
                  label: "GEO · Star Product",
                  title: "Be the AI's Answer",
                  desc: "We structure your content, schema, and technical signals so ChatGPT, Gemini, Perplexity, Claude, and Google AI Overviews cite and recommend your business by name  when it matters most.",
                  accent: "#3a7fc1",
                  featured: true,
                },
                {
                  icon: MapPin,
                  label: "Local Visibility",
                  title: "Dominate Your Market",
                  desc: "AI engines answer with location context. We make sure your business is the trusted, verified answer in your city, region, and niche  wherever your customers are asking.",
                  accent: "#6b7280",
                },
                {
                  icon: Zap,
                  label: "Speed · Rapid Launch",
                  title: "Go Live in Days",
                  desc: "Most agencies take months to launch. With our proprietary AI-powered workflow, we design, build, and launch high-performing websites in just days without compromising quality.",
                  accent: "#6b7280",
                },
              ].map((card, i) => {
                const IconComponent = card.icon;
                return (
                  <Reveal key={i} delay={i * 0.1} y={30}>
                    <div
                      className={`rounded-2xl border p-8 h-full hover-lift ${
                        card.featured
                          ? "border-[#3a7fc1]/40 bg-[linear-gradient(135deg,#0d2640_0%,#1a3a5c_100%)] text-white"
                          : "border-[#e5e9ef] bg-white"
                      }`}
                    >
                      {card.featured && (
                        <div className="mb-4 inline-flex items-center gap-1.5 bg-[#3a7fc1] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                          <Star className="w-3 h-3 text-[#7bafd4] fill-[#7bafd4]" />{" "}
                          Core Focus
                        </div>
                      )}
                      <div
                        className={`mb-4 ${card.featured ? "text-[#7bafd4]" : "text-[#3a7fc1]"}`}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <p
                        className={`text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-2 ${card.featured ? "text-[#7bafd4]" : "text-[#9ca3af]"}`}
                      >
                        {card.label}
                      </p>
                      <h3
                        className={`text-[1.25rem] font-normal tracking-[-0.02em] mb-4 leading-[1.3] ${card.featured ? "text-white" : "text-[#0d2640]"}`}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`text-[0.9rem] font-light leading-[1.8] ${card.featured ? "text-white/65" : "text-[#6b7280]"}`}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* What's included */}
            <Reveal delay={0.2}>
              <div className="mt-10 rounded-2xl border border-[#e5e9ef] bg-white p-[clamp(2rem,4vw,3rem)]">
                <p className="text-[0.7rem] font-bold tracking-[0.25em] uppercase text-[#3a7fc1] mb-6">
                  Everything included in one annual subscription
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { icon: Bot, label: "GEO · AI Visibility" },
                    { icon: Search, label: "Full SEO" },
                    { icon: Globe, label: "Website Rebuild" },
                    { icon: Server, label: "Premium Hosting" },
                    { icon: Vote, label: "Social Media Management" },
                    {
                      icon: Star,
                      label: "Reputation Manager",
                      tag: "Exclusive",
                    },
                  ].map((item, i) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={i}
                        className="relative flex flex-col items-center text-center gap-2.5 p-4 pt-6 rounded-xl bg-[#f8fafc] border border-[#e5e9ef] hover:border-[#3a7fc1]/30 hover:shadow-sm transition-all duration-200 overflow-hidden"
                      >
                        {item.tag && (
                          <span className="absolute top-1.5 right-1.5 text-[0.55rem] font-bold uppercase tracking-wider bg-[#3a7fc1]/10 text-[#3a7fc1] border border-[#3a7fc1]/20 px-2 py-0.5 rounded-full scale-90">
                            {item.tag}
                          </span>
                        )}
                        <span className="text-[#3a7fc1]">
                          <IconComponent className="w-6 h-6" />
                        </span>
                        <span className="text-[0.75rem] font-medium text-[#374151] leading-tight">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            HOW IT WORKS — 3 steps
        ══════════════════════════════════════════════════════ */}
        <section
          id="how-it-works"
          className="px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,8rem)] bg-white"
        >
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <div
                className="eyebrow text-[#3a7fc1]"
                style={{ marginBottom: "1.5rem" }}
              >
                <span
                  style={{
                    width: 20,
                    height: 1,
                    background: "rgba(58,127,193,0.4)",
                    display: "block",
                  }}
                />
                How It Works
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-[clamp(3rem,6vw,5rem)]">
                <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.12] tracking-[-0.03em] text-[#0d2640]">
                  Three steps. One result: <br />
                  <p className=" text-[#3a7fc1]">AI recommends you.</p>
                </h2>
                <p className="text-[1rem] font-light leading-[1.85] text-[#6b7280] lg:max-w-[400px]">
                  We take your existing business and rebuild your digital
                  presence from the inside out — so AI engines trust, cite, and
                  recommend you above everyone else.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  num: "01",
                  title: "We Analyse",
                  headline:
                    "We find exactly why AI ignores your business right now.",
                  desc: "Our proprietary AI studies your business, industry, competition, and how major AI engines currently understand (or misunderstand) your brand. Most businesses are completely invisible to AI. We diagnose the exact gaps.",
                  points: [
                    "AI search visibility audit",
                    "Competitor GEO benchmarking",
                    "Technical gap analysis",
                  ],
                },
                {
                  num: "02",
                  title: "We Build",
                  headline:
                    "We rebuild your digital foundation for the AI era.",
                  desc: "We reconstruct your website with our proprietary AI framework — structured data, semantic architecture, GEO-optimised content, and technical signals that AI models are trained to trust. This is the engine. This is what makes the difference.",
                  points: [
                    "Proprietary schema & structured data",
                    "AI-visibility-ready architecture",
                    "GEO content framework",
                  ],
                },
                {
                  num: "03",
                  title: "AI Recommends You",
                  headline:
                    "When someone asks AI — your business is the answer.",
                  desc: "When customers ask ChatGPT, Gemini, or Perplexity for what you offer — your business is cited by name. Not one of twenty links. The one. And we keep it that way as AI models evolve, month after month.",
                  points: [
                    "Cited across ChatGPT, Gemini, Perplexity",
                    "Monthly optimization keeps you ahead",
                    "Zero technical involvement from you",
                  ],
                },
              ].map((step, i) => (
                <Reveal key={i} delay={i * 0.12} y={30}>
                  <div className="relative rounded-2xl border border-white/10 bg-[#113256] p-[clamp(1.75rem,3vw,2.5rem)] h-full hover-lift">
                    {/* Step number */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[3rem] font-light text-[#7bafd4]/30 leading-none">
                        {step.num}
                      </span>
                      {i < 2 && (
                        <div className="hidden lg:flex items-center absolute -right-4 top-1/2 -translate-y-1/2 z-10"></div>
                      )}
                    </div>
                    <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-[#7bafd4] mb-2">
                      {step.title}
                    </p>
                    <h3 className="text-[1.15rem] font-normal leading-[1.35] tracking-[-0.02em] text-white mb-4">
                      {step.headline}
                    </h3>
                    <p className="text-[0.88rem] font-light leading-[1.8] text-white/70 mb-6">
                      {step.desc}
                    </p>
                    <ul className="space-y-2">
                      {step.points.map((p, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2.5 text-[0.82rem] text-white/80 font-light"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#132a45] flex items-center justify-center text-[#7bafd4] flex-shrink-0">
                            <svg
                              className="w-2.5 h-2.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
    WHY US — Reimagined: Proprietary AI, not rented AI
══════════════════════════════════════════════════════ */}
        <section className="relative px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,8rem)] bg-[#f8fafc] overflow-hidden">
          {/* Background accent geometry */}
          <div className="pointer-events-none absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(58,127,193,0.07)_0%,transparent_70%)] translate-x-1/3 -translate-y-1/3" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(17,50,86,0.05)_0%,transparent_70%)] -translate-x-1/4 translate-y-1/4" />

          <div className="mx-auto max-w-[1200px]">
            {/* ── TOP HEADER ── */}
            <Reveal>
              <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div>
                  <div
                    className="eyebrow text-[#3a7fc1]"
                    style={{ marginBottom: "1.25rem" }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 1,
                        background: "rgba(58,127,193,0.4)",
                        display: "block",
                      }}
                    />
                    Why CYouMedia
                  </div>
                  <h2 className="text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-[1.1] tracking-[-0.03em] text-[#0d2640] max-w-[580px]">
                    We don't use other people's AI,{" "}
                    <span className=" text-[#3a7fc1]">We built our own.</span>
                  </h2>
                </div>
                <div className="lg:max-w-[340px]">
                  <p className="text-[0.95rem] font-light leading-[1.85] text-[#6b7280]">
                    Ask any digital agency one question:{" "}
                    <em>
                      "Is your AI yours — or are you just using someone else's?"
                    </em>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ── BODY: LEFT QUOTE + RIGHT CARDS ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-[clamp(2rem,5vw,5rem)] items-start">
              {/* LEFT — Statement block */}
              <Reveal x={-24}>
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Main statement card */}
                  <div className="relative rounded-2xl bg-[#113256] p-8 overflow-hidden">
                    {/* Inner glow */}
                    <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(58,127,193,0.25)_0%,transparent_70%)]" />
                    <p className="relative text-[1rem] font-light leading-[1.85] text-white/65 mb-6">
                      Our engine is not ChatGPT with a wrapper. It's not a
                      plugin, an API we rent, or a white-label tool with our
                      name on it. It's an infrastructure we built specifically
                      to make your business the recommendation AI gives — and it
                      continuously adapts as AI models are updated.
                    </p>
                    <div className="relative border-t border-white/10 pt-5">
                      <svg
                        className="w-6 h-6 text-[#3a7fc1] mb-3 opacity-60"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-[0.95rem] font-medium leading-[1.7] text-white">
                        "When your competitors are using off-the-shelf tools,
                        you're running a purpose-built engine. That distinction
                        changes everything."
                      </p>
                    </div>
                  </div>

                  {/* Stat strip */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        val: "3×",
                        label: "More AI citations than off-the-shelf tools",
                      },
                      {
                        val: "100%",
                        label:
                          "Proprietary infrastructure, zero third-party AI",
                      },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-[#e5e9ef] bg-white p-5"
                      >
                        <p className="text-[2rem] font-light tracking-[-0.04em] text-[#3a7fc1] leading-none mb-1">
                          {s.val}
                        </p>
                        <p className="text-[0.75rem] font-light leading-[1.5] text-[#6b7280]">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* RIGHT — Feature cards, redesigned */}
              <Reveal x={24} delay={0.08}>
                <div className="space-y-3">
                  {[
                    {
                      icon: Settings,
                      num: "01",
                      title: "Proprietary AI Engine",
                      desc: "Not a public chatbot. Not an off-the-shelf tool. Our closed AI infrastructure analyzes, rebuilds, and optimizes your entire digital presence from the technical ground up.",
                      accent: "from-[#3a7fc1]/10 to-transparent",
                    },
                    {
                      icon: Target,
                      num: "02",
                      title: "AI-First, Not AI-Added",
                      desc: "Most agencies bolt AI onto old processes. We designed our entire system around AI from day one — so every output is built for how machines discover businesses today.",
                      accent: "from-[#3a7fc1]/8 to-transparent",
                    },
                    {
                      icon: Globe,
                      num: "03",
                      title: "Triple Visibility: SEO + GEO + AI",
                      desc: "We optimize for Google, local maps, and AI discovery engines simultaneously. Your business gets found wherever your customers are searching — in all three lanes at once.",
                      accent: "from-[#3a7fc1]/10 to-transparent",
                    },
                    {
                      icon: ShieldCheck,
                      num: "04",
                      title: "Swedish Quality & GDPR Compliance",
                      desc: "Built in Sweden. GDPR-ready by design. We hold ourselves to the highest standards of data integrity and security — so your clients can trust you too.",
                      accent: "from-[#3a7fc1]/8 to-transparent",
                    },
                  ].map((item, i) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.7,
                          delay: i * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="group relative flex gap-5 rounded-2xl border border-[#e5e9ef] bg-white p-6 hover:border-[#3a7fc1]/30 hover:shadow-[0_8px_32px_rgba(58,127,193,0.1)] transition-all duration-300 cursor-default overflow-hidden"
                      >
                        {/* Hover gradient wash */}
                        <div
                          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />

                        {/* Number */}
                        <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-[#f0f5fb] border border-[#e5e9ef] group-hover:bg-[#3a7fc1] group-hover:border-[#3a7fc1] transition-all duration-300 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-[#3a7fc1] group-hover:text-white transition-colors duration-300" />
                        </div>

                        <div className="relative flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#9ca3af]">
                              {item.num}
                            </span>
                            <h3 className="text-[0.95rem] font-semibold text-[#0d2640] tracking-[-0.01em]">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-[0.855rem] font-light leading-[1.72] text-[#6b7280]">
                            {item.desc}
                          </p>
                        </div>

                        {/* Arrow hint */}
                        <div className="relative self-center flex-shrink-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#3a7fc1]">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            WHO WE WORK WITH
        ══════════════════════════════════════════════════════ 
        <section className="px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,8rem)] bg-white">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <div className="text-center mb-14">
                <div
                  className="eyebrow text-[#3a7fc1] justify-center"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 1,
                      background: "rgba(58,127,193,0.4)",
                      display: "block",
                    }}
                  />
                  Who We Work With
                  <span
                    style={{
                      width: 20,
                      height: 1,
                      background: "rgba(58,127,193,0.4)",
                      display: "block",
                    }}
                  />
                </div>
                <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-light leading-[1.12] tracking-[-0.03em] text-[#0d2640] mb-4">
                  Built for businesses that want to be found first.
                </h2>
                <p className="text-[1rem] font-light leading-[1.85] text-[#6b7280] max-w-[600px] mx-auto">
                  It doesn't matter what industry you're in. If your customers
                  use AI to search — and they do, or they will — you need to be
                  the business AI recommends.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                {
                  icon: Store,
                  title: "Local Businesses",
                  desc: "Restaurants, retail, clinics, salons — dominate your neighborhood in AI results",
                },
                {
                  icon: Handshake,
                  title: "Professional Services",
                  desc: "Accountants, lawyers, consultants — be the trusted recommendation AI gives",
                },
                {
                  icon: Hotel,
                  title: "Hospitality",
                  desc: "Hotels, venues, experiences — get named when travelers ask AI for recommendations",
                },
                {
                  icon: Factory,
                  title: "B2B & Enterprise",
                  desc: "Logistics, manufacturing, services — appear in AI answers your buyers trust",
                },
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <Reveal key={i} delay={i * 0.08} y={24}>
                    <div className="rounded-2xl border border-[#e5e9ef] bg-[#f8fafc] p-6 text-center hover-lift h-full flex flex-col items-center justify-start">
                      <span className="text-[#3a7fc1] mb-4">
                        <IconComponent className="w-8 h-8" />
                      </span>
                      <h3 className="text-[0.95rem] font-semibold text-[#0d2640] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[0.82rem] font-light leading-[1.7] text-[#6b7280]">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.3}>
              <p className="text-center mt-8 text-[0.9rem] font-light text-[#6b7280]">
                If you have a business and customers, we can make AI send them
                to you.
              </p>
            </Reveal>
          </div>
        </section>
         */}

        {/* ══════════════════════════════════════════════════════
            VISION QUOTE — Dark section
        ══════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#113256] px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,9rem)] text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(58,127,193,0.1)_0%,transparent_65%)]" />
          <div className="pointer-events-none absolute left-[10%] bottom-0 h-[300px] w-[300px] bg-[radial-gradient(circle,rgba(123,175,212,0.08)_0%,transparent_65%)]" />

          <div className="relative z-10 mx-auto max-w-[800px]">
            <Reveal>
              <div
                className="eyebrow text-[#7bafd4] justify-center"
                style={{ marginBottom: "1.5rem" }}
              >
                <span
                  style={{
                    width: 20,
                    height: 1,
                    background: "rgba(123,175,212,0.4)",
                    display: "block",
                  }}
                />
                The Bottom Line
                <span
                  style={{
                    width: 20,
                    height: 1,
                    background: "rgba(123,175,212,0.4)",
                    display: "block",
                  }}
                />
              </div>
              <p className="font-['Instrument_Serif',Georgia,serif] text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.2] tracking-[-0.02em] text-white mb-8">
                "Your competitors are not ready.
                <span className="block italic text-[#7bafd4]">
                  You can be."
                </span>
              </p>
              <p className="mx-auto max-w-[640px] text-[0.975rem] font-light leading-[1.85] text-white/45 mb-12">
                AI search is not the future. It is happening right now. Every
                day without AI visibility is a day your competitors could be
                getting the recommendation instead of you. CYouMedia gives you
                the technology, the infrastructure, and the ongoing intelligence
                to own that recommendation — starting this week.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            CTA — Final conversion section
        ══════════════════════════════════════════════════════ 
        <section id="contact" className="px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,8rem)] bg-[linear-gradient(160deg,#0d2640_0%,#1a3a5c_100%)] noise relative overflow-hidden">
          <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(58,127,193,0.15)_0%,transparent_65%)]" />

          <div className="relative z-10 mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(3rem,6vw,5rem)] items-center">

              <Reveal x={-20}>
                <div className="eyebrow text-[#7bafd4]" style={{marginBottom:'1.5rem'}}>
                  <span style={{width:20,height:1,background:'rgba(123,175,212,0.4)',display:'block'}} />
                  Get Started
                </div>
                <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] tracking-[-0.03em] text-white mb-6">
                  Get your free <br />
                  <span className="text-[#7bafd4] font-normal">AI Visibility Report.</span>
                </h2>
                <p className="text-[1rem] font-light leading-[1.85] text-white/55 mb-6">
                  We'll show you exactly how AI engines currently see your business and precisely what it takes to make you the recommendation.
                </p>
                <ul className="space-y-3">
                  {[
                    "See how ChatGPT & Gemini currently describe your business",
                    "Identify the exact gaps preventing AI recommendation",
                    "Get a clear roadmap to becoming the AI's answer",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.9rem] text-white/65 font-light">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-[#3a7fc1]/30 border border-[#3a7fc1]/40 flex items-center justify-center flex-shrink-0 text-[#7bafd4]">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal x={20} delay={0.1}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-[clamp(2rem,4vw,3rem)]">
                  <h3 className="text-[1.2rem] font-normal text-white mb-6 tracking-[-0.02em]">Start your AI Visibility journey</h3>
                  <div className="space-y-4 mb-6">
                    {[
                      { label: "Business Name", placeholder: "Your business name" },
                      { label: "Email Address", placeholder: "you@yourbusiness.com" },
                      { label: "Website URL", placeholder: "https://yourbusiness.com" },
                    ].map((field, i) => (
                      <div key={i}>
                        <label className="block text-[0.78rem] font-medium text-white/50 mb-1.5 tracking-wide">{field.label}</label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[0.9rem] text-white placeholder-white/25 focus:outline-none focus:border-[#3a7fc1]/50 focus:bg-white/8 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="w-full cta-btn justify-center text-[0.95rem] py-4">
                    Get My Free AI Visibility Report <ArrowRight />
                  </button>
                  <p className="text-center text-[0.75rem] text-white/25 mt-4 font-light">
                    Free, no commitment. We'll respond within 24 hours.
                  </p>
                </div>
              </Reveal>

            </div>
          </div>
        </section>
        */}
      </div>
    </>
  );
}
