"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function Footer() {
  return (
    <footer
      className="relative z-10 w-full bg-[#0E1012] overflow-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#89CFF1]/06 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-[#89CFF1]/04 blur-[100px] rounded-full pointer-events-none" />

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
        className="h-px bg-white/08 origin-left"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-20 pb-10">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 mb-20">

          {/* Left — brand block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="flex flex-col gap-6 max-w-sm"
          >
            <Link
              href="/"
              className="text-[2rem] font-bold tracking-[-0.04em] text-white leading-none hover:text-white/80 transition-colors"
            >
              CYouMedia.
            </Link>
            <p className="text-white/35 text-sm font-light leading-relaxed">
              Strategic growth &amp; digital visibility, worldwide. If you exist — you are seen.
            </p>

            {/* Tagline pill */}
            <div className="inline-flex items-center gap-2 self-start border border-white/10 rounded-full px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#89CFF1] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white/30">
                Syns du, finns du.
              </span>
            </div>

            {/* Presence dots — 6 hubs */}
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/20 mb-1">Global Presence</p>
              <div className="flex flex-wrap gap-2">
                {["Sweden", "London", "South Africa", "USA", "Singapore", "Sri Lanka"].map((loc) => (
                  <span
                    key={loc}
                    className="text-[10px] text-white/30 border border-white/08 rounded-full px-3 py-1 font-light"
                  >
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — link columns */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
            className="flex flex-wrap gap-x-16 gap-y-10"
          >
            {/* Services */}
            <div className="flex flex-col gap-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/25 mb-1">Services</p>
              {[
                ["Strategic Expansion", "/services/strategic-expansion"],
                ["Digital Presence",    "/services/digital-presence"   ],
                ["Proprietary AI",      "/services/proprietary-ai"     ],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-white/40 hover:text-white font-light transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/25 mb-1">Company</p>
              {[
                ["Who We Are",   "/about"       ],
                ["Global Reach", "/global-reach"],
                ["Careers",      "/careers"     ],
                ["Contact",      "/contact"     ],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm text-white/40 hover:text-white font-light transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Connect */}
            <div className="flex flex-col gap-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/25 mb-1">Connect</p>
              {[
                ["LinkedIn",      "#"],
                ["Twitter / X",   "#"],
                ["Client Portal", "#"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-white/40 hover:text-white font-light transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        

        {/* ── Bottom bar ── */}
        <div className="h-px bg-white/06 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">
            © {new Date().getFullYear()} CYouMedia · All Rights Reserved
          </p>
          <p className="text-[10px] italic font-light text-white/20">
            Business is not about complexity — it&apos;s about results.
          </p>
        </div>

      </div>
    </footer>
  );
}