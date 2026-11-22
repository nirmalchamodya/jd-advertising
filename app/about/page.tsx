
import Navbar from "@/components/Navbar";
import CmykStrip from "@/components/CmykStrip";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

// JD Advertising's official Google Maps listing
const GOOGLE_MAPS_LINK =
  "https://maps.app.goo.gl/LFtWsan13nuwPiZR8";

// Exact business coordinates with a map marker
const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps?q=6.1893402%2C80.0985342&z=18&output=embed";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f2f0e9] text-black">
      {/* HERO */}
      <div className="bg-black text-white">
        <Navbar />

        <section className="mx-auto flex min-h-[70vh] max-w-[1500px] items-end px-6 pb-16 pt-40 md:px-10 lg:px-14">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/50">
              About JD Advertising
            </p>

            <h1 className="max-w-5xl text-6xl font-semibold uppercase leading-[0.88] tracking-[-0.055em] md:text-8xl lg:text-[8rem]">
              Creative Production
              <br />
              Made Practical.
            </h1>
          </div>
        </section>

        <CmykStrip />
      </div>

      {/* ABOUT CONTENT */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-14 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT COLUMN */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-black/45">
              Who We Are
            </p>

            <div className="mt-8 max-w-[540px]">
              {/* EXACT LOCATION MAP */}
              <div className="overflow-hidden border border-black/15 bg-white">
                <iframe
                  src={GOOGLE_MAPS_EMBED}
                  title="JD Advertising & Digital Solutions location"
                  className="block h-[280px] w-full sm:h-[320px] lg:h-[350px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* LOCATION DETAILS */}
              <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">
                    Find Us
                  </p>

                  <p className="mt-2 text-sm text-black/70">
                    Meetiyagoda, Sri Lanka
                  </p>
                </div>

                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border-b border-black/35 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-black/80 transition duration-300 hover:border-black hover:text-black"
                >
                  View Exact Location

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <p className="max-w-2xl text-xl leading-8 text-black/70">
              JD Advertising provides design, digital printing,
              signage, stickers, business printing and finishing
              services for businesses and individuals.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-black/55">
              From everyday printed material to large-format
              promotional work, the focus is simple: practical
              creative solutions, reliable production and work
              that helps brands become more visible.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-12 border-t border-black/20 pt-8">
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-black/40">
                Connect With Us
              </p>

              <div className="flex flex-wrap gap-3">
                {/* CALL */}
                <a
                  href="tel:+94754044966"
                  className="group flex items-center gap-3 rounded-full border border-black/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition duration-300 hover:bg-black hover:text-white"
                >
                  <FaPhoneAlt
                    aria-hidden="true"
                    className="h-3 w-3 shrink-0 transition-colors duration-300 group-hover:text-[#00aeef]"
                  />
                  <span>Call</span>
                </a>

                {/* WHATSAPP */}
                <a
                  href="https://wa.me/94754044966"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full border border-black/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition duration-300 hover:bg-black hover:text-white"
                >
                  <FaWhatsapp
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-[#25D366]"
                  />
                  <span>WhatsApp</span>
                </a>

                {/* FACEBOOK */}
                <a
                  href="https://www.facebook.com/jdadvertising.galle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full border border-black/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition duration-300 hover:bg-black hover:text-white"
                >
                  <FaFacebookF
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 transition-colors duration-300 group-hover:text-[#1877F2]"
                  />
                  <span>Facebook</span>
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/jd_advertising_galle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full border border-black/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition duration-300 hover:bg-black hover:text-white"
                >
                  <FaInstagram
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-[#E4405F]"
                  />
                  <span>Instagram</span>
                </a>
              </div>

              <p className="mt-5 text-sm text-black/50">
                +94 75 404 4966
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
