const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

const BREVO_API_KEY =
  process.env.BREVO_API_KEY || "";

const BREVO_SENDER_EMAIL =
  process.env.BREVO_SENDER_EMAIL || "";

const BREVO_SENDER_NAME =
  process.env.BREVO_SENDER_NAME || "CareerPilot AI";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const sendVerificationEmail = async (
  email,
  fullName,
  verificationToken
) => {
  if (!BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not configured.");
  }

  if (!BREVO_SENDER_EMAIL) {
    throw new Error(
      "BREVO_SENDER_EMAIL is not configured."
    );
  }

  const baseUrl = CLIENT_URL.replace(/\/+$/, "");

  const verificationUrl =
    `${baseUrl}/verify-email?token=${encodeURIComponent(
      verificationToken
    )}`;

  const safeName = escapeHtml(fullName || "there");

  const payload = {
    sender: {
      name: BREVO_SENDER_NAME,
      email: BREVO_SENDER_EMAIL,
    },

    to: [
      {
        email,
        name: fullName || "CareerPilot User",
      },
    ],

    subject: "Verify your CareerPilot AI account",

    textContent: `
Hello ${fullName || "there"},

Welcome to CareerPilot AI.

Please verify your email address using the link below:

${verificationUrl}

If you did not create this account, you can ignore this email.

CareerPilot AI
    `.trim(),

    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background: #f5f7fb;
    font-family: Arial, Helvetica, sans-serif;
    color: #111827;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="padding: 40px 16px;"
  >
    <tr>
      <td align="center">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 600px;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #e5e7eb;
          "
        >

          <tr>
            <td
              style="
                padding: 32px;
                text-align: center;
                background: #111827;
                color: #ffffff;
              "
            >
              <h1
                style="
                  margin: 0;
                  font-size: 28px;
                "
              >
                CareerPilot AI
              </h1>

              <p
                style="
                  margin: 8px 0 0;
                  opacity: 0.8;
                "
              >
                Smart Job Application Tracker
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 36px 32px;">

              <h2
                style="
                  margin: 0 0 18px;
                  font-size: 24px;
                "
              >
                Verify your email
              </h2>

              <p
                style="
                  font-size: 16px;
                  line-height: 1.7;
                "
              >
                Hi ${safeName},
              </p>

              <p
                style="
                  font-size: 16px;
                  line-height: 1.7;
                "
              >
                Thanks for creating your
                CareerPilot AI account.
                Please verify your email address
                to activate your account.
              </p>

              <div
                style="
                  text-align: center;
                  margin: 32px 0;
                "
              >
                <a
                  href="${verificationUrl}"
                  style="
                    display: inline-block;
                    padding: 14px 28px;
                    background: #2563eb;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: bold;
                  "
                >
                  Verify Email
                </a>
              </div>

              <p
                style="
                  font-size: 14px;
                  line-height: 1.6;
                  color: #6b7280;
                "
              >
                If the button does not work,
                copy and paste this link into
                your browser:
              </p>

              <p
                style="
                  word-break: break-all;
                  font-size: 13px;
                  color: #2563eb;
                "
              >
                ${verificationUrl}
              </p>

              <hr
                style="
                  border: none;
                  border-top: 1px solid #e5e7eb;
                  margin: 32px 0;
                "
              />

              <p
                style="
                  font-size: 13px;
                  color: #9ca3af;
                  line-height: 1.6;
                "
              >
                If you did not create this
                account, you can safely ignore
                this email.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  try {
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",

        headers: {
          accept: "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },

        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        `[EMAIL] Brevo failed for ${email}:`,
        data
      );

      throw new Error(
        data?.message ||
        `Brevo returned status ${response.status}`
      );
    }

    console.log(
      `[EMAIL] Verification email sent to ${email}`
    );

    return data;
  } catch (error) {
    console.error(
      `[EMAIL] Verification email failed for ${email}:`,
      error?.message || error
    );

    throw error;
  }
};

const verifyEmailTransport = async () => {
  if (!BREVO_API_KEY) {
    console.warn(
      "[EMAIL] BREVO_API_KEY is not configured."
    );

    return false;
  }

  console.log(
    "[EMAIL] Brevo API configured successfully."
  );

  return true;
};

module.exports = {
  sendVerificationEmail,
  verifyEmailTransport,
};