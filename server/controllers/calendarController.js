const { google } = require("googleapis");
const { getOAuth2Client } = require("../config/googleOAuth");

const createCalendarEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      start,
      end,
      meetingLink,
      location,
    } = req.body;

    const user = req.user;

    if (!user?.google?.refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Please connect Google Calendar before creating events.",
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

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    const event = {
      summary: title || "Interview",

      description: `
${description || ""}

Meeting Link:
${meetingLink || "N/A"}
`,

      location: location || "",

      start: {
        dateTime: start,
        timeZone: "Asia/Kolkata",
      },

      end: {
        dateTime: end,
        timeZone: "Asia/Kolkata",
      },

      reminders: {
        useDefault: false,
        overrides: [
          {
            method: "popup",
            minutes: 30,
          },
          {
            method: "email",
            minutes: 60,
          },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    return res.status(200).json({
      success: true,
      message: "Calendar event created successfully.",
      event: response.data,
      calendarLink: response.data.htmlLink,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create calendar event.",
    });

  }
};

module.exports = {
  createCalendarEvent,
};