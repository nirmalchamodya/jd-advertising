import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const MAX_BODY_SIZE = 20_000;

const serviceSchema = z.enum([
  "Digital Printing",
  "Signage",
  "Stickers & Graphics",
  "Business Printing",
  "Creative Design",
  "Finishing Services",
  "Other",
]);

const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name.")
      .max(100, "Name is too long."),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address.")
      .max(254, "Email address is too long."),

    phone: z
      .string()
      .trim()
      .max(30, "Phone number is too long.")
      .optional()
      .default(""),

    company: z
      .string()
      .trim()
      .max(120, "Company name is too long.")
      .optional()
      .default(""),

    service: serviceSchema,

    message: z
      .string()
      .trim()
      .min(
        10,
        "Please provide a little more information about your project."
      )
      .max(2000, "Your message must be less than 2000 characters."),

    website: z
      .string()
      .trim()
      .max(0, "Invalid submission.")
      .optional()
      .default(""),
  })
  .strict();

type ContactPayload = z.infer<typeof contactSchema>;

function safeString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function parseRequest(
  request: NextRequest
): Promise<{
  payload: unknown;
  nativeForm: boolean;
}> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return {
      payload: await request.json(),
      nativeForm: false,
    };
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await request.formData();

    return {
      payload: {
        name: safeString(form.get("name")),
        email: safeString(form.get("email")),
        phone: safeString(form.get("phone")),
        company: safeString(form.get("company")),
        service: safeString(form.get("service")),
        message: safeString(form.get("message")),
        website: safeString(form.get("website")),
      },
      nativeForm: true,
    };
  }

  throw new Error("UNSUPPORTED_CONTENT_TYPE");
}

function jsonError(
  message: string,
  status: number,
  errors?: unknown
) {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors ? { errors } : {}),
    },
    { status }
  );
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP configuration is incomplete.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

