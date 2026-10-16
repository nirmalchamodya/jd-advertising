import Link from "next/link";
import CmykStrip from "@/components/CmykStrip";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* CMYK LINE */}
      <CmykStrip />

      <div className="px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 border-b border-white/15 py-12 md:grid-cols-3 md:items-start">
            {/* JD */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                JD Advertising
              </p>

              <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
                Creative design, printing, signage, branding and
                advertising solutions in Sri Lanka.
              </p>
            </div>

            {/* NAVIGATION */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                Information
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/services"
                  className="w-fit text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  Services
                </Link>

                <Link
                  href="/contact"
                  className="w-fit text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  Contact
                </Link>

                <Link
                  href="/privacy"
                  className="w-fit text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* SOCIAL */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                Connect
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="https://www.facebook.com/jdadvertising.galle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-2 text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  Facebook
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/jd_advertising_galle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-2 text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  Instagram
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>

                <a
                  href="https://wa.me/94754044966"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-2 text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  WhatsApp
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>

                <a
                  href="tel:+94754044966"
                  className="group flex w-fit items-center gap-2 text-sm text-white/55 transition duration-300 hover:text-white"
                >
                  +94 75 404 4966
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
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