
import Navbar from "@/components/Navbar";
import CmykStrip from "@/components/CmykStrip";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { FaTiktok } from "react-icons/fa6";

// JD Advertising Google Maps listing
const GOOGLE_MAPS_LINK =
  "https://maps.app.goo.gl/LFtWsan13nuwPiZR8";

// Exact business location
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
          {/* LEFT COLUMN - LOCATION */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-black/45">
              Who We Are
            </p>

            <div className="mt-8 max-w-[540px]">
              {/* GOOGLE MAP */}
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

          {/* RIGHT COLUMN - ABOUT INFORMATION */}
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

            {/* CONTACT & SOCIAL LINKS */}
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

                {/* TIKTOK */}
                <a
                  href="https://www.tiktok.com/@jdadvertising"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full border border-black/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition duration-300 hover:bg-black hover:text-white"
                >
                  <FaTiktok
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-[#ff0050]"
                  />
                  <span>TikTok</span>
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:jdadvertising97@gmail.com"
                  className="group flex items-center gap-3 rounded-full border border-black/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition duration-300 hover:bg-black hover:text-white"
                >
                  <FaEnvelope
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 transition-colors duration-300 group-hover:text-[#00aeef]"
                  />
                  <span>Email</span>
                </a>
              </div>

              {/* COMPLETE CONTACT DETAILS */}
              <div className="mt-8 border-t border-black/15">
                {/* HOT LINE */}
                <div className="grid grid-cols-[85px_minmax(0,1fr)] gap-4 border-b border-black/10 py-4 sm:grid-cols-[110px_minmax(0,1fr)]">
                  <span className="pt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-black/40">
                    Hot Line
                  </span>

                  <a
                    href="tel:+94912262430"
                    className="w-fit text-sm leading-6 text-black/70 transition-colors duration-300 hover:text-black"
                  >
                    091 2262 430
                  </a>
                </div>

                {/* MOBILE NUMBERS */}
                <div className="grid grid-cols-[85px_minmax(0,1fr)] gap-4 border-b border-black/10 py-4 sm:grid-cols-[110px_minmax(0,1fr)]">
                  <span className="pt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-black/40">
                    Mobile
                  </span>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-6 text-black/70">
                    <a
                      href="tel:+94754044966"
                      className="transition-colors duration-300 hover:text-black"
                    >
                      075 4044 966
                    </a>

                    <span className="text-black/25">/</span>

                    <a
                      href="tel:+94763971875"
                      className="transition-colors duration-300 hover:text-black"
                    >
                      076 397 1875
                    </a>
                  </div>
                </div>

                {/* EMAIL ADDRESS */}
                <div className="grid grid-cols-[85px_minmax(0,1fr)] gap-4 border-b border-black/10 py-4 sm:grid-cols-[110px_minmax(0,1fr)]">
                  <span className="pt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-black/40">
                    Email
                  </span>

                  <a
                    href="mailto:jdadvertising97@gmail.com"
                    className="w-fit break-all text-sm leading-6 text-black/70 transition-colors duration-300 hover:text-black"
                  >
                    jdadvertising97@gmail.com
                  </a>
                </div>

                {/* FULL BUSINESS ADDRESS */}
                <div className="grid grid-cols-[85px_minmax(0,1fr)] gap-4 border-b border-black/10 py-4 sm:grid-cols-[110px_minmax(0,1fr)]">
                  <span className="pt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-black/40">
                    Address
                  </span>

                  <address className="max-w-md text-sm not-italic leading-6 text-black/70">
                    JD Advertising & Digital Solutions,
                    <br />
                    1st Floor, Aluthwala Rd,
                    <br />
                    Meetiyagoda, Galle,
                    <br />
                    Sri Lanka 80250
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
