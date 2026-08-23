import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10 lg:px-14">

        {/* JD Logo */}
        <Link href="/" className="relative block w-[190px] md:w-[230px]">
          <Image
            src="/assets/jd-logo-white.png"
            alt="JD Advertising"
            width={600}
            height={150}
            priority
            className="h-auto w-full object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] text-white/80 md:flex">

          <Link
            href="/services"
            className="transition duration-300 hover:text-white"
          >
            Services
          </Link>

          <Link
            href="/work"
            className="transition duration-300 hover:text-white"
          >
            Work
          </Link>

          <Link
            href="/about"
            className="transition duration-300 hover:text-white"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-white/40 px-5 py-3 transition duration-300 hover:bg-white hover:text-black"
          >
            Start a Project
          </Link>

        </nav>

        {/* Mobile Menu */}
        <button className="text-xs uppercase tracking-[0.2em] text-white md:hidden">
          Menu
        </button>

      </div>
    </header>
  );
}