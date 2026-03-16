"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];
const EASE_OUT = [0.0, 0.0, 0.2, 1];
const EASE_EXPO = [0.87, 0, 0.13, 1];

/* ─────────────────────────────────────────
   MAGNETIC BUTTON WRAPPER
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
  const handleLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   TAG
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
   PARTICLES — static deterministic data (SSR-safe)
───────────────────────────────────────── */
const PARTICLE_DATA = [
  { id: 0,  size: 1.8, x: 12,  y: 18,  dur: 14, delay: 0   },
  { id: 1,  size: 2.4, x: 28,  y: 72,  dur: 11, delay: 1.2 },
  { id: 2,  size: 1.5, x: 45,  y: 35,  dur: 16, delay: 2.4 },
  { id: 3,  size: 2.1, x: 61,  y: 55,  dur: 13, delay: 0.8 },
  { id: 4,  size: 1.3, x: 78,  y: 22,  dur: 18, delay: 3.1 },
  { id: 5,  size: 2.6, x: 90,  y: 80,  dur: 10, delay: 1.5 },
  { id: 6,  size: 1.7, x: 7,   y: 88,  dur: 15, delay: 4.0 },
  { id: 7,  size: 2.2, x: 53,  y: 12,  dur: 12, delay: 2.0 },
  { id: 8,  size: 1.4, x: 36,  y: 95,  dur: 17, delay: 0.3 },
  { id: 9,  size: 2.8, x: 72,  y: 48,  dur: 9,  delay: 5.2 },
  { id: 10, size: 1.6, x: 19,  y: 60,  dur: 14, delay: 1.8 },
  { id: 11, size: 2.0, x: 84,  y: 33,  dur: 16, delay: 3.6 },
  { id: 12, size: 1.2, x: 42,  y: 76,  dur: 11, delay: 0.9 },
  { id: 13, size: 2.5, x: 66,  y: 8,   dur: 13, delay: 2.7 },
  { id: 14, size: 1.9, x: 95,  y: 65,  dur: 15, delay: 4.4 },
  { id: 15, size: 2.3, x: 3,   y: 42,  dur: 12, delay: 1.1 },
  { id: 16, size: 1.1, x: 57,  y: 90,  dur: 18, delay: 3.9 },
  { id: 17, size: 2.7, x: 80,  y: 15,  dur: 10, delay: 0.5 },
];

