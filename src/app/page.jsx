"use client";

import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { useState, useRef } from "react";

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

/* ─── EASING ─── */
const EASE = [0.16, 1, 0.3, 1];

/* ─── FADE-IN WRAPPER ─── */
const Reveal = ({ children, delay = 0, className = "", x = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, x }}
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
      dark ? "text-[#7bafd4]" : "text-[#113254]"
    }`}
  >
    <span className={`w-5 h-px ${dark ? "bg-[#7bafd4]/50" : "bg-[#113254]/40"}`} />
    {children}
  </div>
);

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef(null);

  // --- Mouse tracking for Hero background ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const tickerItems = [
    "SEO Optimization",
    "Business Growth",
    "Digital Presence",
    "Booking Systems",
    "AI Automation",
    
  ];

  const services = [
    {
      number: "01",
      title: "AI-Powered Visibility",
      subtitle: "Turn your website into a high-performance platform",
      body: "We transform outdated hotel websites into fast, modern, and conversion-focused platforms. Our AI-powered optimization ensures your website loads quickly, performs smoothly on all devices, and is built to convert visitors into direct bookings.",
      features: [
        "Faster loading speeds and improved performance",
        "Mobile-first, modern design",
        "SEO and location-based optimization",
        "Conversion-focused user experience",
      ],
      image: "/aivisifinal.png",
      reverse: false,
    },
    {
      number: "02",
      title: "Reputation Management",
      subtitle: "Build trust. Increase bookings.",
      body: "Your online reputation directly impacts your revenue. We help you manage and strengthen it by handling customer reviews and maintaining a consistent, professional brand presence across all platforms.",
      features: [
        "Monitor and respond to guest reviews",
        "Improve ratings and online credibility",
        "Strengthen trust with potential customers",
        "Turn feedback into growth opportunities",
      ],
      image: "/repu.png",
      reverse: true,
    },
  ];

  return (
    <>
      {/* ── Necessary Custom CSS (Fonts, Keyframes, SVGs) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        /* Ticker Animation */
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* Subtle noise overlay on hero */
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

      <div className="min-h-screen bg-white font-['DM_Sans',sans-serif]">

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className="noise group relative overflow-hidden bg-[linear-gradient(160deg,#07172a_0%,#0d2640_55%,#102e50_100%)] pt-[clamp(7rem,15vh,11rem)] pb-[clamp(12rem,25vh,18rem)]"
        >
          {/* Static Glow orbs */}
          <div className="pointer-events-none absolute -top-[10%] -left-[8%] h-[700px] w-[700px] bg-[radial-gradient(circle,rgba(58,127,193,0.18)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-[20%] -right-[5%] h-[600px] w-[600px] bg-[radial-gradient(circle,rgba(17,50,84,0.5)_0%,transparent_70%)]" />

          {/* Interactive Cursor Spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  rgba(58, 127, 193, 0.15),
                  transparent 80%
                )
              `,
            }}
          />

          {/* Subtle grid */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[length:52px_52px] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]" />

          <motion.div style={{ y: heroY }} className="relative z-20">
            <div className="mx-auto max-w-[860px] px-[clamp(1rem,4vw,2rem)] text-center">

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="mb-[1.1rem] font-['DM_Sans',sans-serif] text-5xl font-light leading-[1.08] tracking-[-0.03em] text-white pt-15 "
              >
                Your AI Partner for
                <br />
                <span className="font-['DM_Sans',sans-serif] text-5xl font-normal text-white">
                  Websites, Bookings &amp; Payments.
                </span>
              </motion.h1>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="mx-auto mb-[2.8rem] max-w-[550px] text-[clamp(1rem,2vw,1.15rem)] font-light leading-[1.75] tracking-[0.01em] text-white/50"
              >
                We help businesses become visible, connect globally, and grow
                through strategic expansion and intelligent digital systems.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a
                  href="/contact"
                  className="flex items-center gap-2 rounded-full bg-[#ffff] px-8 py-[0.85rem] text-[0.9rem] font-semibold tracking-[0.01em] text-black no-underline transition-all duration-200 hover:-translate-y-[1px] hover:bg-white hover:shadow-[0_8px_30px_rgba(58,127,193,0.4)]"
                >
                  Book a Demo <ArrowRight />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════
            VIDEO / MOCKUP CARD
        ══════════════════════════════════ */}
        <section className="relative z-20 mx-auto max-w-[1060px] px-[clamp(1rem,4vw,2rem)]">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="relative mt-[clamp(-8rem,-15vw,-11rem)] aspect-video overflow-hidden rounded-[clamp(1rem,4vw,2rem)] bg-[#0d1f35] shadow-[0_32px_80px_rgba(7,23,42,0.35),0_0_0_1px_rgba(255,255,255,0.1)]"
          >
            <video autoPlay loop muted playsInline className="block h-full w-full object-cover">
              <source src="/cymvid1.mp4" type="video/mp4" />
            </video>
            {/* Gradient vignette at bottom for polish */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[rgba(7,23,42,0.5)] to-transparent" />
          </motion.div>
        </section>

        {/* ══════════════════════════════════
            TICKER
        ══════════════════════════════════ */}
        <section className="mt-[clamp(3rem,8vw,6rem)] overflow-hidden py-[1.4rem]">
          <div className="flex w-max animate-[ticker_28s_linear_infinite] hover:[animation-play-state:paused]">
            {[...Array(3)].map((_, i) =>
              tickerItems.map((item, j) => (
                <span
                  key={`${i}-${j}`}
                  className="inline-flex items-center gap-[1.2rem] whitespace-nowrap px-[2.5rem] text-xl font-bold uppercase tracking-[0.22em] text-[#113254]"
                >
                  {item}
                  
                </span>
              ))
            )}
          </div>
        </section>

        {/* ══════════════════════════════════
            WHY DIFFERENT
        ══════════════════════════════════ */}
        <section className="mx-auto max-w-[1120px] px-[clamp(1.25rem,4vw,2rem)] py-[clamp(4rem,10vw,9rem)]">
          <div className="grid grid-cols-1 items-start gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-2">

            {/* Left — sticky text */}
            <Reveal>
              <Eyebrow>Why We&apos;re Different</Eyebrow>
              <h2 className="mb-[1.25rem] font-['DM_Sans',sans-serif] text-[clamp(2rem,4vw,3.1rem)] font-light leading-[1.15] tracking-[-0.03em] text-[#0d2640]">
                Not just services.<br />
                <em className="font-['DM_Sans',sans-serif] font-normal text-[#3a7fc1]">
                  A system that evolves.
                </em>
              </h2>
              <p className="max-w-[380px] text-[0.975rem] font-light leading-[1.8] text-[#6b7280]">
                Most agencies build once and leave. We build systems that continuously
                improve — adapting to your market, your customers, and your growth stage.
              </p>
            </Reveal>

            {/* Right — feature card */}
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden rounded-[1.75rem] bg-[#0d2640] p-[clamp(2rem,5vw,3rem)]">
                {/* Glow */}
                <div className="pointer-events-none absolute -right-[60px] -top-[60px] h-[240px] w-[240px] bg-[radial-gradient(circle,rgba(58,127,193,0.2)_0%,transparent_70%)]" />

                <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#7bafd4]/70">
                  Proprietary Engine
                </p>

                <h3 className="mb-4 font-['DM_Sans',sans-serif] text-[1.55rem] font-normal leading-[1.25] tracking-[-0.02em] text-white">
                  AI Optimization <em className="font-['DM_Sans',sans-serif]">Engine</em>
                </h3>

                <p className="mb-8 text-[0.875rem] font-light leading-[1.75] text-white">
                  Our proprietary engine continuously analyzes, refines, and enhances your
                  digital presence — improving search visibility, performance, and customer
                  engagement while turning traffic into measurable revenue.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    "Continuous performance improvement",
                    "Adaptive search visibility",
                    "Real-time optimization insights",
                    "Growth-focused automation",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-[0.6rem]">
                      <span className="mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#3a7fc1]/20 text-[#7bafd4]">
                        <Check />
                      </span>
                      <span className="text-[0.8rem] font-light leading-[1.5] text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════
            SERVICES
        ══════════════════════════════════ */}
        <section className="border-y border-[#e5e9ef] bg-[#f8fafc] px-[clamp(1.25rem,4vw,2rem)] py-[clamp(4rem,10vw,9rem)]">
          <div className="mx-auto max-w-[1120px]">

            {/* Section header */}
            <div className="mb-[clamp(4rem,8vw,7rem)] text-center">
              <Reveal>
                <Eyebrow>Expertise</Eyebrow>
                <h2 className="font-['DM_Sans',sans-serif] text-[clamp(2rem,4vw,3.1rem)] leading-[1.15] tracking-[-0.03em] text-[#0d2640]">
                  Our <span className="text-[#3a7fc1] italic">Services</span>
                </h2>
              </Reveal>
            </div>

            {/* Service rows */}
            <div className="flex flex-col gap-[clamp(4rem,10vw,8rem)]">
              {services.map((svc, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 items-center gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-2"
                >
                  {/* Image card */}
                  <Reveal delay={0.05} x={svc.reverse ? 30 : -30} className={svc.reverse ? "lg:order-last" : ""}>
                    <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border border-[#e5e9ef] bg-white shadow-[0_4px_24px_rgba(7,23,42,0.06)]">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="block h-full w-full object-cover"
                      />
                    </div>
                  </Reveal>

                  {/* Text */}
                  <Reveal delay={0.1} x={svc.reverse ? -30 : 30}>
                    <div>
                      <span className="mb-[0.8rem] block font-['DM_Sans',sans-serif] text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#3a7fc1]/60">
                        {svc.number}
                      </span>

                      <h3 className="mb-[0.6rem] font-['DM_Sans',sans-serif] text-[clamp(1.6rem,3vw,2.2rem)] font-light leading-[1.2] tracking-[-0.025em] text-[#0d2640]">
                        {svc.title}
                      </h3>

                      <p className="mb-[1.25rem] text-[0.875rem] font-semibold tracking-[0.01em] text-[#3a7fc1]">
                        {svc.subtitle}
                      </p>

                      <p className="mb-8 text-[0.925rem] font-light leading-[1.8] text-[#6b7280]">
                        {svc.body}
                      </p>

                      <div className="flex flex-col gap-3">
                        {svc.features.map((f, fi) => (
                          <div key={fi} className="flex items-center gap-3">
                            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#e8f0f8] text-[#113254]">
                              <Check />
                            </span>
                            <span className="text-[0.875rem] font-normal text-[#1a1a2e]">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            MISSION
        ══════════════════════════════════
        <section className="relative overflow-hidden bg-[#0d2640] px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,9rem)]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(58,127,193,0.12)_0%,transparent_65%)]" />
          
          <div className="relative z-10 mx-auto max-w-[760px] text-center">
            <Reveal>
              <Eyebrow dark>Our Mission</Eyebrow>
              <h2 className="mb-6 font-['Instrument_Serif',Georgia,serif] text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.2] tracking-[-0.03em] italic text-white">
                Simplicity Wins Over Complexity{" "}
                <br/>
                <em className="font-['Instrument_Serif',Georgia,serif] font-normal italic text-[#ffff]">
                  Every. Single. Time
                </em>
              </h2>
              <p className="mx-auto mb-12 max-w-[540px] text-[0.975rem] font-light leading-[1.85] text-white/45">
                Our mission is to simplify how businesses operate online — combining
                visibility, automation, and experience into one seamless system that
                drives sustainable, compounding growth.
              </p>
            </Reveal>
          </div>
        </section>
 */}
      </div>
    </>
  );
}