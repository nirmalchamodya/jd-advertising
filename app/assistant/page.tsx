"use client";

import {
  FormEvent,
  KeyboardEvent,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Navbar from "@/components/Navbar";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ProjectBrief = {
  service: string | null;
  product: string | null;
  quantity: string | null;
  size: string | null;
  material: string | null;
  colour: string | null;
  sides: string | null;
  finish: string | null;
  artworkStatus: string | null;
  installationRequired: string | null;
  deadline: string | null;
  deliveryLocation: string | null;
  additionalNotes: string | null;
};

const briefLabels: Record<keyof ProjectBrief, string> = {
  service: "Service",
  product: "Product",
  quantity: "Quantity",
  size: "Size",
  material: "Material",
  colour: "Colour",
  sides: "Printing Sides",
  finish: "Finish",
  artworkStatus: "Artwork",
  installationRequired: "Installation",
  deadline: "Deadline",
  deliveryLocation: "Delivery / Location",
  additionalNotes: "Additional Notes",
};

const WHATSAPP_NUMBER = "94754044966";

function buildWhatsAppMessage(brief: ProjectBrief) {
  const lines = [
    "Hi JD Advertising,",
    "",
    "I used the JD AI Assistant and would like to request a quotation.",
    "",
    "PROJECT BRIEF",
  ];

  (
    Object.keys(briefLabels) as Array<keyof ProjectBrief>
  ).forEach((key) => {
    const value = brief[key];

    if (
      value &&
      typeof value === "string" &&
      value.trim().length > 0
    ) {
      lines.push(`${briefLabels[key]}: ${value.trim()}`);
    }
  });

  lines.push(
    "",
    "Please confirm the quotation, availability, and any additional information you require.",
    "",
    "Sent via JD Advertising AI Assistant"
  );

  return lines.join("\n");
}

function getWhatsAppUrl(brief: ProjectBrief) {
  const message = buildWhatsAppMessage(brief);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the JD Advertising AI Assistant. Tell me what you're looking to create, and I'll help you get started.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [brief, setBrief] =
    useState<ProjectBrief | null>(null);

  const [briefLoading, setBriefLoading] =
    useState(false);

  const [briefError, setBriefError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedMessage = input.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: trimmedMessage,
    };

    const updatedMessages: Message[] = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);
    setInput("");
    setError("");

    setBrief(null);
    setBriefError("");

    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Something went wrong."
        );
      }

      const assistantMessage: Message = {
        role: "assistant",
        content:
          data.reply ||
          "I couldn't generate a response.",
      };

      setMessages((previous) => [
        ...previous,
        assistantMessage,
      ]);
    } catch (err) {
      console.error(err);

      setError(
        "The assistant is temporarily unavailable. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (!loading && input.trim()) {
        event.currentTarget.form?.requestSubmit();
      }
    }
  }

  async function handlePrepareBrief() {
    if (
      messages.length <= 1 ||
      briefLoading
    ) {
      return;
    }

    setBriefLoading(true);
    setBriefError("");

    try {
      const response = await fetch(
        "/api/assistant/brief",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to prepare the project brief."
        );
      }

      setBrief(data.brief);
    } catch (err) {
      console.error(err);

      setBriefError(
        "The project brief could not be prepared. Please try again."
      );
    } finally {
      setBriefLoading(false);
    }
  }

  const completedBriefFields = brief
    ? Object.values(brief).filter(
        (value) =>
          value !== null &&
          typeof value === "string" &&
          value.trim().length > 0
      ).length
    : 0;

  const whatsappUrl = brief
    ? getWhatsAppUrl(brief)
    : null;

  return (
    <main className="bg-[#f2f0e9] text-black">
      {/* HERO */}
      <div className="relative bg-black">
        <Navbar />

        <section className="mx-auto flex min-h-[55vh] max-w-[1500px] items-end px-6 pb-16 pt-36 text-white md:px-10 lg:px-14 lg:pb-20">
          <div className="w-full">
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-white/50" />

              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                JD Advertising
              </p>
            </div>

            <h1 className="max-w-6xl text-6xl font-semibold uppercase leading-[0.88] tracking-[-0.055em] md:text-8xl lg:text-[8rem]">
              AI Assistant
              <span className="text-white/35">
                {" "}
                Built For Better Briefs.
              </span>
            </h1>

            <p className="mt-10 max-w-xl text-base leading-7 text-white/60">
              Describe what you need in your own words.
              JD AI helps clarify the job, collect useful
              project details and prepare your enquiry
              before our team confirms the final quotation.
            </p>
          </div>
        </section>

        <div className="grid h-1 grid-cols-4">
          <div className="bg-cyan-400" />
          <div className="bg-fuchsia-500" />
          <div className="bg-yellow-400" />
          <div className="bg-neutral-900" />
        </div>
      </div>

      {/* ASSISTANT SECTION */}
      <section className="mx-auto max-w-[1500px] px-6 py-20 md:px-10 lg:px-14 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.5fr] lg:items-start">
          {/* LEFT PANEL */}
          <aside className="lg:sticky lg:top-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-black/30" />

              <p className="text-xs uppercase tracking-[0.35em] text-black/50">
                How It Works
              </p>
            </div>

            <h2 className="max-w-md text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.045em] md:text-5xl">
              Tell us what you need.
            </h2>

            <p className="mt-6 max-w-md text-base leading-7 text-black/60">
              You do not need to know every technical
              detail. Start with the product, idea or
              outcome you have in mind.
            </p>

            <div className="mt-10">
              <div className="border-t border-black/15 py-6">
                <div className="flex gap-5">
                  <span className="text-sm font-semibold text-black/35">
                    01
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide">
                      Describe the requirement
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-black/55">
                      Tell JD AI whether you need printing,
                      signage, artwork, branding or another
                      advertising service.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/15 py-6">
                <div className="flex gap-5">
                  <span className="text-sm font-semibold text-black/35">
                    02
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide">
                      Clarify the details
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-black/55">
                      The assistant can help identify useful
                      information such as quantity, size,
                      materials, artwork and deadlines.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-y border-black/15 py-6">
                <div className="flex gap-5">
                  <span className="text-sm font-semibold text-black/35">
                    03
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide">
                      Human confirmation
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-black/55">
                      Final pricing, availability and project
                      confirmation are always handled by the
                      JD Advertising team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            {/* CHAT PANEL */}
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                    JD

                    <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      JD AI Assistant
                    </p>

                    <p className="mt-0.5 text-xs text-black/45">
                      Online · AI-assisted enquiries
                    </p>
                  </div>
                </div>

                <div className="hidden items-center gap-1.5 sm:flex">
                  <span className="h-1.5 w-5 rounded-full bg-cyan-400" />
                  <span className="h-1.5 w-5 rounded-full bg-fuchsia-500" />
                  <span className="h-1.5 w-5 rounded-full bg-yellow-400" />
                  <span className="h-1.5 w-5 rounded-full bg-neutral-900" />
                </div>
              </div>

              <div className="flex h-[650px] flex-col">
                <div className="flex-1 space-y-5 overflow-y-auto px-5 py-7 sm:px-7">
                  {messages.map(
                    (message, index) => {
                      const isUser =
                        message.role === "user";

                      return (
                        <div
                          key={`${message.role}-${index}`}
                          className={`flex ${
                            isUser
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {!isUser && (
                            <div className="mr-3 mt-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white sm:flex">
                              JD
                            </div>
                          )}

                          <div
                            className={`max-w-[88%] rounded-2xl px-4 py-3.5 text-sm leading-6 sm:max-w-[75%] ${
                              isUser
                                ? "rounded-br-md bg-black text-white"
                                : "rounded-bl-md bg-[#f2f0e9] text-black/75"
                            }`}
                          >
                            {isUser ? (
                              <p className="whitespace-pre-wrap">
                                {message.content}
                              </p>
                            ) : (
                              <ReactMarkdown
                                remarkPlugins={[
                                  remarkGfm,
                                ]}
                                components={{
                                  p: ({
                                    children,
                                  }) => (
                                    <p className="mb-3 last:mb-0">
                                      {children}
                                    </p>
                                  ),

                                  strong: ({
                                    children,
                                  }) => (
                                    <strong className="font-semibold text-black">
                                      {children}
                                    </strong>
                                  ),

                                  ul: ({
                                    children,
                                  }) => (
                                    <ul className="mb-3 ml-5 list-disc space-y-1.5 last:mb-0">
                                      {children}
                                    </ul>
                                  ),

                                  ol: ({
                                    children,
                                  }) => (
                                    <ol className="mb-3 ml-5 list-decimal space-y-1.5 last:mb-0">
                                      {children}
                                    </ol>
                                  ),

                                  li: ({
                                    children,
                                  }) => (
                                    <li className="pl-1">
                                      {children}
                                    </li>
                                  ),

                                  a: ({
                                    href,
                                    children,
                                  }) => (
                                    <a
                                      href={href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-medium underline underline-offset-2"
                                    >
                                      {children}
                                    </a>
                                  ),

                                  code: ({
                                    children,
                                  }) => (
                                    <code className="rounded bg-black/10 px-1.5 py-0.5 text-xs text-black">
                                      {children}
                                    </code>
                                  ),
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="mr-3 mt-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white sm:flex">
                        JD
                      </div>

                      <div className="rounded-2xl rounded-bl-md bg-[#f2f0e9] px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black/40" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black/40 [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black/40 [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-black/10 bg-white px-4 py-4 sm:px-6">
                  {error && (
                    <p className="mb-3 text-sm font-medium text-red-600">
                      {error}
                    </p>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="flex items-end gap-3"
                  >
                    <textarea
                      value={input}
                      onChange={(event) =>
                        setInput(
                          event.target.value
                        )
                      }
                      onKeyDown={handleKeyDown}
                      placeholder="Tell JD AI what you need..."
                      rows={1}
                      disabled={loading}
                      className="min-h-[54px] flex-1 resize-none rounded-2xl border border-black/20 bg-white px-4 py-3.5 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-black focus:ring-1 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    <button
                      type="submit"
                      disabled={
                        loading ||
                        !input.trim()
                      }
                      className="flex h-[54px] shrink-0 items-center justify-center rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Send
                    </button>
                  </form>

                  <div className="mt-4 flex flex-col gap-4 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-[11px] leading-5 text-black/35">
                      <p>
                        Enter to send · Shift + Enter
                        for a new line
                      </p>

                      <p>
                        AI-assisted · Human-confirmed
                        quotations
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handlePrepareBrief}
                      disabled={
                        messages.length <= 1 ||
                        loading ||
                        briefLoading
                      }
                      className="w-fit rounded-full border border-black/25 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      {briefLoading
                        ? "Preparing Brief..."
                        : "Prepare Project Brief"}
                    </button>
                  </div>

                  {briefError && (
                    <p className="mt-3 text-sm font-medium text-red-600">
                      {briefError}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid h-1 grid-cols-4">
                <div className="bg-cyan-400" />
                <div className="bg-fuchsia-500" />
                <div className="bg-yellow-400" />
                <div className="bg-neutral-900" />
              </div>
            </div>

            {/* PROJECT BRIEF */}
            {brief && (
              <section className="overflow-hidden rounded-[2rem] border border-black/10 bg-black text-white">
                <div className="border-b border-white/15 px-6 py-6 sm:px-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <div className="mb-4 flex items-center gap-4">
                        <span className="h-px w-8 bg-white/40" />

                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/45">
                          Current Project Summary
                        </p>
                      </div>

                      <h3 className="text-3xl font-semibold uppercase tracking-[-0.04em]">
                        Project Brief
                      </h3>
                    </div>

                    <p className="text-xs text-white/40">
                      {completedBriefFields} details
                      captured
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2">
                  {(
                    Object.keys(
                      briefLabels
                    ) as Array<
                      keyof ProjectBrief
                    >
                  ).map((key) => {
                    const value = brief[key];

                    return (
                      <div
                        key={key}
                        className="border-b border-white/10 px-6 py-5 sm:px-8 sm:[&:nth-child(odd)]:border-r"
                      >
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                          {briefLabels[key]}
                        </p>

                        <p
                          className={`mt-2 text-sm leading-6 ${
                            value
                              ? "text-white"
                              : "text-white/30"
                          }`}
                        >
                          {value ||
                            "Not provided yet"}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* HANDOFF */}
                <div className="px-6 py-6 sm:px-8">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Ready to continue?
                      </p>

                      <p className="mt-2 max-w-xl text-xs leading-5 text-white/40">
                        Send the details you have provided
                        directly to JD Advertising on
                        WhatsApp. Final pricing and project
                        confirmation will be handled by
                        the team.
                      </p>
                    </div>

                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-fit shrink-0 items-center gap-4 rounded-full bg-white px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#f2f0e9]"
                      >
                        Continue on WhatsApp

                        <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                          ↗
                        </span>
                      </a>
                    )}
                  </div>

                  <p className="mt-6 max-w-2xl border-t border-white/10 pt-5 text-[11px] leading-5 text-white/30">
                    This is an AI-generated working brief
                    based on the current conversation.
                    Only details you provided are included
                    in the WhatsApp message. Final project
                    requirements and quotations must be
                    confirmed by JD Advertising.
                  </p>
                </div>

                <div className="grid h-1 grid-cols-4">
                  <div className="bg-cyan-400" />
                  <div className="bg-fuchsia-500" />
                  <div className="bg-yellow-400" />
                  <div className="bg-white" />
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}