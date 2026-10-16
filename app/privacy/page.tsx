import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CmykStrip from "@/components/CmykStrip";

export const metadata: Metadata = {
  title: "Privacy Policy",

  description:
    "Privacy Policy for JD Advertising regarding website enquiries, personal information and website security services.",

  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f2f0e9] text-black">
      {/* HERO */}
      <section className="bg-black text-white">
        <Navbar />

        <div className="mx-auto flex min-h-[58vh] max-w-[1500px] items-end px-6 pb-16 pt-40 md:px-10 md:pb-20 lg:px-14 lg:pb-24">
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-white/50" />

              <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                JD Advertising
              </p>
            </div>

            <h1 className="max-w-5xl text-6xl font-semibold uppercase leading-[0.88] tracking-[-0.055em] md:text-8xl lg:text-[8rem]">
              Privacy
              <br />
              <span className="text-white/35">
                Policy.
              </span>
            </h1>
          </div>
        </div>

        {/* CMYK LINE */}
        <CmykStrip />
      </section>

      {/* CONTENT */}
      <section className="px-6 py-20 md:px-10 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            {/* LEFT */}
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-black/40">
                Your Privacy
              </p>

              <p className="mt-6 max-w-sm text-base leading-7 text-black/55">
                JD Advertising respects the privacy of visitors
                and customers who contact us through this website.
              </p>

              <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-black/35">
                Last updated
              </p>

              <p className="mt-2 text-sm text-black/60">
                October 2026
              </p>
            </div>

            {/* POLICY */}
            <div className="max-w-3xl">
              <PolicySection
                number="01"
                title="Information We Collect"
              >
                <p>
                  When you submit an enquiry through the JD
                  Advertising website, we may collect information
                  such as your name, email address, telephone
                  number, company or brand name, the service you
                  are interested in and the information you include
                  in your project enquiry.
                </p>
              </PolicySection>

              <PolicySection
                number="02"
                title="How We Use Your Information"
              >
                <p>
                  Information submitted through this website is
                  used primarily to review your enquiry, contact
                  you regarding your project, provide information
                  about our services and communicate with you about
                  work you may wish to undertake with JD
                  Advertising.
                </p>
              </PolicySection>

              <PolicySection
                number="03"
                title="Website Security"
              >
                <p>
                  The contact form is protected using security
                  controls designed to reduce automated spam,
                  abuse and malicious submissions.
                </p>

                <p className="mt-5">
                  JD Advertising uses Cloudflare Turnstile for
                  security verification. As part of this process,
                  Cloudflare may process technical information
                  relating to a visitor&apos;s browser, device,
                  network connection or IP address in accordance
                  with Cloudflare&apos;s own privacy practices.
                </p>
              </PolicySection>

              <PolicySection
                number="04"
                title="Hosting & Technical Services"
              >
                <p>
                  This website is hosted using third-party
                  infrastructure and website services required to
                  operate, secure and deliver the website.
                </p>

                <p className="mt-5">
                  These service providers may process limited
                  technical information necessary to provide
                  hosting, security, email delivery and related
                  website functionality.
                </p>
              </PolicySection>

              <PolicySection
                number="05"
                title="Email Enquiries"
              >
                <p>
                  Information submitted through the website contact
                  form is delivered to JD Advertising by email so
                  that we can respond to your enquiry.
                </p>

                <p className="mt-5">
                  Please avoid submitting passwords, financial
                  account information or other highly sensitive
                  information through the general enquiry form.
                </p>
              </PolicySection>

              <PolicySection
                number="06"
                title="Sharing of Information"
              >
                <p>
                  JD Advertising does not sell personal information
                  submitted through this website.
                </p>

                <p className="mt-5">
                  Information may be processed by service providers
                  that support the operation, security, hosting or
                  communication functions of the website, or where
                  disclosure is required by law.
                </p>
              </PolicySection>

              <PolicySection
                number="07"
                title="Data Retention"
              >
                <p>
                  Enquiry information may be retained for as long
                  as reasonably necessary to respond to enquiries,
                  communicate with customers, maintain appropriate
                  business records and meet applicable legal or
                  operational requirements.
                </p>
              </PolicySection>

              <PolicySection
                number="08"
                title="External Links"
              >
                <p>
                  This website may contain links to third-party
                  websites or services, including Facebook,
                  Instagram, WhatsApp and other external platforms.
                  JD Advertising is not responsible for the privacy
                  practices or content of those third-party
                  services.
                </p>
              </PolicySection>

              <PolicySection
                number="09"
                title="Your Enquiries"
              >
                <p>
                  If you have a question about information you have
                  submitted through this website, you can contact
                  JD Advertising using the contact page or the
                  telephone and WhatsApp details provided on the
                  website.
                </p>

                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="rounded-full border border-black px-6 py-3 text-[10px] font-medium uppercase tracking-[0.23em] transition duration-300 hover:bg-black hover:text-white"
                  >
                    Contact JD Advertising ↗
                  </Link>

                  <a
                    href="https://wa.me/94754044966"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-black/25 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.23em] text-black/60 transition duration-300 hover:border-black hover:text-black"
                  >
                    WhatsApp ↗
                  </a>
                </div>
              </PolicySection>

              <PolicySection
                number="10"
                title="Changes to This Policy"
                last
              >
                <p>
                  JD Advertising may update this Privacy Policy
                  when website functionality, service providers or
                  privacy practices change. The latest version will
                  be published on this page.
                </p>
              </PolicySection>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PolicySection({
  number,
  title,
  children,
  last = false,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      className={`grid gap-6 py-10 md:grid-cols-[70px_1fr] ${
        last
          ? ""
          : "border-b border-black/15"
      }`}
    >
      <p className="text-[10px] uppercase tracking-[0.25em] text-black/30">
        {number}
      </p>

      <div>
        <h2 className="text-2xl font-semibold uppercase tracking-[-0.025em] md:text-3xl">
          {title}
        </h2>

        <div className="mt-5 text-base leading-7 text-black/60">
          {children}
        </div>
      </div>
    </section>
  );
}