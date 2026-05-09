import React from "react";
import { LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-[#ececec] bg-white">
      <div className="mx-auto max-w-[1180px] px-6 py-12">
        
        {/* Top */}
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          
          {/* Left Side */}
          <div className="max-w-[340px]">
            
            {/* Logo */}
            <img
              src="/logocym.jpg"
              alt="Cyoumedia Logo"
              className="mb-6 h-6 w-auto object-contain"
            />

            {/* Description */}
            <p className="text-[0.92rem] leading-[1.9] text-[#6b7280]">
              AI-powered websites, booking systems, payments, and
              digital infrastructure built for modern business growth.
            </p>

            
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-2 gap-14 sm:gap-20">
            
            {/* Services */}
            <div>
              <h3 className="mb-5 text-[0.9rem] font-medium text-black">
                Services
              </h3>

              <div className="flex flex-col gap-3">
                {[
                  "AI Powered Visibility",
                  "Reputation Management",
                ].map((item) => (
                  <span
                    key={item}
                    className="text-[0.9rem] text-[#6b7280]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-5 text-[0.9rem] font-medium text-black">
                Company
              </h3>

              <div className="flex flex-col gap-3">
                {[
                  ["Services", "/services"],
                  ["About", "/about"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="text-[0.9rem] text-[#6b7280] transition-colors duration-300 hover:text-black"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#ececec] pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          
          <p className="text-[0.8rem] text-[#9ca3af]">
            © {new Date().getFullYear()} CYOUMEDIA. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-5 sm:justify-end">
            <a
              href="#"
              className="text-[0.8rem] text-[#9ca3af] transition-colors duration-300 hover:text-black"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-[0.8rem] text-[#9ca3af] transition-colors duration-300 hover:text-black"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;