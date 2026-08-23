import Image from "next/image";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black">

      <HeroAnimation />

      {/* Background Image */}
      <div className="absolute inset-0">

        <Image
          src="/assets/hero-bg.jpg"
          alt="JD Advertising creative workspace"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Left-side darkness for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />

        {/* Bottom cinematic fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />

      </div>

      {/* Decorative Line */}
      <div className="absolute left-6 top-1/2 hidden h-px w-24 bg-white/20 lg:block" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-16 pt-36 md:px-10 md:pb-20 lg:px-14 lg:pb-24">

        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-4">

          <span className="h-px w-10 bg-white/50" />

          <p className="hero-eyebrow text-xs uppercase tracking-[0.35em] text-white/70">
            Creative Advertising & Production
          </p>

        </div>

        {/* Main Heading */}
        <h1 className="max-w-[1250px] text-[14vw] font-semibold uppercase leading-[0.82] tracking-[-0.06em] sm:text-[11vw] lg:text-[8.5vw]">

          <span className="block overflow-hidden">
            <span className="hero-line block text-white">
              We Make
            </span>
          </span>

          <span className="block overflow-hidden">
            <span className="hero-line block text-white/50">
              Brands
            </span>
          </span>

          <span className="block overflow-hidden">
            <span className="hero-line block text-white">
              Impossible
            </span>
          </span>

          <span className="block overflow-hidden">
            <span className="hero-line block text-white">
              To Ignore
            </span>
          </span>

        </h1>

        {/* Bottom Area */}
        <div className="hero-bottom mt-12 flex flex-col justify-between gap-8 border-t border-white/25 pt-7 md:flex-row md:items-end">

          <p className="max-w-md text-sm leading-6 text-white/65 md:text-base">
            Signage, printing, branding and creative production designed to
            make businesses visible.
          </p>

          <a
            href="#work"
            className="group flex w-fit items-center gap-5 text-xs uppercase tracking-[0.25em] text-white"
          >
            Explore Our Work

            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 transition duration-300 group-hover:bg-white group-hover:text-black">
              ↓
            </span>

          </a>

        </div>

      </div>

      {/* Location */}
      <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.4em] text-white/40 xl:block">
        Meetiyagoda · Sri Lanka
      </div>

    </section>
  );
}