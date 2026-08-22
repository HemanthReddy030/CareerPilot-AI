const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  sendVerificationEmail,
} = require("../services/emailService");

// ======================================
// Helpers
// ======================================

const normalizeEmail = (email = "") => {
  return String(email).trim().toLowerCase();
};

const createVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const createVerificationExpiry = () => {
  return Date.now() + 24 * 60 * 60 * 1000;
};

const createJwtToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ======================================
// Register User
// ======================================

const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedEmail =
      normalizeEmail(email);

    const cleanName =
      String(fullName).trim();

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const verificationToken =
      createVerificationToken();

    const verificationTokenExpires =
      createVerificationExpiry();

    const user =
      await User.create({
        fullName: cleanName,
        email: normalizedEmail,
        password: hashedPassword,
        isEmailVerified: false,
        verificationToken,
        verificationTokenExpires,
      });

    /*
      IMPORTANT:
      Return success immediately.

      Do not wait for Gmail SMTP before
      responding to the frontend.
    */

    res.status(201).json({
      success: true,

      message:
        "Registration successful. Please check your email to verify your account.",

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

    /*
      Send verification email in background.

      Registration will not wait for Gmail.
    */

    sendVerificationEmail(
      user.email,
      user.fullName,
      verificationToken
    )
      .then(() => {
        console.log(
          `[EMAIL] Verification email sent to ${user.email}`
        );
      })
      .catch((mailError) => {
        console.error(
          `[EMAIL] Failed to send verification email to ${user.email}:`,
          mailError?.message ||
          mailError
        );
      });

  } catch (error) {
    console.error(
      "registerUser error:",
      error
    );

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  }
};

// ======================================
// Login User
// ======================================

