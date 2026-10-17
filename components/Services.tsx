import { jdServices } from "@/data/jd-services";

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f2f0e9] px-6 py-24 text-[#090909] md:px-10 lg:px-14 lg:py-32"
    >
      {/* Decorative CMYK strip */}
      <div className="absolute left-0 top-0 flex h-[4px] w-full">
        <div className="w-1/4 bg-[#00aeef]" />
        <div className="w-1/4 bg-[#ec008c]" />
        <div className="w-1/4 bg-[#ffcb05]" />
        <div className="w-1/4 bg-black" />
      </div>

      <div className="mx-auto max-w-[1500px]">
        {/* Top heading */}
        <div className="grid gap-12 border-b border-black/20 pb-14 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-black/40" />

              <p className="text-xs uppercase tracking-[0.35em] text-black/50">
                What We Do
              </p>
            </div>

            <h2 className="max-w-5xl text-5xl font-semibold uppercase leading-[0.88] tracking-[-0.055em] md:text-7xl lg:text-[7rem]">
              Everything Your
              <br />
              Brand Needs
              <span className="text-black/25"> To Be Seen.</span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-md text-base leading-7 text-black/60">
              From a single business card to large-format signage, JD
              Advertising handles design, printing, production and finishing
              under one roof.
            </p>
          </div>
        </div>

        {/* Service list */}
        <div>
          {jdServices.map((service) => (
            <article
              key={service.number}
              className="group grid gap-8 border-b border-black/20 py-12 md:grid-cols-[70px_0.8fr_1.2fr] lg:gap-14 lg:py-16"
            >
              <div>
                <span className="text-xs font-medium tracking-[0.3em] text-black/35">
                  {service.number}
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-medium uppercase leading-none tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-2 md:text-4xl lg:text-5xl">
                  {service.title}
                </h3>
              </div>

              <div>
                {service.description && (
                  <p className="mb-7 max-w-xl text-sm leading-6 text-black/55 md:text-base md:leading-7">
                    {service.description}
                  </p>
                )}

                <div className="flex max-w-2xl flex-wrap gap-2">
                  {service.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/20 px-4 py-2 text-[10px] uppercase tracking-[0.17em] text-black/65 transition duration-300 group-hover:border-black/35"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="flex flex-col justify-between gap-8 pt-14 md:flex-row md:items-center">
          <p className="max-w-lg text-lg leading-7 text-black/70">
            Need something that isn&apos;t listed?
            <br />
            Tell us what you want to create.
          </p>

          <a
            href="/contact"
            className="group flex w-fit items-center gap-5 text-xs font-medium uppercase tracking-[0.25em]"
          >
            Discuss Your Project

            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/30 transition duration-300 group-hover:bg-black group-hover:text-white">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}