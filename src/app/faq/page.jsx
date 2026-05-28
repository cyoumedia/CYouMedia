"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ChevronDown,
  Zap,
  Cpu,
  Globe,
  Activity,
  ArrowRight,
  Sparkles,
  BookOpen
} from "lucide-react";

const FAQ_ITEMS = [
  {
    category: "General Concepts",
    icon: Globe,
    q: "What is GEO (Generative Engine Optimization)?",
    a: "GEO is the next generation of search engine optimization designed specifically for large language models (LLMs) and conversational AI engines. Traditional SEO optimizes for static link lists on Google. GEO optimizes for citation authority, semantic context, and structured data, ensuring that engines like ChatGPT, Gemini, Claude, and Perplexity understand and explicitly cite your business as a primary recommendation."
  },
  {
    category: "General Concepts",
    icon: Globe,
    q: "How does GEO differ from traditional SEO?",
    a: "Traditional SEO focuses heavily on keyword density, backlink quantity, and meta titles to rank high on traditional search pages. GEO focuses on entity clarity, answer readiness, high citation coverage, and structured semantic layers. Instead of just getting users to click a link, GEO ensures that AI search engines summarize your business details directly in their conversational answers."
  },
  {
    category: "Audit Mechanics",
    icon: Cpu,
    q: "How does the CYouMedia Auditor calculate the GEO score?",
    a: "Our diagnostics pipeline evaluates your domain across 9 Core Technical Visibility signals. We check robots.txt allow-lists (ensuring AI crawlers aren't blocked), JSON-LD structural schemas, semantic HTML5 tags (to assist text parsing), text-to-code ratios, internal link density, viewport layouts, XML sitemaps, and alt tag coverage. These signals are weighted by AI search engine ranking impact to calculate your overall GEO score."
  },
  {
    category: "Audit Mechanics",
    icon: Activity,
    q: "Why are some metrics marked as 'Offline' or 'N/A'?",
    a: "If the Google PageSpeed Insights (Lighthouse) API is temporarily offline, rate-limited, or blocked by local firewalls, our Auditor switches to a graceful fault-tolerant fallback mode. In this state, core performance categories show 'Offline' rather than displaying fake/misleading numbers, while all local manual signals remain fully functional and scored with 100% precision."
  },
  {
    category: "Business Impact",
    icon: Zap,
    q: "How fast can I expect my AI visibility scores to increase?",
    a: "Technical optimizations (such as valid JSON-LD tags, XML sitemaps, and robots.txt allow-lists) are indexed by search crawlers almost immediately—often within 48 to 72 hours. Once crawlers index the updated structured semantic data, AI engines will begin referencing your brand as a structured entity in recommendations."
  },
  {
    category: "Business Impact",
    icon: Zap,
    q: "Can this be integrated with any React or Next.js project?",
    a: "Absolutely. Our optimization recommendations are framework-agnostic. Whether you use Next.js App Router, Gatsby, Astro, WordPress, or custom layouts, you can easily implement these technical visibility changes using standard metadata configs and structured scripts."
  }
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "General Concepts", "Audit Mechanics", "Business Impact"];

  const filteredItems = FAQ_ITEMS.filter(
    (item) => filter === "All" || item.category === filter
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        
        .faq-root {
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
        .accordion-item {
          background: white;
          border: 1px solid #e5e9ef;
          box-shadow: 0 4px 20px rgba(17,50,86,0.02);
        }
      `}</style>

      <div className="faq-root min-h-screen relative overflow-hidden pb-32">
        {/* ── HERO BANNER (DEEP BLUE BACKGROUND FOR NAVBAR CONTRAST) ── */}
        <section className="relative overflow-hidden bg-[#113256] text-white pt-44 pb-24 border-b border-white/5">
          {/* Ambient overlays */}
          <div className="absolute inset-0 grid-fade-dark pointer-events-none opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(58,127,193,0.12)_0%,transparent_75%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-1.5 bg-[#3a7fc1]/20 text-[#7bafd4] text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Optimization Hub
            </span>
            <h1 className="font-['Instrument_Serif',Georgia,serif] text-[clamp(2.5rem,6vw,3.8rem)] font-light leading-none tracking-tight text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="max-w-xl mx-auto text-[0.95rem] font-light leading-relaxed text-[#7bafd4]/80">
              Everything you need to know about Generative Engine Optimization, structured indexing schema, and how to get recommended by AI systems.
            </p>
          </div>
        </section>

        {/* ── ACCORDION LIST SECTION (LIGHT BACKGROUND DESIGN) ── */}
        <section className="relative z-10 py-16 bg-[#f8fafc]">
          <div className="absolute inset-0 grid-fade-light pointer-events-none opacity-60" />
          
          <div className="max-w-4xl mx-auto px-6">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setOpenIdx(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer ${
                    filter === cat
                      ? "bg-[#113256] text-white border-[#113256] shadow-sm"
                      : "bg-white text-[#6b7280] border-[#e5e9ef] hover:text-[#113256] hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion Container */}
            <div className="space-y-4">
              {filteredItems.map((item, idx) => {
                const isOpen = openIdx === idx;
                const Icon = item.icon;

                return (
                  <div
                    key={idx}
                    className="rounded-2xl accordion-item overflow-hidden transition-all duration-300 hover:border-[#3a7fc1]/30"
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                          isOpen ? "bg-[#3a7fc1]/10 border-[#3a7fc1]/20 text-[#3a7fc1]" : "bg-slate-50 border-[#e5e9ef] text-[#6b7280]"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider font-bold text-[#9ca3af] block mb-1">
                            {item.category}
                          </span>
                          <h3 className="text-[0.95rem] font-bold text-[#113256]">
                            {item.q}
                          </h3>
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[#9ca3af] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#113256]" : ""
                      }`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 pb-6 pt-1 text-[0.88rem] font-light leading-relaxed text-[#4b5563] border-t border-slate-50 ml-[50px] pr-8">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom Card CTA */}
            <div className="mt-16 rounded-3xl border border-[#e5e9ef] bg-[#113256] p-8 text-center relative overflow-hidden text-white shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(58,127,193,0.15)_0%,transparent_70%)] pointer-events-none" />
              <h3 className="text-2xl font-light text-white mb-2 font-['Instrument_Serif',Georgia,serif]">
                Still have questions about AI visibility?
              </h3>
              <p className="text-[#7bafd4] text-xs font-light max-w-md mx-auto mb-6 leading-relaxed">
                Our engineering team is ready to map your site parameters and build custom Schema architectures for your brand.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3a7fc1] hover:bg-[#4992d5] text-white text-xs font-bold transition shadow-md"
              >
                Contact Specialist <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
