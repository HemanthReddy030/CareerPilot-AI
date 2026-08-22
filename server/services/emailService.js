const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: String(process.env.EMAIL_PORT) === "465",

  auth: {
    user: (process.env.EMAIL_USER || "").trim(),
    pass: (process.env.EMAIL_PASSWORD || "").trim(),
  },
});

const sendVerificationEmail = async (email, name, token) => {
  const clientUrl =
    process.env.CLIENT_URL || "http://localhost:5173";

  const verificationUrl =
    `${clientUrl}/verify-email/${token}`;

  const emailUser =
    (process.env.EMAIL_USER || "").trim();

  const emailPassword =
    (process.env.EMAIL_PASSWORD || "").trim();

  /*
    Development fallback
  */
  if (
    !emailUser ||
    emailUser === "your_email@gmail.com" ||
    !emailPassword ||
    emailPassword === "your_app_password"
  ) {
    console.warn("==============================================");
    console.warn("CareerPilot AI Verification Email - DEV MODE");
    console.warn(`To: ${email}`);
    console.warn(`Verification URL: ${verificationUrl}`);
    console.warn("==============================================");

    return;
  }

  const safeName =
    name && name.trim()
      ? name.trim()
      : "there";

  const mailOptions = {
    from: {
      name: "CareerPilot AI",
      address: emailUser,
    },

    to: email,

    replyTo: emailUser,

    subject: "Verify your CareerPilot AI account",

    text: `
Hi ${safeName},

Thanks for creating your CareerPilot AI account.

Please verify your email address using the link below:

${verificationUrl}

This verification link will expire in 24 hours.

If you did not create a CareerPilot AI account, you can safely ignore this email.

CareerPilot AI
`.trim(),

    html: `
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
    margin:0;
    padding:0;
    background:#f8fafc;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <div
    style="
      width:100%;
      padding:40px 16px;
      box-sizing:border-box;
    "
  >

    <div
      style="
        max-width:560px;
        margin:0 auto;
        background:#ffffff;
        border:1px solid #e2e8f0;
        border-radius:16px;
        padding:32px;
        box-sizing:border-box;
      "
    >

      <div
        style="
          text-align:center;
          margin-bottom:28px;
        "
      >

        <div
          style="
            display:inline-block;
            background:#eff6ff;
            color:#2563eb;
            font-size:13px;
            font-weight:700;
            padding:8px 14px;
            border-radius:999px;
          "
        >
          CareerPilot AI
        </div>

      </div>

      <h2
        style="
          margin:0 0 18px;
          color:#0f172a;
          font-size:24px;
          line-height:1.3;
          text-align:center;
        "
      >
        Verify your email address
      </h2>

      <p
        style="
          margin:0 0 16px;
          color:#475569;
          font-size:15px;
          line-height:1.7;
        "
      >
        Hi ${safeName},
      </p>

      <p
        style="
          margin:0 0 16px;
          color:#475569;
          font-size:15px;
          line-height:1.7;
        "
      >
        Thanks for creating your CareerPilot AI account.
      </p>

      <p
        style="
          margin:0 0 28px;
          color:#475569;
          font-size:15px;
          line-height:1.7;
        "
      >
        Please verify your email address to activate your account.
      </p>

      <div
        style="
          text-align:center;
          margin:30px 0;
        "
      >

        <a
          href="${verificationUrl}"
          style="
            display:inline-block;
            background:#2563eb;
            color:#ffffff;
            text-decoration:none;
            font-size:14px;
            font-weight:700;
            padding:14px 26px;
            border-radius:10px;
          "
        >
          Verify Email
        </a>

      </div>

      <p
        style="
          margin:0 0 18px;
          color:#64748b;
          font-size:13px;
          line-height:1.6;
        "
      >
        This verification link will expire in 24 hours.
      </p>

      <p
        style="
          margin:0;
          color:#64748b;
          font-size:13px;
          line-height:1.6;
        "
      >
        If you did not create this account, you can safely ignore this email.
      </p>

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
          "
        >
          CareerPilot AI
        </p>

      </div>

    </div>

  </div>

</body>
</html>
    `.trim(),
  };

  const info =
    await transporter.sendMail(mailOptions);

  console.log(
    "Verification email sent:",
    info.messageId
  );

  return info;
};

module.exports = {
  sendVerificationEmail,
};