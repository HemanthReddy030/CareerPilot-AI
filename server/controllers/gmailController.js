const { google } = require("googleapis");
const { getOAuth2Client } = require("../config/googleOAuth");

function decodeBody(data) {
  if (!data) return "";

  return Buffer.from(
    data.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("utf8");
}

function getEmailBody(payload) {
  if (!payload) return "";

  // Plain text email
  if (payload.body && payload.body.data) {
    return decodeBody(payload.body.data);
  }

  // Multipart email
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body?.data) {
        return decodeBody(part.body.data);
      }

      if (part.parts) {
        const nested = getEmailBody(part);
        if (nested) return nested;
      }
    }
  }

  return "";
}

const getJobEmails = async (req, res) => {
  try {
    const user = req.user;

    if (!user?.google?.refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Please connect Gmail before fetching emails.",
      });
    }

    const oauth2Client = getOAuth2Client();

    oauth2Client.setCredentials({
      access_token: user.google.accessToken,
      refresh_token: user.google.refreshToken,
      scope: user.google.scope,
      token_type: user.google.tokenType,
      expiry_date: user.google.expiryDate,
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
      q: "interview OR job OR application",
    });

    const messages = response.data.messages || [];

    const emails = [];

    for (const message of messages) {
      const email = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });

      const headers = email.data.payload.headers || [];

      const subject =
        headers.find((h) => h.name === "Subject")?.value || "";

      const from =
        headers.find((h) => h.name === "From")?.value || "";

      const date =
        headers.find((h) => h.name === "Date")?.value || "";

      const body = getEmailBody(email.data.payload);

      emails.push({
        id: message.id,
        subject,
        from,
        date,
        body,
      });
    }

    return res.status(200).json({
      success: true,
      count: emails.length,
      emails,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Gmail messages.",
    });
  }
};

module.exports = {
  getJobEmails,
};