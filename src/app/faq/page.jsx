import React from "react";

export const metadata = {
  title: "Frequently Asked Questions | CYouMedia",
  description: "CYouMedia frequently asked questions about GEO, SEO, and AI Search Optimization.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-36 pb-24 max-w-4xl mx-auto px-6 text-slate-350">
      <h1 className="text-4xl font-light font-['Outfit',sans-serif] tracking-tight text-white mb-8">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6 text-sm font-light leading-relaxed">
        <h2 className="text-xl font-medium text-white mt-8 mb-2">What is GEO?</h2>
        <p>
          GEO stands for Generative Engine Optimisation. It is the modern successor to SEO
          that focuses on making your business discoverable and highly cited inside
          large language model search platforms like ChatGPT, Gemini, Claude, and Perplexity.
        </p>
        <h2 className="text-xl font-medium text-white mt-8 mb-2">How does the Website Auditor work?</h2>
        <p>
          Our diagnostics pipeline checks your website's meta tags, robots configuration, sitemap structure, JSON-LD structured data, alt tags, and text-to-code ratios to verify if artificial intelligence crawlers are fully capable of reading, indexing, and recommending your brand.
        </p>
      </div>
    </div>
  );
}
