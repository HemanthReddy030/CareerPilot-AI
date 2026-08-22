const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { getOAuth2Client, getAuthUrl } = require("../config/googleOAuth");

// Generate Google Login URL (authenticated integration linking)
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

// Generate Google Auth URL for Login/Registration (unauthenticated)
const googleAuthUrl = async (req, res) => {
  try {
    const state = jwt.sign(
      { type: "auth" },
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
      message: "Failed to generate Google Auth URL",
    });
  }
};

// OAuth Callback
const googleCallback = async (req, res) => {
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  try {
    const { code, state } = req.query;

    if (!code || !state) {
      return res.status(400).send("Missing authorization code or state.");
    }

    const decoded = jwt.verify(state, process.env.JWT_SECRET);
    
    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const profile = await oauth2.userinfo.get();
    const googleEmail = profile.data.email;
    const googleName = profile.data.name || "Google User";

    if (!googleEmail) {
      return res.redirect(`${clientUrl}/login?error=${encodeURIComponent("No email associated with Google account.")}`);
    }

    const normalizedEmail = googleEmail.trim().toLowerCase();

    // Check if state is for unauthenticated login/signup
    if (decoded.type === "auth") {
      let user = await User.findOne({ email: normalizedEmail });

      if (user) {
        // Linked Google info update
        const refreshToken = tokens.refresh_token || user.google?.refreshToken || "";
        user.google = {
          email: normalizedEmail,
          accessToken: tokens.access_token || user.google?.accessToken || "",
          refreshToken,
          scope: tokens.scope || user.google?.scope || "",
          tokenType: tokens.token_type || user.google?.tokenType || "",
          expiryDate: tokens.expiry_date || user.google?.expiryDate,
        };
        if (!user.isEmailVerified) {
          user.isEmailVerified = true;
        }
        await user.save();
      } else {
        // Create new user
        const randomPassword = crypto.randomBytes(16).toString("hex");
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        
        user = await User.create({
          fullName: googleName,
          email: normalizedEmail,
          password: hashedPassword,
          isEmailVerified: true,
          google: {
            email: normalizedEmail,
            accessToken: tokens.access_token || "",
            refreshToken: tokens.refresh_token || "",
            scope: tokens.scope || "",
            tokenType: tokens.token_type || "",
            expiryDate: tokens.expiry_date,
          }
        });
      }

      // Generate JWT for the user
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const userPayload = encodeURIComponent(JSON.stringify({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }));

      // Redirect back to the frontend with token and user details
      return res.redirect(`${clientUrl}/login?token=${token}&user=${userPayload}`);
    } else {
      // Existing flow: decoding req.user.id for linking
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).send("User not found for Google callback.");
      }

      const refreshToken = tokens.refresh_token || user.google?.refreshToken || "";
      user.google = {
        email: normalizedEmail,
        accessToken: tokens.access_token || user.google?.accessToken || "",
        refreshToken,
        scope: tokens.scope || user.google?.scope || "",
        tokenType: tokens.token_type || user.google?.tokenType || "",
        expiryDate: tokens.expiry_date || user.google?.expiryDate,
      };

      await user.save();

      // Redirect back to the settings page
      return res.redirect(`${clientUrl}/settings`);
    }
  } catch (error) {
    console.error(error);
    return res.redirect(`${clientUrl}/login?error=${encodeURIComponent("Google authentication failed")}`);
  }
};

module.exports = {
  googleLogin,
  googleAuthUrl,
  googleCallback,
};