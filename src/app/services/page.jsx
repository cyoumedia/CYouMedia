"use client";

import { motion } from "framer-motion";
import { Bot, Search, Globe, Server, Vote, Star, Zap, ShieldCheck, Target, ArrowRight, CheckCircle2, ChevronRight, Activity, Cpu } from "lucide-react";
import { useState } from "react";

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

const Eyebrow = ({ children, dark = false }) => (
  <div
    className={`inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.25em] uppercase mb-6 ${
      dark ? "text-[#7bafd4]" : "text-[#3a7fc1]"
    }`}
  >
    <span className={`w-5 h-px ${dark ? "bg-[#7bafd4]/50" : "bg-[#3a7fc1]/40"}`} />
    {children}
  </div>
);

const detailedServices = [
  {
    number: "01",
    tag: "GEO · AI Visibility",
    title: "GEO + SEO + AI Visibility",
    subtitle: "Command the search engines of tomorrow.",
    description: "Search has fundamentally fractured. Millions of users are bypassing traditional search entirely in favor of AI-powered conversational platforms. We optimize your brand positioning, technical architecture, and semantic authority so platforms like ChatGPT, Gemini, and Claude recommend your business by name.",
    image: "/geo.png",
    accent: "from-[#113256] to-[#3a7fc1]",
    visibilitySignals: [
      "JSON-LD",
      "Meta tags",
      "Semantic HTML",
      "Alt text",
      "Internal linking",
      "Text-to-code ratio",
      "Mobile viewport",
      "Robots.txt",
      "XML sitemap"
    ],
    deepDives: [
      {
        title: "AI Engine Optimization (GEO)",
        body: "Converting unstructured business details into dense semantic schema that LLMs recognize, trust, and quote automatically in search summaries."
      },
      {
        title: "Conversational Search Dominance",
        body: "Structuring content around long-tail user intent and natural Q&A formats to capture citation slots in ChatGPT Search & Perplexity."
      },
      {
        title: "Authority Signal Amplification",
        body: "Building off-page verification nodes and citations so search crawlers validate your business as the premium entity in your industry."
      }
    ]
  },
  {
    number: "02",
    tag: "Next-Gen Web Infrastructure",
    title: "Website Rebuild",
    subtitle: "We rebuild your technical engine from the inside out.",
    description: "A gorgeous design is useless if the underlying code is slow or illegible to modern AI crawlers. Our proprietary framework preserves your brand visual guidelines while completely replacing your legacy code with a blazing fast, semantic, and completely optimized Next-js setup.",
    image: "/aivisifinal.png",
    accent: "from-[#3a7fc1] to-[#113256]",
    deepDives: [
      {
        title: "Maximum Lighthouse Ratings",
        body: "Targeting perfect scores across performance, SEO, accessibility, and architectural best practices to secure top organic listings."
      },
      {
        title: "Global Edge CDN Architecture",
        body: "Distributing lightweight cached static assets across 100+ global edge locations for near-instant load times from any device."
      },
      {
        title: "Semantic AI-Crawler-Ready Schema",
        body: "Implementing comprehensive Schema.org JSON-LD scripts so crawlers can easily digest your pricing, location, and services."
      }
    ]
  },
  {
    number: "03",
    tag: "Trust & Credibility Systems",
    title: "Reputation Management",
    subtitle: "Automate and safeguard your brand authority.",
    description: "Your digital reputation determines your ultimate sales conversions. We deploy completely automated systems that encourage satisfied customers to leave feedback on review hubs, automatically respond with HSL AI frameworks, and centralize everything into a clean corporate dashboard.",
    image: "/repu.png",
    accent: "from-[#113256] to-[#3a7fc1]",
    deepDives: [
      {
        title: "Automated Feedback Loops",
        body: "Triggering smart, perfectly-timed review request cues immediately after successful customer interactions to boost trust signals."
      },
      {
        title: "Centralized Review Dashboard",
        body: "Aggregating your ratings, reviews, and mentions from major platforms into a single stream to stay informed and react fast."
      },
      {
        title: "Brand Sentiment Guardrails",
        body: "Using smart AI prompts to capture and address negative experiences privately before they hit public review platforms."
      }
    ]
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
        
        .services-light-canvas {
          background-color: #f8fafc;
          color: #374151;
          font-family: 'DM_Sans', sans-serif;
          overflow-x: hidden;
        }
        
        /* Ambient Orbs */
        .ambient-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(120px);
          pointer-events: none;
          z-index: 1;
        }

        /* Glassmorphism utility */
        .glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 10px 30px rgba(17, 50, 86, 0.04);
        }

        /* Tech Cyber Grid Overlay */
        .cyber-grid {
          background-image: linear-gradient(rgba(17, 50, 86, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(17, 50, 86, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* Custom Shimmer */
        @keyframes cyber-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shimmer-text {
          background: linear-gradient(90deg, #ffffff, #7bafd4, #e2e8f0, #ffffff);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: cyber-shimmer 6s linear infinite;
        }
      `}</style>

      <div className="services-light-canvas min-h-screen relative pb-24">
        {/* Cyber grid background */}
        <div className="absolute inset-0 cyber-grid opacity-[0.75] pointer-events-none" />

        {/* Global Glowing Orbs */}
        <div className="ambient-orb w-[600px] h-[600px] bg-[#113256]/4 -top-[200px] -left-[100px]" />
        <div className="ambient-orb w-[500px] h-[500px] bg-[#3a7fc1]/5 top-[30%] -right-[100px]" />
        <div className="ambient-orb w-[700px] h-[700px] bg-[#113256]/3 bottom-[10%] left-1/3" />

        {/* ══════════════════════════════════════════════════════
            1. HERO — Immersive Dark Blue Brand Header
        ══════════════════════════════════════════════════════ */}
        <section className="relative pt-36 pb-20 px-6 z-10 bg-[#113256] overflow-hidden">
          {/* Subtle grid pattern overlay in Hero */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="pointer-events-none absolute left-[10%] top-0 h-[600px] w-[800px] -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)]" />

          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            
            

            {/* Main Premium Headline */}
            <Reveal delay={0.1}>
              <h1 className="font-['DM_Sans',sans-serif] text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.04em] text-white mb-6 font-['Outfit',sans-serif]">
                Engineering the <span className="shimmer-text font-normal">AI-First Ecosystem</span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.2}>
              <p className="max-w-[700px] mx-auto text-[clamp(1rem,1.5vw,1.15rem)] font-light leading-relaxed text-white/60 mb-12">
                We completely eliminate the borders between traditional web design, location marketing, search engines, and artificial intelligence models. Our proprietary infrastructure establishes your permanent competitive edge.
              </p>
            </Reveal>

            {/* Interactive Section Switcher Menu */}
            <Reveal delay={0.3}>
              <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg max-w-full">
                {detailedServices.map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-5 py-2.5 rounded-xl text-[0.8rem] font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${
                      activeTab === idx
                        ? "bg-white text-[#113256] shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-[9px] font-bold opacity-55">{service.number}</span>
                    {service.title}
                  </button>
                ))}
              </div>
            </Reveal>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            2. CORE PRESENTATION — Tab-Responsive White Glass Panel
        ══════════════════════════════════════════════════════ */}
        <section className="relative px-6 z-10 mb-28 -mt-8">
          <div className="max-w-[1200px] mx-auto">
            {detailedServices.map((service, idx) => {
              if (idx !== activeTab) return null;
              return (
                <div key={idx} className="glass-panel rounded-[32px] p-8 md:p-12 overflow-hidden relative border border-[#e2e8f0]">
                  {/* Glowing aura inside card */}
                  <div className={`pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br ${service.accent} opacity-[0.05] filter blur-[80px]`} />

                  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-10">
                    
                    {/* Left Details */}
                    <div>
                      {/* Eyebrow tag */}
                      <span className="text-[10px] font-bold tracking-[0.25em] text-[#3a7fc1] uppercase mb-4 block">
                        {service.tag} · 
                      </span>
                      
                      {/* Big Heading */}
                      <h2 className="text-[2.6rem] md:text-[3.2rem] font-light leading-none tracking-[-0.03em] text-[#113256] mb-4 font-['Outfit',sans-serif]">
                        {service.title}
                      </h2>
                      
                      {/* Subtitle */}
                      <p className={`text-[1.1rem] font-semibold mb-6 bg-gradient-to-r ${service.accent} bg-clip-text text-transparent`}>
                        {service.subtitle}
                      </p>
                      
                      {/* Main Paragraph */}
                      <p className="text-[0.98rem] font-light leading-relaxed text-gray-600 mb-8 max-w-[580px]">
                        {service.description}
                      </p>

                      {/* Technical features nodes list */}
                      <div className="space-y-4">
                        {service.deepDives.map((item, fIdx) => (
                          <div key={fIdx} className="flex gap-4 p-4 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#113256]/30 hover:shadow-sm transition-all duration-200">
                            <div className="w-8 h-8 rounded-lg bg-[#113256]/8 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#113256]">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-[0.92rem] font-bold text-[#113256] mb-1">{item.title}</h4>
                              <p className="text-[0.82rem] font-light text-gray-500 leading-relaxed">{item.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column Stack */}
                    <div className="space-y-6">
                      {/* Right Interactive Image Deck */}
                      <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-[#e2e8f0] bg-black/5 group">
                        {/* Glow frame */}
                        <div className={`absolute inset-0 bg-gradient-to-tr ${service.accent} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
                        
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />

                        {/* Hover stats overlays overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#113256]/85 via-[#113256]/0 to-[#113256]/30 p-6 flex flex-col justify-between pointer-events-none">
                          
                          
                        </div>
                      </div>

                      {/* 9 Core Visibility Signals section (Under Image) */}
                      {service.visibilitySignals && (
                        <div className="p-6 rounded-2xl bg-[#113256]/5 border border-[#113256]/10 relative overflow-hidden group">
                          {/* Decorative blur element */}
                          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#3a7fc1]/5 rounded-full filter blur-xl pointer-events-none group-hover:bg-[#3a7fc1]/10 transition-colors duration-300" />
                          
                          <h4 className="text-[0.82rem] font-bold text-[#113256] uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Cpu className="w-[18px] h-[18px] text-[#3a7fc1] animate-pulse" />
                            We Optimize All 9 Core Visibility Signals
                          </h4>
                          
                          <div className="grid grid-cols-3 gap-2.5">
                            {service.visibilitySignals.map((signal, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex flex-col items-center justify-center text-center p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#3a7fc1]/30 hover:bg-white hover:shadow-[0_10px_30px_rgba(17,50,86,0.06)] hover:-translate-y-[2px] transition-all duration-300 min-h-[58px]"
                              >
                                
                                <span className="text-[0.7rem] font-bold text-[#113256] leading-tight">{signal}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            3. INCLUDED SERVICES — Dynamic White Grid
        ══════════════════════════════════════════════════════ */}
        <section className="relative px-6 z-10">
          <div className="max-w-[1200px] mx-auto">
            <Reveal>
              <div className="glass-panel rounded-[32px] p-8 md:p-12 overflow-hidden relative border border-[#e2e8f0]">
                {/* Decorative glowing lines */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#113256]/20 to-transparent" />
                
                <div className="text-center mb-12">
                  <Eyebrow>All Services</Eyebrow>
                  <h3 className="text-[2.2rem] font-light tracking-[-0.03em] text-[#113256] font-['Outfit',sans-serif]">
                    Everything in One Subscription
                  </h3>
                  <p className="max-w-[480px] mx-auto text-[0.88rem] font-light text-gray-500 mt-2">
                    No third-party wrappers. No rented licenses. Only premium, purpose-built digital assets engineered specifically for your brand.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: Bot, label: "GEO · AI Visibility", desc: "Proprietary AI index submissions" },
                    { icon: Search, label: "SEO Optimization", desc: "Traditional Google query ranks" },
                    { icon: Globe, label: "Website Rebuild", desc: "Modern Website structures" },
                    { icon: Server, label: "Premium Hosting", desc: "Distribute globally with 99.9% uptime" },
                    { icon: Vote, label: "Social Media Management", desc: "Cohesive content distribution" },
                    { icon: Star, label: "Reputation Manager", desc: "Handles all review platforms", tag: "Exclusive" },
                  ].map((item, i) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={i}
                        className="group relative flex gap-4 p-5 rounded-2xl bg-[#f8fafc] border border-[#e5e9ef] hover:border-[#113256]/30 hover:bg-white hover:shadow-[0_10px_30px_rgba(17,50,86,0.06)] transition-all duration-300 overflow-hidden"
                      >
                        {item.tag && (
                          <span className="absolute top-1.5 right-1.5 text-[0.55rem] font-bold uppercase tracking-wider bg-[#3a7fc1]/10 text-[#3a7fc1] border border-[#3a7fc1]/20 px-2 py-0.5 rounded-full scale-90">
                            {item.tag}
                          </span>
                        )}
                        <div className="w-10 h-10 rounded-xl bg-[#113256]/8 group-hover:bg-[#113256] text-[#113256] group-hover:text-white transition-colors duration-300 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[0.88rem] font-bold text-[#113256] mb-0.5 group-hover:text-[#3a7fc1] transition-colors duration-200">
                            {item.label}
                          </p>
                          <p className="text-[0.75rem] font-light text-gray-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Final Call to Action inside grid block */}
                <div className="mt-12 pt-8 border-t border-[#e2e8f0] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-[1.1rem] font-bold text-[#113256]">Ready to deploy your ecosystem?</p>
                    <p className="text-[0.82rem] font-light text-gray-500">Schedule a 15-minute diagnostic session with our engineers.</p>
                  </div>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#113256] hover:bg-[#1c4978] text-white font-medium text-[0.88rem] shadow-[0_4px_25px_rgba(17,50,86,0.15)] hover:translate-y-[-2px] transition-all duration-300"
                  >
                    Join Us <ArrowRight />
                  </a>
                </div>

              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}