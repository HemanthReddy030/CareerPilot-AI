const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    profileImage: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    currentRole: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    notifications: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      interviewReminders: {
        type: Boolean,
        default: true,
      },
      calendarNotifications: {
        type: Boolean,
        default: true,
      },
      aiSuggestions: {
        type: Boolean,
        default: true,
      },
    },
    themePreference: {
      type: String,
      enum: ["system", "light", "dark"],
      default: "system",
    },
    google: {
      email: {
        type: String,
        default: "",
      },
      accessToken: {
        type: String,
        default: "",
      },
      refreshToken: {
        type: String,
        default: "",
      },
      scope: {
        type: String,
        default: "",
      },
      tokenType: {
        type: String,
        default: "",
      },
      expiryDate: {
        type: Number,
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
    verificationTokenExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);