async function sendContactEmail(data: ContactPayload) {
  const smtpUser = process.env.SMTP_USER;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!smtpUser || !fromEmail || !toEmail) {
    throw new Error("Contact email configuration is incomplete.");
  }

  const transporter = getTransporter();

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone || "Not provided");
  const safeCompany = escapeHtml(data.company || "Not provided");
  const safeService = escapeHtml(data.service);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br />");

  await transporter.sendMail({
    from: `"JD Advertising Website" <${fromEmail}>`,

    to: toEmail,

    replyTo: {
      name: data.name,
      address: data.email,
    },

    subject: `New JD Advertising Enquiry - ${data.service}`,

    text: `
NEW WEBSITE ENQUIRY
JD ADVERTISING

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Company / Brand: ${data.company || "Not provided"}
Service: ${data.service}

PROJECT DETAILS
${data.message}

----------------------------------------
Submitted through the JD Advertising website.

Replying to this email will reply directly to:
${data.name} <${data.email}>
    `.trim(),

    html: `
      <div
        style="
          margin: 0;
          padding: 30px 15px;
          background: #eeeeee;
          font-family: Arial, Helvetica, sans-serif;
          color: #090909;
        "
      >
        <div
          style="
            max-width: 680px;
            margin: 0 auto;
            background: #ffffff;
          "
        >
          <div
            style="
              padding: 32px;
              background: #090909;
              color: #ffffff;
            "
          >
            <div
              style="
                width: 100%;
                height: 4px;
                margin-bottom: 28px;
                background: linear-gradient(
                  90deg,
                  #00aeef 0%,
                  #00aeef 25%,
                  #ec008c 25%,
                  #ec008c 50%,
                  #ffcb05 50%,
                  #ffcb05 75%,
                  #ffffff 75%,
                  #ffffff 100%
                );
              "
            ></div>

            <p
              style="
                margin: 0 0 12px;
                font-size: 11px;
                letter-spacing: 3px;
                text-transform: uppercase;
                color: #999999;
              "
            >
              JD Advertising
            </p>

            <h1
              style="
                margin: 0;
                font-size: 32px;
                line-height: 1.05;
                text-transform: uppercase;
              "
            >
              New Project Enquiry
            </h1>
          </div>

          <div style="padding: 32px;">
            <p
              style="
                margin: 0 0 28px;
                color: #666666;
                line-height: 1.6;
              "
            >
              A new enquiry has been submitted through the JD Advertising website.
            </p>

            <table
              cellpadding="0"
              cellspacing="0"
              style="
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
              "
            >
              <tr>
                <td
                  style="
                    width: 160px;
                    padding: 14px 0;
                    border-bottom: 1px solid #dddddd;
                    color: #777777;
                  "
                >
                  Name
                </td>

                <td
                  style="
                    padding: 14px 0;
                    border-bottom: 1px solid #dddddd;
                    font-weight: 600;
                  "
                >
                  ${safeName}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding: 14px 0;
                    border-bottom: 1px solid #dddddd;
                    color: #777777;
                  "
                >
                  Email
                </td>

                <td
                  style="
                    padding: 14px 0;
                    border-bottom: 1px solid #dddddd;
                  "
                >
                  ${safeEmail}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding: 14px 0;
                    border-bottom: 1px solid #dddddd;
                    color: #777777;
                  "
                >
                  Phone
                </td>

                <td
                  style="
                    padding: 14px 0;
                    border-bottom: 1px solid #dddddd;
                  "
                >
                  ${safePhone}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding: 14px 0;
                    border-bottom: 1px solid #dddddd;
                    color: #777777;
                  "
                >
                  Company / Brand
                </td>

                <td
                  style="
                    padding: 14px 0;
                    border-bottom: 1px solid #dddddd;
                  "
                >
                  ${safeCompany}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding: 14px 0;
                    border-bottom: 1px solid #dddddd;
                    color: #777777;
                  "
                >
                  Service
                </td>

                <td
                  style="
                    padding: 14px 0;
                    border-bottom: 1px solid #dddddd;
                  "
                >
                  ${safeService}
                </td>
              </tr>
            </table>

            <div style="margin-top: 34px;">
              <p
                style="
                  margin: 0 0 12px;
                  font-size: 11px;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                  color: #777777;
                "
              >
                Project Details
              </p>

              <div
                style="
                  padding: 20px;
                  background: #f2f0e9;
                  font-size: 16px;
                  line-height: 1.7;
                "
              >
                ${safeMessage}
              </div>
            </div>

            <div
              style="
                margin-top: 30px;
                padding-top: 22px;
                border-top: 1px solid #dddddd;
                font-size: 12px;
                line-height: 1.6;
                color: #777777;
              "
            >
              Reply directly to this email to respond to
              <strong>${safeName}</strong>.
            </div>
          </div>
        </div>
      </div>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    /*
     * 1. Basic request size protection
     */
    const contentLength = request.headers.get("content-length");

    if (contentLength) {
      const parsedLength = Number.parseInt(contentLength, 10);

      if (
        Number.isFinite(parsedLength) &&
        parsedLength > MAX_BODY_SIZE
      ) {
        return jsonError("Request is too large.", 413);
      }
    }

    /*
     * 2. Parse request
     */
    let parsedRequest: {
      payload: unknown;
      nativeForm: boolean;
    };

    try {
      parsedRequest = await parseRequest(request);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "UNSUPPORTED_CONTENT_TYPE"
      ) {
        return jsonError("Invalid request format.", 415);
      }

      return jsonError("Invalid request data.", 400);
    }

    /*
     * 3. Validate request
     */
    const validation = contactSchema.safeParse(
      parsedRequest.payload
    );

    if (!validation.success) {
      if (parsedRequest.nativeForm) {
        const redirectUrl = new URL(
          "/contact",
          request.url
        );

        redirectUrl.searchParams.set(
          "error",
          "validation"
        );

        return NextResponse.redirect(
          redirectUrl,
          303
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            validation.error.issues[0]?.message ||
            "Please check the information you entered.",
          errors:
            validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    /*
     * 4. Honeypot
     *
     * Bots should think the request succeeded,
     * but no email will actually be sent.
     */
    if (data.website) {
      if (parsedRequest.nativeForm) {
        return NextResponse.redirect(
          new URL(
            "/contact?sent=1",
            request.url
          ),
          303
        );
      }

      return NextResponse.json(
        {
          success: true,
          message:
            "Thank you. Your enquiry has been received.",
        },
        { status: 200 }
      );
    }

    /*
     * 5. Send email
     */
    await sendContactEmail(data);

    /*
     * 6. Development logging
     */
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Contact enquiry emailed successfully:",
        {
          name: data.name,
          email: data.email,
          service: data.service,
        }
      );
    }

    /*
     * 7. Native HTML fallback
     */
    if (parsedRequest.nativeForm) {
      return NextResponse.redirect(
        new URL(
          "/contact?sent=1",
          request.url
        ),
        303
      );
    }

    /*
     * 8. Normal React response
     */
    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you. Your project enquiry has been sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Contact API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "We could not send your enquiry at this time. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: "Method not allowed.",
    },
    {
      status: 405,
      headers: {
        Allow: "POST",
      },
    }
  );
}