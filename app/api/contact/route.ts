import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const MAX_BODY_SIZE = 20_000;

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const TURNSTILE_ACTION = "contact_form";

const PRODUCTION_HOSTNAMES = new Set([
  "jdadvertising.lk",
  "www.jdadvertising.lk",
]);

/*
 * Official Cloudflare always-pass test secret.
 * Used only during local development.
 */
const DEVELOPMENT_TURNSTILE_SECRET =
  "1x0000000000000000000000000000000AA";

const serviceSchema = z.enum([
  "Creative Design",
  "Digital Printing",
  "Offset Printing",
  "Signage & Display",
  "Branding & Advertising",
  "Printout & Finishing Services",
  "Personalized Printing & Gifts",
  "Sticker Cutting & Special Applications",
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
      .max(
        2000,
        "Your message must be less than 2000 characters."
      ),

    website: z
      .string()
      .trim()
      .max(500, "Invalid submission.")
      .optional()
      .default(""),

    turnstileToken: z
      .string()
      .trim()
      .max(2048, "Invalid security token.")
      .optional()
      .default(""),
  })
  .strict();

type ContactPayload =
  z.infer<typeof contactSchema>;

type TurnstileResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
};

function safeString(
  value: FormDataEntryValue | null
) {
  return typeof value === "string"
    ? value
    : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIp(
  request: NextRequest
) {
  const forwarded =
    request.headers.get("x-forwarded-for");

  if (forwarded) {
    return (
      forwarded
        .split(",")[0]
        ?.trim() || ""
    );
  }

  return (
    request.headers.get("x-real-ip") || ""
  );
}

function isAllowedOrigin(
  request: NextRequest
) {
  if (
    process.env.NODE_ENV !== "production"
  ) {
    return true;
  }

  const origin =
    request.headers.get("origin");

  /*
   * Some legitimate non-browser clients may
   * omit Origin. Turnstile still remains the
   * authoritative security check.
   */
  if (!origin) {
    return true;
  }

  return (
    origin ===
      "https://www.jdadvertising.lk" ||
    origin ===
      "https://jdadvertising.lk"
  );
}

async function verifyTurnstile(
  token: string,
  request: NextRequest
): Promise<boolean> {
  if (
    !token ||
    token.length > 2048
  ) {
    return false;
  }

  const isProduction =
    process.env.NODE_ENV === "production";

  const secret = isProduction
    ? process.env.TURNSTILE_SECRET_KEY
    : DEVELOPMENT_TURNSTILE_SECRET;

  if (!secret) {
    console.error(
      "Turnstile configuration is missing."
    );
    return false;
  }

  const clientIp = getClientIp(request);

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (clientIp) {
    body.set("remoteip", clientIp);
  }

  const controller =
    new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);

  try {
    const response = await fetch(
      TURNSTILE_VERIFY_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body,
        signal: controller.signal,
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return false;
    }

    const result =
      (await response.json()) as TurnstileResponse;

    if (!result.success) {
      return false;
    }

    /*
     * Ensure the token came from the
     * contact-form widget.
     */
/*
 * Cloudflare's official development test keys
 * return action "test", regardless of the action
 * configured on the widget.
 *
 * Therefore action + hostname enforcement is done
 * only with genuine production Turnstile tokens.
 */
if (isProduction) {
  if (result.action !== TURNSTILE_ACTION) {
    return false;
  }

  if (
    !result.hostname ||
    !PRODUCTION_HOSTNAMES.has(result.hostname)
  ) {
    return false;
  }
}

    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function parseRequest(
  request: NextRequest
): Promise<{
  payload: unknown;
  nativeForm: boolean;
}> {
  const contentType =
    request.headers.get(
      "content-type"
    ) || "";

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    return {
      payload:
        await request.json(),
      nativeForm: false,
    };
  }

  if (
    contentType.includes(
      "application/x-www-form-urlencoded"
    ) ||
    contentType.includes(
      "multipart/form-data"
    )
  ) {
    const form =
      await request.formData();

    return {
      payload: {
        name: safeString(
          form.get("name")
        ),
        email: safeString(
          form.get("email")
        ),
        phone: safeString(
          form.get("phone")
        ),
        company: safeString(
          form.get("company")
        ),
        service: safeString(
          form.get("service")
        ),
        message: safeString(
          form.get("message")
        ),
        website: safeString(
          form.get("website")
        ),

        /*
         * react-turnstile creates
         * cf-turnstile-response for
         * native form submission.
         */
        turnstileToken:
          safeString(
            form.get(
              "turnstileToken"
            )
          ) ||
          safeString(
            form.get(
              "cf-turnstile-response"
            )
          ),
      },

      nativeForm: true,
    };
  }

  throw new Error(
    "UNSUPPORTED_CONTENT_TYPE"
  );
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
      ...(errors
        ? { errors }
        : {}),
    },
    {
      status,
      headers: {
        "Cache-Control":
          "no-store",
      },
    }
  );
}

