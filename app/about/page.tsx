import Navbar from "@/components/Navbar";

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
          </div>
        </div>
      </section>
    </main>
  );
}