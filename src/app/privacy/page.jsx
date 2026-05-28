"use client";

import React from "react";
import { ShieldCheck, Lock, EyeOff, Database, FileText, Sparkles } from "lucide-react";

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        
        .privacy-root {
          background: #f8fafc;
          color: #374151;
          font-family: 'DM Sans', sans-serif;
        }
        .grid-fade-dark {
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .grid-fade-light {
          background-image: linear-gradient(rgba(58,127,193,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(58,127,193,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .content-card {
          border: 1px solid #e5e9ef;
          background: white;
          box-shadow: 0 4px 20px rgba(17,50,86,0.02);
        }
      `}</style>

      <div className="privacy-root min-h-screen relative overflow-hidden pb-32">
        {/* ── HERO BANNER (DEEP BLUE BACKGROUND FOR NAVBAR CONTRAST) ── */}
        <section className="relative overflow-hidden bg-[#113256] text-white pt-44 pb-24 border-b border-white/5">
          {/* Ambient overlays */}
          <div className="absolute inset-0 grid-fade-dark pointer-events-none opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(58,127,193,0.12)_0%,transparent_75%)] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-1.5 bg-[#3a7fc1]/20 text-[#7bafd4] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Compliance Standards
            </span>
            <h1 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(2.5rem,6vw,3.8rem)] font-light leading-none tracking-tight text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-[#7bafd4] text-xs font-light tracking-wide">
              Last updated: May 2026
            </p>
          </div>
        </section>

        {/* ── POLICY DETAIL SECTION (LIGHT BACKGROUND DESIGN) ── */}
        <section className="relative z-10 py-16 bg-[#f8fafc]">
          <div className="absolute inset-0 grid-fade-light pointer-events-none opacity-60" />

          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Sidebar quick index */}
              <div className="md:col-span-4 space-y-3 no-print">
                <div className="p-5 rounded-2xl content-card border">
                  <span className="text-[10px] font-bold tracking-wider text-[#9ca3af] uppercase block mb-3">
                    Document Index
                  </span>
                  <nav className="space-y-2.5">
                    <a href="#introduction" className="flex items-center gap-2 text-xs font-medium text-[#4b5563] hover:text-[#113256] transition">
                      <FileText className="w-3.5 h-3.5 text-[#3a7fc1]" />
                      Introduction
                    </a>
                    <a href="#data-collection" className="flex items-center gap-2 text-xs font-medium text-[#4b5563] hover:text-[#113256] transition">
                      <Database className="w-3.5 h-3.5 text-[#3a7fc1]" />
                      1. Data Collection
                    </a>
                    <a href="#crawling" className="flex items-center gap-2 text-xs font-medium text-[#4b5563] hover:text-[#113256] transition">
                      <EyeOff className="w-3.5 h-3.5 text-[#3a7fc1]" />
                      2. Crawling & Audits
                    </a>
                    <a href="#security" className="flex items-center gap-2 text-xs font-medium text-[#4b5563] hover:text-[#113256] transition">
                      <Lock className="w-3.5 h-3.5 text-[#3a7fc1]" />
                      3. Security Parameters
                    </a>
                  </nav>
                </div>
              </div>

              {/* Main content pane */}
              <div className="md:col-span-8 space-y-6">
                {/* Introduction */}
                <div id="introduction" className="p-6 rounded-2xl content-card border">
                  <p className="text-[0.88rem] font-light leading-relaxed text-[#4b5563]">
                    At CYouMedia, we are committed to safeguarding the privacy and security of our website visitors and clients. This privacy policy describes how we collect, use, and process your data when you interact with our online digital visibility suite.
                  </p>
                </div>

                {/* Section 1 */}
                <div id="data-collection" className="p-6 rounded-2xl content-card border space-y-4">
                  <h2 className="text-xl font-light text-[#113256] font-['Instrument_Serif',Georgia,serif] flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#3a7fc1]" />
                    1. Data Collection
                  </h2>
                  <p className="text-[0.88rem] font-light leading-relaxed text-[#4b5563]">
                    We do not collect any personal data when you submit URLs for website audit checks. All URL queries are processed live and are completely anonymous. When you contact us or request a custom diagnostic report, we collect your email address, business name, and domain URL to fulfill your request.
                  </p>
                </div>

                {/* Section 2 */}
                <div id="crawling" className="p-6 rounded-2xl content-card border space-y-4">
                  <h2 className="text-xl font-light text-[#113256] font-['Instrument_Serif',Georgia,serif] flex items-center gap-2">
                    <EyeOff className="w-5 h-5 text-[#3a7fc1]" />
                    2. Crawling & Auditing
                  </h2>
                  <p className="text-[0.88rem] font-light leading-relaxed text-[#4b5563]">
                    Our diagnostics engine scrapes public robots.txt, sitemaps, semantic HTML, and Schema.org structures of queried domains. This operation is performed as a safe, automated technical audit utilizing standard scraping user agents that comply with default search crawling rules.
                </p>
                </div>

                {/* Section 3 */}
                <div id="security" className="p-6 rounded-2xl content-card border space-y-4">
                  <h2 className="text-xl font-light text-[#113256] font-['Instrument_Serif',Georgia,serif] flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#3a7fc1]" />
                    3. Security Parameters
                  </h2>
                  <p className="text-[0.88rem] font-light leading-relaxed text-[#4b5563]">
                    Your domain scans and search reports are private configurations. We execute industry-standard security models to guard query databases and prevent unauthorized access to diagnostic results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
