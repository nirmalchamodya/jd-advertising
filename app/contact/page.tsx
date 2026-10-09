"use client";

import Navbar from "@/components/Navbar";
import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  website: string;
};

type SubmissionState = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
  website: "",
};

const serviceOptions = [
  "Digital Printing",
  "Signage",
  "Stickers & Graphics",
  "Business Printing",
  "Creative Design",
  "Finishing Services",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [submission, setSubmission] =
    useState<SubmissionState>({
      type: "idle",
      message: "",
    });

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (
      submission.type === "error" ||
      submission.type === "success"
    ) {
      setSubmission({
        type: "idle",
        message: "",
      });
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (submission.type === "loading") {
      return;
    }

    if (formData.name.trim().length < 2) {
      setSubmission({
        type: "error",
        message: "Please enter your name.",
      });
      return;
    }

    if (!formData.email.trim()) {
      setSubmission({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    if (!formData.service) {
      setSubmission({
        type: "error",
        message: "Please select a service.",
      });
      return;
    }

    if (formData.message.trim().length < 10) {
      setSubmission({
        type: "error",
        message:
          "Please tell us a little more about your project.",
      });
      return;
    }

    setSubmission({
      type: "loading",
      message: "Sending your enquiry...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      let result: {
        success?: boolean;
        message?: string;
      } = {};

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The server returned an unexpected response."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "We could not send your enquiry. Please try again."
        );
      }

      setFormData(initialFormData);

      setSubmission({
        type: "success",
        message:
          "Thank you. Your project enquiry has been received successfully.",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setSubmission({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#f2f0e9] text-[#090909]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <Navbar />

        <div className="mx-auto flex min-h-[72vh] max-w-[1500px] items-end px-6 pb-16 pt-40 md:px-10 md:pb-20 lg:px-14 lg:pb-24">
          <div className="w-full">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-white/50" />

              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                Start a Project
              </p>
            </div>

            <h1 className="max-w-[1250px] text-[14vw] font-semibold uppercase leading-[0.82] tracking-[-0.06em] sm:text-[11vw] lg:text-[8vw]">
              <span className="block text-white">
                Let&apos;s Make
              </span>

              <span className="block text-white/35">
                Something
              </span>

              <span className="block text-white">
                Impossible
              </span>

              <span className="block text-white">
                To Ignore.
              </span>
            </h1>

            <div className="mt-12 flex flex-col justify-between gap-8 border-t border-white/20 pt-7 md:flex-row md:items-end">
              <p className="max-w-xl text-sm leading-6 text-white/60 md:text-base md:leading-7">
                Tell us what you&apos;re planning. From a
                single print job to a complete advertising
                project, we&apos;ll help turn your idea into
                something people notice.
              </p>

              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Meetiyagoda · Sri Lanka
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[4px] w-full">
          <div className="w-1/4 bg-[#00aeef]" />
          <div className="w-1/4 bg-[#ec008c]" />
          <div className="w-1/4 bg-[#ffcb05]" />
          <div className="w-1/4 bg-white" />
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 py-24 md:px-10 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            {/* LEFT */}
            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-black/40" />

                <p className="text-xs uppercase tracking-[0.35em] text-black/45">
                  Your Project
                </p>
              </div>

              <h2 className="max-w-xl text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.055em] md:text-6xl lg:text-7xl">
                Tell Us
                <br />
                What You
                <br />
                <span className="text-black/25">
                  Need.
                </span>
              </h2>

              <p className="mt-8 max-w-md text-base leading-7 text-black/60">
                Give us a few details about the work you have
                in mind. We can then discuss the best
                production approach, requirements and next
                steps for your project.
              </p>

              <div className="mt-14 border-t border-black/20">
                <div className="grid grid-cols-[100px_1fr] gap-4 border-b border-black/20 py-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                    Location
                  </span>

                  <span className="text-sm text-black/75">
                    Meetiyagoda, Sri Lanka
                  </span>
                </div>

                <div className="grid grid-cols-[100px_1fr] gap-4 border-b border-black/20 py-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                    Services
                  </span>

                  <span className="text-sm leading-6 text-black/75">
                    Design · Printing · Signage · Graphics ·
                    Finishing
                  </span>
                </div>

                <div className="grid grid-cols-[100px_1fr] gap-4 border-b border-black/20 py-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                    Enquiry
                  </span>

                  <span className="text-sm leading-6 text-black/75">
                    Tell us what you want to create and
                    we&apos;ll take it from there.
                  </span>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div>
              <form
                onSubmit={handleSubmit}
                method="post"
                action="/api/contact"
              >
                {/* Honeypot */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="website">
                    Website

                    <input
                      id="website"
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                {/* NAME / EMAIL */}
                <div className="grid gap-10 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-3 block text-[10px] font-medium uppercase tracking-[0.28em] text-black/45"
                    >
                      Name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full border-0 border-b border-black/25 bg-transparent px-0 py-4 text-lg text-black outline-none transition placeholder:text-black/25 focus:border-black"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-3 block text-[10px] font-medium uppercase tracking-[0.28em] text-black/45"
                    >
                      Email *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full border-0 border-b border-black/25 bg-transparent px-0 py-4 text-lg text-black outline-none transition placeholder:text-black/25 focus:border-black"
                    />
                  </div>
                </div>

                {/* PHONE / COMPANY */}
                <div className="mt-10 grid gap-10 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-3 block text-[10px] font-medium uppercase tracking-[0.28em] text-black/45"
                    >
                      Phone
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      maxLength={30}
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94"
                      className="w-full border-0 border-b border-black/25 bg-transparent px-0 py-4 text-lg text-black outline-none transition placeholder:text-black/25 focus:border-black"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="mb-3 block text-[10px] font-medium uppercase tracking-[0.28em] text-black/45"
                    >
                      Company / Brand
                    </label>

                    <input
                      id="company"
                      name="company"
                      type="text"
                      maxLength={120}
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full border-0 border-b border-black/25 bg-transparent px-0 py-4 text-lg text-black outline-none transition placeholder:text-black/25 focus:border-black"
                    />
                  </div>
                </div>

                {/* SERVICE */}
                <div className="mt-10">
                  <label
                    htmlFor="service"
                    className="mb-3 block text-[10px] font-medium uppercase tracking-[0.28em] text-black/45"
                  >
                    Service *
                  </label>

                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full cursor-pointer border-0 border-b border-black/25 bg-transparent px-0 py-4 text-lg outline-none transition focus:border-black ${
                      formData.service
                        ? "text-black"
                        : "text-black/35"
                    }`}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>

                    {serviceOptions.map((service) => (
                      <option
                        key={service}
                        value={service}
                        className="bg-white text-black"
                      >
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MESSAGE */}
                <div className="mt-10">
                  <label
                    htmlFor="message"
                    className="mb-3 block text-[10px] font-medium uppercase tracking-[0.28em] text-black/45"
                  >
                    Tell Us About Your Project *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What would you like us to create?"
                    className="w-full resize-none border-0 border-b border-black/25 bg-transparent px-0 py-4 text-lg leading-7 text-black outline-none transition placeholder:text-black/25 focus:border-black"
                  />

                  <div className="mt-2 text-right text-[10px] tracking-[0.15em] text-black/35">
                    {formData.message.length} / 2000
                  </div>
                </div>

                {/* STATUS */}
                {submission.type !== "idle" && (
                  <div
                    role={
                      submission.type === "error"
                        ? "alert"
                        : "status"
                    }
                    aria-live="polite"
                    className={`mt-8 border-l-2 px-5 py-4 text-sm leading-6 ${
                      submission.type === "success"
                        ? "border-black bg-black/5 text-black"
                        : submission.type === "error"
                          ? "border-black bg-black/5 text-black"
                          : "border-black/30 bg-black/[0.03] text-black/60"
                    }`}
                  >
                    {submission.message}
                  </div>
                )}

                {/* SUBMIT */}
                <div className="mt-10 flex flex-col gap-5 border-t border-black/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-5 text-black/45">
                    By submitting this form, you&apos;re
                    sending your enquiry directly to JD
                    Advertising.
                  </p>

                  <button
                    type="submit"
                    disabled={submission.type === "loading"}
                    className="group flex w-fit items-center gap-5 rounded-full border border-black px-7 py-4 text-xs font-medium uppercase tracking-[0.23em] transition duration-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submission.type === "loading"
                      ? "Sending..."
                      : "Send Enquiry"}

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM */}
      <section className="bg-black px-6 py-20 text-white md:px-10 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-white/40" />

            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
              JD Advertising
            </p>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <h2 className="max-w-5xl text-5xl font-semibold uppercase leading-[0.88] tracking-[-0.055em] md:text-7xl lg:text-[7rem]">
              Your Idea.
              <br />

              <span className="text-white/30">
                Our Production.
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-6 text-white/50 md:text-base md:leading-7">
              Creative advertising and production designed
              to help businesses stand out where it matters.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}