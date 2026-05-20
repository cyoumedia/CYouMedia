"use client";

import { motion } from "framer-motion";

/* ─── ICONS ─── */
const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const Check = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const EASE = [0.16, 1, 0.3, 1];

const Reveal = ({ children, delay = 0, className = "", x = 0, y = 24 }) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, dark = false }) => (
  <div
    className={`inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 ${
      dark ? "text-[#7bafd4]" : "text-[#3a7fc1]"
    }`}
  >
    <span className={`w-5 h-px ${dark ? "bg-[#7bafd4]/50" : "bg-[#3a7fc1]/40"}`} />
    {children}
  </div>
);

const detailedServices = [
  {
    number: "01",
    eyebrow: "Core Service",
    title: "SEO + GEO + AI Visibility",
    subtitle: "Get found on Google, on maps, and inside AI engines — simultaneously.",
    description: "Search has split into three lanes: traditional Google search, local map results, and AI answer engines like ChatGPT, Perplexity, and Gemini. We optimize your business for all three at once — so no matter where your customers are searching, you're the answer they find.",
    image: "/geo.png",
    reverse: false,
    deepDives: [
      {
        title: "Algorithmic Local SEO",
        body: "We optimize your site architecture for location-based intent, using AI to continuously refine your structured data so you rank exactly where nearby customers are looking.",
      },
      {
        title: "AI Engine Optimization (GEO)",
        body: "ChatGPT and Perplexity answer questions from their own indexes. We structure your content, metadata, and schema so AI engines quote and recommend your business over competitors.",
      },
      {
        title: "Structured Data, Meta & Schema — All Perfect",
        body: "We implement every technical signal search and AI engines use to evaluate your authority — from Open Graph tags to JSON-LD schema — so nothing is left on the table.",
      },
    ],
  },
  {
    number: "02",
    eyebrow: "Core Service",
    title: "AI Website Transformation",
    subtitle: "We don't redesign your site. We rebuild its entire engine.",
    description: "Most agencies give you a new coat of paint. We go deeper. Our proprietary AI analyzes your existing website, preserves your exact brand identity, and completely rebuilds the technical infrastructure underneath — turning it into a fast, modern, AI-ready machine that performs at the highest level.",
    image: "/aivisifinal.png",
    reverse: true,
    deepDives: [
      {
        title: "Lighthouse 90+ Performance Scores",
        body: "We target perfect scores across Performance, Accessibility, Best Practices, and SEO — not just improvements, but maxed-out results that put your site in the top tier of the internet.",
      },
      {
        title: "Future-Proofed Technical Foundation",
        body: "Schema.org structured data, semantic HTML5, and full AI crawler access — your site is built for how search and AI discovery work today and for whatever comes next.",
      },
      {
        title: "Lightning-Fast Edge Hosting",
        body: "Every second of load time costs you business. We deploy on modern, lightweight frameworks to the edge, ensuring near-instant load times for visitors anywhere in the world.",
      },
    ],
  },
  {
    number: "03",
    eyebrow: "Core Service",
    title: "Reputation Management",
    subtitle: "Your reputation is your revenue. We protect and grow it.",
    description: "In any service business, what people say about you online determines whether a potential customer books or walks away. We deploy intelligent, automated systems to multiply your positive reviews, respond to feedback with care, and ensure your brand signal stays strong across every platform that matters.",
    image: "/repu.png",
    reverse: false,
    deepDives: [
      {
        title: "Omnichannel Review Monitoring",
        body: "We centralize your feedback from Google, TripAdvisor, Yelp, and OTA platforms into one dashboard — so you always know what's being said and can respond fast.",
      },
      {
        title: "Automated Review Generation",
        body: "After a great experience, your satisfied customers get a well-timed, friendly prompt to leave a review. More genuine reviews, more trust, more bookings — on autopilot.",
      },
      {
        title: "Crisis Mitigation & Professional Response",
        body: "Negative reviews happen. We provide de-escalating response frameworks that resolve the issue and demonstrate your exceptional care to every future reader who sees it.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        .noise::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
          z-index: 1;
        }
        .ai-badge {
          background: linear-gradient(135deg, rgba(58,127,193,0.12) 0%, rgba(123,175,212,0.08) 100%);
          border: 1px solid rgba(58,127,193,0.25);
        }
      `}</style>

      <div className="min-h-screen bg-[#f8fafc] font-['DM_Sans',sans-serif]">

        {/* ══ HERO ══ */}
        <section className="noise relative overflow-hidden bg-[linear-gradient(160deg,#07172a_0%,#0d2640_100%)] pt-[clamp(6rem,10vh,8rem)] pb-[clamp(4rem,8vh,6rem)]">
          <div className="pointer-events-none absolute left-[10%] top-0 h-[600px] w-[800px] -translate-y-1/2 bg-[radial-gradient(circle,rgba(58,127,193,0.2)_0%,transparent_70%)]" />
          <div className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1rem,4vw,2rem)] text-left pt-15">
            <Eyebrow dark>What We Do</Eyebrow>
            <Reveal y={20}>
              <h1 className="mb-6 font-['DM_Sans',sans-serif] text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
                <p className="font-['DM_Sans',sans-serif] font-normal">
                  One Partner. <span className="text-[#7bafd4]">Every Digital Need.</span>
                </p>
              </h1>
              <p className="max-w-[600px] text-[clamp(1rem,1.5vw,1.15rem)] font-light leading-[1.75] text-white/60">
                We don't just build websites — we engineer complete digital ecosystems powered by our proprietary AI. Every service we offer works together to make your business impossible to miss online.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══ DEEP DIVE SERVICES ══ */}
        <section className="px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,9rem)]">
          <div className="mx-auto max-w-[1200px] flex flex-col gap-[clamp(6rem,12vw,10rem)]">
            {detailedServices.map((service, idx) => (
              <div
                key={idx}
                className={`flex flex-col gap-[clamp(3rem,6vw,5rem)] items-start ${
                  service.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                {/* Sticky left/right side */}
                <div className="w-full lg:w-[45%] lg:sticky lg:top-[120px]">
                  <Reveal x={service.reverse ? 30 : -30}>
                    <span className="mb-4 block font-['DM_Sans',sans-serif] text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#3a7fc1]/80">
                      {service.eyebrow} · {service.number}
                    </span>
                    <h2 className="mb-4 font-['DM_Sans',sans-serif] text-[clamp(2rem,3vw,2.75rem)] font-light leading-[1.15] tracking-[-0.03em] text-[#0d2640]">
                      {service.title}
                    </h2>
                    <p className="mb-6 text-[1.1rem] font-medium tracking-[0.01em] text-[#3a7fc1]">
                      {service.subtitle}
                    </p>
                    <p className="mb-8 text-[0.95rem] font-light leading-[1.8] text-[#6b7280]">
                      {service.description}
                    </p>
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-[#e5e9ef] bg-white shadow-[0_8px_30px_rgba(7,23,42,0.04)]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </Reveal>
                </div>

                {/* Feature cards */}
                <div className="w-full lg:w-[55%] flex flex-col gap-6 lg:pt-[100px]">
                  {service.deepDives.map((feature, fIdx) => (
                    <Reveal key={fIdx} delay={fIdx * 0.1} y={30} x={service.reverse ? -20 : 20}>
                      <div className="group rounded-[1.5rem] border border-[#e5e9ef] bg-white p-[clamp(2rem,4vw,3rem)] transition-all duration-300 hover:border-[#3a7fc1]/30 hover:shadow-[0_12px_40px_rgba(58,127,193,0.08)]">
                        <div className="mb-5 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#f1f5f9] text-[#3a7fc1] transition-colors group-hover:bg-[#3a7fc1] group-hover:text-white">
                          <Check />
                        </div>
                        <h3 className="mb-4 text-[1.35rem] font-normal leading-[1.3] text-[#0d2640]">
                          {feature.title}
                        </h3>
                        <p className="text-[0.95rem] font-light leading-[1.75] text-[#6b7280]">
                          {feature.body}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ ALSO AVAILABLE ══ */}
        <section className="px-[clamp(1.25rem,4vw,2rem)] pb-[clamp(5rem,10vw,9rem)]">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <div className="rounded-[1.5rem] border border-[#e5e9ef] bg-white p-[clamp(2rem,4vw,3.5rem)]">
                <Eyebrow>Also Available</Eyebrow>
                <h3 className="mb-8 text-[1.5rem] font-light tracking-[-0.02em] text-[#0d2640]">
                  Everything else your digital presence needs — under one roof.
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {["Premium Hosting", "Custom Web Development", "Digital Marketing Tools"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-[#e5e9ef] p-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#e8f0f8] text-[#3a7fc1]">
                        <Check />
                      </div>
                      <span className="text-[0.95rem] font-medium text-[#0d2640]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}