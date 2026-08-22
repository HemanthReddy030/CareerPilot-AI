const nodemailer = require("nodemailer");

// ======================================
// Email Configuration
// ======================================

const EMAIL_HOST =
  process.env.EMAIL_HOST || "smtp.gmail.com";

const EMAIL_PORT =
  Number(process.env.EMAIL_PORT) || 587;

const EMAIL_USER =
  (process.env.EMAIL_USER || "").trim();

const EMAIL_PASSWORD =
  (process.env.EMAIL_PASSWORD || "").trim();

// ======================================
// Gmail SMTP Transporter
// ======================================

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,

  secure: EMAIL_PORT === 465,

  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },

  // Reuse SMTP connections
  pool: true,
  maxConnections: 1,
  maxMessages: 50,

  // Prevent Render from waiting too long
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

// ======================================
// Escape HTML
// ======================================

const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// ======================================
// Check Email Configuration
// ======================================

const isEmailConfigured = () => {
  return (
    EMAIL_USER &&
    EMAIL_PASSWORD &&
    EMAIL_USER !== "your_email@gmail.com" &&
    EMAIL_PASSWORD !== "your_app_password"
  );
};

// ======================================
// Send Verification Email
// ======================================

const sendVerificationEmail = async (
  email,
  name,
  token
) => {
  const clientUrl =
    (
      process.env.CLIENT_URL ||
      "http://localhost:5173"
    ).replace(/\/$/, "");

  const verificationUrl =
    `${clientUrl}/verify-email/${encodeURIComponent(token)}`;

  // ======================================
  // Development Fallback
  // ======================================

  if (!isEmailConfigured()) {
    console.warn(
      "=============================================="
    );

    console.warn(
      "CareerPilot AI Verification Email - DEV MODE"
    );

    console.warn(`To: ${email}`);

    console.warn(
      `Verification URL: ${verificationUrl}`
    );

    console.warn(
      "=============================================="
    );

    return {
      devMode: true,
    };
  }

  const safeName =
    escapeHtml(
      name && String(name).trim()
        ? String(name).trim()
        : "there"
    );

  const plainName =
    name && String(name).trim()
      ? String(name).trim()
      : "there";

  // ======================================
  // Plain Text Version
  // ======================================

  const textContent = `
Hi ${plainName},

Thanks for creating your CareerPilot AI account.

Please verify your email address using the link below:

${verificationUrl}

This verification link will expire in 24 hours.

If you did not create a CareerPilot AI account, you can safely ignore this email.

CareerPilot AI
`.trim();

  // ======================================
  // HTML Version
  // ======================================

  const htmlContent = `
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <meta
    name="color-scheme"
    content="light"
  />

  <title>
    Verify your CareerPilot AI account
  </title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background-color:#f8fafc;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="
      width:100%;
      background-color:#f8fafc;
    "
  >

    <tr>

      <td
        align="center"
        style="
          padding:40px 16px;
        "
      >

        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            width:100%;
            max-width:560px;
            background:#ffffff;
            border:1px solid #e2e8f0;
            border-radius:16px;
          "
        >

          <tr>

            <td
              style="
                padding:34px;
              "
            >

              <!-- Brand -->

              <div
                style="
                  text-align:center;
                  margin-bottom:28px;
                "
              >

                <span
                  style="
                    display:inline-block;
                    background:#eff6ff;
                    color:#2563eb;
                    padding:8px 14px;
                    border-radius:999px;
                    font-size:13px;
                    line-height:18px;
                    font-weight:700;
                  "
                >
                  CareerPilot AI
                </span>

              </div>

              <!-- Heading -->

              <h1
                style="
                  margin:0;
                  color:#0f172a;
                  font-size:24px;
                  line-height:32px;
                  font-weight:700;
                  text-align:center;
                "
              >
                Verify your email address
              </h1>

              <!-- Greeting -->

              <p
                style="
                  margin:28px 0 0;
                  color:#475569;
                  font-size:15px;
                  line-height:24px;
                "
              >
                Hi ${safeName},
              </p>

              <p
                style="
                  margin:16px 0 0;
                  color:#475569;
                  font-size:15px;
                  line-height:24px;
                "
              >
                Thanks for creating your CareerPilot AI account.
              </p>

              <p
                style="
                  margin:12px 0 0;
                  color:#475569;
                  font-size:15px;
                  line-height:24px;
                "
              >
                Please verify your email address to activate your account.
              </p>

              <!-- Button -->

              <div
                style="
                  text-align:center;
                  margin:32px 0;
                "
              >

                <a
                  href="${verificationUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="
                    display:inline-block;
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    font-size:14px;
                    line-height:20px;
                    font-weight:700;
                    padding:14px 28px;
                    border-radius:10px;
                  "
                >
                  Verify Email
                </a>

              </div>

              <!-- Expiry -->

              <p
                style="
                  margin:0;
                  color:#64748b;
                  font-size:13px;
                  line-height:21px;
                "
              >
                This verification link will expire in 24 hours.
              </p>

              <!-- Fallback Link -->

              <p
                style="
                  margin:18px 0 0;
                  color:#64748b;
                  font-size:12px;
                  line-height:20px;
                "
              >
                If the button does not work, copy and paste this link into your browser:
              </p>

              <p
                style="
                  margin:6px 0 0;
                  word-break:break-all;
                  color:#2563eb;
                  font-size:12px;
                  line-height:20px;
                "
              >
                ${verificationUrl}
              </p>

              <!-- Security -->

              <p
                style="
                  margin:22px 0 0;
                  color:#64748b;
                  font-size:13px;
                  line-height:21px;
                "
              >
                If you did not create this account, you can safely ignore this email.
              </p>

              <!-- Footer -->

              <div
                style="
                  border-top:1px solid #e2e8f0;
                  margin-top:28px;
                  padding-top:20px;
                  text-align:center;
                "
              >

                <p
                  style="
                    margin:0;
                    color:#94a3b8;
                    font-size:12px;
                    line-height:18px;
                  "
                >
                  CareerPilot AI
                </p>

                <p
                  style="
                    margin:5px 0 0;
                    color:#cbd5e1;
                    font-size:11px;
                    line-height:18px;
                  "
                >
                  Automated account verification message
                </p>

              </div>

            </td>

          </tr>

        </table>

      </td>

    </tr>

  </table>

</body>

</html>
`.trim();

  // ======================================
  // Email Options
  // ======================================

  const mailOptions = {
    from: {
      name: "CareerPilot AI",
      address: EMAIL_USER,
    },

    to: email,

    replyTo: EMAIL_USER,

    subject:
      "Verify your CareerPilot AI account",

    text: textContent,

    html: htmlContent,

    priority: "normal",
  };

  // ======================================
  // Send Email
  // ======================================

  try {
    const info =
      await transporter.sendMail(
        mailOptions
      );

    console.log(
      `[EMAIL] Verification email accepted for ${email}`
    );

    return info;

  } catch (error) {
    console.error(
      `[EMAIL] Verification email failed for ${email}:`,
      error?.message || error
    );

    throw error;
  }
};

// ======================================
// Optional SMTP Test
// ======================================

const verifyEmailTransport = async () => {
  if (!isEmailConfigured()) {
    console.warn(
      "[EMAIL] SMTP credentials are not configured."
    );

    return false;
  }

  try {
    await transporter.verify();

    console.log(
      "[EMAIL] Gmail SMTP connection verified."
    );

    return true;

  } catch (error) {
    console.error(
      "[EMAIL] Gmail SMTP verification failed:",
      error?.message || error
    );

    return false;
  }
};

module.exports = {
  sendVerificationEmail,
  verifyEmailTransport,
};