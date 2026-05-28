import React from "react";

export const metadata = {
  title: "Terms & Conditions | CYouMedia",
  description: "CYouMedia terms of service and usage conditions.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-36 pb-24 max-w-4xl mx-auto px-6 text-slate-350">
      <h1 className="text-4xl font-light font-['Outfit',sans-serif] tracking-tight text-white mb-8">
        Terms & Conditions
      </h1>
      <p className="text-sm font-light text-slate-400 mb-6 leading-relaxed">
        Last updated: May 2026
      </p>
      <div className="space-y-6 text-sm font-light leading-relaxed">
        <p>
          Welcome to CYouMedia. By accessing or using our website, diagnostics tools,
          and organic AI visibility crawlers, you agree to comply with and be bound by the following
          terms and conditions of service.
        </p>
        <h2 className="text-xl font-medium text-white mt-8 mb-4">1. Use of Diagnostics Suite</h2>
        <p>
          The CYouMedia website auditor is provided for educational and optimization
          evaluation purposes. You agree not to abuse the system by making high-frequency automated requests
          that could degrade API performance.
        </p>
        <h2 className="text-xl font-medium text-white mt-8 mb-4">2. Intellectual Property</h2>
        <p>
          The CYouMedia logo, visual elements, scoring systems, and proprietary algorithms are protected by copyright and intellectual property rights. You agree not to reverse engineer or rebrand the diagnostic reporting structure without prior written authorization.
        </p>
      </div>
    </div>
  );
}
