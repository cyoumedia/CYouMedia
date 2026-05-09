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

/* ─── EASING ─── */
const EASE = [0.16, 1, 0.3, 1];

/* ─── FADE-IN WRAPPER ─── */
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

/* ─── EYEBROW LABEL ─── */
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

/* ════════════════════════════════════════
   SERVICES DATA (Expanded)
════════════════════════════════════════ */
const detailedServices = [
  {
    number: "01",
    title: "AI-Powered Visibility",
    subtitle: "Turn your website into a high-performance booking engine.",
    description: "A beautiful website isn't enough if no one can find it. We rebuild your digital infrastructure from the ground up, blending cutting-edge design with AI-driven optimization to ensure maximum visibility and frictionless conversions.",
    image: "/aivisifinal.png",
    reverse: false,
    deepDives: [
      {
        title: "Algorithmic Local SEO",
        body: "We dominate local search intent. By optimizing your architecture for location-based queries and leveraging AI to update schema data, we ensure you rank exactly where your potential guests are looking.",
      },
      {
        title: "Frictionless Conversion Flow",
        body: "Traffic means nothing without bookings. We map out the user journey, removing friction points and implementing intuitive, mobile-first booking interfaces that guide users effortlessly to checkout.",
      },
      {
        title: "Lightning-Fast Edge Hosting",
        body: "Every second of load time costs you revenue. Our platforms are built on modern, lightweight frameworks deployed to the edge, guaranteeing near-instantaneous load times anywhere in the world.",
      }
    ]
  },
  {
    number: "02",
    title: "Reputation Management",
    subtitle: "Build bulletproof trust. Increase direct bookings.",
    description: "In the hospitality and service industry, your reputation is your revenue. We deploy automated systems and strategic oversight to multiply your positive reviews and neutralize negative feedback before it causes harm.",
    image: "/repu.png",
    reverse: true, // This flag will flip the layout for the second service
    deepDives: [
      {
        title: "Omnichannel Review Monitoring",
        body: "Never miss a comment. We centralize your feedback from Google, TripAdvisor, Yelp, and OTA platforms into a single dashboard, allowing for rapid, coordinated responses.",
      },
      {
        title: "Automated Review Generation",
        body: "We implement intelligent post-stay automated sequences that prompt your most satisfied guests to leave glowing reviews, naturally pushing down older, less favorable ratings.",
      },
      {
        title: "Crisis Mitigation Strategy",
        body: "Negative reviews happen. We provide professional, de-escalating response frameworks that not only solve the immediate issue but demonstrate your exceptional customer care to future readers.",
      }
    ]
  }
];

/* ════════════════════════════════════════
   SERVICES PAGE
════════════════════════════════════════ */
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
      `}</style>

      <div className="min-h-screen bg-[#f8fafc] font-['DM_Sans',sans-serif]">
        
        {/* ══════════════════════════════════
            INNER HERO (Shorter & Left-Aligned)
        ══════════════════════════════════ */}
        <section className="noise relative overflow-hidden bg-[linear-gradient(160deg,#07172a_0%,#0d2640_100%)] pt-[clamp(6rem,10vh,8rem)] pb-[clamp(4rem,8vh,6rem)]">
          {/* Ambient Glow moved to the left */}
          <div className="pointer-events-none absolute left-[10%] top-0 h-[600px] w-[800px] -translate-y-1/2 bg-[radial-gradient(circle,rgba(58,127,193,0.2)_0%,transparent_70%)]" />
          
          <div className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1rem,4vw,2rem)] text-left pt-15">
          <Eyebrow dark>Expertise</Eyebrow>
            <Reveal y={20}>
              <h1 className="mb-6 font-['DM_Sans',sans-serif] text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
                
                <em className="font-['DM_Sans',sans-serif] font-normal">
                 Our <span className="text-[#7bafd4]">Services</span>
                </em>
              </h1>
              <p className="max-w-[600px] text-[clamp(1rem,1.5vw,1.15rem)] font-light leading-[1.75] text-white/60">
                We don't just build websites; we engineer digital ecosystems that attract, convert, and retain your ideal customers. Dive into our core service methodologies below.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════
            DEEP DIVE SERVICES (Alternating Sticky Layout)
        ══════════════════════════════════ */}
        <section className="px-[clamp(1.25rem,4vw,2rem)] py-[clamp(5rem,10vw,9rem)]">
          <div className="mx-auto max-w-[1200px] flex flex-col gap-[clamp(6rem,12vw,10rem)]">
            
            {detailedServices.map((service, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col gap-[clamp(3rem,6vw,5rem)] items-start ${
                  service.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                
                {/* Image & Sticky Header Side */}
                <div className="w-full lg:w-[45%] lg:sticky lg:top-[120px]">
                  <Reveal x={service.reverse ? 30 : -30}>
                    <span className="mb-4 block font-['DM_Sans',sans-serif] text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#3a7fc1]/80">
                      Service {service.number}
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

                    {/* Service Main Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-[#e5e9ef] bg-white shadow-[0_8px_30px_rgba(7,23,42,0.04)]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </Reveal>
                </div>

                {/* Scrolling Feature Cards Side */}
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
      </div>
    </>
  );
}