const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Email and Password are required",
      });
    }

    const normalizedEmail =
      normalizeEmail(email);

    const user =
      await User.findOne({
        email: normalizedEmail,
      });

    if (!user) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid Email or Password",
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid Email or Password",
      });
    }

    if (
      user.isEmailVerified ===
      false
    ) {
      if (
        user.verificationToken
      ) {
        return res.status(400).json({
          success: false,

          requiresVerification: true,

          message:
            "Please verify your email before logging in.",
        });
      }

      /*
        Backward compatibility:
        old users created before
        email verification was added.
      */

      user.isEmailVerified = true;

      await user.save();
    }

    const token =
      createJwtToken(user);

    return res.status(200).json({
      success: true,

      message:
        "Login Successful",

      token,

      user: {
        id: user._id,
        fullName:
          user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(
      "loginUser error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Get Logged In User Profile
// ======================================

const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error(
      "getProfile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Update Profile
// ======================================

const updateProfile = async (
  req,
  res
) => {
  try {
    const {
      fullName,
      phone,
      currentRole,
      bio,
      themePreference,
      notifications,
    } = req.body;

    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,

        message:
          "User not found",
      });
    }

    if (fullName) {
      user.fullName =
        String(fullName).trim();
    }

    user.phone =
      phone ||
      user.phone;

    user.currentRole =
      currentRole ||
      user.currentRole;

    user.bio =
      bio ||
      user.bio;

    user.themePreference =
      themePreference ||
      user.themePreference;

    if (notifications) {
      if (!user.notifications) {
        user.notifications = {};
      }

      user.notifications.emailNotifications =
        typeof notifications.emailNotifications ===
          "boolean"
          ? notifications.emailNotifications
          : user.notifications
            .emailNotifications;

      user.notifications.interviewReminders =
        typeof notifications.interviewReminders ===
          "boolean"
          ? notifications.interviewReminders
          : user.notifications
            .interviewReminders;

      user.notifications.calendarNotifications =
        typeof notifications.calendarNotifications ===
          "boolean"
          ? notifications.calendarNotifications
          : user.notifications
            .calendarNotifications;

      user.notifications.aiSuggestions =
        typeof notifications.aiSuggestions ===
          "boolean"
          ? notifications.aiSuggestions
          : user.notifications
            .aiSuggestions;
    }

    await user.save();

    return res.status(200).json({
      success: true,

      message:
        "Profile updated successfully",

      user,
    });

  } catch (error) {
    console.error(
      "updateProfile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Change Password
// ======================================

const changePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,

        message:
          "All password fields are required",
      });
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      return res.status(400).json({
        success: false,

        message:
          "New passwords do not match",
      });
    }

    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,

        message:
          "Current password is incorrect",
      });
    }

    user.password =
      await bcrypt.hash(
        newPassword,
        10
      );

    await user.save();

    return res.status(200).json({
      success: true,

      message:
        "Password changed successfully",
    });

  } catch (error) {
    console.error(
      "changePassword error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Disconnect Google
// ======================================

const disconnectGoogle = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    user.google = {
      email: "",
      accessToken: "",
      refreshToken: "",
      scope: "",
      tokenType: "",
      expiryDate: null,
    };

    await user.save();

    return res.status(200).json({
      success: true,

      message:
        "Google account disconnected successfully",
    });

  } catch (error) {
    console.error(
      "disconnectGoogle error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Delete Account
// ======================================

const deleteAccount = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,

        message:
          "User not found",
      });
    }

    const Job =
      require("../models/Job");

    const Resume =
      require("../models/Resume");

    await Promise.all([
      Job.deleteMany({
        user: req.user.id,
      }),

      Resume.deleteMany({
        user: req.user.id,
      }),
    ]);

    await user.deleteOne();

    return res.status(200).json({
      success: true,

      message:
        "Account deleted successfully",
    });

  } catch (error) {
    console.error(
      "deleteAccount error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Verify Email
// ======================================

const verifyEmail = async (
  req,
  res
) => {
  try {
    const {
      token,
    } = req.params;

    if (!token) {
      return res.status(400).json({
        success: false,

        message:
          "Verification token is required.",
      });
    }

    const user =
      await User.findOne({
        verificationToken:
          token,
      });

    if (!user) {
      return res.status(400).json({
        success: false,

        message:
          "Invalid verification link.",
      });
    }

    if (
      user.verificationTokenExpires &&
      user.verificationTokenExpires <
      Date.now()
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Verification link has expired.",
      });
    }

    user.isEmailVerified =
      true;

    user.verificationToken =
      "";

    user.verificationTokenExpires =
      null;

    await user.save();

    return res.status(200).json({
      success: true,

      message:
        "Email verified successfully.",
    });

  } catch (error) {
    console.error(
      "verifyEmail error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Resend Verification Email
// ======================================

const resendVerification = async (
  req,
  res
) => {
  try {
    const {
      email,
    } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,

        message:
          "Email is required.",
      });
    }

    const normalizedEmail =
      normalizeEmail(email);

    const user =
      await User.findOne({
        email: normalizedEmail,
      });

    /*
      Avoid account enumeration.
    */

    if (!user) {
      return res.status(200).json({
        success: true,

        message:
          "Verification email sent. Please check your inbox.",
      });
    }

    if (
      user.isEmailVerified
    ) {
      return res.status(400).json({
        success: false,

        message:
          "This email address is already verified.",
      });
    }

    const verificationToken =
      createVerificationToken();

    const verificationTokenExpires =
      createVerificationExpiry();

    user.verificationToken =
      verificationToken;

    user.verificationTokenExpires =
      verificationTokenExpires;

    await user.save();

    /*
      Resend is an explicit email action.

      Here we wait for Gmail so the user
      receives accurate success/failure feedback.
    */

    try {
      await sendVerificationEmail(
        user.email,
        user.fullName,
        verificationToken
      );

    } catch (mailError) {
      console.error(
        "Error sending verification email during resend:",
        mailError?.message ||
        mailError
      );

      return res.status(500).json({
        success: false,

        message:
          "Failed to send verification email. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,

      message:
        "Verification email sent. Please check your inbox.",
    });

  } catch (error) {
    console.error(
      "resendVerification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================
// Social Login
// ======================================

const socialLogin = async (
  req,
  res
) => {
  try {
    const {
      email,
      fullName,
    } = req.body;

    if (
      !email ||
      !fullName
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Email and Full Name are required",
      });
    }

    const normalizedEmail =
      normalizeEmail(email);

    const cleanName =
      String(fullName).trim();

    let user =
      await User.findOne({
        email: normalizedEmail,
      });

    if (!user) {
      const randomPassword =
        crypto
          .randomBytes(16)
          .toString("hex");

      const hashedPassword =
        await bcrypt.hash(
          randomPassword,
          10
        );

      user =
        await User.create({
          fullName:
            cleanName,

          email:
            normalizedEmail,

          password:
            hashedPassword,

          isEmailVerified:
            true,
        });
    }

    if (
      !user.isEmailVerified
    ) {
      user.isEmailVerified =
        true;

      user.verificationToken =
        "";

      user.verificationTokenExpires =
        null;

      await user.save();
    }

    const token =
      createJwtToken(user);

    return res.status(200).json({
      success: true,

      message:
        "Login Successful",

      token,

      user: {
        id: user._id,

        fullName:
          user.fullName,

        email:
          user.email,

        role:
          user.role,
      },
    });

  } catch (error) {
    console.error(
      "socialLogin error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  socialLogin,
  getProfile,
  updateProfile,
  changePassword,
  disconnectGoogle,
  deleteAccount,
  verifyEmail,
  resendVerification,
};