const Particles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
    {PARTICLE_DATA.map((p) => (
      <motion.div
        key={p.id}
        className="absolute rounded-full bg-white/25"
        style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
        animate={{ y: [0, -38, 0], opacity: [0, 0.55, 0], scale: [0.8, 1.5, 0.8] }}
        transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────
   MARQUEE ROW
───────────────────────────────────────── */
const wrapVal = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const MarqueeRow = ({ items, direction = 1, speed = 0.4, className = "" }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 50, damping: 30 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrapVal(-50, 0, v)}%`);
  const dirFactor = useRef(direction);

  useAnimationFrame((_, delta) => {
    let move = dirFactor.current * speed * (delta / 1000) * 10;
    dirFactor.current = velocityFactor.get() < 0 ? -direction : direction;
    move += dirFactor.current * move * velocityFactor.get();
    baseX.set(baseX.get() + move);
  });

  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div style={{ x }} className="flex items-center whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-5 mx-6">
            <span className="font-bold tracking-[0.2em] uppercase">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full opacity-35 shrink-0 inline-block" style={{ background: "currentColor" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────
   OPERATE ROW
───────────────────────────────────────── */
const OperateCard = ({ title, number, imgSrc, reverse }) => (
  <motion.div
    initial={{ opacity: 0, x: reverse ? 60 : -60, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1.1, ease: EASE_EXPO }}
    className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#0e0e0e]"
  >
    {imgSrc ? (
      <Image src={imgSrc} alt={title} fill className="object-cover" />
    ) : (
      <>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 35% 40%, rgba(137,207,241,0.08) 0%, transparent 60%)" }} />
        <span className="absolute inset-0 flex items-center justify-center text-[9rem] sm:text-[11rem] font-bold text-white/[0.04] select-none leading-none font-mono">{number}</span>
      </>
    )}
    <motion.div
      initial={{ x: "-100%" }}
      whileInView={{ x: "200%" }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: 0.35, ease: EASE }}
      className="absolute inset-y-0 w-1/3 pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)" }}
    />
    <div className="absolute bottom-5 left-5 flex items-center gap-2 z-10">
      <motion.span
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="w-1.5 h-1.5 rounded-full bg-[#89CFF1]/65"
      />
      <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/30">{title}</span>
    </div>
  </motion.div>
);

const OperateText = ({ title, body, index, reverse }) => (
  <motion.div
    initial={{ opacity: 0, x: reverse ? -60 : 60, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1.1, delay: 0.12, ease: EASE_EXPO }}
    className="flex flex-col justify-center gap-6"
  >
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
      className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#ccc]"
    >
      {String(index + 1).padStart(2, "0")}
    </motion.span>
    <motion.h3
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE_EXPO }}
      className="text-[clamp(1.35rem,2vw,1.9rem)] font-bold tracking-[-0.02em] leading-[1.15] text-[#0a0a0a]"
    >
      {title}
    </motion.h3>
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      className="text-[#777] text-[15px] font-light leading-[1.82] max-w-md"
    >
      {body}
    </motion.p>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
      className="h-px bg-[#ececec] origin-left max-w-md"
    />
  </motion.div>
);

const OperateRow = ({ number, title, body, imgSrc, reverse = false, index }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
    {reverse
      ? <><OperateText title={title} body={body} index={index} reverse={reverse} /><OperateCard title={title} number={number} imgSrc={imgSrc} reverse={reverse} /></>
      : <><OperateCard title={title} number={number} imgSrc={imgSrc} reverse={reverse} /><OperateText title={title} body={body} index={index} reverse={reverse} /></>
    }
  </div>
);

/* ─────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────── */
const ServiceCard = ({ service, index, total }) => {
  const [hovered, setHovered] = useState(false);
  const isDark = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, delay: index * 0.15, ease: EASE_EXPO }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative rounded-3xl overflow-hidden cursor-default ${isDark ? "bg-[#080808]" : "bg-[#f4f4f4]"}`}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 20% 50%, rgba(137,207,241,0.13) 0%, transparent 55%)"
            : "radial-gradient(ellipse at 80% 50%, rgba(10,10,10,0.05) 0%, transparent 55%)",
        }}
      />
      {isDark && (
        <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(137,207,241,0.08) 0%, transparent 60%)" }} />
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-stretch min-h-[260px] sm:min-h-[300px]">
        {/* Number column */}
        <div className={`hidden lg:flex items-center justify-center w-24 xl:w-32 shrink-0 border-r ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
          <motion.span
            animate={{ scale: hovered ? 1.08 : 1, opacity: hovered ? (isDark ? 0.14 : 0.09) : (isDark ? 0.06 : 0.05) }}
            transition={{ duration: 0.5, ease: EASE }}
            className={`font-bold select-none tracking-tight ${isDark ? "text-white" : "text-[#0a0a0a]"}`}
            style={{ fontSize: "clamp(3rem, 4.5vw, 5.5rem)", lineHeight: 1 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between p-7 sm:p-9 lg:p-10">
          <div className="flex items-center justify-between mb-6">
            <span className={`text-[9px] font-bold tracking-[0.28em] uppercase ${isDark ? "text-white/22" : "text-[#bbb]"}`}>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <motion.div
              animate={{ scale: [1, 1.7, 1], opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.8 }}
              className={`w-2 h-2 rounded-full ${isDark ? "bg-[#89CFF1]" : "bg-[#0a0a0a]"}`}
            />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <h3
              className={`font-bold tracking-[-0.025em] leading-[1.1] ${isDark ? "text-white" : "text-[#0a0a0a]"}`}
              style={{ fontSize: "clamp(1.25rem, 2.2vw, 2.1rem)" }}
            >
              {service.heading}
            </h3>
            <p className={`text-[15px] font-light leading-[1.82] max-w-lg ${isDark ? "text-white/50" : "text-[#666]"}`}>
              {service.body}
            </p>
          </div>
          <motion.div
            className="mt-7 flex items-center gap-3"
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isDark ? "text-white/28" : "text-[#aaa]"}`}>{service.label}</span>
            <motion.div
              animate={{ width: hovered ? 32 : 14 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={`h-px ${isDark ? "bg-white/18" : "bg-[#ccc]"}`}
            />
          </motion.div>
        </div>

        {/* Tags column */}
        <div className={`hidden lg:flex flex-col justify-center gap-2.5 w-40 xl:w-48 shrink-0 p-7 border-l ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
          {service.tags.map((tag, ti) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.12 + ti * 0.09, ease: EASE }}
              className={`text-[9px] font-semibold tracking-[0.16em] uppercase px-3 py-2 rounded-xl border ${
                isDark ? "border-white/10 text-white/32 bg-white/[0.03]" : "border-[#e8e8e8] text-[#777] bg-white"
              }`}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`absolute bottom-0 inset-x-0 h-[2px] origin-left ${isDark ? "bg-[#89CFF1]/50" : "bg-[#0a0a0a]/10"}`}
      />

      {/* Mobile tags */}
      <div className="lg:hidden flex flex-wrap gap-2 px-7 pb-7">
        {service.tags.map((tag) => (
          <span key={tag} className={`text-[9px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full border ${isDark ? "border-white/10 text-white/32 bg-white/[0.04]" : "border-[#e0e0e0] text-[#666] bg-white"}`}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const globalRef = useRef(null);
  const { scrollYProgress: globalScroll } = useScroll({ target: globalRef, offset: ["start end", "end start"] });
  const globalBgY = useTransform(globalScroll, [0, 1], ["-12%", "12%"]);

  const services = [
    {
      label: "Strategic Expansion",
      heading: "Strategic Expansion",
      body: "We create the structure businesses need to move confidently into new markets. Clear agreements, vetted partnerships, and the right connections — none of the jargon.",
      tags: ["Market Entry", "Legal Foundations", "Partnerships"],
    },
    {
      label: "Digital Presence",
      heading: "Digital Presence",
      body: "Powered by our proprietary AI platform, CYouMedia ensures your business ranks, gets discovered, and converts. Visibility is the outcome, not a feature.",
      tags: ["AI-Powered SEO", "Brand Visibility", "Search Dominance"],
    },
  ];

  const operateItems = [
    { title: "Simplicity Over Complexity", body: "We never hide behind confusing technical language. Everything we do is explained in a way that real people understand — no jargon, no smoke and mirrors.", imgSrc: "/01.png" },
    { title: "Security Through Structure", body: "All our collaborations rest on solid legal foundations. Our agreements are designed to protect both our partners and ourselves from day one.", imgSrc: "/02new.png" },
    { title: "Focus on Results", body: "We measure success in real outcomes: Visibility. Growth. Revenue. Not technical reports or vanity metrics that look good in a slide deck.", imgSrc: "/03.png" },
  ];

  const tickerRowA = ["Strategic Growth", "Digital Visibility", "Global Reach", "Market Entry", "AI-Powered SEO", "Brand Presence", "Legal Foundations", "Elite Partnerships"];
  const tickerRowB = ["CYouMedia Is The Only Option", "Syns Du — Finns Du", "CYouMedia Is The Only Option", "Syns Du — Finns Du", "CYouMedia Is The Only Option", "Syns Du — Finns Du"];

  return (
    <div className="bg-white text-[#0a0a0a] overflow-x-hidden" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* ══ 1 ▸ HERO ══ */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[640px] overflow-hidden flex items-center justify-center bg-black">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/bg01.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 z-[1]" style={{ background: "radial-gradient(circle at center, transparent 16%, rgba(2,6,23,0.44) 50%, rgba(2,6,23,0.92) 100%)" }} />
        <Particles />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 text-center px-5 max-w-4xl mx-auto w-full">
          <div className="overflow-hidden mb-6 sm:mb-8">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE_EXPO }}
              className="text-white/55 text-[9px] sm:text-[10px] font-bold tracking-[0.38em] uppercase"
            >
              Strategic Growth &amp; Digital Visibility
            </motion.p>
          </div>
          <div className="overflow-hidden mb-6 sm:mb-8">
            <motion.h1
              initial={{ y: "60%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.12, ease: EASE_EXPO }}
              className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold tracking-[-0.035em] leading-[1.0] text-white"
              style={{ textShadow: "0 4px 60px rgba(0,0,0,0.4)" }}
            >
              If You Exist
              <br />
              <em className="not-italic font-extralight text-white/70">You Are Seen</em>
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.34, ease: EASE }}
            className="text-white/55 text-[15px] sm:text-base md:text-lg font-light max-w-md mx-auto mb-10 sm:mb-14 leading-relaxed px-2"
          >
            We help businesses become visible, connect globally, and grow through strategic expansion and digital presence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.52, ease: EASE }}
            className="flex flex-col sm:flex-row gap-3 justify-center px-4"
          >
            <Magnetic>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2.5 bg-white text-[#0a0a0a] text-[12px] font-bold px-7 py-3.5 rounded-full hover:bg-white/92 active:scale-95 transition-all duration-200">
                Start Your Growth
                <motion.svg
                  className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <motion.span
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/35"
          >
            Scroll
          </motion.span>
          <div className="w-px h-14 bg-white/18 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "220%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-1/2 bg-white/55"
            />
          </div>
        </motion.div>
      </section>

      {/* ══ DUAL TICKER BAND ══ */}
      <div className="py-10 sm:py-15 overflow-hidden bg-white select-none">
        <div className="mb-5">
          <MarqueeRow
            items={tickerRowA}
            direction={1}
            speed={0.30}
            className="text-[clamp(1.1rem,2.2vw,1.8rem)] font-bold text-[#0a0a0a]/18 tracking-[-0.01em]"
          />
        </div>
      </div>

      {/* ══ 2 ▸ WHO WE ARE ══ */}
      <section id="about" className="pt-16 sm:pt-24 pb-16 sm:pb-20 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24 items-end mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE_EXPO }}
          >
            <Tag>Who We Are</Tag>
            {/* ↓ was clamp(2.8rem,5.6vw,5.8rem) */}
            <h2 className="text-[clamp(2rem,3.8vw,3.8rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Business<br />
              <motion.span
                initial={{ color: "#0a0a0a" }}
                whileInView={{ color: "#d0d0d0" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.6, ease: EASE_OUT }}
                className="block"
              >
                People First.
              </motion.span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE_EXPO }}
            className="flex flex-col gap-5 lg:pb-2"
          >
            <p className="text-[#666] text-[15px] font-light leading-[1.85]">
              We are a strategic partner combining business development with digital visibility — understanding the journey from a simple idea to a goal of 10 million and beyond.
            </p>
            <p className="text-[#666] text-[15px] font-light leading-[1.85]">
              Real success is built on clear agreements, strong structure, and the right connections. Not on technical jargon.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px] gap-4">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_EXPO }}
            className="relative rounded-3xl overflow-hidden bg-[#f3f3f3]"
            style={{ minHeight: "380px" }}
          >
            <Image src="/businessppl.png" alt="Business People" fill className="object-cover object-top" />
            <div className="absolute bottom-0 inset-x-0 p-6 z-10" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 100%)" }}>
              <p className="text-white/60 text-[9px] font-bold tracking-[0.22em] uppercase">Our Team</p>
            </div>
          </motion.div>

          <div className="flex sm:flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 36, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.18, ease: EASE_EXPO }}
              className="flex-1 sm:flex-none rounded-3xl p-6 flex flex-col overflow-hidden relative"
              style={{ minHeight: "200px", background: "linear-gradient(135deg, #0d0d0d 0%, #1c1c1c 100%)" }}
            >
              <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(137,207,241,0.15) 0%, transparent 70%)" }} />
              <p className="text-[9px] font-bold tracking-[0.24em] uppercase text-white/20 mb-5 relative z-10">At a glance</p>
              <div className="flex flex-col gap-0 relative z-10 mt-auto">
                {[{ n: "6+", l: "Global Hubs" }, { n: "10M+", l: "Growth Target" }, { n: "100%", l: "Results Driven" }].map(({ n, l }, i) => (
                  <motion.div
                    key={l}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: EASE }}
                    className="flex items-center justify-between py-3.5 border-t border-white/[0.07] first:border-0"
                  >
                    <span className="text-[9px] font-semibold tracking-[0.16em] uppercase text-white/28">{l}</span>
                    <span className="text-[1.45rem] font-bold text-white tracking-tight tabular-nums">{n}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 36, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: EASE_EXPO }}
              className="flex-1 sm:flex-none bg-[#f5f5f5] rounded-3xl p-6 flex flex-col justify-between"
              style={{ minHeight: "148px" }}
            >
              <span className="text-[2rem] text-[#ddd] leading-none select-none font-serif">"</span>
              <p className="text-[14px] font-semibold text-[#0a0a0a] leading-[1.58] tracking-[-0.01em]">
                If you exist —<br />you are seen.
              </p>
              <p className="text-[9px] font-bold tracking-[0.24em] uppercase text-[#bbb] mt-2">CYouMedia Principle</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 3 ▸ SERVICE CORE ══ */}
      <section id="services" className="pt-20 sm:pt-28 pb-20 sm:pb-28 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-14 sm:mb-18">
          <div>
            <Tag>Our Expertise</Tag>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_EXPO }}
                /* ↓ was clamp(3.2rem,6.5vw,7rem) */
                className="text-[clamp(2.2rem,4vw,4.5rem)] font-bold tracking-[-0.035em] leading-[0.97]"
              >
                Service<br />
                <span className="text-[#c8c8c8]">Core.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
            className="text-[#999] text-[13px] font-light leading-relaxed max-w-xs sm:text-right sm:pb-1"
          >
            Two core disciplines.<br />One outcome. Your growth.
          </motion.p>
        </div>
        <div className="flex flex-col gap-4">
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} total={services.length} />
          ))}
        </div>
      </section>

      {/* ══ 4 ▸ GLOBAL REACH ══ */}
      <section ref={globalRef} id="reach" className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: globalBgY }} className="relative w-full h-[120%] -top-[10%]">
            <Image src="/gg.png" alt="Global landmarks" fill className="object-cover object-center" priority />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 h-52 z-10" style={{ background: "linear-gradient(to top, #ffffff, transparent)" }} />
          <div className="absolute inset-0 z-[5]" style={{ background: "rgba(0,0,0,0.28)" }} />
        </div>

        <div className="relative z-20 px-5 md:px-10 lg:px-20 pt-28 sm:pt-36 pb-52 sm:pb-60 max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_EXPO }}
          >
            <Tag light>Our Presence</Tag>
            {/* ↓ was clamp(3rem,7vw,7rem) */}
            <h2 className="text-[clamp(2.2rem,4.5vw,5rem)] font-bold tracking-[-0.03em] leading-[1.04] text-white" style={{ textShadow: "0 8px 60px rgba(0,0,0,0.6)" }}>
              Global Reach
              <br />
              <span className="font-extralight text-white/48">&amp; Expertise</span>
            </h2>
            <p className="mt-6 text-white/80 text-[15px] sm:text-base font-light max-w-lg leading-relaxed" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
              We bridge markets and create opportunities across borders, helping businesses expand, collaborate, and grow internationally.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-5xl px-5">
          <div className="flex items-center gap-8 lg:gap-14 flex-wrap justify-center">
            {[
              { name: "Sweden", role: "European HQ" },
              { name: "London", role: "Global Finance" },
              { name: "South Africa", role: "African Hub" },
              { name: "USA", role: "North America" },
              { name: "Singapore", role: "APAC Hub" },
              { name: "Sri Lanka", role: "Tech & Ops" },
            ].map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
                className="text-center"
              >
                <p className="text-black font-bold text-xl">{loc.name}</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/45 mt-1">{loc.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5 ▸ HOW WE OPERATE ══ */}
      <section className="pt-6 pb-28 sm:pb-36 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        <div className="border-t border-[#f0f0f0] pt-20 sm:pt-28">
          <Tag>Our Workflow</Tag>
          <div className="overflow-hidden mb-18 sm:mb-24">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE_EXPO }}
              /* ↓ was clamp(2.4rem,4.5vw,4.2rem) */
              className="text-[clamp(1.8rem,3vw,3rem)] font-bold tracking-[-0.028em] leading-tight"
            >
              How We Operate.
            </motion.h2>
          </div>
          <div className="flex flex-col gap-20 sm:gap-28 md:gap-36">
            {operateItems.map((item, i) => (
              <OperateRow
                key={item.title}
                index={i}
                number={String(i + 1).padStart(2, "0")}
                title={item.title}
                body={item.body}
                imgSrc={item.imgSrc}
                reverse={i % 2 === 1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_EXPO }}
            className="mt-20 sm:mt-28 rounded-3xl bg-[#f7f7f7] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
          >
            <div>
              <p className="text-[9px] font-bold tracking-[0.26em] uppercase text-[#ccc] mb-3">Elite network</p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-[-0.022em] max-w-xl leading-tight">
                Professionals connected to Spotify, Swish, and the world's leading markets.
              </p>
            </div>
            <Magnetic>
              <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[12px] font-bold px-6 sm:px-8 py-3.5 rounded-full hover:bg-[#222] active:scale-95 transition-all duration-200 whitespace-nowrap">
                Work With Us
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* ══ 6 ▸ WHY CYOUMEDIA ══ */}
      <section className="pt-4 pb-24 sm:pb-32 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        <div className="border-t border-[#f0f0f0] pt-20 sm:pt-28">
          <Tag>Why CYouMedia</Tag>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            <motion.div
              initial={{ opacity: 0, y: 44, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE_EXPO }}
            >
              {/* ↓ was clamp(2.3rem,4.8vw,4.8rem) */}
              <h2 className="text-[clamp(1.7rem,3.2vw,3.2rem)] font-bold tracking-[-0.03em] leading-[1.08]">
                Business is not<br />about complexity —<br />
                <span className="text-[#c8c8c8]">it's about results.</span>
              </h2>
              <p className="mt-7 text-[#666] text-[15px] font-light leading-[1.82] max-w-md">
                The digital world is crowded with promises and jargon. But success comes down to one thing: being seen when it matters most.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                className="mt-9"
              >
                <Magnetic>
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[12px] font-bold px-7 py-3.5 rounded-full hover:bg-[#222] active:scale-95 transition-all duration-200">
                    Start Your Growth
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </Magnetic>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Elite Expertise", body: "Professionals connected to Spotify and Swish.", icon: "✦" },
                { title: "Global Reach", body: "Operations from London to Singapore.", icon: "◎" },
                { title: "Bulletproof Security", body: "Heavily structured and vetted agreements.", icon: "◈" },
                { title: "Real Growth", body: "Focused entirely on visibility and revenue.", icon: "◐" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.75, delay: i * 0.11, ease: EASE_EXPO }}
                  whileHover={{ y: -4, transition: { duration: 0.3, ease: EASE } }}
                  className="bg-[#f7f7f7] rounded-3xl p-6 flex flex-col gap-3 cursor-default"
                >
                  <motion.span
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                    className="text-xl text-[#d0d0d0] block"
                  >
                    {item.icon}
                  </motion.span>
                  <p className="text-[13px] font-bold leading-tight">{item.title}</p>
                  <p className="text-[12px] text-[#999] font-light leading-relaxed">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7 ▸ CTA ══ */}
      <section id="contact" className="px-5 md:px-10 lg:px-20 pb-16 sm:pb-20 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE_EXPO }}
          className="rounded-3xl bg-[#080808] px-8 sm:px-14 py-14 sm:py-18 text-center relative overflow-hidden"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(137,207,241,0.16) 0%, transparent 60%)" }}
          />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[9px] font-bold tracking-[0.34em] uppercase text-white/18 mb-5 relative z-10"
          >
            CYouMedia
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.12, ease: EASE_EXPO }}
            className="relative z-10 inline-flex items-center gap-4 mb-4"
          >
            <motion.span animate={{ scaleX: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-6 h-px bg-[#89CFF1]/30 hidden sm:block" />
            {/* ↓ was clamp(1.5rem,3.2vw,2.9rem) */}
            <h2 className="text-[clamp(1.15rem,2.2vw,2rem)] font-bold tracking-[-0.018em]" style={{ color: "#fff", textShadow: "0 0 50px rgba(137,207,241,0.32)" }}>
              CYouMedia IS THE ONLY OPTION
            </h2>
            <motion.span animate={{ scaleX: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="w-6 h-px bg-[#89CFF1]/30 hidden sm:block" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
            className="relative z-10 text-white/30 text-[12px] font-light tracking-[0.06em] mb-9"
          >
            Finns du — finns du. Syns du inte — finns du inte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="relative z-10"
          >
            <Magnetic>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] text-[12px] font-bold px-7 py-3.5 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200">
                Start Your Growth
                <motion.svg
                  className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}