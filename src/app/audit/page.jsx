"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Cpu,
  Globe,
  Activity,
  Zap,
  Printer,
  Sparkles,
  ArrowRight,
  Gauge,
  HelpCircle,
  Smartphone,
  Monitor,
} from "lucide-react";

// Standard animations
const EASE = [0.16, 1, 0.3, 1];
const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE },
};

const METRIC_DEFS = {
  fcp: {
    name: "First Contentful Paint",
    shortName: "FCP",
    desc: "Duration for browser to render the first content block. Target: ≤ 1.8s",
  },
  lcp: {
    name: "Largest Contentful Paint",
    shortName: "LCP",
    desc: "Time for the largest content element to become visible. Target: ≤ 2.5s",
  },
  tbt: {
    name: "Total Blocking Time",
    shortName: "TBT",
    desc: "Total duration between FCP and Time to Interactive. Target: ≤ 150ms",
  },
  cls: {
    name: "Cumulative Layout Shift",
    shortName: "CLS",
    desc: "Quantifies unexpected page layout shifts during loading. Target: ≤ 0.1",
  },
  ttfb: {
    name: "Time to First Byte",
    shortName: "TTFB",
    desc: "Duration for server to respond to initial request. Target: ≤ 800ms",
  },
  si: {
    name: "Speed Index",
    shortName: "SI",
    desc: "Rate at which visible elements are populated during load. Target: ≤ 3.4s",
  },
};

