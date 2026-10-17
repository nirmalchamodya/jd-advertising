import OpenAI from "openai";
import { NextResponse } from "next/server";

import {
  jdServices,
  jdServiceKnowledge,
} from "@/data/jd-services";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatMessage = {
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

const officialServiceCategories = jdServices
  .map((service) => `- ${service.title}`)
  .join("\n");

function cleanJsonOutput(value: string) {
  return value
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");
}

export async function POST(request: Request) {
  try {
    /*
      REQUEST SIZE PROTECTION
    */
    const contentLength = Number(
      request.headers.get("content-length") || "0"
    );

    if (contentLength > 50000) {
      return NextResponse.json(
        { error: "Request is too large." },
        { status: 413 }
      );
    }

    /*
      ENVIRONMENT CHECK
    */
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured." },
        { status: 500 }
      );
    }

    /*
      INPUT VALIDATION
    */
    const body = await request.json();
    const messages = body?.messages;

    if (
      !Array.isArray(messages) ||
      messages.length === 0
    ) {
      return NextResponse.json(
        { error: "A valid conversation is required." },
        { status: 400 }
      );
    }

    const validMessages: ChatMessage[] = messages
      .filter(
        (message): message is ChatMessage =>
          message &&
          (message.role === "user" ||
            message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0
      )
      .slice(-20)
      .map((message) => ({
        role: message.role,
        content: message.content
          .trim()
          .slice(0, 2000),
      }));

    if (validMessages.length === 0) {
      return NextResponse.json(
        { error: "No valid messages were provided." },
        { status: 400 }
      );
    }

    const conversationText = validMessages
      .map(
        (message) =>
          `${
            message.role === "user"
              ? "Customer"
              : "JD AI"
          }: ${message.content}`
      )
      .join("\n\n");

    /*
      PROJECT BRIEF EXTRACTION
    */
    const response = await openai.responses.create({
      model: "gpt-6-luna",

      instructions: `
You extract structured quotation requirements from a conversation
between a customer and the JD Advertising AI Assistant.

Return ONLY valid JSON.

Do not add Markdown.
Do not add explanations.
Do not invent missing information.

If a detail has not been provided, use null.

If the customer changes a requirement, always use the latest
requirement.

JD ADVERTISING OFFICIAL SERVICE CATEGORIES

${officialServiceCategories}

JD ADVERTISING SERVICE KNOWLEDGE

${jdServiceKnowledge}

SERVICE CLASSIFICATION RULES

The "service" field MUST use one of the official JD Advertising
service category names listed above.

Do not use generic category names such as:
- Printing
- Design
- Advertising
- Signage

Use the exact official category instead.

Examples:

Business Cards
→ Offset Printing

Flex Banner Printing
→ Digital Printing

Vehicle Branding
→ Branding & Advertising

Logo Design
→ Creative Design

LED Light Boxes
→ Signage & Display

Spiral Binding
→ Printout & Finishing Services

Custom Mug Printing
→ Personalized Printing & Gifts

Vinyl Sticker Cutting
→ Sticker Cutting & Special Applications

If the requested product cannot confidently be matched to an official
JD Advertising category, set "service" to null.

For "product", use the most specific product or service requested.

Where possible, use the wording from JD Advertising's service
catalogue.

Use exactly this JSON structure:

{
  "service": null,
  "product": null,
  "quantity": null,
  "size": null,
  "material": null,
  "colour": null,
  "sides": null,
  "finish": null,
  "artworkStatus": null,
  "installationRequired": null,
  "deadline": null,
  "deliveryLocation": null,
  "additionalNotes": null
}

FIELD GUIDANCE

service:
The exact official JD Advertising category.

product:
The specific item or service requested.

quantity:
Quantity provided by the customer.

size:
Dimensions, paper size, or other size information.

material:
Material or substrate requested.

colour:
Relevant colour or printing colour requirement.

sides:
Single-sided, double-sided, front only, etc.

finish:
Matte, gloss, lamination, binding, or another finish.

artworkStatus:
Whether artwork/design is ready, needs designing, or is otherwise
described.

installationRequired:
Whether installation or application is required.

deadline:
Required date, turnaround request, or deadline.

deliveryLocation:
Delivery, installation, collection, or project location if provided.

additionalNotes:
Only useful quotation information that does not fit another field.

Never infer information the customer did not provide.
      `.trim(),

      input: `
Extract the customer's CURRENT project requirements from this
conversation.

${conversationText}
      `.trim(),

      max_output_tokens: 500,
      store: false,
    });

    const cleanedOutput = cleanJsonOutput(
      response.output_text
    );

    let brief: ProjectBrief;

    try {
      brief = JSON.parse(
        cleanedOutput
      ) as ProjectBrief;
    } catch (parseError) {
      console.error(
        "JD brief JSON parse error:",
        parseError
      );

      console.error(
        "Raw AI output:",
        response.output_text
      );

      return NextResponse.json(
        {
          error:
            "Unable to create the project brief.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      brief,
    });
  } catch (error) {
    console.error(
      "JD project brief error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to create the project brief.",
      },
      { status: 500 }
    );
  }
}