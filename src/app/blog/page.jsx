import React from "react";

export const metadata = {
  title: "Blog & Insights | CYouMedia",
  description: "CYouMedia digital marketing, SEO, GEO, and AI visibility insights.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-36 pb-24 max-w-4xl mx-auto px-6 text-slate-350">
      <h1 className="text-4xl font-light font-['Outfit',sans-serif] tracking-tight text-white mb-8">
        Blog & Insights
      </h1>
      <div className="space-y-8 text-sm font-light leading-relaxed">
        <div className="border-b border-white/5 pb-6">
          <h2 className="text-xl font-medium text-white mb-2">The Rise of GEO: Beyond Traditional SEO</h2>
          <p className="text-xs text-slate-400 mb-3">Published: May 2026 · 5 min read</p>
          <p>
            Traditional search queries are shifting towards contextual generative AI engines. Learn how businesses can adapt sitemaps, semantic tags, and organization schema markup to survive and thrive in the era of ChatGPT and Gemini search recommendations.
          </p>
        </div>
        <div className="border-b border-white/5 pb-6">
          <h2 className="text-xl font-medium text-white mb-2">Schema Markup for AI Crawlers</h2>
          <p className="text-xs text-slate-400 mb-3">Published: April 2026 · 7 min read</p>
          <p>
            AI crawlers rely on clean structured data to map corporate entities and identify localized business parameters. We review the essential properties required to achieve flawless indexability status.
          </p>
        </div>
      </div>
    </div>
  );
}
