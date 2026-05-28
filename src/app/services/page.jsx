"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Search,
  Globe,
  Server,
  Vote,
  Star,
  Zap,
  ShieldCheck,
  Target,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Activity,
  Cpu,
  MessageSquare,
  TrendingUp,
  Eye,
  ThumbsUp,
  Bell,
  BarChart2,
  Instagram,
  Facebook,
  Calendar,
  RefreshCw,
  AlertCircle,
  Award,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const Reveal = ({ children, delay = 0, className = "", x = 0, y = 30 }) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.8, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ══════════════════════════════════════
   DEMO 1: SEO vs GEO animated search demo
══════════════════════════════════════ */
const SEOGEODemo = () => {
  const [phase, setPhase] = useState(0);
  // 0: google results, 1: transition, 2: AI answer
  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#e2e8f0] bg-[#0a1628] shadow-2xl">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1f38] border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 bg-white/5 rounded-md px-3 py-1 text-[11px] text-white/30 font-mono">
          best car service center in london
        </div>
      </div>

      <div className="min-h-[260px] p-5 relative">
        <AnimatePresence mode="wait">
          {phase !== 2 ? (
            <motion.div
              key="google"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[11px] text-white/30 font-medium tracking-wide uppercase">
                  Google Search Results
                </span>
              </div>
              <div className="space-y-3">
                {[
                  {
                    title: "Top 10 Car Service Centers in London 2024 | Autotrader",
                    url: "autotrader.co.uk",
                    desc: "Compare reviews from 280+ car service centers near you...",
                  },
                  {
                    title: "Mobile Mechanic & Car Repair London | Whocanfixmycar",
                    url: "whocanfixmycar.com",
                    desc: "Book car servicing, brakes & MOT repair online. 24/7 quotes...",
                  },
                  {
                    title: "Best Car Mechanics London - Yell.com",
                    url: "yell.com",
                    desc: "Find local car servicing and garage specialists near you...",
                  },
                ].map((r, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-500 ${phase === 1 && i > 0 ? "opacity-20" : "opacity-100"}`}
                  >
                    <div className="text-[11px] text-white/25 mb-0.5">
                      {r.url}
                    </div>
                    <div className="text-[13px] text-[#7bafd4] hover:underline cursor-pointer leading-tight">
                      {r.title}
                    </div>
                    <div className="text-[11px] text-white/35 leading-relaxed mt-0.5">
                      {r.desc}
                    </div>
                  </div>
                ))}
              </div>
              {phase === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-[#0a1628]/80 backdrop-blur-sm"
                >
                  <div className="text-center">
                    <div className="flex gap-1 justify-center mb-2">
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
                    <p className="text-[11px] text-white/40">
                      Switching to AI search...
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#3a7fc1] flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <span className="text-[11px] text-[#7bafd4] font-bold tracking-wide uppercase">
                  ChatGPT / AI Answer
                </span>
              </div>
              <div className="rounded-xl border border-[#3a7fc1]/30 bg-[#3a7fc1]/8 p-4">
                <p className="text-[13px] text-white/80 leading-[1.7]">
                  Based on verified reviews, fast diagnostics, and trusted
                  reputation in London, I recommend{" "}
                  <span className="font-semibold text-white bg-[#3a7fc1]/30 px-1.5 py-0.5 rounded">
                    Apex Auto Care
                  </span>{" "}
                  — consistently recognised for same-day diagnostics, transparent
                  upfront pricing, and certified manufacturer-approved servicing across central London.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[#7bafd4]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold">
                    One business. Named directly. Zero competition.
                  </span>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-white/30 italic text-center">
                ↑ This is what GEO gets you
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phase indicator */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-white/5">
        {[
          { label: "Old SEO results", color: "#e87c7c" },
          { label: "Switching...", color: "#f5a623" },
          { label: "GEO — AI names you", color: "#7bafd4" },
        ].map((p, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 text-[10px] font-medium transition-all duration-300 ${phase === i ? "opacity-100" : "opacity-30"}`}
            style={{ color: p.color }}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full`}
              style={{ background: p.color }}
            />
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   DEMO 2: Website Build — Before/After AI Scanner Demo
══════════════════════════════════════ */
const WebsiteDemo = () => {
  const [view, setView] = useState("after");

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#e2e8f0] bg-[#0a1628] shadow-2xl">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1f38] border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[10px] text-[#7bafd4] font-mono tracking-wider">
          AI VISIBILITY DIAGNOSTIC C-900
        </span>
        <div className="ml-auto flex gap-1">
          {["before", "after"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                view === v
                  ? "bg-[#3a7fc1] text-white shadow-md"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
            >
              {v === "before" ? "Old Website" : "Our New Rebuild"}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 min-h-[300px]">
        <AnimatePresence mode="wait">
          {view === "before" ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Left Side: Old Site Mockup */}
              <div className="rounded-xl overflow-hidden border border-white/10 opacity-70">
                <div className="bg-[#1a1a2e] px-3 py-2 flex items-center gap-2 border-b border-white/10">
                  <div className="text-[10px] font-bold text-white/50 tracking-wider">
                    ROYAL HAVEN HOTEL
                  </div>
                  <div className="ml-auto text-[9px] text-white/20">
                    Call us: 1998
                  </div>
                </div>
                <div className="bg-[#16213e] p-4 text-center">
                  <div className="w-12 h-12 bg-gray-600 rounded mx-auto mb-2 flex items-center justify-center text-white/25 text-[9px]">
                    Hotel Photo
                  </div>
                  <p className="text-white text-[10px] font-bold leading-tight">
                    Luxury Hotel Suites & Rooms Available
                  </p>
                  <p className="text-white/30 text-[8px] mt-1 leading-relaxed">
                    We offer cheap hotel rooms, free wifi, single and double
                    beds in London near transit links.
                  </p>
                  <div className="bg-red-800/40 text-red-300 text-[8px] px-2 py-0.5 rounded mt-3 inline-block">
                    Submit Contact Form
                  </div>
                </div>
              </div>

              {/* Right Side: AI Scan Output */}
              <div className="rounded-xl p-4 bg-red-950/20 border border-red-900/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-red-400">
                    <AlertCircle className="w-4 h-4 animate-pulse shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      AI Visibility Status: FAILING
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-[10px] text-red-300/70">
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-500">❌</span> No JSON-LD schema
                      blocks found
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-500">❌</span> Unstructured HTML
                      div-soup layout
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-500">❌</span> AI visibility
                      nodes blocked in robots.txt
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-500">❌</span> Slow response
                      speed limit (6.4s)
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-red-900/20 text-center">
                  <span className="text-[14px] font-bold text-red-400 font-mono">
                    AI Visibility: 12%
                  </span>
                  <p className="text-[9px] text-red-400/50 mt-1 font-sans">
                    ChatGPT can't find or trust your business details.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Left Side: New Premium Site Mockup */}
              <div className="rounded-xl overflow-hidden border border-[#3a7fc1]/30 bg-gradient-to-br from-[#0d2640] to-[#1a3a5c] relative group shadow-lg">
                {/* Simulated AI scanner beam */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7bafd4] to-transparent z-20 pointer-events-none"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="bg-[#113256] px-4 py-2.5 flex items-center gap-3 border-b border-white/5">
                  <div className="text-[11px] font-bold text-white tracking-tight">
                    Haven Boutique <span className="text-[#7bafd4]">Hotel</span>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <span className="text-[8px] font-bold text-[#7bafd4] uppercase tracking-wider block mb-0.5">
                      LONDON'S TOP RATED
                    </span>
                    <h4 className="text-white text-[12px] font-bold leading-tight">
                      Luxury Boutique Suites,
                      <br />
                      Reimagined.
                    </h4>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {[
                      { n: "4.9★", l: "Google" },
                      { n: "Live", l: "Booking" },
                      { n: "Central", l: "Loc." },
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 rounded p-1.5 text-center border border-white/5"
                      >
                        <div className="text-[10px] font-bold text-[#7bafd4]">
                          {stat.n}
                        </div>
                        <div className="text-[7px] text-white/30 uppercase tracking-wider font-mono">
                          {stat.l}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-[#3a7fc1] text-white text-[9px] font-bold px-3 py-1.5 rounded-full shadow-[0_2px_10px_rgba(58,127,193,0.3)]">
                      Book Now
                    </div>
                    <div className="border border-white/10 text-white/50 text-[9px] px-3 py-1.5 rounded-full">
                      See Suites
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: AI Scan Output Terminal */}
              <div className="rounded-xl p-4 bg-emerald-950/20 border border-emerald-900/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-emerald-400">
                    <Activity
                      className="w-4 h-4 animate-spin shrink-0"
                      style={{ animationDuration: "3s" }}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      AI Visibility Status: VERIFIED
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-[9px] text-emerald-300/80">
                    <p className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> JSON-LD: Hotel
                      & Reservation schema verified
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Semantic
                      structures optimized for LLMs
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Robots.txt:
                      ChatGPT & Claude allowed
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="text-emerald-400">✓</span> Blazing edge
                      hosting active (0.4s load)
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-900/20 text-center">
                  <span className="text-[14px] font-bold text-emerald-400 font-mono animate-pulse">
                    AI Visibility: 100%
                  </span>
                  <p className="text-[9px] text-emerald-400/50 mt-1 font-sans">
                    ChatGPT can read, trust, and quote your business details.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   DEMO 3A: Reputation Management
══════════════════════════════════════ */
const ReputationDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveStep((s) => (s + 1) % 4), 2500);
    return () => clearInterval(t);
  }, []);

  const steps = [
    {
      icon: "✓",
      label: "Customer visits",
      color: "#7bafd4",
      detail: "John books a car service via your site",
    },
    {
      icon: "📱",
      label: "Auto review request",
      color: "#f5a623",
      detail: "He gets a friendly text 2hrs later asking for feedback",
    },
    {
      icon: "⭐",
      label: "5-star review posted",
      color: "#28c840",
      detail: "He taps 5 stars. It posts to Google automatically",
    },
    {
      icon: "💬",
      label: "AI responds instantly",
      color: "#3a7fc1",
      detail: "Your AI replies: 'Thanks John, glad we could help!'",
    },
  ];

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#e2e8f0] bg-[#0a1628] shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1f38] border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-white/30">
          Reputation Dashboard · Live Feed
        </span>
      </div>

      <div className="p-5">
        {/* Step flow */}
        <div className="flex items-center gap-1 mb-5">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <motion.div
                animate={{
                  scale: activeStep === i ? 1.1 : 1,
                  opacity: activeStep >= i ? 1 : 0.3,
                }}
                className="flex flex-col items-center flex-1"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px] border-2 transition-all duration-300 ${activeStep === i ? "border-[#3a7fc1] bg-[#3a7fc1]/20" : "border-white/10 bg-white/5"}`}
                >
                  {s.icon}
                </div>
                <div className="text-[9px] text-white/40 text-center mt-1 leading-tight">
                  {s.label}
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <div
                  className={`w-4 h-px flex-shrink-0 transition-all duration-500 ${activeStep > i ? "bg-[#3a7fc1]" : "bg-white/10"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Active step detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="rounded-xl border border-[#3a7fc1]/20 bg-[#3a7fc1]/5 p-4 mb-4"
          >
            <p className="text-[13px] text-white/70">
              {steps[activeStep].detail}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Review feed */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-2">
            Recent Reviews
          </div>
          {[
            {
              name: "Sarah K.",
              stars: 5,
              text: "Fantastic service, arrived same day!",
              platform: "Google",
              time: "2h ago",
              replied: true,
            },
            {
              name: "Mike T.",
              stars: 5,
              text: "Serviced my car in 30 mins. Brilliant!",
              platform: "Google",
              time: "1d ago",
              replied: true,
            },
            {
              name: "Lisa M.",
              stars: 4,
              text: "Good work, slightly late but professional",
              platform: "Trustpilot",
              time: "3d ago",
              replied: true,
            },
          ].map((r, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-2.5 rounded-lg bg-white/3 border border-white/5"
            >
              <div className="w-6 h-6 rounded-full bg-[#113256] flex items-center justify-center text-[10px] font-bold text-[#7bafd4] flex-shrink-0">
                {r.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-white">
                    {r.name}
                  </span>
                  <span className="text-[10px] text-[#f5a623]">
                    {"★".repeat(r.stars)}
                  </span>
                  <span className="text-[9px] text-white/20 ml-auto">
                    {r.time}
                  </span>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  {r.text}
                </p>
                {r.replied && (
                  <div className="text-[9px] text-[#7bafd4] mt-0.5">
                    ✓ AI replied automatically
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   DEMO 3B: Social Media Management
══════════════════════════════════════ */
const SocialDemo = () => {
  const [week, setWeek] = useState(0);
  const posts = [
    {
      day: "Mon",
      time: "9:00am",
      platform: "Instagram",
      status: "posted",
      content:
        "🚗 Engine light on? Here's how to spot the 3 critical warning signs before it leads to a breakdown...",
    },
    {
      day: "Wed",
      time: "11:00am",
      platform: "Facebook",
      status: "posted",
      content:
        "⭐ Another 5-star week! Thank you to all our London customers for the kind words...",
    },
    {
      day: "Fri",
      time: "5:00pm",
      platform: "Instagram",
      status: "scheduled",
      content:
        "✅ Weekend emergency? We're available 24/7. No call-out charge before 10pm...",
    },
    {
      day: "Sun",
      time: "12:00pm",
      platform: "Facebook",
      status: "scheduled",
      content:
        "💧 Did you know? A dripping tap wastes 5,500 litres a year. We can fix it today...",
    },
  ];

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#e2e8f0] bg-[#0a1628] shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0d1f38] border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-white/30">
          Social Media Planner · This Week
        </span>
      </div>

      <div className="p-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            {
              val: "16",
              label: "Posts/month",
              icon: <Calendar className="w-3 h-3" />,
            },
            {
              val: "2.4k",
              label: "Reach this week",
              icon: <Eye className="w-3 h-3" />,
            },
            {
              val: "94%",
              label: "On schedule",
              icon: <CheckCircle2 className="w-3 h-3" />,
            },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-lg bg-white/3 border border-white/5 p-2.5 text-center"
            >
              <div className="flex items-center justify-center gap-1 text-[#7bafd4] mb-1">
                {s.icon}
              </div>
              <div className="text-[15px] font-bold text-white">{s.val}</div>
              <div className="text-[9px] text-white/30">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Post schedule */}
        <div className="space-y-2">
          {posts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-2.5 rounded-lg bg-white/3 border border-white/5"
            >
              <div className="flex-shrink-0 text-center w-10">
                <div className="text-[11px] font-bold text-[#7bafd4]">
                  {p.day}
                </div>
                <div className="text-[9px] text-white/30">{p.time}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${p.platform === "Instagram" ? "bg-pink-900/40 text-pink-300" : "bg-blue-900/40 text-blue-300"}`}
                  >
                    {p.platform}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full ${p.status === "posted" ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"}`}
                  >
                    {p.status === "posted" ? "✓ Posted" : "⏱ Scheduled"}
                  </span>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed truncate">
                  {p.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 text-center text-[10px] text-white/25 italic">
          All posts written & scheduled automatically — you don't lift a finger
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   MAIN SERVICES DATA
══════════════════════════════════════ */
const services = [
  {
    id: 0,
    number: "01",
    navLabel: "GEO & AI Visibility",
    title: "Get Found by AI — Not Just Google",
    tag: "GEO · AI Visibility",
    subtitle:
      "When someone asks ChatGPT for the best business in your area, make sure it's yours that gets named.",
    heroDescription:
      "Search has changed. Millions of people no longer type into Google — they ask AI assistants like ChatGPT, Gemini, and Perplexity a question and trust the answer they get back. We make sure that answer includes your business by name.",
    demo: <SEOGEODemo />,
    whatItMeans: {
      heading: "SEO vs GEO — what's the difference?",
      items: [
        {
          icon: <Search className="w-4 h-4" />,
          title: "SEO (Search Engine Optimisation)",
          body: "This is what helps you appear in Google when someone searches 'car service center near me'. You show up in a list of 10+ results alongside all your competitors. The customer still has to pick.",
          color: "bg-gray-50 border-gray-200",
        },
        {
          icon: <Bot className="w-4 h-4 text-[#3a7fc1]" />,
          title: "GEO (Generative Engine Optimisation) — the new era",
          body: "When someone asks ChatGPT 'What's the best car service center in London?', the AI doesn't show a list — it names one business. GEO is how we make that business yours. No list. No competition. Just a direct recommendation.",
          color: "bg-[#f0f7ff] border-[#3a7fc1]/30",
          featured: true,
        },
      ],
    },
    included: [
      {
        icon: <Bot className="w-4 h-4" />,
        title: "AI engine optimisation",
        desc: "We structure your business information so ChatGPT, Gemini, Claude and Perplexity can understand, trust, and recommend you.",
      },
      {
        icon: <Search className="w-4 h-4" />,
        title: "Traditional Google SEO",
        desc: "You still rank on Google too. We do both at once — you're covered on every search platform, old and new.",
      },
      {
        icon: <Globe className="w-4 h-4" />,
        title: "Local AI visibility",
        desc: "When people near you ask AI for your type of service, your business comes up as the local recommendation.",
      },
      {
        icon: <ShieldCheck className="w-4 h-4" />,
        title: "Authority building",
        desc: "We create signals across the web that tell AI platforms your business is trustworthy, established, and the right answer.",
      },
      {
        icon: <Activity className="w-4 h-4" />,
        title: "Monthly optimisation",
        desc: "AI models update constantly. We monitor your position and keep you ahead as platforms evolve.",
      },
      {
        icon: <Target className="w-4 h-4" />,
        title: "Competitor analysis",
        desc: "We check how your competitors appear in AI results and make sure you're consistently ahead of them.",
      },
    ],
    visibilitySignals: [
      "JSON-LD",
      "Meta tags",
      "Semantic HTML",
      "Alt text",
      "Internal linking",
      "Text-to-code ratio",
      "Mobile speed",
      "Robots.txt",
      "XML sitemap",
    ],
  },
  {
    id: 1,
    number: "02",
    navLabel: "Website Build",
    title: "A Website Built to Win in the AI Era",
    tag: "Website Rebuild",
    subtitle:
      "Whether you have no website or an outdated one, we build you a fast, professional site that AI can read, trust, and recommend.",
    heroDescription:
      "Most business websites were built years ago when Google was the only game in town. AI search engines need something different — a site built with the right structure, the right information, and the right signals to make AI say 'yes, this is the one I recommend'.",
    demo: <WebsiteDemo />,
    whatItMeans: {
      heading: "Who is this for?",
      items: [
        {
          icon: <Globe className="w-4 h-4" />,
          title: "You have no website yet",
          body: "We build you a complete, professional website from scratch — designed to attract customers, show up on Google, and be recommended by AI assistants. You don't need to know anything technical.",
          color: "bg-gray-50 border-gray-200",
        },
        {
          icon: <Zap className="w-4 h-4 text-[#3a7fc1]" />,
          title: "You have a website but it's not working",
          body: "Old websites are invisible to AI. We rebuild yours with the modern structure AI needs to understand your business — so it starts recommending you instead of your competitors.",
          color: "bg-[#f0f7ff] border-[#3a7fc1]/30",
          featured: true,
        },
      ],
    },
    included: [
      {
        icon: <Globe className="w-4 h-4" />,
        title: "Complete website design & build",
        desc: "A clean, professional website tailored to your business — designed to convert visitors into customers.",
      },
      {
        icon: <Zap className="w-4 h-4" />,
        title: "Blazing fast speed",
        desc: "We target perfect speed scores. Fast sites rank higher on Google and give a better experience to your customers.",
      },
      {
        icon: <Bot className="w-4 h-4" />,
        title: "AI-readable structure",
        desc: "Every page is built so AI engines can understand exactly what you do, where you are, and why you're the best choice.",
      },
      {
        icon: <Server className="w-4 h-4" />,
        title: "Premium global hosting included",
        desc: "Your site is hosted on enterprise-grade infrastructure with 99.9% uptime and fast load times for visitors anywhere in the world.",
      },
      {
        icon: <ShieldCheck className="w-4 h-4" />,
        title: "Mobile-first design",
        desc: "Over 70% of searches happen on mobile. Your new site looks perfect and works flawlessly on every device.",
      },
      {
        icon: <Target className="w-4 h-4" />,
        title: "Your branding, your voice",
        desc: "We work within your brand guidelines — colours, logo, tone — so the site feels like you, just vastly improved.",
      },
    ],
  },
  {
    id: 2,
    number: "03",
    navLabel: "Digital Tools",
    title: "Two Tools That Grow Your Business on Autopilot",
    tag: "Digital Growth Tools",
    subtitle:
      "Handle your online reputation and social media automatically — no staff required, no technical knowledge needed.",
    heroDescription:
      "Two of the biggest challenges for any business are getting great reviews and staying active on social media. Both take time you don't have. We automate both completely, so your reputation grows and your audience stays engaged — while you focus on running your business.",
    demo: null,
    dualDemo: true,
    whatItMeans: {
      heading: "Two tools, one subscription",
      items: [
        {
          icon: <Star className="w-4 h-4 text-[#f5a623]" />,
          title: "Reputation Management",
          body: "After every job, your customers get a simple text or email asking for a review. When they leave one, AI responds on your behalf in seconds. Bad experiences get caught privately before they go public. Your star rating grows automatically.",
          color: "bg-[#fffbf0] border-[#f5a623]/30",
        },
        {
          icon: <Vote className="w-4 h-4 text-[#3a7fc1]" />,
          title: "Social Media Management",
          body: "We plan, write, and post content to your Instagram, Facebook, and other platforms every week — all tailored to your business and industry. You don't write anything, you don't log into anything. It just happens.",
          color: "bg-[#f0f7ff] border-[#3a7fc1]/30",
        },
      ],
    },
    reputationFeatures: [
      {
        icon: <Bell className="w-4 h-4" />,
        title: "Automated review requests",
        desc: "After each job, customers get a friendly automated message inviting them to leave a review. Perfectly timed. Always polite.",
      },
      {
        icon: <MessageSquare className="w-4 h-4" />,
        title: "AI replies to every review",
        desc: "Every review — good or bad — gets a professional, personalised reply within minutes. Written by AI, sounds human.",
      },
      {
        icon: <AlertCircle className="w-4 h-4" />,
        title: "Unhappy customers handled privately",
        desc: "If someone is unhappy, the system catches it before it becomes a public 1-star review and routes it to you to fix privately.",
      },
      {
        icon: <BarChart2 className="w-4 h-4" />,
        title: "All reviews in one dashboard",
        desc: "Google, Trustpilot, Facebook — all your reviews from every platform in one clean, simple place. No more logging into multiple sites.",
      },
      {
        icon: <TrendingUp className="w-4 h-4" />,
        title: "Star rating growth tracking",
        desc: "Watch your average rating improve over time. We show you exactly how your reputation is growing week by week.",
      },
      {
        icon: <Award className="w-4 h-4" />,
        title: "Builds your AI authority",
        desc: "Great reviews and responses are read by AI search engines. More 5-star reviews = higher chance AI recommends your business.",
      },
    ],
    socialFeatures: [
      {
        icon: <Calendar className="w-4 h-4" />,
        title: "Done-for-you content calendar",
        desc: "We create a full month of posts for your business — relevant, engaging, on-brand — and schedule them all in advance.",
      },
      {
        icon: <Instagram className="w-4 h-4" />,
        title: "Multi-platform posting",
        desc: "Your content goes out to Instagram, Facebook, Google My Business and more automatically. One system, every platform.",
      },
      {
        icon: <Star className="w-4 h-4" />,
        title: "Industry-relevant content",
        desc: "Posts are written specifically for your type of business — not generic filler. Real tips, seasonal content, and trust-building posts.",
      },
      {
        icon: <Eye className="w-4 h-4" />,
        title: "Performance reporting",
        desc: "See how many people saw your posts, engaged with them, and clicked through. Simple monthly reports with no jargon.",
      },
      {
        icon: <RefreshCw className="w-4 h-4" />,
        title: "Always active, even when you're not",
        desc: "Your social media stays alive all year round — weekends, holidays, busy seasons. You never go quiet and lose followers.",
      },
      {
        icon: <TrendingUp className="w-4 h-4" />,
        title: "Audience growth",
        desc: "Consistent, quality posting builds a real following over time — turning your social media from a ghost town into a trust signal.",
      },
    ],
  },
];

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [digitalSubTab, setDigitalSubTab] = useState("reputation");

  const service = services[activeTab];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        .services-root { background: #f8fafc; color: #374151; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
        .cyber-grid {
          background-image: linear-gradient(rgba(17,50,86,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(17,50,86,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .glass-card {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(226,232,240,0.9);
          box-shadow: 0 8px 32px rgba(17,50,86,0.05);
        }
        @keyframes shimmer-text {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer { background: linear-gradient(90deg, #fff, #7bafd4, #e2e8f0, #fff); background-size: 200% auto; color: transparent; -webkit-background-clip: text; background-clip: text; animation: shimmer-text 5s linear infinite; }
        .tab-active { background: white; color: #113256; box-shadow: 0 4px 16px rgba(255,255,255,0.15); }
        .tab-inactive { color: rgba(255,255,255,0.6); }
        .tab-inactive:hover { color: white; background: rgba(255,255,255,0.06); }
        .feature-card { transition: all 0.2s ease; }
        .feature-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(17,50,86,0.08); border-color: rgba(58,127,193,0.3) !important; }
      `}</style>

      <div className="services-root min-h-screen relative">
        <div className="absolute inset-0 cyber-grid pointer-events-none opacity-70" />

        {/* ── HERO ── */}
        <section className="relative pt-36 pb-20 px-6 bg-[#123356] overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="pointer-events-none absolute left-[10%] top-0 h-[600px] w-[700px] -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,transparent_70%)]" />

          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <Reveal delay={0.05}>
              <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#7bafd4] mb-6">
                <span className="w-5 h-px bg-[#7bafd4]/50" />
                Our Services
                <span className="w-5 h-px bg-[#7bafd4]/50" />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <h1 className="font-['DM_Sans',sans-serif] text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.04em] text-white mb-5">
                Engineering the{" "}
                <span className="shimmer-text font-normal text-[#7AAED5]">
                  AI-First{" "}
                </span>{" "}
                Ecosystem
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="max-w-[640px] mx-auto text-[clamp(0.95rem,1.4vw,1.1rem)] font-light leading-relaxed text-white/55 mb-10">
                Three services. One subscription. We handle your visibility on
                Google, on AI platforms, and your reputation online — so
                customers find you and trust you before they've even clicked.
              </p>
            </Reveal>

            {/* Tab switcher */}
            <Reveal delay={0.28}>
              <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg">
                {services.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`px-5 py-2.5 rounded-xl text-[0.82rem] font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${activeTab === i ? "tab-active" : "tab-inactive"}`}
                  >
                    <span className="text-[9px] font-bold opacity-50">
                      {s.number}
                    </span>
                    {s.navLabel}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section className="relative px-6 z-10 -mt-8 mb-16">
          <div className="max-w-[1200px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="glass-card rounded-[32px] p-8 md:p-12 overflow-hidden relative"
              >
                {/* Tag + Title */}
                <div className="mb-8">
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#3a7fc1] mb-3 block">
                    {service.tag}
                  </span>
                  <h2 className="font-['Outfit',sans-serif] text-[clamp(2rem,4vw,3rem)] font-light leading-tight tracking-[-0.03em] text-[#113256] mb-3">
                    {service.title}
                  </h2>
                  <p className="text-[1.05rem] font-semibold text-[#3a7fc1] mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-[0.95rem] font-light leading-relaxed text-gray-600 max-w-[760px]">
                    {service.heroDescription}
                  </p>
                </div>

                {/* ── SEO + WEBSITE: Standard Layout ── */}
                {!service.dualDemo && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                    {/* Demo */}
                    <div>{service.demo}</div>

                    {/* What it means cards */}
                    <div>
                      <h3 className="text-[0.82rem] font-bold uppercase tracking-wider text-[#113256] mb-4">
                        {service.whatItMeans.heading}
                      </h3>
                      <div className="space-y-3 mb-6">
                        {service.whatItMeans.items.map((item, i) => (
                          <div
                            key={i}
                            className={`p-5 rounded-2xl border ${item.color} ${item.featured ? "ring-2 ring-[#3a7fc1]/20" : ""}`}
                          >
                            <div className="flex items-center gap-2 mb-2 text-[#113256]">
                              {item.icon}
                              <h4 className="text-[0.9rem] font-bold">
                                {item.title}
                              </h4>
                              {item.featured && (
                                <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-[#3a7fc1] text-white px-2 py-0.5 rounded-full">
                                  This era
                                </span>
                              )}
                            </div>
                            <p className="text-[0.83rem] font-light text-gray-600 leading-relaxed">
                              {item.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── DIGITAL TOOLS: Dual Demo Layout ── */}
                {service.dualDemo && (
                  <div className="mb-10">
                    <div className="flex gap-2 mb-6">
                      {[
                        { id: "reputation", label: "⭐ Reputation Management" },
                        { id: "social", label: "📱 Social Media Management" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setDigitalSubTab(t.id)}
                          className={`px-5 py-2.5 rounded-xl text-[0.82rem] font-medium transition-all duration-200 border ${digitalSubTab === t.id ? "bg-[#113256] text-white border-[#113256]" : "bg-white text-[#113256] border-[#e2e8f0] hover:border-[#113256]/30"}`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      {/* Demo */}
                      <div>
                        <AnimatePresence mode="wait">
                          {digitalSubTab === "reputation" ? (
                            <motion.div
                              key="rep"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <ReputationDemo />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="soc"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <SocialDemo />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Explainer */}
                      <div>
                        <h3 className="text-[0.82rem] font-bold uppercase tracking-wider text-[#113256] mb-4">
                          How it works
                        </h3>
                        {digitalSubTab === "reputation" ? (
                          <div className="space-y-3">
                            <div className="p-5 rounded-2xl bg-[#fffbf0] border border-[#f5a623]/30">
                              <p className="text-[0.92rem] font-semibold text-[#113256] mb-2">
                                The problem we solve
                              </p>
                              <p className="text-[0.83rem] font-light text-gray-600 leading-relaxed">
                                Most happy customers never leave a review — not
                                because they don't want to, but because no one
                                asked. We ask for you, automatically, at exactly
                                the right moment.
                              </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#f0fdf4] border border-green-200">
                              <p className="text-[0.92rem] font-semibold text-[#113256] mb-2">
                                What happens
                              </p>
                              <p className="text-[0.83rem] font-light text-gray-600 leading-relaxed">
                                A happy customer finishes a job. They get a
                                friendly, automated text. They tap 5 stars. It
                                posts to Google. AI replies immediately. You get
                                notified and watch your reputation grow. All
                                automatic.
                              </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#f0f7ff] border border-[#3a7fc1]/30">
                              <p className="text-[0.92rem] font-semibold text-[#113256] mb-2">
                                Why it matters for AI
                              </p>
                              <p className="text-[0.83rem] font-light text-gray-600 leading-relaxed">
                                AI platforms read your reviews to decide if
                                you're trustworthy. More 5-star reviews =
                                stronger signal that you're the business to
                                recommend. Reputation management directly feeds
                                your AI visibility.
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="p-5 rounded-2xl bg-[#f0f7ff] border border-[#3a7fc1]/30">
                              <p className="text-[0.92rem] font-semibold text-[#113256] mb-2">
                                The problem we solve
                              </p>
                              <p className="text-[0.83rem] font-light text-gray-600 leading-relaxed">
                                You know you should be posting on social media.
                                But you don't have time to write content, find
                                images, and schedule posts every week. So your
                                profiles go quiet — and so does your audience.
                              </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#f0fdf4] border border-green-200">
                              <p className="text-[0.92rem] font-semibold text-[#113256] mb-2">
                                What we do
                              </p>
                              <p className="text-[0.83rem] font-light text-gray-600 leading-relaxed">
                                We write, design, and schedule all your social
                                media posts. Instagram, Facebook, Google all
                                handled. You review the plan each month if you
                                like, or simply let us run it. No logins needed.
                              </p>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#fffbf0] border border-[#f5a623]/30">
                              <p className="text-[0.92rem] font-semibold text-[#113256] mb-2">
                                The result
                              </p>
                              <p className="text-[0.83rem] font-light text-gray-600 leading-relaxed">
                                A consistent, active social presence that builds
                                trust with new customers and tells AI platforms
                                your business is active, engaged, and worth
                                recommending.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── INCLUDED FEATURES GRID ── */}
                <div>
                  <h3 className="text-[0.82rem] font-bold uppercase tracking-wider text-[#113256] mb-4">
                    {service.dualDemo
                      ? digitalSubTab === "reputation"
                        ? "Everything included in Reputation Management"
                        : "Everything included in Social Media Management"
                      : "Everything included"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(service.dualDemo
                      ? digitalSubTab === "reputation"
                        ? service.reputationFeatures
                        : service.socialFeatures
                      : service.included
                    ).map((item, i) => (
                      <div
                        key={`${digitalSubTab}-${i}`}
                        className="feature-card flex gap-3 p-4 rounded-xl bg-white border border-[#e5e9ef]"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#f0f7ff] flex items-center justify-center flex-shrink-0 text-[#3a7fc1]">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-[0.85rem] font-bold text-[#113256] mb-1">
                            {item.title}
                          </p>
                          <p className="text-[0.78rem] font-light text-gray-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visibility signals (GEO only) */}
                {service.visibilitySignals && (
                  <div className="mt-8 p-6 rounded-2xl bg-[#113256]/5 border border-[#113256]/10">
                    <h4 className="text-[0.82rem] font-bold uppercase tracking-wider text-[#113256] mb-4 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#3a7fc1]" />
                      We optimise all 9 core AI visibility signals
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
                      {service.visibilitySignals.map((sig, i) => (
                        <div
                          key={i}
                          className="feature-card text-center p-2.5 rounded-xl bg-[#163658] border border-white/10 min-h-[52px] flex items-center justify-center"
                        >
                          <span className="text-[0.7rem] font-bold text-white leading-tight">
                            {sig}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── ALL SERVICES SUMMARY ── */}
        {activeTab !== 2 && (
          <section className="relative px-6 z-10 mb-16">
            <div className="max-w-[1200px] mx-auto">
              <Reveal>
                <div className="rounded-[32px] p-8 md:p-12 border border-white/5 bg-[#163658] shadow-[0_12px_40px_rgba(0,0,0,0.25)] relative overflow-hidden">
                  {/* Glowing background gradient inside the card */}
                  <div className="absolute -left-10 -top-10 w-48 h-48 bg-[#3a7fc1]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="text-center mb-10 relative z-10">
                    <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#7bafd4] mb-4">
                      <span className="w-5 h-px bg-[#7bafd4]/40" />
                      All Services
                      <span className="w-5 h-px bg-[#7bafd4]/40" />
                    </div>
                    <h3 className="font-['Outfit',sans-serif] text-[2rem] font-light leading-tight tracking-[-0.03em] text-white">
                      One subscription. Everything covered.
                    </h3>
                    <p className="max-w-[500px] mx-auto text-[0.88rem] font-light text-slate-300 mt-2">
                      No third-party tools. No rented licences. Purpose-built
                      infrastructure that compounds as your reputation grows.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 relative z-10">
                    {[
                      {
                        icon: <Bot className="w-5 h-5" />,
                        label: "GEO · AI Visibility",
                        desc: "Get named by ChatGPT, Gemini & Perplexity",
                        num: "01",
                      },
                      {
                        icon: <Search className="w-5 h-5" />,
                        label: "SEO Optimisation",
                        desc: "Rank on Google for the searches that matter",
                        num: "01",
                      },
                      {
                        icon: <Globe className="w-5 h-5" />,
                        label: "Website Rebuild",
                        desc: "Fast, modern, AI-ready website for your business",
                        num: "02",
                      },
                      {
                        icon: <Server className="w-5 h-5" />,
                        label: "Premium Hosting",
                        desc: "99.9% uptime, global CDN, enterprise-grade",
                        num: "02",
                      },
                      {
                        icon: <Star className="w-5 h-5" />,
                        label: "Content Updates",
                        desc: "All Content Updates",
                        num: "03",
                      },
                      {
                        icon: <Vote className="w-5 h-5" />,
                        label: "Digital Tools",
                        desc: "Reputation Management + Advanced Tools",
                        num: "04",
                        tag: "Exclusive",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="feature-card group relative flex gap-4 p-5 rounded-2xl bg-[#3a7fc1]/10 border border-white/10 hover:bg-[#3a7fc1]/20 hover:border-[#3a7fc1]/40 transition-all duration-300 shadow-[0_8px_30px_rgba(58,127,193,0.12)] backdrop-blur-sm"
                      >
                        {item.tag && (
                          <span className="absolute top-2 right-2 text-[0.55rem] font-bold uppercase tracking-wider bg-[#3a7fc1]/20 text-[#7bafd4] border border-[#3a7fc1]/30 px-2 py-0.5 rounded-full">
                            {item.tag}
                          </span>
                        )}
                        <div className="w-10 h-10 rounded-xl bg-white/5 text-[#7bafd4] group-hover:bg-white group-hover:text-[#163658] transition-all duration-300 flex items-center justify-center flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-[0.88rem] font-bold text-white mb-0.5 group-hover:text-[#7bafd4] transition-colors duration-200">
                            {item.label}
                          </p>
                          <p className="text-[0.75rem] font-light text-slate-300 leading-relaxed group-hover:text-white/80 transition-colors duration-200">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div>
                      <p className="text-[1.1rem] font-bold text-white">
                        Ready to get started?
                      </p>
                      <p className="text-[0.82rem] font-light text-slate-300">
                        Book a free 15-minute call. We'll show you exactly where
                        you stand and what it takes to get AI recommending you.
                      </p>
                    </div>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#3a7fc1] hover:bg-[#4c90d2] text-white font-semibold text-[0.88rem] shadow-[0_4px_24px_rgba(58,127,193,0.3)] hover:-translate-y-[2px] transition-all duration-300 whitespace-nowrap"
                    >
                      Book a Free Call <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
