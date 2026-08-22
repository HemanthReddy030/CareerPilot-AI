const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_PORT === "465",
  auth: {
    user: (process.env.EMAIL_USER || "").trim(),
    pass: (process.env.EMAIL_PASSWORD || "").trim(),
  },
});

const sendVerificationEmail = async (email, name, token) => {
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const verificationUrl = `${clientUrl}/verify-email/${token}`;

  // Dev mode mock logger if credentials are not configured
  if (
    !process.env.EMAIL_USER ||
    process.env.EMAIL_USER === "your_email@gmail.com" ||
    !process.env.EMAIL_PASSWORD ||
    process.env.EMAIL_PASSWORD === "your_app_password"
  ) {
    console.warn("=================================================");
    console.warn(`[DEV MODE - MOCK EMAIL] To: ${email}`);
    console.warn(`[DEV MODE - MOCK EMAIL] Subject: Verify your CareerPilot AI account`);
    console.warn(`[DEV MODE - MOCK EMAIL] Click Link: ${verificationUrl}`);
    console.warn("=================================================");
    return; // Resolve successfully
  }

  const mailOptions = {
    from: (process.env.EMAIL_FROM || process.env.EMAIL_USER || "").trim(),
    to: email,
    replyTo: (process.env.EMAIL_USER || "").trim(),
    subject: "[CareerPilot AI] Verify your account",
    html: `
      <div style="font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 24px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 12px; margin-bottom: 24px; text-align: center; font-size: 13px; color: #64748b; font-weight: 500;">
          <strong>Development Test:</strong> This local test email was sent from your CareerPilot AI workspace.
        </div>
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">CareerPilot AI</h2>
        </div>
        <h3 style="font-size: 18px; font-weight: 600; color: #1e293b; margin-top: 0;">Hello ${name},</h3>
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 8px;">
          Thank you for creating your CareerPilot AI account.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
          Please verify your email address to activate your account.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${verificationUrl}" style="background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 14px; display: inline-block; transition: background-color 0.2s;">Verify Email</a>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 24px;">
          This verification link will expire in 24 hours.
        </p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0 0 8px 0; line-height: 1.5;">
          If you did not create this account, you can safely ignore this email.
        </p>
        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0; line-height: 1.5;">
          CareerPilot AI Inc. • 123 Innovation Way, Suite 400 • San Francisco, CA 94107
        </p>
      </div>
    `,
    text: `[Development Test] Hello ${name},\n\nThank you for creating your CareerPilot AI account. Please verify your email address by clicking the link below:\n\n${verificationUrl}\n\nThis verification link will expire in 24 hours.\n\nCareerPilot AI Inc. • 123 Innovation Way, Suite 400 • San Francisco, CA 94107`,
    headers: {
      "X-Entity-Ref-ID": token,
      "X-Application-Mailer": "CareerPilot AI Mailer"
    }
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
};
