"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useState, useRef } from "react";

/* ─── ICONS ─── */
const ArrowRight = () => (
  <svg
    className="w-4 h-4"
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
const ArrowUpRight = () => (
  <svg
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 17L17 7M7 7h10v10"
    />
  </svg>
);
const Check = () => (
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
      dark ? "text-[#7bafd4]" : "text-[#113254]"
    }`}
  >
    <span
      className={`w-5 h-px ${dark ? "bg-[#7bafd4]/50" : "bg-[#113254]/40"}`}
    />
    {children}
  </div>
);

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef(null);

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
      title: "SEO + GEO + AI Visibility",
      summary:
        "SEO, local maps, and AI engines like ChatGPT optimized simultaneously for maximum reach.",
      image: "/service1.png",
    },
    {
      number: "02",
      title: "AI Website Rebuild",
      summary:
        "We rebuild your site on a proprietary AI foundation that outperforms anything off-the-shelf.",
      image: "/service2.png",
    },
    {
      number: "03",
      title: "Reputation Engine",
      summary:
        "Authority signals, reviews, and trust infrastructure built directly into your digital presence.",
      image: "/s3nt.png",
    },
  ];

  const stats = [
    { before: "37", after: "100", label: "AI Visibility" },
    { before: "61", after: "94", label: "Performance" },
    { before: "82", after: "100", label: "SEO Score" },
  ];

  const steps = [
    {
      n: "01",
      title: "You share your website",
      body: "No lengthy briefs, no back-and-forth. Our AI does the heavy lifting.",
    },
    {
      n: "02",
      title: "Our AI runs a full audit",
      body: "Speed, structure, SEO, accessibility, AI-readiness — every dimension analyzed in minutes.",
    },
    {
      n: "03",
      title: "We rebuild the infrastructure",
      body: "Your brand stays intact. Everything under the hood gets rebuilt — fast, modern, AI-ready.",
    },
    {
      n: "04",
      title: "Scores go up. Results follow.",
      body: "Lighthouse 90+. AI visibility maxed. Local search dominance. You get found.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .noise::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
          z-index: 1;
        }

        .stat-card:hover {
          box-shadow: 0 0 0 1px rgba(58,127,193,0.2), 0 8px 24px rgba(58,127,193,0.07);
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
          <div className="pointer-events-none absolute -top-[10%] -left-[8%] h-[700px] w-[700px] bg-[radial-gradient(circle,rgba(58,127,193,0.18)_0%,transparent_70%)]" />
          <div className="pointer-events-none absolute -bottom-[20%] -right-[5%] h-[600px] w-[600px] bg-[radial-gradient(circle,rgba(17,50,84,0.5)_0%,transparent_70%)]" />

          <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(58,127,193,0.15), transparent 80%)`,
            }}
          />

          <div className="pointer-events-none absolute inset-0 z-[1] bg-[length:52px_52px] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]" />

          <motion.div style={{ y: heroY }} className="relative z-20">
            <div className="mx-auto max-w-[860px] px-[clamp(1rem,4vw,2rem)] text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="mb-[1.1rem] font-['DM_Sans',sans-serif] text-5xl font-light leading-[1.08] tracking-[-0.03em] text-white pt-15"
              >
                Your AI Partner for
                <br />
                <span className="font-['DM_Sans',sans-serif] text-5xl font-normal text-white">
                  Websites, Bookings &amp; Payments.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                className="mx-auto mb-[2.8rem] max-w-[550px] text-[clamp(1rem,2vw,1.15rem)] font-light leading-[1.75] tracking-[0.01em] text-white/50"
              >
                We help businesses become visible, connect globally, and grow
                through strategic expansion and intelligent digital systems.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                className="flex flex-wrap justify-center gap-4"
              >
                <a
                  href="/contact"
                  className="flex items-center gap-2 rounded-full bg-white px-8 py-[0.85rem] text-[0.9rem] font-semibold tracking-[0.01em] text-black no-underline transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_30px_rgba(58,127,193,0.4)]"
                >
                  Book a Demo <ArrowRight />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════
            VIDEO CARD
        ══════════════════════════════════ */}
        <section className="relative z-20 mx-auto max-w-[1060px] px-[clamp(1rem,4vw,2rem)]">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="relative mt-[clamp(-8rem,-15vw,-11rem)] aspect-video overflow-hidden rounded-[clamp(1rem,4vw,2rem)] bg-[#0d1f35] shadow-[0_32px_80px_rgba(7,23,42,0.35),0_0_0_1px_rgba(255,255,255,0.1)]"
          >
            <video
              autoPlay
              muted
              playsInline
              className="block h-full w-full object-cover"
            >
              <source src="/cymfinal2.mp4" type="video/mp4" />
            </video>
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
              )),
            )}
          </div>
        </section>

        {/* ══════════════════════════════════
    PROPRIETARY AI ENGINE
══════════════════════════════════ */}
<section className="bg-white px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,12vw,10rem)]">
  <div className="mx-auto max-w-[1200px]">
    <Reveal className="mb-[clamp(3rem,6vw,5rem)]">
      <div className="flex items-center gap-4">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#3a7fc1]/20 bg-[#e8f0f8] px-4 py-1.5 text-[0.68rem] font-bold tracking-[0.25em] uppercase text-[#3a7fc1]">
          AI BRAIN
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#e5e9ef] to-transparent" />
      </div>
    </Reveal>

    <div className="grid grid-cols-1 gap-[clamp(3rem,8vw,7rem)] lg:grid-cols-[1fr_1fr] items-stretch">
      {/* LEFT */}
      <div className="self-start lg:sticky lg:top-[7rem]">
        <Reveal>
          <h2 className="font-['DM_Sans',sans-serif] text-[clamp(2.2rem,4vw,3.4rem)] font-light leading-[1.1] tracking-[-0.04em] text-[#0d2640] mb-8">
            Our Very Own
            <br />
            <em className="font-['Instrument_Serif',Georgia,serif] font-normal italic text-[#3a7fc1]">
              AI-powered visibility engine.
            </em>
          </h2>
          <p className="text-[1.05rem] font-light leading-[1.85] text-[#6b7280] mb-5">
            Traditional agencies use the same public tools anyone can
            access — generic AI writing assistants, shared templates,
            manual code. We operate on a{" "}
            <span className="text-[#0d2640] font-normal">
              closed, industrial-grade AI platform
            </span>{" "}
            we built ourselves.
          </p>
          <p className="text-[1.05rem] font-light leading-[1.85] text-[#6b7280] mb-10">
            Our engine analyzes your existing website,{" "}
            <span className="text-[#0d2640] font-normal">
              preserves your brand identity completely
            </span>
            , and rebuilds the entire technical infrastructure into a
            high-performance system — automatically, at a level no human
            team could match manually.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="stat-card rounded-2xl border border-[#e5e9ef] bg-white p-4 sm:p-5 text-center transition-all duration-300">
                  <p className="text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.18em] text-[#6b7280] mb-2 sm:mb-3">
                    {s.label}
                  </p>

                  <div className="flex items-baseline justify-center gap-1 sm:gap-1.5 mb-1">
                    <span className="text-[0.85rem] sm:text-[1rem] text-[#aab4be] line-through">
                      {s.before}
                    </span>

                    <span className="text-[0.55rem] sm:text-[0.6rem] text-[#aab4be]">
                      →
                    </span>

                    <span className="text-[1.5rem] sm:text-[1.8rem] font-semibold text-[#0d2640] leading-none">
                      {s.after}
                    </span>
                  </div>

                  <p className="text-[0.65rem] sm:text-[0.7rem] text-[#3a7fc1]">
                    Lighthouse pts
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>

      {/* RIGHT — steps */}
      <div className="flex flex-col">

        {/* HOW WE OPERATE header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-[clamp(2rem,4vw,3rem)]"
        >
          <Eyebrow>How We Operate</Eyebrow>
          <h3 className="font-['DM_Sans',sans-serif] text-[clamp(1.5rem,2.5vw,2rem)] font-light leading-[1.15] tracking-[-0.03em] text-[#0d2640]">
            A process built for{" "}
            <em className="font-['Instrument_Serif',Georgia,serif] font-normal italic text-[#3a7fc1]">
              precision.
            </em>
          </h3>
        </motion.div>

        <div className="flex flex-col divide-y divide-[#e5e9ef]">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.75,
                delay: 0.1 + i * 0.12,
                ease: EASE,
              }}
              className="group relative flex gap-6 py-[clamp(2rem,4vw,3rem)] first:pt-0 last:pb-0"
            >
              <div className="flex-shrink-0 pt-1">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.12,
                    ease: EASE,
                  }}
                  className="block font-['DM_Sans',sans-serif] text-[0.65rem] font-bold tracking-[0.25em] text-[#3a7fc1]/50 uppercase"
                >
                  {step.n}
                </motion.span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-['DM_Sans',sans-serif] text-[clamp(1.15rem,2vw,1.4rem)] font-light leading-[1.3] tracking-[-0.02em] text-[#0d2640] mb-3">
                  {step.title}
                </h4>
                <p className="text-[clamp(0.9rem,1.2vw,1.0rem)] font-light leading-[1.8] text-[#6b7280]">
                  {step.body}
                </p>
              </div>
              <div className="flex-shrink-0 flex items-start pt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0">
                <svg
                  className="w-4 h-4 text-[#3a7fc1]/40"
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

        {/* ══════════════════════════════════
            SERVICES — image cards with hover
        ══════════════════════════════════ */}
        <section className="bg-white px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,8rem)]">
          <div className="mx-auto max-w-[1200px]">
            {/* Header */}
            <Reveal className="mb-[clamp(3rem,6vw,5rem)] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <Eyebrow>Expertise</Eyebrow>
                <h2 className="font-['DM_Sans',sans-serif] text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-[1.1] tracking-[-0.04em] text-[#0d2640]">
                  Services{" "}
                  <em className="not-italic text-[#3a7fc1]">We Offer</em>
                </h2>
              </div>
              <p className="max-w-[340px] text-[0.9rem] font-light leading-[1.75] text-[#6b7280] sm:text-right">
                One partner covering every layer of your digital presence — from
                infrastructure to reputation.
              </p>
            </Reveal>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map((svc, i) => (
                <Reveal key={i} delay={i * 0.1} y={30} className="h-full">
                  <a
                    href="/services"
                    className="group relative block h-[520px] rounded-[1.5rem] overflow-hidden cursor-pointer"
                  >
                    {/* Background image */}
                    <div className="absolute inset-0">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Base gradient — stronger at bottom so title always reads */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/95 via-[#07172a]/30 to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#07172a]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Number — top left */}
                    <div className="absolute top-6 left-6 text-[0.65rem] font-bold tracking-[0.25em] uppercase text-white/40">
                      {svc.number}
                    </div>

                    {/* Content — sits at bottom, shifts up on hover to make room for summary */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 flex flex-col transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                      {/* Title — always visible, centered vertically in lower third */}
                      <h3 className="font-['DM_Sans',sans-serif] text-[1.6rem] font-light leading-[1.15] tracking-[-0.025em] text-white">
                        {svc.title}
                      </h3>

                      {/* Summary + button — hidden until hover, slides up from below title */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                        <div className="overflow-hidden">
                          <p className="text-[0.825rem] font-light leading-[1.65] text-white/60 mt-3 mb-5 max-w-[280px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                            {svc.summary}
                          </p>
                          <span className="inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-white bg-[#3a7fc1] px-4 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                            Learn more
                            <ArrowUpRight />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Accent border on hover */}
                    <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-500" />
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Bottom CTA */}
            <Reveal delay={0.3} className="mt-12 text-center">
              <a
                href="/services"
                className="inline-flex items-center gap-2.5 text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-[#3a7fc1] border border-[#3a7fc1]/30 px-6 py-3 rounded-full hover:bg-[#3a7fc1] hover:text-white transition-all duration-300"
              >
                View all services
                <ArrowUpRight />
              </a>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
