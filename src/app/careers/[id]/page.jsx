"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
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
const Tag = ({ children }) => (
  <motion.span
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: EASE }}
    className="inline-flex items-center gap-3 text-[9px] font-bold tracking-[0.32em] uppercase mb-6 text-[#999]"
  >
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="block w-5 h-px origin-left bg-[#ccc]"
    />
    {children}
  </motion.span>
);

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function JobDetails({ params }) {
  const resolvedParams = use(params);
  const job = careersData.find((j) => j.id === resolvedParams.id);
  if (!job) return notFound();

  return (
    <div
      className="bg-white text-[#0a0a0a] overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >

      {/* ══ HEADER ══ */}
      <header className="pt-32 pb-14 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto border-b border-[#f0f0f0]">
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE_EXPO }}
        >
          {/* Back link */}
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.26em] uppercase text-[#ccc] hover:text-[#0a0a0a] transition-colors duration-200 mb-10 group"
          >
            <motion.svg
              className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </motion.svg>
            All Positions
          </Link>

          

          {/* Title */}
          <div className="overflow-hidden mb-7">
            <motion.h1
              initial={{ y: "60%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.06, ease: EASE_EXPO }}
              className="font-bold tracking-[-0.032em] leading-[1.04] text-[#0a0a0a]"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              {job.title}
            </motion.h1>
          </div>

          {/* Meta pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
            className="flex flex-wrap gap-2"
          >
            {[job.location, job.type, job.salary, job.department].filter(Boolean).map((meta, i) => (
              <span
                key={i}
                className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase px-3.5 py-2 rounded-full border border-[#ececec] text-[#888] bg-[#fafafa]"
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  className="w-1.5 h-1.5 rounded-full bg-[#89CFF1] shrink-0"
                />
                {meta}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </header>

      {/* ══ MAIN CONTENT ══ */}
      <main className="pt-16 pb-20 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-14 lg:gap-20 items-start">

          {/* ── Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, ease: EASE_EXPO }}
            className="lg:sticky lg:top-28 flex flex-col gap-0 divide-y divide-[#f0f0f0]"
          >
            {[
              { label: "Department", value: job.department || "Operations" },
              { label: "Location",   value: job.location },
              { label: "Type",       value: job.type },
              { label: "Salary",     value: job.salary },
              { label: "Posted",     value: "March 2026" },
            ].filter(({ value }) => !!value).map(({ label, value }) => (
              <div key={label} className="py-5">
                <p className="text-[9px] font-bold tracking-[0.26em] uppercase text-[#ccc] mb-1.5">{label}</p>
                <p className="text-[14px] font-bold text-[#0a0a0a] tracking-tight">{value}</p>
              </div>
            ))}

            <div className="py-5">
              <p className="text-[12px] font-light text-[#bbb] leading-relaxed">
                CYouMedia is an equal opportunity employer. We value diversity and structured results above all.
              </p>
            </div>

            {/* Apply CTA in sidebar on desktop */}
            <div className="pt-7 hidden lg:block">
              <Magnetic>
                <a
                  href="mailto:careers@cyoumedia.com"
                  className="w-full flex items-center justify-center gap-2 bg-[#0a0a0a] text-white text-[11px] font-bold tracking-[0.14em] uppercase py-3.5 rounded-2xl hover:bg-[#222] active:scale-95 transition-all duration-200"
                >
                  Apply Now
                  <motion.svg
                    className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </a>
              </Magnetic>
            </div>
          </motion.aside>

          {/* ── Body ── */}
          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.14, ease: EASE_EXPO }}
            className="flex flex-col gap-14"
          >

            {/* The Role */}
            <section className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#ccc]">The Role</span>
                <div className="h-px flex-1 bg-[#f0f0f0]" />
              </div>
              <p
                className="font-light text-[#555] leading-[1.85]"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)" }}
              >
                {job.about}
              </p>
            </section>

            {/* Responsibilities */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#ccc]">Responsibilities</span>
                <div className="h-px flex-1 bg-[#f0f0f0]" />
              </div>
              <div className="flex flex-col gap-0 divide-y divide-[#f8f8f8]">
                {job.responsibilities.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                    className="flex items-start gap-5 py-4 group"
                  >
                    <span className="text-[9px] font-bold text-[#89CFF1]/60 tabular-nums mt-[3px] shrink-0 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[14px] font-light text-[#666] leading-relaxed group-hover:text-[#0a0a0a] transition-colors duration-200">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#ccc]">Requirements</span>
                <div className="h-px flex-1 bg-[#f0f0f0]" />
              </div>
              <div className="flex flex-col gap-3">
                {job.requirements.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                    className="flex items-start gap-4 px-5 py-4 rounded-2xl bg-[#fafafa] border border-[#f0f0f0] hover:border-[#e0e0e0] hover:bg-white transition-colors duration-200"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-[#89CFF1] shrink-0 mt-[5px]"
                    />
                    <p className="text-[14px] font-light text-[#666] leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Apply CTA — inline at bottom for mobile / as emphasis on desktop */}
            <section className="pt-4 border-t border-[#f0f0f0]">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.26em] uppercase text-[#ccc] mb-2">Ready to apply?</p>
                  <p className="text-[14px] font-light text-[#999]">
                    Send your CV and a short intro to{" "}
                    <a href="mailto:careers@cyoumedia.com" className="font-semibold text-[#0a0a0a] hover:text-[#89CFF1] transition-colors">
                      careers@cyoumedia.com
                    </a>
                  </p>
                </div>
                <Magnetic>
                  <a
                    href="mailto:careers@cyoumedia.com"
                    className="shrink-0 inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-[11px] font-bold tracking-[0.14em] uppercase px-7 py-3.5 rounded-full hover:bg-[#222] active:scale-95 transition-all duration-200 whitespace-nowrap"
                  >
                    Apply for This Role
                    <motion.svg
                      className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </a>
                </Magnetic>
              </div>
            </section>

          </motion.div>
        </div>
      </main>

      {/* ══ MORE ROLES ══ */}
      <section className="px-5 md:px-10 lg:px-20 pb-20 max-w-[1440px] mx-auto">
        <div className="border-t border-[#f0f0f0] pt-16">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[9px] font-bold tracking-[0.26em] uppercase text-[#ccc]">More Positions</p>
            <Link href="/careers" className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#bbb] hover:text-[#0a0a0a] transition-colors duration-200">
              View All →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {careersData
              .filter((j) => j.id !== job.id)
              .slice(0, 3)
              .map((j, i) => (
                <motion.div
                  key={j.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                >
                  <Link
                    href={`/careers/${j.id}`}
                    className="group flex items-center justify-between px-6 py-5 rounded-2xl border border-[#f0f0f0] bg-white hover:bg-[#0a0a0a] hover:border-transparent transition-all duration-300"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#89CFF1]">{j.department}</span>
                      <span className="text-[13px] font-bold text-[#0a0a0a] group-hover:text-white transition-colors duration-300">{j.title}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[#ececec] bg-[#fafafa] group-hover:bg-[#89CFF1] group-hover:border-[#89CFF1] flex items-center justify-center transition-all duration-300 shrink-0">
                      <svg className="w-3 h-3 text-[#bbb] group-hover:text-[#080808] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* ══ DARK CTA ══ */}
      <section className="px-5 md:px-10 lg:px-20 pb-16 sm:pb-20 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE_EXPO }}
          className="rounded-3xl bg-[#080808] px-8 sm:px-14 py-14 text-center relative overflow-hidden"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(137,207,241,0.16) 0%, transparent 60%)" }}
          />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

          <p className="text-[9px] font-bold tracking-[0.34em] uppercase text-white/18 mb-4 relative z-10">CYouMedia</p>
          <h2
            className="relative z-10 font-bold tracking-[-0.018em] text-white mb-3"
            style={{ fontSize: "clamp(1.15rem, 2.2vw, 2rem)" }}
          >
            CYouMedia IS THE ONLY OPTION
          </h2>
          <p className="relative z-10 text-white/28 text-[12px] font-light tracking-[0.06em] mb-8">
            Finns du — finns du. Syns du inte — finns du inte.
          </p>
          <Magnetic>
            <Link href="/contact" className="relative z-10 inline-flex items-center gap-2 bg-white text-[#0a0a0a] text-[12px] font-bold px-7 py-3.5 rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200">
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
      </section>

    </div>
  );
}