function getTransporter() {
  const host =
    process.env.SMTP_HOST;

  const port =
    Number(
      process.env.SMTP_PORT
    );

  const secure =
    process.env.SMTP_SECURE ===
    "true";

  const user =
    process.env.SMTP_USER;

  const pass =
    process.env.SMTP_PASS;

  if (
    !host ||
    !port ||
    !user ||
    !pass
  ) {
    throw new Error(
      "SMTP configuration is incomplete."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,

    auth: {
      user,
      pass,
    },

    /*
     * Avoid unnecessarily long SMTP waits.
     */
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

async function sendContactEmail(
  data: ContactPayload
) {
  const smtpUser =
    process.env.SMTP_USER;

  const fromEmail =
    process.env
      .CONTACT_FROM_EMAIL ||
    smtpUser;

  const toEmail =
    process.env.CONTACT_TO_EMAIL;

  if (
    !smtpUser ||
    !fromEmail ||
    !toEmail
  ) {
    throw new Error(
      "Contact email configuration is incomplete."
    );
  }

  const transporter =
    getTransporter();

  const safeName =
    escapeHtml(data.name);

  const safeEmail =
    escapeHtml(data.email);

  const safePhone =
    escapeHtml(
      data.phone ||
        "Not provided"
    );

  const safeCompany =
    escapeHtml(
      data.company ||
        "Not provided"
    );

  const safeService =
    escapeHtml(data.service);

  const safeMessage =
    escapeHtml(
      data.message
    ).replace(/\n/g, "<br />");

  await transporter.sendMail({
    from:
      `"JD Advertising Website" <${fromEmail}>`,

    to: toEmail,

    replyTo: {
      name: data.name,
      address: data.email,
    },

    subject:
      `New JD Advertising Enquiry - ${data.service}`,

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
Submitted securely through the JD Advertising website.

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
                  #090909 75%,
                  #090909 100%
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

          <div
            style="
              padding: 32px;
            "
          >
            <p
              style="
                margin: 0 0 28px;
                color: #666666;
                line-height: 1.6;
              "
            >
              A new verified enquiry has been submitted
              through the JD Advertising website.
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

            <div
              style="
                margin-top: 34px;
              "
            >
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

export async function POST(
  request: NextRequest
) {
  try {
    /*
     * 1. Only allow requests from our
     * production website when Origin exists.
     */
    if (!isAllowedOrigin(request)) {
      return jsonError(
        "Request rejected.",
        403
      );
    }

    /*
     * 2. Basic body-size protection.
     */
    const contentLength =
      request.headers.get(
        "content-length"
      );

    if (contentLength) {
      const parsedLength =
        Number.parseInt(
          contentLength,
          10
        );

      if (
        Number.isFinite(
          parsedLength
        ) &&
        parsedLength >
          MAX_BODY_SIZE
      ) {
        return jsonError(
          "Request is too large.",
          413
        );
      }
    }

    /*
     * 3. Parse request.
     */
    let parsedRequest: {
      payload: unknown;
      nativeForm: boolean;
    };

    try {
      parsedRequest =
        await parseRequest(
          request
        );
    } catch (error) {
      if (
        error instanceof
          Error &&
        error.message ===
          "UNSUPPORTED_CONTENT_TYPE"
      ) {
        return jsonError(
          "Invalid request format.",
          415
        );
      }

      return jsonError(
        "Invalid request data.",
        400
      );
    }

    /*
     * 4. Strict schema validation.
     */
    const validation =
      contactSchema.safeParse(
        parsedRequest.payload
      );

    if (!validation.success) {
      if (
        parsedRequest.nativeForm
      ) {
        const redirectUrl =
          new URL(
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
            validation.error
              .issues[0]
              ?.message ||
            "Please check the information you entered.",

          errors:
            validation.error
              .flatten()
              .fieldErrors,
        },
        {
          status: 400,
          headers: {
            "Cache-Control":
              "no-store",
          },
        }
      );
    }

    const data =
      validation.data;

    /*
     * 5. Honeypot.
     *
     * Pretend success to obvious bots,
     * but do not verify Turnstile or
     * send email.
     */
    if (data.website) {
      if (
        parsedRequest.nativeForm
      ) {
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
        {
          status: 200,
          headers: {
            "Cache-Control":
              "no-store",
          },
        }
      );
    }

    /*
     * 6. Mandatory Cloudflare
     * Turnstile server validation.
     */
    const turnstileValid =
      await verifyTurnstile(
        data.turnstileToken,
        request
      );

    if (!turnstileValid) {
      return jsonError(
        "Security verification failed. Please refresh the verification and try again.",
        403
      );
    }

    /*
     * 7. Only after successful
     * Turnstile verification do
     * we contact Gmail SMTP.
     */
    await sendContactEmail(
      data
    );

    /*
     * Do not write customer names,
     * emails, phone numbers or
     * messages into production logs.
     */
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Verified contact enquiry emailed successfully."
      );
    }

    /*
     * Native form fallback.
     */
    if (
      parsedRequest.nativeForm
    ) {
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
          "Thank you. Your project enquiry has been sent successfully.",
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    /*
     * Log enough for diagnostics
     * without recording customer data.
     */
    console.error(
      "Contact API error:",
      error instanceof Error
        ? error.message
        : "Unknown server error"
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "We could not send your enquiry at this time. Please try again later.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control":
            "no-store",
        },
      }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message:
        "Method not allowed.",
    },
    {
      status: 405,
      headers: {
        Allow: "POST",
        "Cache-Control":
          "no-store",
      },
    }
  );
}