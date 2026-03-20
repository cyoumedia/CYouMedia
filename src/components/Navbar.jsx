"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const EASE      = [0.16, 1, 0.3, 1];
const EASE_EXPO = [0.87, 0, 0.13, 1];

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about"    },
  { label: "Careers",  href: "/careers"  },
];

/* Magnetic wrapper */
const Mag = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });
  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top  + r.height / 2)) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) setOpen(false);
    const fn = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const isHero = !scrolled;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_EXPO }}
        className="fixed top-0 inset-x-0 z-[100] flex items-center justify-center"
        style={{ pointerEvents: "none" }}
      >
        {/* ── Full-pill navbar ── */}
        <motion.div
          className="w-full mx-auto flex items-center justify-between"
          animate={scrolled ? {
            maxWidth:        740,
            marginTop:       12,
            borderRadius:    9999,
            paddingLeft:     24,
            paddingRight:    24,
            height:          52,
            backgroundColor: "rgba(255,255,255,0.92)",
            borderColor:     "rgba(0,0,0,0.07)",
            boxShadow:       "0 4px 28px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
          } : {
            maxWidth:        740,
            marginTop:       12,
            borderRadius:    9999,
            paddingLeft:     24,
            paddingRight:    24,
            height:          52,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderColor:     "rgba(255,255,255,0.13)",
            boxShadow:       "0 4px 28px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.05) inset",
          }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          style={{
            pointerEvents:        "auto",
            backdropFilter:       "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border:               "1px solid transparent",
          }}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 shrink-0">
            <span
              className="font-bold tracking-[-0.04em] leading-none transition-colors duration-300"
              style={{
                fontSize: "clamp(0.9rem,1.3vw,1.05rem)",
                color: isHero ? "#ffffff" : "#0a0a0a",
              }}
            >
              CYou<span style={{ color: "#89CFF1" }}>Media</span><span style={{ color: "#89CFF1" }}>.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center relative z-10">
            {NAV_LINKS.map((link, i) => (
              <div key={link.label} className="flex items-center">
                {i > 0 && (
                  <div
                    className="w-px h-3 mx-1 transition-colors duration-300"
                    style={{
                      background: isHero
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.12)",
                    }}
                  />
                )}
                <Link
                  href={link.href}
                  className="relative text-[10px] font-bold tracking-[0.22em] uppercase px-4 py-1.5 rounded-full transition-all duration-200 group"
                  style={{
                    color: isHero
                      ? "rgba(255,255,255,0.75)"
                      : "rgba(10,10,10,0.55)",
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.color = isHero ? "#ffffff" : "#0a0a0a")
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.color = isHero
                      ? "rgba(255,255,255,0.75)"
                      : "rgba(10,10,10,0.55)")
                  }
                >
                  {link.label}
                  {/* Accent underline sweep on hover */}
                  <span
                    className="absolute bottom-0.5 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: "#89CFF1", opacity: 0.7 }}
                  />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3 relative z-10 shrink-0">
            {/* CTA — accent #89CFF1 on hero, solid dark when scrolled */}
            <Mag>
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95"
                style={isHero ? {
                  background: "#89CFF1",
                  color:      "#010D1E",
                  border:     "1px solid transparent",
                } : {
                  background: "#0a0a0a",
                  color:      "#ffffff",
                  border:     "1px solid transparent",
                }}
                onMouseEnter={e => {
                  if (isHero) {
                    e.currentTarget.style.background = "#a8d8f5";
                  } else {
                    e.currentTarget.style.background = "#222";
                  }
                }}
                onMouseLeave={e => {
                  if (isHero) {
                    e.currentTarget.style.background = "#89CFF1";
                  } else {
                    e.currentTarget.style.background = "#0a0a0a";
                  }
                }}
              >
                Get in Touch
              </Link>
            </Mag>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 focus:outline-none"
            >
              <motion.span
                animate={open ? { rotate: -45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="block h-[1.5px] w-5 rounded-full transition-colors duration-300"
                style={{ background: isHero ? "#ffffff" : "#0a0a0a" }}
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-[1.5px] w-3.5 rounded-full transition-colors duration-300"
                style={{ background: isHero ? "#ffffff" : "#0a0a0a" }}
              />
              <motion.span
                animate={open ? { rotate: 45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="block h-[1.5px] w-5 rounded-full transition-colors duration-300"
                style={{ background: isHero ? "#ffffff" : "#0a0a0a" }}
              />
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[98]"
              style={{ background: "rgba(0,0,0,0.35)" }}
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
              exit={  { opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={{ duration: 0.35, ease: EASE_EXPO }}
              className="fixed top-[76px] left-4 right-4 z-[99] rounded-3xl overflow-hidden md:hidden"
              style={{
                background:           "rgba(255,255,255,0.97)",
                backdropFilter:       "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border:               "1px solid rgba(0,0,0,0.07)",
                boxShadow:            "0 20px 60px rgba(0,0,0,0.18)",
              }}
            >
              <div className="p-6 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-3.5 group"
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      <span className="text-[13px] font-bold tracking-[0.1em] uppercase transition-colors duration-200 text-[#0a0a0a]/50 group-hover:text-[#0a0a0a]">
                        {link.label}
                      </span>
                      <svg className="w-3 h-3 text-[#ccc] group-hover:text-[#89CFF1] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.22, ease: EASE }}
                  className="pt-4"
                >
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full text-[11px] font-bold tracking-[0.18em] uppercase py-3.5 rounded-full transition-all active:scale-95"
                    style={{ background: "#89CFF1", color: "#010D1E" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#a8d8f5")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#89CFF1")}
                  >
                    Get in Touch
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}