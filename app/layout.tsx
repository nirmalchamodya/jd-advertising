import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jdadvertising.lk"),

  title: {
    default: "JD Advertising | Digital Solutions",
    template: "%s | JD Advertising",
  },

  description:
    "JD Advertising provides creative design, digital and offset printing, signage, branding, personalized printing and finishing services in Sri Lanka.",

  applicationName: "JD Advertising",

  keywords: [
    "JD Advertising",
    "advertising Sri Lanka",
    "printing Sri Lanka",
    "digital printing",
    "signage",
    "branding",
    "graphic design",
    "Meetiyagoda",
  ],

  openGraph: {
    title: "JD Advertising | Digital Solutions",
    description:
      "Creative design, printing, signage, branding and advertising solutions.",
    url: "https://www.jdadvertising.lk",
    siteName: "JD Advertising",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <Footer />
      </body>
    </html>
  );
}