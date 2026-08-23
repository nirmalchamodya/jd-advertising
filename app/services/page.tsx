import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function ServicesPage() {
  return (
    <main className="bg-[#f2f0e9] text-black">
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
              Services
              <span className="text-white/35"> Built For Visibility.</span>
            </h1>

            <p className="mt-10 max-w-xl text-base leading-7 text-white/60">
              From design and digital printing to signage, stickers and
              finishing, JD Advertising provides practical production support
              for businesses of every size.
            </p>
          </div>
        </section>
      </div>

      <Services />
    </main>
  );
}