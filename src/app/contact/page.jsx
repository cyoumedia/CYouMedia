"use client";

import { useRef } from "react";
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
   PAGE
───────────────────────────────────────── */
export default function Contact() {
  const heroRef    = useRef(null);
  const formRef    = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY     = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOp    = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      className="bg-white text-[#0a0a0a] overflow-x-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >

      {/* ══ 1 ▸ HERO ══ */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden flex items-center justify-center text-center bg-[#080808]"
        style={{ minHeight: "60vh" }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(137,207,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(137,207,241,1) 1px, transparent 1px)", backgroundSize: "55px 55px" }} />
        {/* Center glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(137,207,241,0.08) 0%, transparent 65%)" }} />
        {/* Parallax bg */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <Image src="/bg.png" alt="Contact" fill className="object-cover opacity-[0.18] grayscale" priority />
        </motion.div>
        {/* Rounded white reveal */}
        <div className="absolute bottom-0 inset-x-0 h-16 z-10 bg-white" style={{ borderRadius: "40px 40px 0 0" }} />

        <motion.div
          style={{ opacity: heroOp }}
          className="relative z-20 flex flex-col items-center gap-6 px-5 pt-36 pb-28 max-w-3xl mx-auto w-full"
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE_EXPO }}
              className="text-[9px] font-bold tracking-[0.36em] uppercase text-white/35"
            >
              Connect With Us
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
                Let's Talk
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
                Growth.
              </motion.h1>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: EASE }}
            className="text-[15px] font-light text-white/40 leading-relaxed max-w-sm"
          >
            Ready to become visible? Let's build your presence from the ground up.
          </motion.p>
        </motion.div>
      </section>

      {/* ══ 2 ▸ CONTACT BODY ══ */}
      <section
        ref={formRef}
        className="pt-16 sm:pt-24 pb-20 sm:pb-28 px-5 md:px-10 lg:px-20 max-w-[1440px] mx-auto"
      >
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">

          {/* ── Left: contact directory ── */}
          <motion.div
            initial={{ opacity: 0, x: -32, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: EASE_EXPO }}
            className="flex flex-col gap-0 lg:sticky lg:top-24"
          >
            <Tag>Get In Touch</Tag>

            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_EXPO }}
                className="font-bold tracking-[-0.03em] leading-[1.07] text-[#0a0a0a]"
                style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)" }}
              >
                Start a conversation.<br />
                <span className="text-[#c8c8c8]">We respond fast.</span>
              </motion.h2>
            </div>

            <div className="flex flex-col gap-0 divide-y divide-[#f0f0f0]">

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="py-7"
              >
                <p className="text-[9px] font-bold tracking-[0.26em] uppercase text-[#ccc] mb-3">Direct Inquiry</p>
                <a
                  href="mailto:hello@cyoumedia.com"
                  className="text-[clamp(1rem,2vw,1.35rem)] font-bold text-[#0a0a0a] tracking-tight hover:text-[#89CFF1] transition-colors duration-200 block mb-2"
                >
                  hello@cyoumedia.com
                </a>
                <a
                  href="tel:+4681234567"
                  className="flex items-center gap-2 text-[14px] font-light text-[#999] hover:text-[#0a0a0a] transition-colors duration-200 w-max"
                >
                  <svg className="w-3.5 h-3.5 text-[#89CFF1] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +46 (0) 8 123 45 67
                </a>
              </motion.div>

              {/* HQ */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
                className="py-7"
              >
                <p className="text-[9px] font-bold tracking-[0.26em] uppercase text-[#ccc] mb-3">Headquarters</p>
                <p className="text-[14px] font-light text-[#777] leading-[1.85]">
                  Sveavägen 44<br />
                  111 34 Stockholm<br />
                  Sweden
                </p>
              </motion.div>

              {/* Social */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
                className="py-7"
              >
                <p className="text-[9px] font-bold tracking-[0.26em] uppercase text-[#ccc] mb-5">Connect</p>
                <div className="flex gap-3">
                  {[
                    {
                      label: "LinkedIn",
                      icon: (
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      ),
                      fill: true,
                    },
                    {
                      label: "X",
                      icon: (
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      ),
                      fill: true,
                    },
                    {
                      label: "Instagram",
                      icon: (
                        <>
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </>
                      ),
                      fill: false,
                    },
                  ].map((s, i) => (
                    <motion.a
                      key={s.label}
                      href="#"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: EASE }}
                      whileHover={{ y: -3, transition: { duration: 0.25, ease: EASE } }}
                      className="w-11 h-11 rounded-2xl border border-[#ececec] bg-[#fafafa] flex items-center justify-center text-[#bbb] hover:text-[#0a0a0a] hover:border-[#d0d0d0] hover:bg-white transition-colors duration-200"
                      aria-label={s.label}
                    >
                      <svg className="w-4 h-4" fill={s.fill ? "currentColor" : "none"} stroke={s.fill ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        {s.icon}
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1, ease: EASE_EXPO }}
          >
            <div className="relative bg-white rounded-3xl border border-[#ececec] p-8 sm:p-12 overflow-hidden" style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.05)" }}>
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(137,207,241,0.06) 0%, transparent 65%)" }} />

              <div className="relative z-10 flex flex-col gap-6">

                {/* Name + Company */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {[{ label: "Full Name", placeholder: "John Doe", type: "text" }, { label: "Company", placeholder: "Enterprise Inc.", type: "text" }].map((f) => (
                    <div key={f.label} className="flex flex-col gap-2">
                      <label className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#ccc]">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full bg-[#fafafa] border border-[#f0f0f0] rounded-2xl px-5 py-3.5 text-[14px] text-[#0a0a0a] placeholder:text-[#d0d0d0] outline-none transition-all duration-200 focus:border-[#89CFF1] focus:bg-white"
                      />
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#ccc]">Business Email</label>
                  <input
                    type="email"
                    placeholder="john@enterprise.com"
                    className="w-full bg-[#fafafa] border border-[#f0f0f0] rounded-2xl px-5 py-3.5 text-[14px] text-[#0a0a0a] placeholder:text-[#d0d0d0] outline-none transition-all duration-200 focus:border-[#89CFF1] focus:bg-white"
                  />
                </div>

                {/* Service interest */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#ccc]">I'm interested in</label>
                  <div className="flex flex-wrap gap-2">
                    {["Strategic Expansion", "Digital Presence", "Elite Networking", "Full Partnership"].map((opt, i) => (
                      <motion.label
                        key={opt}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: EASE }}
                        className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] uppercase px-3.5 py-2 rounded-xl border border-[#ececec] text-[#888] bg-[#fafafa] cursor-pointer hover:border-[#89CFF1] hover:text-[#0a0a0a] transition-colors duration-200 select-none"
                      >
                        <input type="checkbox" className="w-3 h-3 accent-[#89CFF1]" />
                        {opt}
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#ccc]">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Describe your expansion or visibility goals..."
                    className="w-full bg-[#fafafa] border border-[#f0f0f0] rounded-2xl px-5 py-4 text-[14px] text-[#0a0a0a] placeholder:text-[#d0d0d0] outline-none transition-all duration-200 focus:border-[#89CFF1] focus:bg-white resize-none leading-relaxed"
                  />
                </div>

                {/* Submit */}
                <Magnetic>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 bg-[#0a0a0a] text-white text-[12px] font-bold tracking-[0.14em] uppercase py-4 rounded-2xl hover:bg-[#222] active:scale-[0.99] transition-all duration-200"
                  >
                    Initiate Partnership
                    <motion.svg
                      className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </button>
                </Magnetic>

                <p className="text-center text-[11px] font-light text-[#ccc] tracking-[0.04em]">
                  We respond within 24 hours · No commitments required
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══ 3 ▸ DARK CTA ══ */}
      <section className="px-5 md:px-10 lg:px-20 pb-16 sm:pb-20 max-w-[1440px] mx-auto">
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
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[9px] font-bold tracking-[0.34em] uppercase text-white/18 mb-5 relative z-10"
          >
            CYouMedia
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: EASE_EXPO }}
            className="relative z-10 font-bold tracking-[-0.018em] text-white mb-4"
            style={{ fontSize: "clamp(1.15rem, 2.2vw, 2rem)" }}
          >
            CYouMedia IS THE ONLY OPTION
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 text-white/28 text-[12px] font-light tracking-[0.06em] mb-9"
          >
            Finns du — finns du. Syns du inte — finns du inte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
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