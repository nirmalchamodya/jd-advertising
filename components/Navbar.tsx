
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  {
    label: "Home",
    href: "/",
    number: "01",
  },
  {
    label: "Services",
    href: "/services",
    number: "02",
  },
  {
    label: "Work",
    href: "/work",
    number: "03",
  },
  {
    label: "About",
    href: "/about",
    number: "04",
  },
  {
    label: "JD AI",
    href: "/assistant",
    number: "05",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Lock background scrolling while mobile menu is open.
  // Restore the previous overflow value when closed.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      {/* HEADER */}
      <header className="absolute left-0 top-0 z-[100] w-full">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 md:px-10 lg:px-14">
          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="JD Advertising - Home"
            className="relative z-[110] block w-[190px] shrink-0 md:w-[210px] lg:w-[220px]"
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

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 text-[11px] uppercase tracking-[0.16em] text-white/80 lg:flex xl:gap-7"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isAI = item.href === "/assistant";

              if (isAI) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-3 font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      isActive
                        ? "border-[#00aeef] bg-[#00aeef]/15 text-white"
                        : "border-[#00aeef]/65 text-white hover:border-[#00aeef] hover:bg-[#00aeef]/15"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="text-sm text-[#00aeef]"
                    >
                      ✦
                    </span>

                    JD AI
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`shrink-0 transition duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                    isActive ? "text-white" : "text-white/75"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* MAIN CTA */}
            <Link
              href="/contact"
              aria-current={
                pathname === "/contact" ? "page" : undefined
              }
              className="shrink-0 rounded-full border border-white/40 px-5 py-3.5 text-center transition duration-300 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start a Project
            </Link>
          </nav>

          {/* MOBILE MENU TOGGLE */}
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
            className="relative z-[110] flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white lg:hidden"
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

      {/* MOBILE FULL-SCREEN NAVIGATION */}
      <div
        id="mobile-navigation"
        inert={!menuOpen}
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[90] overflow-y-auto bg-black text-white transition-all duration-500 lg:hidden ${
          menuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* BACKGROUND ACCENTS */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 top-[20%] h-[350px] w-[350px] rounded-full bg-[#ec008c]/10 blur-[120px]" />

          <div className="absolute -left-24 bottom-[10%] h-[350px] w-[350px] rounded-full bg-[#00aeef]/10 blur-[120px]" />
        </div>

        <div className="relative flex min-h-[100dvh] flex-col px-6 pb-8 pt-28 sm:px-10">
          {/* EYEBROW */}
          <div
            className={`mb-7 flex items-center gap-4 transition-all delay-100 duration-500 ${
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

          {/* MOBILE LINKS */}
          <nav
            aria-label="Mobile navigation"
            className="border-t border-white/15"
          >
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              const isAI = item.href === "/assistant";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex items-center justify-between border-b border-white/15 py-5 transition-all duration-500 sm:py-6 ${
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
                  <div className="flex items-center gap-4">
                    <span className="w-5 text-[9px] tracking-[0.25em] text-white/30">
                      {item.number}
                    </span>

                    <span
                      className={`text-[10vw] font-medium uppercase leading-none tracking-[-0.055em] sm:text-5xl ${
                        isAI
                          ? "text-[#00aeef]"
                          : "text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  <span
                    className={`text-xl transition duration-300 group-hover:translate-x-1 ${
                      isAI
                        ? "text-[#00aeef]"
                        : "text-white/45 group-hover:text-white"
                    }`}
                  >
                    ↗
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* MOBILE CTA */}
          <div
            className={`mt-8 transition-all duration-500 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen ? "500ms" : "0ms",
            }}
          >
            <Link
              href="/contact"
              onClick={closeMenu}
              className="group flex w-full items-center justify-between rounded-full border border-white/35 px-6 py-4 text-xs uppercase tracking-[0.2em] transition duration-300 hover:bg-white hover:text-black"
            >
              <span>Start a Project</span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>

          {/* FOOTER */}
          <div
            className={`mt-auto border-t border-white/15 pt-6 transition-all duration-500 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen ? "550ms" : "0ms",
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
