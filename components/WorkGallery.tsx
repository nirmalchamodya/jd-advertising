
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type WorkProject = {
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  aspect: string;
};

const projects: WorkProject[] = [
  {
    number: "01",
    title: "Zeno Salon",
    category: "Shopfront Branding",
    description:
      "Full-height salon storefront graphics with striking visual branding.",
    image: "/work/Zeno_Salon.jpeg",
    alt: "Zeno Salon glass storefront featuring large hairstyle graphics.",
    aspect: "aspect-[6/5]",
  },
  {
    number: "02",
    title: "NSBM & TIDAC Mugs",
    category: "Custom Mug Printing",
    description:
      "Personalized ceramic mugs featuring NSBM Green University Town and TIDAC conference branding.",
    image: "/work/IMG_0526.jpeg",
    alt: "White ceramic mugs printed with NSBM Green University Town and TIDAC conference logos.",
    aspect: "aspect-[3/2]",
  },
  {
    number: "03",
    title: "Caféla",
    category: "Menu Printing",
    description:
      "Printed coffee menus with an elegant green visual identity.",
    image: "/work/Cafela_Menu.jpeg",
    alt: "Caféla coffee menus arranged in a fan.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "04",
    title: "Tasty Hub",
    category: "Promotional Signage",
    description:
      "Freestanding restaurant advertising board featuring colourful food imagery and bold Sinhala typography.",
    image: "/work/IMG_9782.jpeg",
    alt: "Tasty Hub restaurant promotional display board with food photographs.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "05",
    title: "Capital Restaurant",
    category: "Restaurant Menu Design",
    description:
      "Kraft-style restaurant menu presentation featuring illustrated food graphics and distinctive typography.",
    image: "/work/capital_restaurant_menu_quality_100.jpeg",
    alt: "Capital Restaurant kraft-style menu covers featuring food illustrations.",
    aspect: "aspect-[3/2]",
  },
  {
    number: "06",
    title: "Fresh Fruit Juice",
    category: "Outdoor Advertising",
    description:
      "Colourful freestanding promotional signage highlighting fresh fruit juices and beverages.",
    image: "/work/IMG_9781.jpeg",
    alt: "Fresh Fruit Juice outdoor advertising board featuring colourful fruit drinks.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "07",
    title: "Citypak",
    category: "Commercial Branding",
    description:
      "Large-format storefront graphics for a courier service.",
    image: "/work/Citypak_courier.jpeg",
    alt: "Citypak courier storefront featuring promotional graphics.",
    aspect: "aspect-[5/4]",
  },
  {
    number: "08",
    title: "Teacher's Day Frames",
    category: "Personalized Printing",
    description:
      "Custom commemorative photo frames with personalized portraits and Teacher's Day greetings.",
    image: "/work/IMG_9530.jpeg",
    alt: "Collection of black-framed personalized Teacher's Day commemorative prints.",
    aspect: "aspect-[3/2]",
  },
  {
    number: "09",
    title: "Cinnamon Leaf Oil",
    category: "Product Labels & Packaging",
    description:
      "Botanical-inspired product label presentation combining natural colours and clear branding.",
    image: "/work/cinnamon_leaf_oil_quality_100.jpeg",
    alt: "Cinnamon leaf oil bottle featuring a green botanical product label.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "10",
    title: "Espresso Bloom",
    category: "Restaurant Menu Printing",
    description:
      "Spiral-bound restaurant menus with vibrant seafood imagery and full-colour printed covers.",
    image: "/work/IMG_9947.jpeg",
    alt: "Stack of Espresso Bloom spiral-bound restaurant food menus.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "11",
    title: "Emerald Resort",
    category: "Menu Printing",
    description:
      "Restaurant and beverage menu presentation with multilingual content.",
    image: "/work/Emerald_Menu.jpeg",
    alt: "Printed Emerald Resort food and beverage menu.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "12",
    title: "Lump Rice",
    category: "Food Advertising",
    description:
      "Printed promotional display board featuring Sri Lankan rice and curry dishes.",
    image: "/work/IMG_9864.jpeg",
    alt: "Black Lump Rice advertising board featuring Sri Lankan food photography.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "13",
    title: "The Dias Villa",
    category: "Exterior Signage",
    description:
      "Property name and number signage featuring raised lettering, a natural wood finish and integrated illumination.",
    image: "/work/the_dias_villa_quality_100.jpeg",
    alt: "The Dias Villa exterior sign with raised lettering and illuminated number 41.",
    aspect: "aspect-[3/2]",
  },
  {
    number: "14",
    title: "The Blue Crab",
    category: "Premium Menu Printing",
    description:
      "Kraft-style seafood restaurant menu covers with rustic twine binding and branded illustrations.",
    image: "/work/IMG_0015.jpeg",
    alt: "The Blue Crab Seafood Restaurant printed menus with kraft covers and twine bindings.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "15",
    title: "Amari",
    category: "Large-Format Printing",
    description:
      "Large-format promotional graphics captured during production.",
    image: "/work/Amari.jpeg",
    alt: "Large-format printing equipment producing Amari promotional graphics.",
    aspect: "aspect-square",
  },
  {
    number: "16",
    title: "Synergy x Red Lobster",
    category: "Event Banner Printing",
    description:
      "Large-format promotional banner for a live music event featuring Synergy Live Band and Red Lobster.",
    image: "/work/IMG_0153.jpeg",
    alt: "Printed Synergy Live Band and Red Lobster Friday Night Live Music promotional banner.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "17",
    title: "Wok & Bowl",
    category: "Restaurant Menu Design",
    description:
      "Black-and-yellow restaurant menu presentation featuring detailed food selections and bold visual styling.",
    image: "/work/wok_and_bowl_special_menu_quality_100.jpeg",
    alt: "Wok and Bowl restaurant special menu with black and yellow printed graphics.",
    aspect: "aspect-[3/2]",
  },
  {
    number: "18",
    title: "J.L.H. Beach Restaurant",
    category: "Restaurant Menu Boards",
    description:
      "Bold red printed menu boards displaying breakfast, lunch and dinner selections.",
    image: "/work/IMG_0202.jpeg",
    alt: "Two red J.L.H. Beach Restaurant printed menu boards.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "19",
    title: "Red Lobster",
    category: "Premium Menu Covers",
    description:
      "Textured black menu covers with embossed restaurant branding.",
    image: "/work/Red_Lobster.jpeg",
    alt: "Two embossed black Red Lobster menu covers.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "20",
    title: "Bravo Seafood Restaurant",
    category: "Embossed Menu Covers",
    description:
      "Premium textured menu covers featuring embossed seafood restaurant branding.",
    image: "/work/IMG_0306.jpeg",
    alt: "Two textured black Bravo Seafood Restaurant menu covers with embossed logos.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "21",
    title: "NSBM Sports Fiesta 2026",
    category: "Custom Awards & Recognition",
    description:
      "Commemorative award presentation featuring sports-themed graphics and personalized recognition details.",
    image: "/work/nsbm_sports_fiesta_award_quality_100.jpeg",
    alt: "NSBM Sports Fiesta 2026 commemorative award inside a clear presentation case.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "22",
    title: "Dodanduwa Diving Club",
    category: "Specialty Branding",
    description:
      "Custom printed marine-themed graphics for Dodanduwa Diving & Water Sports Club.",
    image: "/work/IMG_0489.jpeg",
    alt: "Colourful Dodanduwa Diving and Water Sports Club branded equipment with ocean graphics.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "23",
    title: "Salon Secret",
    category: "Glass Branding",
    description:
      "Salon entrance graphics combining photography and brand visuals.",
    image: "/work/Salon_Secret.jpeg",
    alt: "Salon Secret glass entrance with hairstyle advertising graphics.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "24",
    title: "Hikka Deep Blue",
    category: "Large-Format Printing",
    description:
      "Underwater-themed large-format promotional printing for Hikka Deep Blue Dive Center.",
    image: "/work/IMG_0411.jpeg",
    alt: "Large-format Hikka Deep Blue Dive Center promotional print featuring a diver and colourful marine life.",
    aspect: "aspect-[2/3]",
  },
  {
    number: "25",
    title: "Custom Photo Frames",
    category: "Personalized Printing",
    description:
      "Printed commemorative artwork presented in decorative frames.",
    image: "/work/Photo_print_frame.jpeg",
    alt: "Collection of framed commemorative photographs and artwork.",
    aspect: "aspect-[3/2]",
  },
];

