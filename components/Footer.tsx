
import Link from "next/link";
import CmykStrip from "@/components/CmykStrip";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { FaTiktok } from "react-icons/fa6";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "JD AI", href: "/assistant" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* CMYK LINE */}
      <CmykStrip />

      <div className="px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 border-b border-white/15 py-12 md:grid-cols-3 md:items-start">
            {/* JD ADVERTISING */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                JD Advertising
              </p>

              <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
                Creative design, printing, signage, branding and
                advertising solutions in Sri Lanka.
              </p>
            </div>

            {/* INFORMATION */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                Information
              </p>

              <nav
                aria-label="Footer navigation"
                className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4"
              >
                {footerLinks.map((item) => {
                  const isAI = item.href === "/assistant";

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex w-fit items-center gap-1.5 text-sm transition duration-300 hover:text-white ${
                        isAI
                          ? "text-[#00aeef]"
                          : "text-white/55"
                      }`}
                    >
                      {isAI && (
                        <span
                          aria-hidden="true"
                          className="text-xs"
                        >
                          ✦
                        </span>
                      )}

                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* CONNECT */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                Connect
              </p>

              <div className="mt-4 flex flex-col gap-4">
                {/* FACEBOOK */}
                <a
                  href="https://www.facebook.com/jdadvertising.galle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3 text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  <FaFacebookF
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-[#1877F2]"
                  />

                  <span>Facebook</span>
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/jd_advertising_galle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3 text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  <FaInstagram
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-[#E4405F]"
                  />

                  <span>Instagram</span>
                </a>

                {/* TIKTOK */}
                <a
                  href="https://www.tiktok.com/@jdadvertising"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3 text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  <FaTiktok
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-[#ff0050]"
                  />

                  <span>TikTok</span>
                </a>

                {/* WHATSAPP */}
                <a
                  href="https://wa.me/94754044966"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-3 text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  <FaWhatsapp
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-[#25D366]"
                  />

                  <span>WhatsApp</span>
                </a>

                {/* PHONE */}
                <a
                  href="tel:+94754044966"
                  className="group flex w-fit items-center gap-3 text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  <FaPhoneAlt
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 transition-colors duration-300 group-hover:text-[#00aeef]"
                  />

                  <span>+94 75 404 4966</span>
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:jdadvertising97@gmail.com"
                  className="group flex w-fit items-center gap-3 text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  <FaEnvelope
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-[#00aeef]"
                  />

                  <span className="break-all">
                    jdadvertising97@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
              © 2026 JD Advertising. All rights reserved.
            </p>

            <a
              href="https://famonesystems.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/30 transition duration-300 hover:text-white"
            >
              Developed by Famone Systems (Pvt) Ltd

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
