export type JDService = {
  number: string;
  title: string;
  description: string;
  items: string[];
};

export const jdServices: JDService[] = [
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
    description:
      "Personalized printed products, gifts, cards, badges, and promotional items.",
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

export const jdServiceKnowledge = jdServices
  .map(
    (service) => `
${service.title}
${service.description}
Services/products:
${service.items.map((item) => `- ${item}`).join("\n")}
`
  )
  .join("\n");