"use client";

import { motion } from "framer-motion";

/* ─── ICONS ─── */
const BoltIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const GlobeIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const ChipIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H7a2 2 0 00-2 2v2M9 3h6M9 3V1m6 2h2a2 2 0 012 2v2m0 0h2m-2 0V3m0 6v6m0 0h2m-2 0v2a2 2 0 01-2 2h-2m0 0H9m6 0v2m-6-2H7a2 2 0 01-2-2v-2m0 0H3m2 0V9M3 9H1m2 0V7a2 2 0 012-2h2" />
  </svg>
);

const EASE = [0.16, 1, 0.3, 1];

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
  <div className={`inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 ${dark ? "text-[#7bafd4]" : "text-[#3a7fc1]"}`}>
    <span className={`w-5 h-px ${dark ? "bg-[#7bafd4]/50" : "bg-[#3a7fc1]/40"}`} />
    {children}
  </div>
);

export default function AboutPage() {
  const pillars = [
    {
      icon: <ChipIcon />,
      num: "01",
      title: "Proprietary AI Engine",
      body: "We built our own closed AI infrastructure — not a public chatbot, not an off-the-shelf tool. Our engine analyzes, rebuilds, and optimizes your entire digital presence from the technical ground up.",
    },
    {
      icon: <BoltIcon />,
      num: "02",
      title: "AI-First, Not AI-Added",
      body: "Most agencies bolt AI onto old processes. We designed our entire system around AI from day one — so every output is faster, smarter, and built for how people and machines discover businesses today.",
    },
    {
      icon: <GlobeIcon />,
      num: "03",
      title: "Triple Visibility: SEO + GEO + AI",
      body: "We optimize for Google, local maps, and AI discovery engines like ChatGPT, Perplexity, and Gemini simultaneously. Your business gets found wherever your customers are searching.",
    },
    {
      icon: <ShieldIcon />,
      num: "04",
      title: "Swedish Quality & Compliance",
      body: "Built in Sweden. GDPR-ready by design. We hold ourselves to the highest standards of data integrity, security, and trustworthiness — so your clients can too.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['DM_Sans',sans-serif]">

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

      {/* ══════════════════════════════════
          HERO — original design preserved
      ══════════════════════════════════ */}
      <section className="noise relative overflow-hidden bg-[#123356] pt-[clamp(6rem,10vh,8rem)] pb-[clamp(4rem,8vh,6rem)]">
        <div className="pointer-events-none absolute left-[10%] top-0 h-[600px] w-[800px] -translate-y-1/2 bg-[radial-gradient(circle,rgba(58,127,193,0.2)_0%,transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1rem,4vw,2rem)] pt-15">
          <Reveal y={20}>
            <Eyebrow dark>Our Story</Eyebrow>
            <h1 className="mb-4 font-['DM_Sans',sans-serif] text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
              We Didn't Just Build an Agency. <br />
              <em className="font-['DM_Sans',sans-serif] font-normal not-italic text-[#7bafd4]">
                We Built the Engine.
              </em>
            </h1>
            <p className="max-w-[540px] text-[clamp(1rem,1.5vw,1.15rem)] font-light leading-[1.75] text-white/60">
              CYouMedia delivers industrial-grade AI infrastructure that transforms how businesses are discovered online — built from the ground up, not bolted together.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHO WE ARE — sticky split layout
      ══════════════════════════════════ */}
      <section className="px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,8rem)]">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[clamp(3rem,6vw,6rem)] items-start">

          {/* sticky left label */}
          <Reveal className="lg:sticky lg:top-10">
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="text-[clamp(1.75rem,2.8vw,2.4rem)] font-light leading-[1.2] tracking-[-0.025em] text-[#0d2640]">
              Not an agency.<br />
              <p className=" text-[#3a7fc1]">An AI infrastructure company.</p>
            </h2>
          </Reveal>

          {/* scrolling right content */}
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <p className="text-[1.05rem] font-light leading-[1.85] text-[#5a6b7c]">
              While most agencies use the same public tools anyone can access, we operate on a proprietary, closed AI platform purpose-built to generate digital dominance.
            </p>
            <p className="text-[1.05rem] font-light leading-[1.85] text-[#5a6b7c]">
              We preserve your brand identity — your visuals, your voice, your logo — and completely rebuild the technical foundation underneath into a high-performance machine that gets found, converts visitors, and grows on its own.
            </p>
            <p className="text-[1.05rem] font-light leading-[1.85] text-[#5a6b7c]">
              When your competitors are using off-the-shelf tools, you're running a purpose-built engine. That distinction changes everything for your business.
            </p>
            {/* callout block */}
            <div className="border-l-[3px] border-[#3a7fc1] pl-5 py-1 bg-white rounded-r-xl border border-[#e2e8ef] border-l-[3px]">
              <p className="text-[0.975rem] font-medium leading-[1.7] text-[#0d2640]">
                CYouMedia is an AI infrastructure company — and that distinction changes everything for your business.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      

      {/* ══════════════════════════════════
          OUR PILLARS
      ══════════════════════════════════ */}
      <section className="px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,8rem)] bg-[#f8fafc]">
        <div className="mx-auto max-w-[1200px]">

          {/* header */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-[clamp(3rem,5vw,5rem)]">
              <div>
                <Eyebrow>How We Think</Eyebrow>
                <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.12] tracking-[-0.03em] text-[#0d2640]">
                  What makes us <em className="italic text-[#3a7fc1]">different</em>
                </h2>
              </div>
              <p className="text-[1rem] font-light leading-[1.8] text-[#6b7280] lg:max-w-[380px]">
                Four principles that separate infrastructure from agencies — and results from promises.
              </p>
            </div>
          </Reveal>

          {/* pillar grid — unified bordered container */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-[#e2e8ef] rounded-[1.5rem] overflow-hidden divide-x divide-y divide-[#e2e8ef]">
            {pillars.map((p, i) => (
              <Reveal key={i} delay={i * 0.07} y={20}>
                <div className="group h-full bg-white hover:bg-[#fafcff] transition-colors duration-300 p-[clamp(2rem,4vw,3rem)]">
                  {/* top row: number + icon */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[0.7rem] font-bold tracking-[0.18em] text-[#c0cad6]">{p.num}</span>
                    <div className="w-11 h-11 rounded-xl bg-[#e8f0f8] flex items-center justify-center text-[#3a7fc1] group-hover:bg-[#daeaf6] transition-colors duration-300">
                      {p.icon}
                    </div>
                  </div>
                  <h3 className="text-[1.2rem] font-normal tracking-[-0.02em] text-[#0d2640] mb-3 leading-[1.35]">
                    {p.title}
                  </h3>
                  <p className="text-[0.925rem] font-light leading-[1.8] text-[#6b7280]">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
            VISION (Dark Quote Section)
        ══════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#0d2640] px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,9rem)] text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(58,127,193,0.12)_0%,transparent_65%)]" />

          <div className="relative z-10 mx-auto max-w-[800px]">
            <Reveal>
              <Eyebrow dark>Our Vision</Eyebrow>
              <p className="font-['Instrument_Serif',Georgia,serif] text-[clamp(1.8rem,4vw,3.2rem)] font-light leading-[1.25] tracking-[-0.02em] text-white">
                "Simplicity Wins Over Complexity <br/>
                <span className="italic text-[#7bafd4]">Every. Single. Time"</span>
              </p>
              <p className="mx-auto mt-12 max-w-[640px] text-[0.975rem] font-light leading-[1.85] text-white/45">
                We built CYouMedia because we believed businesses deserved more than generic templates and recycled strategies. Our mission is to make every business we touch impossible to ignore online combining AI infrastructure, visibility engineering, and reputation management into one seamless system that compounds over time.
              </p>
            </Reveal>
          </div>
        </section>

    </div>
  );
}