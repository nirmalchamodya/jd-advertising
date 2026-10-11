const services = [
  {
    number: "01",
    title: "Creative Design",
    description:
      "Creative artwork and professional design solutions for businesses and individuals.",
    items: [
      "Graphic Designing",
      "Logo Design",
      "Business Card Design",
      "Flyer & Poster Design",
      "Banner & Sign Board Design",
      "Food Menu Design with Translation",
      "Social Media Post Design",
      "Brochure & Catalogue Design",
      "Vehicle Branding Design",
      "Packaging Artwork",
      "Photo Editing & Retouching",
      "Image Restoration",
      "Print-Ready Artwork Preparation",
    ],
  },
  {
    number: "02",
    title: "Digital Printing",
    description:
      "High-quality digital printing for advertising, promotions, events, and commercial applications.",
    items: [
      "Flex Banner Printing",
      "PVC Sticker Printing",
      "Transparent Sticker Printing",
      "One-Way Vision Printing",
      "Backlit Film Printing",
      "Backlit Flex Printing",
      "Canvas Printing",
      "Sandblast Sticker Printing",
      "Large Format Poster Printing",
      "Promotional Banner Printing",
      "Event & Exhibition Graphics",
      "Wall Sticker Printing",
      "Window Graphics Printing",
      "Vehicle Sticker Printing",
      "Custom Sticker Packs",
      "Product Label Printing",
      "Waterproof Sticker Printing",
    ],
  },
  {
    number: "03",
    title: "Offset Printing",
    description:
      "Professional printed materials for business communication, marketing, and publishing.",
    items: [
      "Business Cards",
      "Flyers & Handbills",
      "Posters",
      "Letterheads",
      "Bill Books",
      "Ticket Books",
      "Receipt Books",
      "Brochures",
      "Product Catalogues",
      "Calendars",
      "Envelopes",
      "Invitation Cards",
      "Wedding Invitation Cards",
      "Greeting Cards",
      "Certificates",
      "Book Printing",
      "Magazine Printing",
      "Leaflets",
      "Promotional Printed Materials",
    ],
  },
  {
    number: "04",
    title: "Signage & Display",
    description:
      "Custom signage and display products to improve business visibility.",
    items: [
      "Light Boards",
      "LED Light Boxes",
      "Name Boards",
      "Indoor Sign Boards",
      "Outdoor Sign Boards",
      "Flex Light Boards",
      "Acrylic Sign Boards",
      "Acrylic Letter Signs",
      "3D Letter Boards",
      "PVC Foam Board Signs",
      "Stand Boards",
      "X-Banners",
      "Roll-Up Stand Banners",
      "Promotional Display Boards",
      "Directional Signage",
      "Office Name Plates",
      "Shop Name Boards",
      "Reception Signs",
      "Safety & Warning Signs",
      "Event Backdrops",
      "Exhibition Displays",
      "Promotional Standees",
    ],
  },
  {
    number: "05",
    title: "Branding & Advertising",
    description:
      "Professional branding solutions that help businesses build recognition and attract customers.",
    items: [
      "Shopfront Glass Branding",
      "Vehicle Branding",
      "Car & Van Stickers",
      "Shopfront Advertising",
      "Sandblast Glass Branding",
      "Window Advertising Graphics",
      "Wall Branding",
      "Promotional Signage",
      "Office Branding",
      "Retail Shop Branding",
      "Product Branding",
      "Event Branding",
      "Indoor Promotional Graphics",
      "Outdoor Advertising Graphics",
      "Custom Advertising Displays",
    ],
  },
  {
    number: "06",
    title: "Printout & Finishing Services",
    description:
      "Convenient document printing and finishing services for students, offices, and businesses.",
    items: [
      "Colour Printouts",
      "Black-and-White Printouts",
      "Document Printing",
      "Photocopying",
      "A4 & A3 Printing",
      "Document Scanning",
      "Soft Laminating",
      "Hard Laminating",
      "Document Binding",
      "Spiral Binding",
      "Comb Binding",
      "Booklet Binding",
      "Paper Cutting",
      "Document Finishing",
      "Artwork Printing",
      "PDF Document Printing",
    ],
  },
  {
    number: "07",
    title: "Personalized Printing & Gifts",
    description: "",
    items: [
      "Photo Printing",
      "Photo Frames",
      "Custom Mug Printing",
      "Promotional Mugs",
      "Custom Key Tags",
      "PVC ID Cards",
      "Employee ID Cards",
      "Membership Cards",
      "Plastic Cards",
      "Name Badges",
      "Photo Gifts",
      "Event Souvenirs",
      "Promotional Gift Items",
      "Birthday & Anniversary Prints",
      "Certificates & Awards Prints",
    ],
  },
  {
    number: "08",
    title: "Sticker Cutting & Special Applications",
    description:
      "Precision cutting and specialized graphic applications for different surfaces and products.",
    items: [
      "Vinyl Sticker Cutting",
      "Custom Shape Sticker Cutting",
      "Logo Sticker Cutting",
      "Lettering Sticker Cutting",
      "Vehicle Lettering",
      "Glass Lettering",
      "Wall Lettering",
      "Window Decals",
      "Product Label Cutting",
      "Die-Cut Stickers",
      "Number & Letter Stickers",
      "Reflective Vinyl Cutting",
      "Sandblast Vinyl Cutting",
      "Sticker Application Services",
    ],
  },
];

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
          {services.map((service) => (
            <article
              key={service.number}
              className="group grid gap-8 border-b border-black/20 py-12 md:grid-cols-[70px_0.8fr_1.2fr] lg:gap-14 lg:py-16"
            >
              {/* Number */}
              <div>
                <span className="text-xs font-medium tracking-[0.3em] text-black/35">
                  {service.number}
                </span>
              </div>

              {/* Service title */}
              <div>
                <h3 className="text-3xl font-medium uppercase leading-none tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-2 md:text-4xl lg:text-5xl">
                  {service.title}
                </h3>
              </div>

              {/* Description and items */}
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