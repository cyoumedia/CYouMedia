import React from "react";

export const metadata = {
  title: "Privacy Policy | CYouMedia",
  description: "CYouMedia privacy policy and data governance standard practices.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-36 pb-24 max-w-4xl mx-auto px-6 text-slate-350">
      <h1 className="text-4xl font-light font-['Outfit',sans-serif] tracking-tight text-white mb-8">
        Privacy Policy
      </h1>
      <p className="text-sm font-light text-slate-400 mb-6 leading-relaxed">
        Last updated: May 2026
      </p>
      <div className="space-y-6 text-sm font-light leading-relaxed">
        <p>
          At CYouMedia, we are committed to safeguarding the privacy and security
          of our website visitors and clients. This privacy policy describes
          how we collect, use, and process your data when you interact with our
          online digital visibility suite.
        </p>
        <h2 className="text-xl font-medium text-white mt-8 mb-4">1. Data Collection</h2>
        <p>
          We do not collect any personal data when you submit URLs for website
          audit checks. All URL queries are processed live and are completely
          anonymous. When you contact us or request a custom diagnostic report,
          we collect your email address, business name, and domain URL to
          fulfill your request.
        </p>
        <h2 className="text-xl font-medium text-white mt-8 mb-4">2. Crawling and Auditing</h2>
        <p>
          Our diagnostics engine scrapes public robots.txt, sitemaps, semantic
          HTML, and Schema.org structures of queried domains. This operation is
          performed as a safe, automated technical audit utilizing standard
          scraping user agents.
        </p>
      </div>
    </div>
  );
}
