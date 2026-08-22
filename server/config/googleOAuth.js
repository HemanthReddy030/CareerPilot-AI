const { google } = require("googleapis");

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/userinfo.email",
];

// Initialize OAuth2 client
const initializeOAuth2Client = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    console.error("❌ Missing Google OAuth environment variables:");
    console.error("GOOGLE_CLIENT_ID:", clientId ? "✓" : "✗");
    console.error("GOOGLE_CLIENT_SECRET:", clientSecret ? "✓" : "✗");
    console.error("GOOGLE_REDIRECT_URI:", redirectUri ? "✓" : "✗");
    throw new Error("Missing Google OAuth configuration");
  }

  const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  console.log("✓ Google OAuth2 client initialized successfully");
  return client;
};

const getOAuth2Client = () => initializeOAuth2Client();
const oauth2Client = getOAuth2Client();

const getAuthUrl = (state) => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "select_account consent",
      scope: SCOPES,
      state,
    });
    console.log("✓ Auth URL generated:", authUrl.substring(0, 50) + "...");
    return authUrl;
  } catch (error) {
    console.error("❌ Error generating auth URL:", error);
    throw error;
  }
};

module.exports = {
  getOAuth2Client,
  getAuthUrl,
};