const MILESTONE_LOGS = [
  {
    threshold: 2,
    text: "🔍 Resolving DNS records & secure protocol handshake...",
  },
  { threshold: 12, text: "🌐 Establishing remote secure connection..." },
  { threshold: 22, text: "🚀 Fetching document source tree via node agent..." },
  {
    threshold: 35,
    text: "📦 Parsing HTML tags, semantic nodes & content elements...",
  },
  {
    threshold: 48,
    text: "🧬 Evaluating JSON-LD structured schemas & business mappings...",
  },
  {
    threshold: 60,
    text: "🤖 Auditing robots.txt indexes & allow-list directives for LLM bots...",
  },
  {
    threshold: 72,
    text: "📈 Analyzing text-to-code ratios & picture alt tag coverage...",
  },
  {
    threshold: 82,
    text: "⚡ Dispatching parallel Google Pagespeed API queries (Mobile strategy)...",
  },
  {
    threshold: 88,
    text: "⚡ Dispatching parallel Google Pagespeed API queries (Desktop strategy)...",
  },
  {
    threshold: 93,
    text: "⏳ Awaiting Google Lighthouse diagnostics payload...",
  },
];

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle"); // idle, scanning, completed, error
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [report, setReport] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [strategy, setStrategy] = useState("mobile"); // mobile or desktop

  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  // Dynamic milestone logs effect
  useEffect(() => {
    if (status !== "scanning") return;

    const currentMilestones = MILESTONE_LOGS.filter(
      (m) => progress >= m.threshold,
    );
    setLogs((prev) => {
      const prevSet = new Set(prev);
      const toAdd = currentMilestones
        .filter((m) => !prevSet.has(m.text))
        .map((m) => m.text);
      if (toAdd.length > 0) {
        return [...prev, ...toAdd];
      }
      return prev;
    });
  }, [progress, status]);

  const handleAudit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setStatus("scanning");
    setProgress(0);
    setLogs([]);
    setErrorMessage("");
    setReport(null);

    // Dynamic progress crawler (organic growth towards 95%)
    let currentProgress = 0;
    const organicInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        let increment = 1.2;
        if (prev < 30) increment = 2.4;
        else if (prev < 60) increment = 1.0;
        else if (prev < 80) increment = 0.5;
        else increment = 0.15;

        const nextVal = parseFloat((prev + increment).toFixed(1));
        currentProgress = nextVal > 95 ? 95 : nextVal;
        return currentProgress;
      });
    }, 150);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${API_URL}/api/audit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (res.ok) {
        clearInterval(organicInterval);

        // Add final milestones
        setLogs((prev) => [
          ...prev,
          "📋 Compiling executive summaries and actionable blueprints...",
          "✅ Audit successfully finalized.",
        ]);

        // Quickly animate progress bar to 100%
        let currentP = currentProgress;
        const completionInterval = setInterval(() => {
          currentP += 2;
          if (currentP >= 100) {
            currentP = 100;
            clearInterval(completionInterval);

            // Short hold for visual closure
            setTimeout(() => {
              setReport(data);
              setStatus("completed");
            }, 600);
          }
          setProgress(currentP);
        }, 30);
      } else {
        clearInterval(organicInterval);
        setErrorMessage(data.error || "Failed to analyze target website.");
        setStatus("error");
      }
    } catch (err) {
      clearInterval(organicInterval);
      setErrorMessage("Network connection timed out. Please try again.");
      setStatus("error");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getScoreColor = (score) => {
    if (score >= 90)
      return "text-emerald-500 stroke-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 50)
      return "text-amber-500 stroke-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-red-500 stroke-red-500 bg-red-500/10 border-red-500/20";
  };

  const getScoreHex = (score) => {
    if (score >= 90) return "#10b981"; // Emerald-500
    if (score >= 50) return "#f59e0b"; // Amber-500
    return "#ef4444"; // Red-500
  };

  const getCircularProgress = (score) => {
    const radius = 36;
    const strokeDasharray = 2 * Math.PI * radius;
    const strokeDashoffset = strokeDasharray - (score / 100) * strokeDasharray;
    return { strokeDasharray, strokeDashoffset };
  };

  const getMetricStatus = (key, value) => {
    if (!value || value === "N/A")
      return {
        status: "N/A",
        color: "text-gray-400 bg-gray-50 border-gray-200",
      };

    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num))
      return {
        status: "Info",
        color: "text-gray-500 bg-gray-50 border-gray-200",
      };

    const isMs = value.toLowerCase().includes("ms");

    switch (key) {
      case "lcp":
        if (num <= 2.5)
          return {
            status: "Good",
            color: "text-emerald-600 bg-emerald-50 border-emerald-200",
          };
        if (num <= 4.0)
          return {
            status: "Needs Imp.",
            color: "text-amber-600 bg-amber-50 border-amber-200",
          };
        return {
          status: "Poor",
          color: "text-red-600 bg-red-55 border-red-200",
        };
      case "fcp":
        if (num <= 1.8)
          return {
            status: "Good",
            color: "text-emerald-600 bg-emerald-50 border-emerald-200",
          };
        if (num <= 3.0)
          return {
            status: "Needs Imp.",
            color: "text-amber-600 bg-amber-50 border-amber-200",
          };
        return {
          status: "Poor",
          color: "text-red-600 bg-red-55 border-red-200",
        };
      case "tbt":
        const valInMs = isMs ? num : num * 1000;
        if (valInMs <= 150)
          return {
            status: "Good",
            color: "text-emerald-600 bg-emerald-50 border-emerald-200",
          };
        if (valInMs <= 600)
          return {
            status: "Needs Imp.",
            color: "text-amber-600 bg-amber-50 border-amber-200",
          };
        return {
          status: "Poor",
          color: "text-red-600 bg-red-55 border-red-200",
        };
      case "cls":
        if (num <= 0.1)
          return {
            status: "Good",
            color: "text-emerald-600 bg-emerald-50 border-emerald-200",
          };
        if (num <= 0.25)
          return {
            status: "Needs Imp.",
            color: "text-amber-600 bg-amber-50 border-amber-200",
          };
        return {
          status: "Poor",
          color: "text-red-600 bg-red-55 border-red-200",
        };
      case "ttfb":
        const ttfbInMs = isMs ? num : num * 1000;
        if (ttfbInMs <= 800)
          return {
            status: "Good",
            color: "text-emerald-600 bg-emerald-50 border-emerald-200",
          };
        if (ttfbInMs <= 1800)
          return {
            status: "Needs Imp.",
            color: "text-amber-600 bg-amber-50 border-amber-200",
          };
        return {
          status: "Poor",
          color: "text-red-600 bg-red-55 border-red-200",
        };
      default:
        return {
          status: "Info",
          color: "text-slate-650 bg-slate-50 border-slate-200",
        };
    }
  };

  const getStageStatus = (stageNum) => {
    if (stageNum === 1) {
      if (progress >= 35) return "completed";
      return "active";
    }
    if (stageNum === 2) {
      if (progress >= 80) return "completed";
      if (progress >= 35) return "active";
      return "pending";
    }
    if (stageNum === 3) {
      if (progress >= 100) return "completed";
      if (progress >= 80) return "active";
      return "pending";
    }
    return "pending";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        .audit-root { background: #f8fafc; color: #374151; font-family: 'DM Sans', sans-serif; }
        .cyber-grid {
          background-image: linear-gradient(rgba(17,50,86,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(17,50,86,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .report-card {
          background: white;
          border: 1px solid rgba(226,232,240,0.8);
          box-shadow: 0 4px 20px rgba(17,50,86,0.03);
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .glow-indicator {
          filter: drop-shadow(0 0 10px rgba(57, 128, 193, 0.5));
        }
        @media print {
          body { background: white !important; color: #1e293b !important; font-size: 11px !important; }
          .no-print { display: none !important; }
          .print-full { width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; border: none !important; box-shadow: none !important; }
          .print-grid { display: grid !important; grid-template-cols: repeat(2, 1fr) !important; gap: 15px !important; }
          .print-break { page-break-before: always !important; }
          .print-badge { border: 1px solid #ddd !important; background: transparent !important; color: #1e293b !important; }
          .print-border { border-top: 1px solid #eee !important; margin-top: 10px !important; }
          header { display: none !important; }
          .print-cover {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            align-items: center !important;
            height: 98vh !important;
            page-break-after: always !important;
            break-after: page !important;
            padding: 40px !important;
            box-sizing: border-box !important;
            text-align: center !important;
          }
          .print-avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          /* Darken secondary texts for superb print legibility */
          .text-gray-400, .text-slate-400, .text-gray-450 { color: #475569 !important; }
          .text-gray-500, .text-slate-500 { color: #334155 !important; }
          .text-gray-600, .text-slate-600 { color: #1e293b !important; }
          
          /* Modern clean print cards with tight spacing and border */
          .report-card {
            border-radius: 12px !important;
            border: 1px solid #cbd5e1 !important;
            padding: 20px !important;
            margin-bottom: 20px !important;
            box-shadow: none !important;
            background: white !important;
          }
        }
      `}</style>

      <div className="audit-root min-h-screen relative pb-24">
        {/* Ambient background designs */}
        <div className="absolute inset-0 cyber-grid pointer-events-none opacity-80 no-print" />
        <div className="absolute top-0 inset-x-0 h-[480px] bg-[linear-gradient(160deg,#123356_0%,#184572_100%)] z-0 no-print" />
        <div className="absolute top-0 left-[15%] right-[15%] h-[400px] bg-[radial-gradient(circle,rgba(58,127,193,0.15)_0%,transparent_70%)] z-0 pointer-events-none no-print" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-36">
          {/* ── HEADER & INPUT BLOCK ── */}
          <motion.div {...FADE_UP} className="text-center mb-10 no-print">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#7bafd4] mb-4">
              <span className="w-5 h-px bg-[#7bafd4]/50" />
              AI Search Diagnosis
              <span className="w-5 h-px bg-[#7bafd4]/50" />
            </span>
            <h1 className="font-['Outfit',sans-serif] text-[clamp(2.5rem,5vw,3.5rem)] font-light leading-none tracking-[-0.04em] text-white mb-4">
              GEO & SEO Website Auditor
            </h1>
            <p className="max-w-[580px] mx-auto text-[clamp(0.95rem,1.4vw,1.1rem)] font-light leading-relaxed text-white/70">
              Paste your website link below. Our audit pipeline checks your
              structure, Schema, alt tags, and robots parameters to verify if AI
              search engines recommend you.
            </p>

            {/* URL Form Input */}
            <form
              onSubmit={handleAudit}
              className="max-w-[620px] mx-auto mt-8 relative"
            >
              <div className="relative flex items-center p-1.5 rounded-2xl bg-white border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden">
                <Search className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
                <input
                  type="text"
                  placeholder="https://yourwebsite.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={status === "scanning"}
                  className="flex-1 bg-transparent px-3 py-3 text-[0.92rem] font-medium text-gray-700 placeholder-gray-400 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!url || status === "scanning"}
                  className="px-6 py-3.5 rounded-xl bg-[#3980C1] hover:bg-[#4992d5] text-white text-[0.88rem] font-bold transition-all duration-300 shadow-md flex items-center gap-2 disabled:opacity-50 disabled:hover:bg-[#3980C1] whitespace-nowrap cursor-pointer"
                >
                  {status === "scanning" ? "Analyzing..." : "Run Audit"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* ── LOADING SCREEN & TERMINAL LOGS ── */}
          <AnimatePresence mode="wait">
            {status === "scanning" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mt-16 max-w-[800px] mx-auto rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-br from-[#113256]/95 via-[#0e2744]/95 to-[#0b1c30]/95 shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-6 md:p-10 no-print backdrop-blur-2xl text-center"
              >
                {/* Double Concentric Spinner */}
                <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  {/* Outer Infinitely Rotating Gear/Dots Ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#3a7fc1]/25 animate-spin-slow" />

                  {/* Inner Progress Circle */}
                  <svg className="w-28 h-28 transform -rotate-90 glow-indicator">
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      fill="none"
                      stroke="rgba(255,255,255,0.03)"
                      strokeWidth="5"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      fill="none"
                      stroke="#3a7fc1"
                      strokeWidth="5"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={
                        2 * Math.PI * 48 - (progress / 100) * (2 * Math.PI * 48)
                      }
                      strokeLinecap="round"
                      className="transition-all duration-150 ease-out"
                    />
                  </svg>

                  {/* Pulsing Glassmorphic Core */}
                  <div className="absolute w-20 h-20 rounded-full bg-[#163658]/80 border border-[#3980C1]/20 flex flex-col items-center justify-center shadow-lg backdrop-blur-md ">
                    <span className="text-[1.2rem] font-bold text-white font-mono leading-none">
                      {Math.floor(progress)}%
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-[#7bafd4]/60 font-bold mt-1">
                      Crawl
                    </span>
                  </div>
                </div>

                <h3 className="text-white text-[1.1rem] font-bold tracking-wide uppercase font-['Outfit'] mb-2">
                  System Diagnostics Underway
                </h3>
                <p className="text-[#7bafd4]/60 text-[0.82rem] max-w-[420px] mx-auto mb-8 font-light leading-relaxed">
                  Analyzing sitemaps, meta schemas, alt configurations, and
                  requesting real-time Google Lighthouse profiles...
                </p>

                {/* Horizontal Audit Roadmap */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-[660px] mx-auto text-left">
                  {[
                    {
                      num: 1,
                      title: "Resource Discovery",
                      desc: "DNS check & DOM tree fetch",
                    },
                    {
                      num: 2,
                      title: "Lighthouse Audit",
                      desc: "Lighthouse category scoring",
                    },
                    {
                      num: 3,
                      title: "AI Visibility Check",
                      desc: "robots.txt & JSON-LD structures",
                    },
                  ].map((stage) => {
                    const stageStatus = getStageStatus(stage.num);
                    return (
                      <div
                        key={stage.num}
                        className={`p-4 rounded-2xl border transition-all duration-300 ${
                          stageStatus === "completed"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-250"
                            : stageStatus === "active"
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-250 animate-pulse"
                              : "bg-white/5 border-white/5 text-white/40"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          {stageStatus === "completed" ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : stageStatus === "active" ? (
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 animate-pulse" />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0" />
                          )}
                          <span className="text-[0.74rem] font-bold tracking-wide uppercase font-['Outfit']">
                            {stage.title}
                          </span>
                        </div>
                        <p
                          className={`text-[0.68rem] font-light leading-normal ${
                            stageStatus === "completed"
                              ? "text-emerald-300/60"
                              : stageStatus === "active"
                                ? "text-amber-300/60"
                                : "text-white/20"
                          }`}
                        >
                          {stage.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Simulated Server Console logs */}
                <div
                  ref={consoleRef}
                  className="bg-black/30 backdrop-blur-md rounded-2xl p-5 border border-white/5 font-mono text-[0.76rem] text-slate-350 min-h-[220px] max-h-[240px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 text-left"
                >
                  {logs.map((log, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2.5 leading-relaxed text-slate-200"
                    >
                      <span className="text-[#3980C1] shrink-0 font-bold select-none">
                        ›
                      </span>
                      <span>{log}</span>
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-16 max-w-[480px] mx-auto text-center p-6 bg-red-500/10 border border-red-500/20 rounded-2xl no-print"
              >
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="text-red-400 font-bold text-[0.95rem]">
                  Audit Analysis Failed
                </h3>
                <p className="text-gray-500 text-[0.83rem] mt-1 leading-relaxed">
                  {errorMessage}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-[0.82rem] font-semibold hover:bg-red-600 transition"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            {/* ── REPORT DASHBOARD ── */}
            {status === "completed" && report && (
              <motion.div
                key="report"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="mt-16 print-full"
              >
                {/* PDF Cover Page (Visible Only in Print Mode) */}
                <div className="hidden print-cover">
                  {/* Top Branding Bar */}
                  <div className="w-full flex justify-between items-center border-b border-slate-100 pb-5 mb-12">
                    <img
                      src="/full_logi.png"
                      alt="CYouMedia Logo"
                      className="h-9 object-contain"
                    />
                    <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold font-mono">
                      Technical Audit Division
                    </span>
                  </div>

                  {/* Centered Graphic and Title */}
                  <div className="my-auto flex flex-col items-center">
                    <div className="w-20 h-20 rounded-[24px] bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 shadow-sm">
                      <Cpu className="w-9 h-9 text-[#3980C1]" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#3980C1] mb-3.5">
                      Search Intelligence Engine
                    </span>
                    <h1 className="font-['Outfit',sans-serif] text-[34px] font-light leading-tight tracking-tight text-slate-800 max-w-[620px] mb-4 font-normal">
                      AI Search Visibility & Website Diagnostics
                    </h1>
                    <div className="w-28 h-1 bg-gradient-to-r from-[#113256] to-[#3980C1] rounded-full mb-8" />

                    <p className="text-[12px] font-light leading-relaxed text-gray-500 max-w-[450px]">
                      A high-fidelity performance evaluation, schema directive
                      audit, and optimization blueprint prepared specifically
                      for search integration.
                    </p>
                  </div>

                  {/* Metadata Matrix & Footer */}
                  <div className="w-full mt-12 pt-8 border-t border-slate-100">
                    <div className="grid grid-cols-3 gap-6 text-left max-w-[540px] mx-auto mb-10">
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                          Audited URL
                        </span>
                        <span className="text-[11px] font-bold text-gray-700 truncate block">
                          {report.targetUrl}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                          Analysis Date
                        </span>
                        <span className="text-[11px] font-bold text-gray-700 block">
                          {new Date(report.timestamp).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                          Audit Scope
                        </span>
                        <span className="text-[11px] font-bold text-gray-700 block">
                          Mobile & Desktop Profiles
                        </span>
                      </div>
                    </div>

                    <p className="text-[9px] text-gray-400">
                      Generated by the CYouMedia AI Visibility Diagnostic Suite.
                      Confidential technical document.
                    </p>
                    <p className="text-[9px] text-gray-400 mt-1">
                      © {new Date().getFullYear()} CYouMedia. All rights
                      reserved.
                    </p>
                  </div>
                </div>

                {/* Print Headers & Control Button */}
                <div className="flex items-center justify-end mb-6 no-print">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#113256] border border-slate-200 text-[0.82rem] font-bold shadow-sm transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    Download PDF Report
                  </button>
                </div>

                {/* SECTION 1: EXECUTIVE SUMMARY */}
                <div className="report-card rounded-[32px] p-6 md:p-10 mb-6 relative overflow-hidden print-avoid-break">
                  {/* Print Title Block */}
                  <div className="hidden print:block border-b border-gray-250 pb-4 mb-6">
                    <h1 className="text-[20px] font-bold text-gray-800">
                      CYouMedia - AI Visibility Website Audit
                    </h1>
                    <p className="text-gray-500 text-[10px]">
                      Target URL: {report.targetUrl} · Generated:{" "}
                      {new Date(report.timestamp).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Big overall score wheels */}
                    <div className="col-span-12 lg:col-span-5 flex flex-col items-center border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
                      <div className="flex gap-6 justify-center w-full">
                        {/* Mobile Dial */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-28 h-28 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle
                                cx="56"
                                cy="56"
                                r="48"
                                fill="none"
                                stroke="#f1f5f9"
                                strokeWidth="6"
                              />
                              <circle
                                cx="56"
                                cy="56"
                                r="48"
                                fill="none"
                                stroke={getScoreHex(
                                  report.executiveSummary.overallScore,
                                )}
                                strokeWidth="6"
                                strokeDasharray={2 * Math.PI * 48}
                                strokeDashoffset={
                                  2 * Math.PI * 48 -
                                  (report.executiveSummary.overallScore / 100) *
                                    (2 * Math.PI * 48)
                                }
                                className="transition-all duration-300"
                              />
                            </svg>
                            <div className="absolute text-center">
                              <span
                                className={`text-[1.5rem] font-bold font-['Outfit'] ${getScoreColor(report.executiveSummary.overallScore).split(" ")[0]}`}
                              >
                                {report.executiveSummary.overallScore}
                              </span>
                            </div>
                          </div>
                          <span className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider mt-2 flex items-center gap-1">
                            <Smartphone className="w-3.5 h-3.5 text-slate-400" />{" "}
                            Mobile Score
                          </span>
                        </div>

                        {/* Desktop Dial */}
                        <div className="flex flex-col items-center">
                          <div className="relative w-28 h-28 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle
                                cx="56"
                                cy="56"
                                r="48"
                                fill="none"
                                stroke="#f1f5f9"
                                strokeWidth="6"
                              />
                              <circle
                                cx="56"
                                cy="56"
                                r="48"
                                fill="none"
                                stroke={getScoreHex(
                                  report.executiveSummary.desktopOverallScore,
                                )}
                                strokeWidth="6"
                                strokeDasharray={2 * Math.PI * 48}
                                strokeDashoffset={
                                  2 * Math.PI * 48 -
                                  (report.executiveSummary.desktopOverallScore /
                                    100) *
                                    (2 * Math.PI * 48)
                                }
                                className="transition-all duration-300"
                              />
                            </svg>
                            <div className="absolute text-center">
                              <span
                                className={`text-[1.5rem] font-bold font-['Outfit'] ${getScoreColor(report.executiveSummary.desktopOverallScore).split(" ")[0]}`}
                              >
                                {report.executiveSummary.desktopOverallScore}
                              </span>
                            </div>
                          </div>
                          <span className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider mt-2 flex items-center gap-1">
                            <Monitor className="w-3.5 h-3.5 text-slate-400" />{" "}
                            Desktop Score
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 w-full mt-6">
                        <div
                          className={`text-center p-2 rounded-xl border transition-all duration-300 ${getScoreColor(report.executiveSummary.seoScore).split(" ")[2]} ${getScoreColor(report.executiveSummary.seoScore).split(" ")[3]}`}
                        >
                          <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400 block">
                            SEO Score (Mobile)
                          </span>
                          <span
                            className={`text-[1.2rem] font-bold mt-0.5 block ${getScoreColor(report.executiveSummary.seoScore).split(" ")[0]}`}
                          >
                            {report.executiveSummary.seoScore}%
                          </span>
                        </div>
                        <div
                          className={`text-center p-2 rounded-xl border transition-all duration-300 ${getScoreColor(report.executiveSummary.geoScore).split(" ")[2]} ${getScoreColor(report.executiveSummary.geoScore).split(" ")[3]}`}
                        >
                          <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400 block">
                            GEO Score
                          </span>
                          <span
                            className={`text-[1.2rem] font-bold mt-0.5 block ${getScoreColor(report.executiveSummary.geoScore).split(" ")[0]}`}
                          >
                            {report.executiveSummary.geoScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Executive summaries & Wins */}
                    <div className="col-span-12 lg:col-span-7 space-y-6">
                      <div>
                        <h2 className="text-[1.1rem] font-bold text-gray-800 flex items-center gap-2 mb-2 font-['Outfit']">
                          <Activity className="w-4 h-4 text-rose-500" />
                          Top Priority Issues Found
                        </h2>
                        <ul className="space-y-2">
                          {report.executiveSummary.topIssues.map(
                            (issue, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-[0.83rem] text-gray-600 leading-relaxed"
                              >
                                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                {issue}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-slate-100 print-border">
                        <h2 className="text-[1.1rem] font-bold text-gray-800 flex items-center gap-2 mb-2 font-['Outfit']">
                          <Zap className="w-4 h-4 text-amber-500" />
                          Quick Win Action Items
                        </h2>
                        <ul className="space-y-2">
                          {report.executiveSummary.quickWins.map((win, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-[0.83rem] text-gray-600 leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              {win}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: LIGHTHOUSE CATEGORIES (SCREEN ONLY) */}
                <div className="report-card rounded-[32px] p-6 md:p-8 mb-6 print:hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100/80">
                    <h3 className="text-[0.82rem] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2 font-['Outfit']">
                      <Gauge className="w-4 h-4 text-[#3980C1]" />
                      Lighthouse Performance Diagnostics
                    </h3>

                    {/* Strategy Switcher */}
                    <div className="flex p-1 rounded-xl bg-slate-100/80 border border-slate-200/50 self-start sm:self-auto">
                      <button
                        onClick={() => setStrategy("mobile")}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[0.78rem] font-bold transition-all duration-300 ${
                          strategy === "mobile"
                            ? "bg-[#113256] text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        Mobile Profile
                      </button>
                      <button
                        onClick={() => setStrategy("desktop")}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[0.78rem] font-bold transition-all duration-300 ${
                          strategy === "desktop"
                            ? "bg-[#113256] text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        <Monitor className="w-4 h-4" />
                        Desktop Profile
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {Object.entries(
                      strategy === "mobile"
                        ? report.executiveSummary.lighthouse
                        : report.executiveSummary.desktopLighthouse,
                    ).map(([key, score]) => (
                      <div
                        key={key}
                        className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-100"
                      >
                        <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              fill="none"
                              stroke="#e2e8f0"
                              strokeWidth="4"
                            />
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              fill="none"
                              className={getScoreColor(score).split(" ")[1]}
                              strokeWidth="4"
                              strokeDasharray={2 * Math.PI * 32}
                              strokeDashoffset={
                                2 * Math.PI * 32 -
                                (score / 100) * (2 * Math.PI * 32)
                              }
                            />
                          </svg>
                          <span className="absolute text-[1.1rem] font-bold text-gray-800 font-mono">
                            {score}
                          </span>
                        </div>
                        <span className="text-[0.72rem] font-bold uppercase tracking-wider text-gray-500">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Core Web Vitals Section Heuristics */}
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h4 className="text-[0.76rem] font-bold uppercase tracking-wider text-slate-400 mb-4 text-left font-['Outfit']">
                      Core Web Vitals Heuristics (
                      {strategy === "mobile" ? "Mobile" : "Desktop"})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                      {Object.entries(METRIC_DEFS).map(([key, def]) => {
                        const val =
                          (strategy === "mobile"
                            ? report.executiveSummary.mobileMetrics
                            : report.executiveSummary.desktopMetrics)[key] ||
                          "N/A";
                        const statusObj = getMetricStatus(key, val);
                        return (
                          <div
                            key={key}
                            className="p-4 rounded-xl border border-slate-100 bg-white shadow-[0_2px_10px_rgba(17,50,86,0.01)] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[0.8rem] font-bold text-gray-800 leading-tight">
                                  {def.name}
                                </span>
                                <span
                                  className={`text-[8px] font-mono px-1.5 py-0.5 rounded border font-semibold ${statusObj.color}`}
                                >
                                  {statusObj.status}
                                </span>
                              </div>
                              <p className="text-[0.72rem] text-gray-400 leading-normal">
                                {def.desc}
                              </p>
                            </div>
                            <div className="mt-3 flex items-baseline gap-1.5">
                              <span className="text-[1.25rem] font-bold font-mono text-gray-800 leading-none">
                                {val}
                              </span>
                              <span className="text-[0.7rem] font-bold text-gray-400 font-mono">
                                {def.shortName}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* SECTION 2: PRINT-ONLY LIGHTHOUSE & CORE WEB VITALS DIAGNOSTICS */}
                <div className="hidden print:block mb-6 print-break">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Mobile Column */}
                    <div className="report-card rounded-[24px] p-6 border border-slate-200 print-avoid-break">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-750 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5 text-[#113256]" />
                        Mobile Performance Profile
                      </h3>

                      {/* 4 Gauges (Printed in 2-Column Grid to Prevent Text Clipping/Wrapping) */}
                      <div className="grid grid-cols-2 gap-2 text-left mb-6">
                        {Object.entries(report.executiveSummary.lighthouse).map(
                          ([key, score]) => (
                            <div
                              key={key}
                              className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/50 border border-slate-100/80"
                            >
                              <span
                                className={`text-[12px] font-mono font-bold shrink-0 ${
                                  score >= 90
                                    ? "text-emerald-600"
                                    : score >= 50
                                      ? "text-amber-600"
                                      : "text-red-500"
                                }`}
                              >
                                {score}
                              </span>
                              <span className="text-[8.5px] font-bold uppercase tracking-wider text-gray-550 truncate">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                            </div>
                          ),
                        )}
                      </div>

                      {/* Core Web Vitals */}
                      <h4 className="text-[9px] font-bold uppercase tracking-wider text-gray-455 mb-3 text-left">
                        Mobile Core Web Vitals
                      </h4>
                      <div className="grid grid-cols-2 gap-2.5 text-left">
                        {Object.entries(METRIC_DEFS).map(([key, def]) => {
                          const val =
                            report.executiveSummary.mobileMetrics[key] || "N/A";
                          const statusObj = getMetricStatus(key, val);
                          return (
                            <div
                              key={key}
                              className="p-2 rounded-xl border border-slate-100 bg-white flex flex-col justify-between"
                            >
                              <div className="flex justify-between items-center gap-2">
                                <span className="text-[9px] font-bold text-gray-500">
                                  {def.shortName}
                                </span>
                                <span
                                  className={`text-[8px] font-bold ${
                                    statusObj.status === "Good"
                                      ? "text-emerald-600"
                                      : statusObj.status === "Needs Imp."
                                        ? "text-amber-600"
                                        : "text-red-500"
                                  }`}
                                >
                                  {statusObj.status}
                                </span>
                              </div>
                              <p className="text-[12px] font-bold font-mono text-gray-800 mt-1 leading-none">
                                {val}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Desktop Column */}
                    <div className="report-card rounded-[24px] p-6 border border-slate-200 print-avoid-break">
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-755 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <Monitor className="w-3.5 h-3.5 text-[#3980C1]" />
                        Desktop Performance Profile
                      </h3>

                      {/* 4 Gauges (Printed in 2-Column Grid to Prevent Text Clipping/Wrapping) */}
                      <div className="grid grid-cols-2 gap-2 text-left mb-6">
                        {Object.entries(
                          report.executiveSummary.desktopLighthouse,
                        ).map(([key, score]) => (
                          <div
                            key={key}
                            className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/50 border border-slate-100/80"
                          >
                            <span
                              className={`text-[12px] font-mono font-bold shrink-0 ${
                                score >= 90
                                  ? "text-emerald-600"
                                  : score >= 50
                                    ? "text-amber-600"
                                    : "text-red-500"
                              }`}
                            >
                              {score}
                            </span>
                            <span className="text-[8.5px] font-bold uppercase tracking-wider text-gray-555 truncate">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Core Web Vitals */}
                      <h4 className="text-[9px] font-bold uppercase tracking-wider text-gray-455 mb-3 text-left">
                        Desktop Core Web Vitals
                      </h4>
                      <div className="grid grid-cols-2 gap-2.5 text-left">
                        {Object.entries(METRIC_DEFS).map(([key, def]) => {
                          const val =
                            report.executiveSummary.desktopMetrics[key] ||
                            "N/A";
                          const statusObj = getMetricStatus(key, val);
                          return (
                            <div
                              key={key}
                              className="p-2 rounded-xl border border-slate-100 bg-white flex flex-col justify-between"
                            >
                              <div className="flex justify-between items-center gap-2">
                                <span className="text-[9px] font-bold text-gray-500">
                                  {def.shortName}
                                </span>
                                <span
                                  className={`text-[8px] font-bold ${
                                    statusObj.status === "Good"
                                      ? "text-emerald-600"
                                      : statusObj.status === "Needs Imp."
                                        ? "text-amber-600"
                                        : "text-red-500"
                                  }`}
                                >
                                  {statusObj.status}
                                </span>
                              </div>
                              <p className="text-[12px] font-bold font-mono text-gray-800 mt-1 leading-none">
                                {val}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: 9-POINT TECHNICAL VISIBILITY AUDIT */}
                <div className="report-card rounded-[32px] p-6 md:p-8 mb-6 print-break print-avoid-break">
                  <h3 className="text-[0.82rem] font-bold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2 font-['Outfit']">
                    <Cpu className="w-4 h-4 text-[#3980C1]" />
                    We Optimize All 9 Core Visibility Signals
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print-grid">
                    {report.signals.map((sig, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col justify-between p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-[0.88rem] font-bold text-gray-800">
                              {sig.title}
                            </h4>
                            <span
                              className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-lg border print-badge ${
                                sig.score >= 90
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                  : sig.score >= 50
                                    ? "bg-amber-50 text-amber-600 border-amber-200"
                                    : "bg-red-50 text-red-600 border-red-200"
                              }`}
                            >
                              {sig.score}/100
                            </span>
                          </div>

                          <p className="text-[0.8rem] font-bold text-gray-700 mb-1 leading-tight">
                            {sig.value}
                          </p>
                        </div>

                        <p className="text-[0.74rem] text-gray-500 mt-2 pt-2 border-t border-slate-100 leading-relaxed print-border">
                          {sig.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 6: ACTIONABLE FIX RECOMMENDATIONS */}
                <div className="report-card rounded-[32px] p-6 md:p-8 print-break print-avoid-break">
                  <h3 className="text-[0.82rem] font-bold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2 font-['Outfit']">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Recommended Priority Fix Blueprint
                  </h3>

                  <div className="space-y-3">
                    {report.recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300 print-avoid-break"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`text-[8.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 border mt-0.5 print-badge ${
                              rec.priority === "Critical"
                                ? "bg-red-50 text-red-600 border-red-200"
                                : rec.priority === "High"
                                  ? "bg-amber-50 text-amber-600 border-amber-200"
                                  : "bg-purple-50 text-purple-600 border-purple-200"
                            }`}
                          >
                            {rec.priority}
                          </span>
                          <div>
                            <p className="text-[0.88rem] font-bold text-gray-800">
                              {rec.fix}
                            </p>
                            <p className="text-[0.76rem] text-gray-500 mt-0.5 leading-relaxed">
                              Impact: {rec.impact}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-auto text-gray-400 text-[0.74rem] font-mono shrink-0">
                          <Activity className="w-3.5 h-3.5" />
                          <span>Est: {rec.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 no-print print-border">
                    <div className="flex items-center gap-3">
                      <p className="text-[0.83rem] text-gray-500 font-light">
                        Want these optimized automatically? We can rebuild your
                        architecture with perfect AI structures.
                      </p>
                    </div>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1 px-5 py-2.5 rounded-xl bg-[#113256] hover:bg-[#1a4773] text-white text-[0.82rem] font-bold transition shadow-sm"
                    >
                      Optimize My Site <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
