
import Navbar from "@/components/Navbar";
import CmykStrip from "@/components/CmykStrip";
import WorkGallery from "@/components/WorkGallery";

export default function WorkPage() {
  return (
    <main className="bg-[#f2f0e9] text-black">
      {/* HERO */}
      <div className="relative bg-black">
        <Navbar />

        <section className="mx-auto flex min-h-[55vh] max-w-[1500px] items-end px-6 pb-16 pt-36 text-white md:px-10 lg:px-14 lg:pb-20">
          <div className="w-full">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-white/50" />

              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                JD Advertising
              </p>
            </div>

            <h1 className="max-w-5xl text-6xl font-semibold uppercase leading-[0.88] tracking-[-0.055em] md:text-8xl lg:text-[8rem]">
              Work That
              <span className="text-white/35">
                {" "}Gets Noticed.
              </span>
            </h1>

            <p className="mt-10 max-w-xl text-base leading-7 text-white/60">
              Explore selected JD Advertising projects across
              creative design, printing, signage, branding and
              custom advertising solutions.
            </p>
          </div>
        </section>
      </div>

      {/* CMYK DIVIDER */}
      <CmykStrip />

      {/* PORTFOLIO */}
      <section
        id="portfolio"
        className="bg-[#f2f0e9] px-6 py-24 text-[#090909] md:px-10 lg:px-14 lg:py-32"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 border-b border-black/20 pb-14 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-10 bg-black/40" />

                <p className="text-xs uppercase tracking-[0.35em] text-black/50">
                  Selected Projects
                </p>
              </div>

              <h2 className="max-w-5xl text-5xl font-semibold uppercase leading-[0.88] tracking-[-0.055em] md:text-7xl lg:text-[7rem]">
                Our Work.
                <span className="text-black/25">
                  {" "}Our Craft.
                </span>
              </h2>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-md text-base leading-7 text-black/60">
                A closer look at our creative and production
                work, from everyday printing to large-scale
                visual branding.
              </p>
            </div>
          </div>

          <WorkGallery />
        </div>
      </section>
    </main>
  );
}
