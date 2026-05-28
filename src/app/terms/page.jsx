"use client";

import React from "react";
import { Scale, Terminal, Award, FileText, Sparkles } from "lucide-react";

export default function TermsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        
        .terms-root {
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

      <div className="terms-root min-h-screen relative overflow-hidden pb-32">
        {/* ── HERO BANNER (DEEP BLUE BACKGROUND FOR NAVBAR CONTRAST) ── */}
        <section className="relative overflow-hidden bg-[#113256] text-white pt-44 pb-24 border-b border-white/5">
          {/* Ambient overlays */}
          <div className="absolute inset-0 grid-fade-dark pointer-events-none opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(58,127,193,0.12)_0%,transparent_75%)] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-1.5 bg-[#3a7fc1]/20 text-[#7bafd4] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4">
              <Scale className="w-3.5 h-3.5" />
              Service Terms
            </span>
            <h1 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(2.5rem,6vw,3.8rem)] font-light leading-none tracking-tight text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-[#7bafd4] text-xs font-light tracking-wide">
              Last updated: May 2026
            </p>
          </div>
        </section>

        {/* ── TERMS DETAIL SECTION (LIGHT BACKGROUND DESIGN) ── */}
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
                    <a href="#use" className="flex items-center gap-2 text-xs font-medium text-[#4b5563] hover:text-[#113256] transition">
                      <Terminal className="w-3.5 h-3.5 text-[#3a7fc1]" />
                      1. Diagnostics Usage
                    </a>
                    <a href="#ip" className="flex items-center gap-2 text-xs font-medium text-[#4b5563] hover:text-[#113256] transition">
                      <Award className="w-3.5 h-3.5 text-[#3a7fc1]" />
                      2. Intellectual Property
                    </a>
                  </nav>
                </div>
              </div>

              {/* Main content pane */}
              <div className="md:col-span-8 space-y-6">
                {/* Introduction */}
                <div id="introduction" className="p-6 rounded-2xl content-card border">
                  <p className="text-[0.88rem] font-light leading-relaxed text-[#4b5563]">
                    Welcome to CYouMedia. By accessing or using our website, diagnostics tools, and organic AI visibility crawlers, you agree to comply with and be bound by the following terms and conditions of service.
                  </p>
                </div>

                {/* Section 1 */}
                <div id="use" className="p-6 rounded-2xl content-card border space-y-4">
                  <h2 className="text-xl font-light text-[#113256] font-['Instrument_Serif',Georgia,serif] flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-[#3a7fc1]" />
                    1. Use of Diagnostics Suite
                  </h2>
                  <p className="text-[0.88rem] font-light leading-relaxed text-[#4b5563]">
                    The CYouMedia website auditor is provided for educational and optimization evaluation purposes. You agree not to abuse the system by making high-frequency automated requests that could degrade API performance or restrict access for other community operators.
                  </p>
                </div>

                {/* Section 2 */}
                <div id="ip" className="p-6 rounded-2xl content-card border space-y-4">
                  <h2 className="text-xl font-light text-[#113256] font-['Instrument_Serif',Georgia,serif] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#3a7fc1]" />
                    2. Intellectual Property
                  </h2>
                  <p className="text-[0.88rem] font-light leading-relaxed text-[#4b5563]">
                    The CYouMedia logo, visual elements, scoring systems, and proprietary algorithms are protected by copyright and intellectual property rights. You agree not to reverse engineer or rebrand the diagnostic reporting structure without prior written authorization from the primary compliance division.
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
