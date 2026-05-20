"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

/* ─── ICONS ─── */
const ArrowRight = () => (
  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
   CONTACT PAGE
════════════════════════════════════════ */
export default function ContactPage() {
  const [formState, setFormState] = useState({
    fullName: "",
    company: "",
    businessEmail: "",
    interest: "",
    message: ""
  });

  const interests = [
    "Strategic Expansion",
    "Digital Presence",
    "Elite Networking",
    "Full Partnership"
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append(
    "access_key",
    "357c54b1-bb84-4f71-bfc7-d2267faa4abd"
  );

  formData.append("name", formState.fullName);
  formData.append("company", formState.company);
  formData.append("email", formState.businessEmail);
  formData.append("message", formState.message);

  formData.append(
    "subject",
    "New CYouMedia Contact Form Submission"
  );

  try {
    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      toast.success("Message sent successfully!");

      setFormState({
        fullName: "",
        company: "",
        businessEmail: "",
        message: ""
      });
    } else {
      console.log(data);
      toast.error("Something went wrong.");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to send.");
  }
};

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };


  const locations = ["Sweden", "London", "USA", "Singapore", "Sri Lanka"];

  return (
    <>
    <Toaster />
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

        /* Input styling */
        .form-input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid #f1f5f9;
          background-color: #fafafa;
          padding: 1.1rem 1.25rem;
          font-size: 0.95rem;
          color: #0d2640;
          outline: none;
          transition: all 0.2s ease;
        }
        .form-input::placeholder {
          color: #cbd5e1;
          font-weight: 400;
        }
        .form-input:focus {
          border-color: #e2e8f0;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(241, 245, 249, 0.5);
        }
        .form-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
      `}</style>

      <div className="min-h-screen bg-[#f8fafc] font-['DM_Sans',sans-serif]">
        
        {/* ══════════════════════════════════
            HERO SECTION
        ══════════════════════════════════ */}
        <section className="noise relative overflow-hidden bg-[linear-gradient(160deg,#07172a_0%,#0d2640_100%)] pt-[clamp(6rem,10vh,8rem)] pb-[clamp(4rem,8vh,6rem)]">
          <div className="pointer-events-none absolute left-[10%] top-0 h-[600px] w-[800px] -translate-y-1/2 bg-[radial-gradient(circle,rgba(58,127,193,0.2)_0%,transparent_70%)]" />
          
          <div className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1rem,4vw,2rem)] text-left pt-15">
            <Reveal y={20}>
              <Eyebrow dark>Get In Touch</Eyebrow>
              <h1 className="mb-4 font-['DM_Sans',sans-serif] text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
                Let's start a <br />
                <p className="font-['DM_Sans',sans-serif] font-normal text-[#7bafd4]">
                  Conversation.
                </p>
              </h1>
              <p className="max-w-[500px] text-[clamp(1rem,1.5vw,1.15rem)] font-light leading-[1.75] text-white/60">
                Ready to optimize your digital presence? Reach out to our team to discover how we can drive your growth.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════
            CONTACT SECTION
        ══════════════════════════════════ */}
        <section className="px-[clamp(1.25rem,4vw,2rem)] py-[clamp(4rem,10vw,8rem)]">
          <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-[clamp(4rem,8vw,6rem)] lg:grid-cols-12">
            
            {/* Left Column: Contact Details */}
            <div className="lg:col-span-4 lg:pt-8">
              <Reveal>
                <h2 className="mb-6 font-['DM_Sans',sans-serif] text-[clamp(1.8rem,3vw,2.4rem)] font-light leading-[1.15] tracking-[-0.03em] text-[#0d2640]">
                  Contact <span className=" text-[#3a7fc1]">CYouMedia</span>
                </h2>
                <p className="mb-10 text-[1rem] font-light leading-[1.8] text-[#6b7280]">
                  Whether you need a complete digital overhaul, strategic SEO optimization, or advanced reputation management, we're here to help.
                </p>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-2xl bg-[#e8f0f8] text-[#3a7fc1]">
                      <MailIcon />
                    </div>
                    <div className="pt-1">
                      <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#94a3b8]">General Inquiries</p>
                      <a href="mailto:info@cyoumedia.lk" className="text-[1.05rem] font-medium text-[#0d2640] transition-colors hover:text-[#3a7fc1]">
                        info@cyoumedia.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-2xl bg-[#e8f0f8] text-[#3a7fc1]">
                      <MapPinIcon />
                    </div>
                    <div className="pt-1">
                      <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#94a3b8]">Address</p>
                      <p className="text-[1.05rem] font-medium text-[#0d2640] leading-snug">
                        Barkarbyvägen 46, <br />
                        177 44 , <br/> Järfälla
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Premium Form */}
            <Reveal delay={0.15} x={20} className="lg:col-span-8">
              <div className="rounded-[2.5rem] bg-white p-[clamp(2rem,5vw,4rem)] shadow-[0_12px_40px_rgba(7,23,42,0.03)] border border-[#f1f5f9]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  
                  {/* Row 1: Name & Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="form-label">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="form-label">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        placeholder="Enterprise Inc."
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email */}
                  <div>
                    <label htmlFor="businessEmail" className="form-label">Business Email</label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      value={formState.businessEmail}
                      onChange={handleChange}
                      placeholder="john@enterprise.com"
                      className="form-input"
                    />
                  </div>

                  
                  

                  {/* Row 4: Message */}
                  <div>
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your expansion or visibility goals..."
                      className="form-input resize-none"
                    />
                  </div>

                  {/* Submit Button & Footer */}
                  <div className="mt-4 flex flex-col items-center gap-6">
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0d2640] px-8 py-4 text-[0.95rem] font-bold tracking-[0.1em] uppercase text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#113254] hover:shadow-[0_12px_30px_rgba(13,38,64,0.2)]"
                    >
                      Reach Us <ArrowRight />
                    </button>
                    
                    <p className="text-[0.8rem] font-light text-[#94a3b8]">
                      We respond within 24 hours · No commitments required
                    </p>
                  </div>

                </form>
              </div>
            </Reveal>

          </div>
        </section>
      </div>
    </>
  );
}