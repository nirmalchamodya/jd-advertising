import Navbar from "@/components/Navbar";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto flex min-h-screen max-w-[1500px] items-end px-6 pb-20 pt-40 md:px-10 lg:px-14">
        <div className="w-full border-t border-white/20 pt-10">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/50">
            Selected Work
          </p>

          <h1 className="max-w-5xl text-6xl font-semibold uppercase leading-[0.88] tracking-[-0.055em] md:text-8xl lg:text-[8rem]">
            Work That
            <br />
            Gets Noticed.
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <p className="max-w-xl text-base leading-7 text-white/60">
              We&apos;re preparing a collection of selected JD Advertising
              projects across printing, signage, branding and creative
              production.
            </p>

            <p className="text-xs uppercase tracking-[0.25em] text-white/35">
              Portfolio Coming Soon
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}