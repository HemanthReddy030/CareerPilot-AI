const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const User = require("../models/User");
const { getOAuth2Client, getAuthUrl } = require("../config/googleOAuth");

// Generate Google Login URL
const googleLogin = async (req, res) => {
  try {
    const state = jwt.sign(
      { id: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    const url = getAuthUrl(state);

    res.status(200).json({
      success: true,
      url,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate Google Login URL",
    });
  }
};

// OAuth Callback
const googleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code || !state) {
      return res.status(400).json({
        success: false,
        message: "Missing authorization code or state.",
      });
    }

    const decoded = jwt.verify(state, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found for Google callback.",
      });
    }

    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const profile = await oauth2.userinfo.get();

    const refreshToken =
      tokens.refresh_token || user.google?.refreshToken || "";

    user.google = {
      email: profile.data.email || user.google?.email || "",
      accessToken: tokens.access_token || user.google?.accessToken || "",
      refreshToken,
      scope: tokens.scope || user.google?.scope || "",
      tokenType: tokens.token_type || user.google?.tokenType || "",
      expiryDate: tokens.expiry_date || user.google?.expiryDate,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Google Connected Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Google Authentication Failed",
    });
  }
};

module.exports = {
  googleLogin,
  googleCallback,
};