"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { careersData } from "@/data/careers";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const EASE      = [0.16, 1, 0.3, 1];
const EASE_EXPO = [0.87, 0, 0.13, 1];

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
   PERKS DATA
───────────────────────────────────────── */
const PERKS = [
  { icon: "◎", title: "Remote Friendly",       body: "Work from Stockholm, Singapore, or anywhere in between. We operate across time zones." },
  { icon: "✦", title: "Elite Network Access",  body: "From day one, you join a network connected to Spotify, Swish, and global market leaders." },
  { icon: "◈", title: "Equity & Growth",       body: "We grow together. Performance-based equity participation for all senior contributors." },
  { icon: "◐", title: "No Jargon Culture",     body: "We speak plainly, move fast, and hold each other accountable. No politics, no smoke." },
  { icon: "⊕", title: "Meaningful Work",       body: "Every project ships with real business impact — not internal tools or forgotten dashboards." },
  { icon: "◆", title: "Learning Budget",       body: "€2,000 annual learning allowance. Courses, conferences, books — your growth is funded." },
];

/* ─────────────────────────────────────────
   VALUES
───────────────────────────────────────── */
const VALUES = [
  { n: "01", title: "Transparency by Default",  body: "We share context, not just tasks. Everyone understands the why behind the work." },
  { n: "02", title: "Results Over Rituals",      body: "No daily standups for the sake of standups. We measure output, not attendance." },
  { n: "03", title: "Owners, Not Employees",     body: "We hire people who treat the product like it's theirs — because it effectively is." },
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function CareersList() {
  const heroRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY     = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOp    = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /* derive department filters */
  const depts = ["All", ...Array.from(new Set(careersData.map((j) => j.department)))];
  const filtered = activeFilter === "All"
    ? careersData
    : careersData.filter((j) => j.department === activeFilter);

  return (
    <div
      className="bg-white text-[#0a0a0a] overflow-x-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >

      {/* ══ 1 ▸ HERO ══ */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden flex items-center justify-center text-center bg-[#080808]"
        style={{ minHeight: "68vh" }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(137,207,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(137,207,241,1) 1px, transparent 1px)", backgroundSize: "55px 55px" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(137,207,241,0.08) 0%, transparent 65%)" }} />
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <Image src="/bg.png" alt="Careers" fill className="object-cover opacity-[0.18] grayscale" priority />
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
              Careers at CYouMedia
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
                Join the
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
                Elite.
              </motion.h1>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
            className="text-[15px] font-light text-white/40 leading-relaxed max-w-md"
          >
            We don't just build products. We engineer market dominance. Are you an architect of visibility?
          </motion.p>

          {/* Live positions badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ border: "1px solid rgba(137,207,241,0.2)", background: "rgba(137,207,241,0.06)" }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#89CFF1]"
            />
            <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-white/45">
              {careersData.length} Open Position{careersData.length !== 1 ? "s" : ""}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ 2 ▸ CULTURE / MANIFESTO ══ */}
      <section className="pt-20 sm:pt-28 pb-20 sm:pb-28 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE_EXPO }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#f5f5f5]"
          >
            <Image src="/cnew.png" alt="Life at CYouMedia" fill className="object-cover" />
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "200%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }}
            />
            <div className="absolute bottom-0 inset-x-0 p-6" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 100%)" }}>
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#89CFF1]"
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">Life at CYouMedia</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE_EXPO }}
            className="flex flex-col gap-7"
          >
            <Tag>Our Manifesto</Tag>
            <h2 className="text-[clamp(1.9rem,3.5vw,3.4rem)] font-bold tracking-[-0.03em] leading-[1.07]">
              Life inside<br />
              <span className="text-[#c8c8c8]">CYouMedia.</span>
            </h2>
            <p className="text-[15px] font-light text-[#777] leading-[1.85] max-w-lg">
              At CYouMedia, we operate on a fundamental truth: technology is a liability unless it drives revenue. Our culture is built for{" "}
              <em className="not-italic font-semibold text-[#0a0a0a]">pragmatists and visionaries</em>{" "}
              who understand that code is simply the bridge between a business and its global audience.
            </p>
            <p className="text-[15px] font-light text-[#777] leading-[1.85] max-w-lg">
              Whether you're refining our proprietary AI from Stockholm or managing enterprise relations from Singapore, you're entering an environment where{" "}
              <em className="not-italic font-semibold text-[#0a0a0a]">transparency is the default</em>{" "}
              and results are the only currency.
            </p>

            {/* Quick stats */}
            <div className="flex items-center gap-10 pt-2 border-t border-[#f0f0f0]">
              {[{ n: "6+", l: "Global Hubs" }, { n: "100%", l: "Satisfaction Guaranteed" }, { n: "0", l: "Bureaucracy" }].map(({ n, l }, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE }}
                  className="flex flex-col gap-1 pt-6"
                >
                  <span className="text-[1.5rem] font-bold tracking-tight tabular-nums leading-none text-[#0a0a0a]">{n}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#ccc]">{l}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      

      {/* ══ 5 ▸ OPEN ROLES ══ */}
      <section className="pt-6 pb-20 sm:pb-28 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        <div className="border-t border-[#f0f0f0] pt-20 sm:pt-28">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
            <div>
              <Tag>Open Positions</Tag>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: EASE_EXPO }}
                  className="text-[clamp(2rem,4vw,4rem)] font-bold tracking-[-0.035em] leading-[0.97]"
                >
                  Find your role.<br />
                  <span className="text-[#c8c8c8]">Own the impact.</span>
                </motion.h2>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#ececec] bg-[#fafafa] self-start sm:self-end sm:mb-1"
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#89CFF1]"
              />
              <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-[#999]">{filtered.length} role{filtered.length !== 1 ? "s" : ""}</span>
            </motion.div>
          </div>

          {/* Department filter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setActiveFilter(d)}
                className={`text-[10px] font-bold tracking-[0.16em] uppercase px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeFilter === d
                    ? "bg-[#0a0a0a] text-white border-transparent"
                    : "border-[#ececec] text-[#888] bg-[#fafafa] hover:border-[#d0d0d0] hover:text-[#0a0a0a]"
                }`}
              >
                {d}
              </button>
            ))}
          </motion.div>

          {/* Roles list */}
          <div className="flex flex-col gap-3">
            {filtered.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_EXPO }}
              >
                <Link
                  href={`/careers/${job.id}`}
                  className="group flex items-center justify-between px-8 py-7 rounded-3xl border border-[#f0f0f0] bg-white hover:bg-[#0a0a0a] hover:border-transparent transition-all duration-400 cursor-pointer"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-[#89CFF1] group-hover:text-[#89CFF1]">
                        {job.department}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#ddd] group-hover:bg-white/20" />
                      <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[#bbb] group-hover:text-white/35">
                        {job.location}
                      </span>
                    </div>
                    <h3
                      className="font-bold tracking-[-0.02em] leading-tight text-[#0a0a0a] group-hover:text-white transition-colors duration-300"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)" }}
                    >
                      {job.title}
                    </h3>
                  </div>

                  <motion.div
                    className="w-10 h-10 rounded-full border border-[#ececec] bg-[#fafafa] group-hover:bg-[#89CFF1] group-hover:border-[#89CFF1] flex items-center justify-center shrink-0 transition-all duration-300"
                    whileHover={{ scale: 1.08 }}
                  >
                    <svg className="w-3.5 h-3.5 text-[#bbb] group-hover:text-[#080808] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </Link>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-[13px] font-light text-[#ccc]">No open positions in this department right now.</p>
                <button onClick={() => setActiveFilter("All")} className="mt-4 text-[11px] font-bold tracking-[0.16em] uppercase text-[#0a0a0a] hover:text-[#89CFF1] transition-colors">
                  View all roles →
                </button>
              </motion.div>
            )}
          </div>          
        </div>
      </section>

      

    </div>
  );
}