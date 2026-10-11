import Navbar from "@/components/Navbar";
import CmykStrip from "@/components/CmykStrip";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f2f0e9] text-black">
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

      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-14 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-black/45">
              Who We Are
            </p>
          </div>

          <div>
            <p className="max-w-2xl text-xl leading-8 text-black/70">
              JD Advertising provides design, digital printing, signage,
              stickers, business printing and finishing services for
              businesses and individuals.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-black/55">
              From everyday printed material to large-format promotional work,
              the focus is simple: practical creative solutions, reliable
              production and work that helps brands become more visible.
            </p>

            {/* Contact & Social Links */}
            <div className="mt-12 border-t border-black/20 pt-8">
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-black/40">
                Connect With Us
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+94754044966"
                  className="rounded-full border border-black/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition duration-300 hover:bg-black hover:text-white"
                >
                  Call ↗
                </a>

                <a
                  href="https://wa.me/94754044966"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-black/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition duration-300 hover:bg-black hover:text-white"
                >
                  WhatsApp ↗
                </a>

                <a
                  href="https://www.facebook.com/jdadvertising.galle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-black/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition duration-300 hover:bg-black hover:text-white"
                >
                  Facebook ↗
                </a>

                <a
                  href="https://www.instagram.com/jd_advertising_galle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-black/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/70 transition duration-300 hover:bg-black hover:text-white"
                >
                  Instagram ↗
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