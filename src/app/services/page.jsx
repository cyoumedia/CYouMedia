"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   CONSTANTS  (identical to home page)
───────────────────────────────────────── */
const EASE      = [0.16, 1, 0.3, 1];
const EASE_EXPO = [0.87, 0, 0.13, 1];
const EASE_OUT  = [0.0, 0.0, 0.2, 1];

/* ─────────────────────────────────────────
   TAG  (same as home)
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
   MAGNETIC  (same as home)
───────────────────────────────────────── */
const Magnetic = ({ children, strength = 0.35 }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x, y }}>
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   SCROLL-DRIVEN WAVY LINE  (refined from original)
───────────────────────────────────────── */
const WavyLine = ({ targetRef }) => {
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start center", "end center"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 55, damping: 22 });
  return (
    <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-px pointer-events-none z-0 hidden lg:block" style={{ width: 2 }}>
      <svg width="2" height="100%" className="absolute inset-0" preserveAspectRatio="none" viewBox="0 0 2 100">
        <path d="M1,0 L1,100" stroke="#e8e8e8" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
        <motion.path
          d="M1,0 L1,100"
          stroke="url(#sg)"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#89CFF1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3ea6d6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────
   NUMBER TICKER  (counts up on view)
───────────────────────────────────────── */
const CountUp = ({ target, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => {
        if (seen) return;
        setSeen(true);
        let start = 0;
        const step = Math.ceil(target / 40);
        const t = setInterval(() => {
          start = Math.min(start + step, target);
          setVal(start);
          if (start >= target) clearInterval(t);
        }, 30);
      }}
      viewport={{ once: true }}
    >
      {val}{suffix}
    </motion.span>
  );
};

/* ─────────────────────────────────────────
   SERVICES DATA
───────────────────────────────────────── */
const SERVICES = [
  {
    id: "01",
    label: "Strategic Expansion",
    title: "Market Entry\n& Legal Structure",
    body: "We build the commercial bridge. From legal structuring to cross-border agreements, we pave the way for your business to enter new territories with absolute security and zero compromise.",
    tags: ["Market Entry", "Legal Frameworks", "Cross-Border Agreements", "Partnerships"],
    image: "/s.png",
    stat: { n: 6, suffix: "+", label: "Global hubs" },
    accent: "#89CFF1",
  },
  {
    id: "02",
    label: "Digital Presence",
    title: "AI-Powered\nVisibility",
    body: "Leveraging our proprietary AI engine, we transform your digital footprint. Our goal: ensuring that when a customer searches, they find you first — every time, everywhere.",
    tags: ["Proprietary AI", "SEO Dominance", "Brand Visibility", "Search Capture"],
    image: "/s1.png",
    stat: { n: 100, suffix: "%", label: "Results driven" },
    accent: "#89CFF1",
    dark: true,
  },
  {
    id: "03",
    label: "Elite Networking",
    title: "High-Level\nConnections",
    body: "Access our elite network across London, Singapore, and Sweden. We connect you with stakeholders that open doors usually closed to the public — and keep them open.",
    tags: ["Executive Access", "Global Hubs", "Capital Relations", "Strategic Alliances"],
    image: "/s3.png",
    stat: { n: 10, suffix: "M+", label: "Growth target" },
    accent: "#89CFF1",
  },
];

/* ─────────────────────────────────────────
   SERVICE ROW
───────────────────────────────────────── */
const ServiceRow = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const isReverse = index % 2 !== 0;
  const isDark = service.dark;

  return (
    <div
      className={`relative ${isDark ? "bg-[#080808]" : "bg-white"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Subtle hover tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 30% 50%, rgba(137,207,241,0.06) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 70% 50%, rgba(137,207,241,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-20 sm:py-28">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}>

          {/* ── Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: isReverse ? 50 : -50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE_EXPO }}
          >
            {service.image ? (
              <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden ${isDark ? "bg-[#111]" : "bg-[#f5f5f5]"}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-[2.5s] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Shimmer */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "200%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
                  className="absolute inset-y-0 w-1/3 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
                />
                {/* ID badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#89CFF1]"
                  />
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">{service.label}</span>
                </div>
                {/* Number watermark */}
                <span className="absolute bottom-6 right-8 font-bold text-white/[0.07] select-none" style={{ fontSize: "5rem", lineHeight: 1 }}>{service.id}</span>
              </div>
            ) : (
              /* Placeholder tile for services without images */
              <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center ${isDark ? "bg-[#111]" : "bg-[#f7f7f7]"}`}>
                <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(rgba(137,207,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(137,207,241,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 40% 40%, rgba(137,207,241,0.1) 0%, transparent 65%)` }} />
                <span className="font-bold select-none" style={{ fontSize: "clamp(6rem,12vw,10rem)", lineHeight: 1, color: isDark ? "rgba(255,255,255,0.04)" : "rgba(10,10,10,0.05)" }}>{service.id}</span>
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[#89CFF1]"
                  />
                  <span className={`text-[9px] font-bold uppercase tracking-[0.22em] ${isDark ? "text-white/30" : "text-[#bbb]"}`}>{service.label}</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, x: isReverse ? -50 : 50, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE_EXPO }}
            className="flex flex-col gap-6"
          >
            {/* ID + label */}
            <div className="flex items-center gap-3">
              <span className={`font-bold text-[11px] tracking-[0.28em] uppercase ${isDark ? "text-white/20" : "text-[#ccc]"}`}>{service.id}</span>
              <span className={`h-px w-8 ${isDark ? "bg-white/10" : "bg-[#e8e8e8]"}`} />
              <span className={`text-[9px] font-bold tracking-[0.22em] uppercase ${isDark ? "text-[#89CFF1]/50" : "text-[#89CFF1]"}`}>{service.label}</span>
            </div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.18, ease: EASE_EXPO }}
              className={`font-bold tracking-[-0.03em] leading-[1.07] whitespace-pre-line ${isDark ? "text-white" : "text-[#0a0a0a]"}`}
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.8rem)" }}
            >
              {service.title}
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.26, ease: EASE }}
              className={`text-[15px] font-light leading-[1.85] max-w-md ${isDark ? "text-white/50" : "text-[#777]"}`}
            >
              {service.body}
            </motion.p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {service.tags.map((tag, ti) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + ti * 0.07, ease: EASE }}
                  className={`text-[9px] font-semibold tracking-[0.16em] uppercase px-3 py-2 rounded-xl border ${
                    isDark
                      ? "border-white/10 text-white/30 bg-white/[0.03]"
                      : "border-[#ececec] text-[#888] bg-[#fafafa]"
                  }`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Stat + divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              className={`flex items-center gap-6 pt-4 border-t origin-left ${isDark ? "border-white/[0.07]" : "border-[#f0f0f0]"}`}
            >
              <div>
                <p className={`text-[2rem] font-bold tracking-tight tabular-nums leading-none ${isDark ? "text-white" : "text-[#0a0a0a]"}`}>
                  <CountUp target={service.stat.n} suffix={service.stat.suffix} />
                </p>
                <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mt-1 ${isDark ? "text-white/25" : "text-[#ccc]"}`}>{service.stat.label}</p>
              </div>
              <div className={`w-px h-10 ${isDark ? "bg-white/[0.07]" : "bg-[#ececec]"}`} />
              <p className={`text-[11px] font-light leading-relaxed max-w-[180px] ${isDark ? "text-white/30" : "text-[#bbb]"}`}>
                Real outcomes, not just deliverables.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border between rows */}
      <div className={`${isDark ? "border-b border-white/[0.05]" : "border-b border-[#f4f4f4]"}`} />
    </div>
  );
};

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ServicesPage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY     = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOp    = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      className="bg-white text-[#0a0a0a] overflow-x-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >

      {/* ══ HERO — dark, centered, screenshot layout ══ */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden flex items-center justify-center text-center bg-[#080808]"
        style={{ minHeight: "68vh" }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(#89CFF1 1px, transparent 1px), linear-gradient(90deg, #89CFF1 1px, transparent 1px)", backgroundSize: "55px 55px" }} />

        {/* Center glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(137,207,241,0.08) 0%, transparent 65%)" }} />

        {/* Parallax bg */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <Image src="/bg.png" alt="Services" fill className="object-cover opacity-20" priority />
        </motion.div>

        {/* Rounded white reveal at bottom — matching screenshot */}
        <div
          className="absolute bottom-0 inset-x-0 h-16 z-10 bg-white"
          style={{ borderRadius: "40px 40px 0 0" }}
        />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOp }}
          className="relative z-20 flex flex-col items-center gap-7 px-5 pt-36 pb-28 max-w-4xl mx-auto w-full"
        >
          {/* Eyebrow */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE_EXPO }}
              className="text-[9px] font-bold tracking-[0.36em] uppercase text-white/35"
            >
              Our Expertise
            </motion.p>
          </div>

          {/* Headline — two lines, bold then extralight */}
          <div className="flex flex-col items-center gap-0">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "70%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.08, ease: EASE_EXPO }}
                className="font-bold tracking-[-0.035em] leading-[1.0] text-white"
                style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}
              >
                From Vision
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
                to Global Impact.
              </motion.h1>
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
            className="text-[15px] font-light text-white/40 leading-relaxed max-w-md"
          >
            Legal structure, AI technology, and global connections — built for businesses that refuse to be invisible.
          </motion.p>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {["Strategic Expansion", "Digital Presence", "Elite Networking"].map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.09, ease: EASE }}
                className="text-[9px] font-semibold tracking-[0.14em] uppercase px-4 py-2 rounded-full"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)" }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══ INTRO STRIP ══ */}
      <div className="border-y border-[#f0f0f0] py-10 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_EXPO }}
            className="text-[clamp(1rem,1.8vw,1.5rem)] font-bold tracking-[-0.02em] text-[#0a0a0a] max-w-lg leading-tight"
          >
            Strict Discipline. One Outcome.<br />
            <span className="text-[#d0d0d0]">Your Growth.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
            className="flex items-center gap-4"
          >
            {["01","02","03"].map((n, i) => (
              <motion.span
                key={n}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                className="text-[10px] font-bold text-[#ccc] tabular-nums"
              >
                {n}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══ SERVICES ROWS ══ */}
      <div ref={servicesRef} className="relative">
        <WavyLine targetRef={servicesRef} />
        {SERVICES.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* ══ PROCESS STRIP ══ */}
      <section className="py-20 sm:py-28 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto border-t border-[#f0f0f0]">
        <Tag>How It Works</Tag>
        <div className="overflow-hidden mb-14">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_EXPO }}
            className="text-[clamp(1.8rem,3vw,3rem)] font-bold tracking-[-0.028em] leading-tight"
          >
            A simple process.<br />
            <span className="text-[#d0d0d0]">Exceptional results.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: "01", title: "Discovery", body: "We learn your business, your market, and your ambition." },
            { n: "02", title: "Strategy", body: "We craft a bespoke roadmap — no templates, no shortcuts." },
            { n: "03", title: "Execution", body: "We deploy legal structure, digital tools, and elite connections." },
            { n: "04", title: "Growth", body: "We measure real outcomes and scale what works." },
          ].map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_EXPO }}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: EASE } }}
              className="bg-[#f8f8f8] rounded-3xl p-7 flex flex-col gap-4 cursor-default"
            >
              <span className="text-[11px] font-bold tracking-[0.26em] uppercase text-[#ccc]">{step.n}</span>
              <p className="text-[15px] font-bold leading-tight text-[#0a0a0a]">{step.title}</p>
              <p className="text-[13px] text-[#999] font-light leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}