"use client";

import { motion } from "framer-motion";

/* ─── ICONS ─── */
const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const Check = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const FocusIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

/* ─── EASING ─── */
const EASE = [0.16, 1, 0.3, 1];

/* ─── FADE-IN WRAPPER ─── */
const Reveal = ({ children, delay = 0, className = "", x = 0, y = 24 }) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── EYEBROW LABEL ─── */
const Eyebrow = ({ children, dark = false }) => (
  <div
    className={`inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 ${
      dark ? "text-[#7bafd4]" : "text-[#3a7fc1]"
    }`}
  >
    <span className={`w-5 h-px ${dark ? "bg-[#7bafd4]/50" : "bg-[#3a7fc1]/40"}`} />
    {children}
  </div>
);

/* ════════════════════════════════════════
   ABOUT PAGE
════════════════════════════════════════ */
export default function AboutPage() {
  const whyUsList = [
    "Performance-focused digital optimization",
    "Modern, conversion-driven experiences",
    "AI-powered visibility strategies",
    "Premium and scalable digital solutions",
    "Hospitality-focused growth approach"
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        .noise::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <div className="min-h-screen bg-[#f8fafc] font-['DM_Sans',sans-serif]">
        
        {/* ══════════════════════════════════
            HERO SECTION (Small & Simple Banner)
        ══════════════════════════════════ */}
        <section className="noise relative overflow-hidden bg-[linear-gradient(160deg,#07172a_0%,#0d2640_100%)] pt-[clamp(6rem,10vh,8rem)] pb-[clamp(4rem,8vh,6rem)]">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute left-[10%] top-0 h-[600px] w-[800px] -translate-y-1/2 bg-[radial-gradient(circle,rgba(58,127,193,0.2)_0%,transparent_70%)]" />
          
          <div className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1rem,4vw,2rem)] text-left pt-15">
            <Reveal y={20}>
              <Eyebrow dark>Our Story</Eyebrow>
              <h1 className="mb-4 font-['DM_Sans',sans-serif] text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
                Built for Visibility. <br />
                <em className="font-['DM_Sans',sans-serif] font-normal text-[#7bafd4]">
                  Designed for Growth.
                </em>
              </h1>
              <p className="max-w-[500px] text-[clamp(1rem,1.5vw,1.15rem)] font-light leading-[1.75] text-white/60">
                Empowering hospitality brands with high-performance digital solutions.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════
            ABOUT INTRODUCTION
        ══════════════════════════════════ */}
        <section className="px-[clamp(1.25rem,4vw,2rem)] pt-[clamp(5rem,10vw,8rem)]">
          <div className="mx-auto max-w-[900px] text-center">
            <Reveal y={20}>
              <Eyebrow>Who We Are</Eyebrow>
              <h2 className="mb-8 font-['DM_Sans',sans-serif] text-[clamp(1.5rem,3vw,2.2rem)] font-light leading-[1.4] text-[#0d2640] tracking-[-0.02em]">
                At Cyoumedia, we help businesses strengthen their digital presence through intelligent optimization, modern technology, and performance-driven strategies.
              </h2>
              <p className="mx-auto max-w-[760px] text-[1.05rem] font-light leading-[1.8] text-[#6b7280]">
                We specialize in AI-powered visibility solutions designed to help hospitality brands grow in an increasingly competitive online world. From improving search visibility to strengthening online reputation, our goal is to help businesses become faster, more discoverable, and more trusted online.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════
            OUR APPROACH & FOCUS
        ══════════════════════════════════ */}
        <section className="px-[clamp(1.25rem,4vw,2rem)] pt-[clamp(5rem,10vw,8rem)] pb-[clamp(5rem,10vw,9rem)]">
          <div className="mx-auto max-w-[1200px]">
            
            {/* Approach Row */}
            <div className="mb-[clamp(4rem,8vw,6rem)] grid grid-cols-1 gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-2">
              <Reveal>
                <Eyebrow>Methodology</Eyebrow>
                <h2 className="font-['DM_Sans',sans-serif] text-[clamp(2rem,3vw,2.75rem)] font-light leading-[1.15] tracking-[-0.03em] text-[#0d2640]">
                  Our <span className="italic text-[#3a7fc1]">Approach</span>
                </h2>
              </Reveal>
              
              <Reveal delay={0.1} className="flex flex-col gap-6 lg:pt-10">
                <p className="text-[1.1rem] font-light leading-[1.8] text-[#6b7280]">
                  We combine modern design, SEO optimization, and intelligent digital systems to create experiences that not only look premium — but perform with purpose.
                </p>
                <p className="text-[1.1rem] font-light leading-[1.8] text-[#6b7280]">
                  Powered by our proprietary AI optimization engine, we continuously refine digital performance, visibility, and user experience to help businesses attract the right audience and convert attention into growth.
                </p>
              </Reveal>
            </div>

            {/* Focus Areas Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Card 1 */}
              <Reveal delay={0.1} y={30}>
                <div className="h-full rounded-[1.5rem] border border-[#e5e9ef] bg-white p-[clamp(2rem,4vw,3rem)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(58,127,193,0.06)]">
                  <div className="mb-6 flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#e8f0f8] text-[#3a7fc1]">
                    <FocusIcon />
                  </div>
                  <h3 className="mb-4 text-[1.5rem] font-normal tracking-[-0.02em] text-[#0d2640]">
                    AI-Powered Visibility
                  </h3>
                  <p className="text-[1rem] font-light leading-[1.75] text-[#6b7280]">
                    We optimize digital platforms for performance, discoverability, and conversion — helping businesses rank higher and create stronger online experiences.
                  </p>
                </div>
              </Reveal>

              {/* Card 2 */}
              <Reveal delay={0.2} y={30}>
                <div className="h-full rounded-[1.5rem] border border-[#e5e9ef] bg-white p-[clamp(2rem,4vw,3rem)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(58,127,193,0.06)]">
                  <div className="mb-6 flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#e8f0f8] text-[#3a7fc1]">
                    <ShieldIcon />
                  </div>
                  <h3 className="mb-4 text-[1.5rem] font-normal tracking-[-0.02em] text-[#0d2640]">
                    Reputation Management
                  </h3>
                  <p className="text-[1rem] font-light leading-[1.75] text-[#6b7280]">
                    We help businesses build trust by managing and strengthening their online reputation across customer-facing platforms.
                  </p>
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════
            OUR VISION (Dark, Serif focus)
        ══════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#0d2640] px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,9rem)] text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(58,127,193,0.12)_0%,transparent_65%)]" />
          
          <div className="relative z-10 mx-auto max-w-[800px]">
            <Reveal>
              <Eyebrow dark>Our Vision</Eyebrow>
              <p className="font-['Instrument_Serif',Georgia,serif] text-[clamp(1.8rem,4vw,3.2rem)] font-light leading-[1.25] tracking-[-0.02em] text-white">
                "Simplicity Wins Over Complexity <br/> <span className="italic text-[#7bafd4]">Every. Single. Time</span>"
              </p>
              <p className="mx-auto mt-12 max-w-[640px] text-[0.975rem] font-light leading-[1.85] text-white/45">
                Our mission is to simplify how businesses operate online — combining
                visibility, automation, and experience into one seamless system that
                drives sustainable, compounding growth.
              </p>
            </Reveal>
          </div>
        </section>

        

      </div>
    </>
  );
}