export default function WorkGallery() {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const activeProject =
    activeIndex === null ? null : projects[activeIndex];

  function openLightbox(index: number) {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setActiveIndex(index);
  }

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    previousFocusRef.current?.focus();
  }, []);

  const nextProject = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current + 1) % projects.length
    );
  }, []);

  const previousProject = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + projects.length) % projects.length
    );
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextProject();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousProject();
      }

      // Keep keyboard focus inside the lightbox.
      if (event.key === "Tab" && dialogRef.current) {
        const buttons =
          dialogRef.current.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])"
          );

        if (buttons.length === 0) return;

        const first = buttons[0];
        const last = buttons[buttons.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeIndex,
    closeLightbox,
    nextProject,
    previousProject,
  ]);

  return (
    <>
      {/* PROJECT GALLERY */}
      <div className="pt-14">
        <div className="mb-10 flex items-center justify-between border-b border-black/15 pb-5">
          <p className="text-xs uppercase tracking-[0.25em] text-black/50">
            Project Collection
          </p>

          <p className="text-xs tabular-nums text-black/45">
            {String(projects.length).padStart(2, "0")} Projects
          </p>
        </div>

        {/* MASONRY GALLERY */}
        <div className="columns-1 gap-8 md:columns-2 lg:gap-12">
          {projects.map((project, index) => (
            <article
              key={project.number}
              className="group mb-12 break-inside-avoid lg:mb-16"
            >
              <button
                type="button"
                onClick={() => openLightbox(index)}
                aria-label={`View ${project.title} project image`}
                className="block w-full cursor-zoom-in text-left"
              >
                <div
                  className={`relative ${project.aspect} overflow-hidden bg-black/5`}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 1536px) 700px, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />

                  <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl text-black opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                    ↗
                  </span>
                </div>
              </button>

              {/* PROJECT DETAILS */}
              <div className="mt-5 flex items-start gap-5 border-t border-black/15 pt-5">
                <span className="shrink-0 pt-1 text-xs font-medium tracking-[0.2em] text-black/35">
                  {project.number}
                </span>

                <div className="flex-1">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.24em] text-black/45">
                    {project.category}
                  </p>

                  <h3 className="text-2xl font-semibold uppercase leading-tight tracking-[-0.04em] md:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-black/55">
                    {project.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-8 flex flex-col justify-between gap-8 border-t border-black/20 pt-10 md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-semibold uppercase tracking-[-0.04em]">
              Have a project in mind?
            </h3>

            <p className="mt-2 text-sm text-black/55">
              Tell us what you want to create.
            </p>
          </div>

          <Link
            href="/contact"
            className="group flex w-fit items-center gap-5 text-xs font-semibold uppercase tracking-[0.2em]"
          >
            Start a Project

            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/30 transition-all duration-300 group-hover:bg-black group-hover:text-white">
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX */}
      {activeProject && activeIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-lightbox-title"
          aria-describedby="work-lightbox-description"
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[#090909] text-white"
        >
          {/* HEADER */}
          <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 border-b border-white/15 px-5 py-4 md:px-10 md:py-5">
            <div className="min-w-0">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/40 md:text-[10px]">
                JD Advertising / Selected Work
              </p>

              <h2
                id="work-lightbox-title"
                className="truncate text-lg font-semibold uppercase tracking-[-0.03em] md:text-2xl"
              >
                {activeProject.title}
              </h2>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close image viewer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-2xl transition hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              ×
            </button>
          </div>

          {/* FULL-SCREEN IMAGE */}
          <div className="relative mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 items-center justify-center px-4 py-5 md:px-12 md:py-8">
            <div className="relative h-full w-full">
              <Image
                src={activeProject.image}
                alt={activeProject.alt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* LIGHTBOX FOOTER */}
          <div className="relative z-10 shrink-0 border-t border-white/15">
            <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-5 px-5 py-5 md:flex-row md:items-center md:px-10">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                  {activeProject.category}
                </p>

                <p
                  id="work-lightbox-description"
                  className="mt-2 max-w-2xl text-xs leading-5 text-white/65 md:text-sm"
                >
                  {activeProject.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-5 md:justify-end">
                <span className="text-xs tabular-nums tracking-[0.15em] text-white/55">
                  {String(activeIndex + 1).padStart(2, "0")}
                  <span className="mx-2 text-white/25">/</span>
                  {String(projects.length).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={previousProject}
                    aria-label="Previous project"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-lg transition hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={nextProject}
                    aria-label="Next project"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-lg transition hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CMYK ACCENT */}
          <div className="grid h-1 shrink-0 grid-cols-4">
            <div className="bg-[#00aeef]" />
            <div className="bg-[#ec008c]" />
            <div className="bg-[#ffcb05]" />
            <div className="bg-white" />
          </div>
        </div>
      )}
    </>
  );
}
