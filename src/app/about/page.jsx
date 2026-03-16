"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   CONSTANTS — identical to site
───────────────────────────────────────── */
const EASE      = [0.16, 1, 0.3, 1];
const EASE_EXPO = [0.87, 0, 0.13, 1];
const EASE_OUT  = [0.0, 0.0, 0.2, 1];

/* ─────────────────────────────────────────
   MAGNETIC
───────────────────────────────────────── */
const Magnetic = ({ children, strength = 0.35 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   TAG — identical to site
───────────────────────────────────────── */
const Tag = ({ children, light = false }) => (
  <motion.span
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: EASE }}
    className={`inline-flex items-center gap-3 text-[9px] font-bold tracking-[0.32em] uppercase mb-6 ${
      light ? "text-white/35" : "text-[#999]"
    }`}
  >
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`block w-5 h-px origin-left ${light ? "bg-white/25" : "bg-[#ccc]"}`}
    />
    {children}
  </motion.span>
);

/* ─────────────────────────────────────────
   SCROLL-DRIVEN LINE — site version
───────────────────────────────────────── */
const ScrollLine = ({ targetRef }) => {
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start center", "end center"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 55, damping: 22 });
  return (
    <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 pointer-events-none z-0 hidden lg:block" style={{ width: 2 }}>
      <svg width="2" height="100%" className="absolute inset-0" preserveAspectRatio="none" viewBox="0 0 2 100">
        <path d="M1,0 L1,100" stroke="#ececec" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
        <motion.path
          d="M1,0 L1,100"
          stroke="url(#asg)"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="asg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#89CFF1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3ea6d6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function About() {
  const heroRef   = useRef(null);
  const valuesRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY     = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOp    = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const technologies = [
    "Streaming Infrastructure", "Payment Systems", "QR Ecosystems",
    "Digital Identity", "App Platforms", "Secure Transactions",
  ];

  return (
    <div
      className="bg-white text-[#0a0a0a] overflow-x-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >

      {/* ══ 1 ▸ HERO ══ */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden flex items-center justify-center text-center bg-[#080808]"
        style={{ minHeight: "73vh" }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(137,207,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(137,207,241,1) 1px, transparent 1px)", backgroundSize: "55px 55px" }} />
        {/* Center glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(137,207,241,0.08) 0%, transparent 65%)" }} />
        {/* Parallax bg */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <Image src="/bg.png" alt="About" fill className="object-cover opacity-[0.18]" priority />
        </motion.div>
        {/* Rounded white reveal */}
        <div className="absolute bottom-0 inset-x-0 h-16 z-10 bg-white" style={{ borderRadius: "40px 40px 0 0" }} />

        <motion.div
          style={{ opacity: heroOp }}
          className="relative z-20 flex flex-col items-center gap-6 px-5 pt-36 pb-28 max-w-4xl mx-auto w-full"
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE_EXPO }}
              className="text-[9px] font-bold tracking-[0.36em] uppercase text-white/35"
            >
              Our Identity
            </motion.p>
          </div>

          <div className="flex flex-col items-center gap-0">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "70%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.08, ease: EASE_EXPO }}
                className="font-bold tracking-[-0.035em] leading-[1.0] text-white"
                style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}
              >
                Story Behind
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "70%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.16, ease: EASE_EXPO }}
                className="font-extralight tracking-[-0.025em] leading-[1.0] text-white/55"
                style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}
              >
                CYouMedia.
              </motion.h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
            className="text-[15px] font-light text-white/40 leading-relaxed max-w-md"
          >
            We are a collective of strategic businesspeople engineering predictable growth for global enterprise brands.
          </motion.p>
        </motion.div>
      </section>

      {/* ══ 2 ▸ THE BUSINESS CORE ══ */}
      <section className="pt-20 sm:pt-28 pb-20 sm:pb-28 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE_EXPO }}
            className="flex flex-col gap-7"
          >
            <Tag>The Business Core</Tag>
            <h2 className="text-[clamp(1.9rem,3.5vw,3.4rem)] font-bold tracking-[-0.03em] leading-[1.07]">
              Not Just Coders.<br />
              <span className="text-[#c8c8c8]">Business People First.</span>
            </h2>
            <p className="text-[15px] font-light text-[#777] leading-[1.85] max-w-lg">
              We understand the journey from a simple idea to a goal of 10 million and beyond. Technology is merely the vehicle; the destination is{" "}
              <em className="not-italic font-semibold text-[#0a0a0a]">undeniable market authority.</em>
            </p>
            <p className="text-[15px] font-light text-[#777] leading-[1.85] max-w-lg">
              Real success is built on clear agreements, strong structure, and the right connections. Every strategy we deploy is strictly designed to move the needle on your bottom line.
            </p>
            {/* Stats row */}
            <div className="flex items-center gap-10 pt-2">
              {[{ n: "6+", l: "Global Hubs" }, { n: "10M+", l: "Growth Target" }, { n: "100%", l: "Results Driven" }].map(({ n, l }, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: EASE }}
                  className="flex flex-col gap-1"
                >
                  <span className="text-[1.6rem] font-bold tracking-tight tabular-nums leading-none text-[#0a0a0a]">{n}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#ccc]">{l}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE_EXPO }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#f5f5f5]"
          >
            <Image src="/about1.png" alt="Strategy session" fill className="object-cover" />
            {/* Shimmer */}
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "200%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
            />
            {/* Bottom label */}
            <div className="absolute bottom-0 inset-x-0 p-6" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 100%)" }}>
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#89CFF1]"
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">Our Team</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ 3 ▸ GLOBAL REACH — REDESIGNED WITH VIDEO & DARK OVERLAY ══ */}
      <section className="pt-20 sm:pt-28 pb-20 sm:pb-28 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-16">
          <div>
            <Tag>Global Presence</Tag>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_EXPO }}
                className="text-[clamp(2rem,4vw,4rem)] font-bold tracking-[-0.035em] leading-[0.97]"
              >
                Localized Dominance.<br />
                <span className="text-[#c8c8c8]">Worldwide.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="text-[#999] text-[13px] font-light leading-relaxed max-w-xs sm:text-right sm:pb-1"
          >
            Strategic hubs in the world's most influential markets.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
          {/* Video map with dark overlay */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE_EXPO }}
            className="relative rounded-3xl overflow-hidden bg-[#080808]"
            style={{ minHeight: "400px" }}
          >
            {/* Background video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="/mapcon.png" // fallback image while video loads
            >
              <source src="/wm1.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/50 z-[1]" />

            {/* Grid lines overlay (optional, for texture) */}
            <div
              className="absolute inset-0 z-[2] opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(137,207,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(137,207,241,1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Gradient overlay for depth */}
            <div
              className="absolute inset-0 z-[3]"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%, rgba(8,8,8,0.2) 100%)",
              }}
            />

            {/* Pulse points (glowing dots) */}
            {[
              { t: "30%", l: "45%" },
              { t: "50%", l: "20%" },
              { t: "60%", l: "80%" },
            ].map((p, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2.5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8,
                }}
                className="absolute w-2 h-2 rounded-full bg-[#89CFF1] z-10"
                style={{ top: p.t, left: p.l }}
              />
            ))}

            {/* Live operations badge */}
            <div className="absolute bottom-7 left-7 z-20">
              <div
                className="flex items-center gap-2.5 rounded-xl px-4 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#89CFF1]"
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/70">
                  Live Operations Active
                </span>
              </div>
            </div>
          </motion.div>

          {/* Location nodes — enhanced with glass effect on hover */}
          <div className="flex flex-col gap-3">
            {[
              { name: "Sweden", city: "Stockholm", role: "European HQ", code: "se" },
              { name: "London", city: "London", role: "Global Finance", code: "gb" },
              { name: "Singapore", city: "Singapore", role: "APAC Hub", code: "sg" },
              { name: "USA", city: "New York", role: "North America", code: "us" },
            ].map((hub, i) => (
              <motion.div
                key={hub.name}
                initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_EXPO }}
                whileHover={{
                  x: 6,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderColor: "#89CFF1",
                  boxShadow: "0 20px 30px -10px rgba(0,0,0,0.15)",
                  transition: { duration: 0.3, ease: EASE },
                }}
                className="flex items-center justify-between px-6 py-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#f0f0f0] group cursor-default transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#ececec] shrink-0 shadow-sm">
                    <img
                      src={`https://flagcdn.com/w80/${hub.code}.png`}
                      alt={hub.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-[#0a0a0a] tracking-tight">
                      {hub.name}, <span className="font-normal text-[#777]">{hub.city}</span>
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#999] mt-0.5">
                      {hub.role}
                    </p>
                  </div>
                </div>
                <motion.svg
                  className="w-3.5 h-3.5 text-[#ccc] group-hover:text-[#89CFF1] transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.div>
            ))}
            {/* Secondary locations */}
            <div className="flex gap-2 px-1 pt-1">
              {["South Africa", "Sri Lanka"].map((c) => (
                <span
                  key={c}
                  className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#777] bg-white/70 backdrop-blur-sm border border-[#e0e0e0] px-3 py-1.5 rounded-full"
                >
                  + {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4 ▸ VALUES + SCROLL LINE ══ */}
      <section ref={valuesRef} className="pt-6 pb-20 sm:pb-28 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto relative">
        <div className="border-t border-[#f0f0f0] pt-20 sm:pt-28 relative">
          

          <Tag>What We Stand For</Tag>
          <div className="overflow-hidden mb-14 sm:mb-18">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE_EXPO }}
              className="text-[clamp(1.8rem,3vw,3rem)] font-bold tracking-[-0.028em] leading-tight"
            >
              Three principles.<br />
              <span className="text-[#c8c8c8]">Zero compromise.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            {[
              { n: "01", title: "Simplicity Over Complexity", body: "We never hide behind technical jargon. Everything we do is explained simply, ensuring you remain in control of your strategy at every step." },
              { n: "02", title: "Security Through Structure", body: "All our collaborations rest on solid legal foundations. Our agreements are designed to protect both our partners and ourselves from day one." },
              { n: "03", title: "Focus on Results", body: "We measure success in real outcomes: Visibility. Growth. Revenue. Not technical reports or vanity metrics that look good in a slide deck." },
            ].map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.12, ease: EASE_EXPO }}
                whileHover={{ y: -5, transition: { duration: 0.3, ease: EASE } }}
                className="bg-[#f8f8f8] rounded-3xl p-8 flex flex-col gap-5 cursor-default"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-[0.26em] uppercase text-[#ccc]">{v.n}</span>
                  <motion.span
                    animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0.85, 0.35] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                    className="w-2 h-2 rounded-full bg-[#0a0a0a]"
                  />
                </div>
                <p className="text-[15px] font-bold leading-tight text-[#0a0a0a]">{v.title}</p>
                <p className="text-[13px] text-[#999] font-light leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5 ▸ ELITE NETWORK CTA STRIP ══ */}
      <section className="px-5 md:px-10 lg:px-20 pb-20 sm:pb-28 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_EXPO }}
          className="rounded-3xl bg-[#f7f7f7] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
        >
          <div>
            <p className="text-[9px] font-bold tracking-[0.26em] uppercase text-[#ccc] mb-3">Elite network</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-[-0.022em] max-w-xl leading-tight">
              Professionals connected to Spotify, Swish and the world's leading markets.
            </p>
          </div>
          <Magnetic>
            <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[12px] font-bold px-6 sm:px-8 py-3.5 rounded-full hover:bg-[#222] active:scale-95 transition-all duration-200 whitespace-nowrap">
              Work With Us
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </Magnetic>
        </motion.div>
      </section>

    </div>
  );
}