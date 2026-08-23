import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="mx-auto flex min-h-screen max-w-[1500px] items-end px-6 pb-20 pt-40 md:px-10 lg:px-14">
        <div className="w-full">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/50">
            Start A Project
          </p>

          <h1 className="max-w-5xl text-6xl font-semibold uppercase leading-[0.88] tracking-[-0.055em] md:text-8xl lg:text-[8rem]">
            Let&apos;s Make
            <br />
            Something Visible.
          </h1>

          <div className="mt-12 grid gap-10 border-t border-white/20 pt-10 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/35">
                Services
              </p>

              <p className="max-w-md text-base leading-7 text-white/65">
                Digital printing, signage, stickers, business printing,
                creative design and finishing services.
              </p>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/35">
                Get In Touch
              </p>

              <p className="max-w-md text-base leading-7 text-white/65">
                Contact details and direct WhatsApp enquiry options will be
                added here for the full website launch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}