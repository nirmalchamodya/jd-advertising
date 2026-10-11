"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  {
    label: "Services",
    href: "/services",
    number: "01",
  },
  {
    label: "Work",
    href: "/work",
    number: "02",
  },
  {
    label: "About",
    href: "/about",
    number: "03",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  /*
   * Prevent the page behind the mobile menu
   * from scrolling while the menu is open.
   */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /*
   * Allow ESC key to close menu.
   */
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="absolute left-0 top-0 z-[100] w-full">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10 lg:px-14">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="relative z-[110] block w-[190px] md:w-[230px]"
          >
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

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="relative z-[110] flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white md:hidden"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>

            <span className="relative flex h-5 w-5 items-center justify-center">
              <span
                className={`absolute h-px w-5 bg-white transition-all duration-300 ${
                  menuOpen
                    ? "rotate-45"
                    : "-translate-y-[4px]"
                }`}
              />

              <span
                className={`absolute h-px w-5 bg-white transition-all duration-300 ${
                  menuOpen
                    ? "-rotate-45"
                    : "translate-y-[4px]"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Full Screen Navigation */}
      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-[90] bg-black text-white transition-all duration-500 md:hidden ${
          menuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Subtle Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 top-[20%] h-[350px] w-[350px] rounded-full bg-[#ec008c]/10 blur-[120px]" />

          <div className="absolute -left-24 bottom-[10%] h-[350px] w-[350px] rounded-full bg-[#00aeef]/10 blur-[120px]" />
        </div>

        <div className="relative flex min-h-[100dvh] flex-col px-6 pb-8 pt-32">
          {/* Eyebrow */}
          <div
            className={`mb-10 flex items-center gap-4 transition-all delay-100 duration-500 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <span className="h-px w-10 bg-white/40" />

            <p className="text-[10px] uppercase tracking-[0.35em] text-white/45">
              Navigation
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="border-t border-white/15">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`group flex items-end justify-between border-b border-white/15 py-7 transition-all duration-500 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen
                    ? `${150 + index * 70}ms`
                    : "0ms",
                }}
              >
                <div className="flex items-end gap-4">
                  <span className="pb-1 text-[9px] tracking-[0.25em] text-white/30">
                    {item.number}
                  </span>

                  <span className="text-[11vw] font-medium uppercase leading-[0.85] tracking-[-0.055em] text-white sm:text-5xl">
                    {item.label}
                  </span>
                </div>

                <span className="pb-1 text-xl text-white/45 transition duration-300 group-hover:translate-x-1 group-hover:text-white">
                  ↗
                </span>
              </Link>
            ))}
          </nav>

          {/* Start Project CTA */}
          <div
            className={`mt-10 transition-all duration-500 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen
                ? "380ms"
                : "0ms",
            }}
          >
            <Link
              href="/contact"
              onClick={closeMenu}
              className="group flex w-full items-center justify-between rounded-full border border-white/35 px-6 py-5 text-xs uppercase tracking-[0.25em] transition duration-300 hover:bg-white hover:text-black"
            >
              <span>Start a Project</span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>

          {/* Footer */}
          <div
            className={`mt-auto border-t border-white/15 pt-6 transition-all duration-500 ${
              menuOpen
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen
                ? "450ms"
                : "0ms",
            }}
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                  JD Advertising
                </p>

                <p className="mt-2 text-xs text-white/50">
                  Meetiyagoda · Sri Lanka
                </p>
              </div>

              <div className="flex items-center gap-1">
                <span className="h-1.5 w-6 bg-[#00aeef]" />
                <span className="h-1.5 w-6 bg-[#ec008c]" />
                <span className="h-1.5 w-6 bg-[#ffcb05]" />
                <span className="h-1.5 w-6 bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}