const { generateAIResponse } = require("../services/groqService");
const { parseCleanJSON } = require("../utils/jsonParser");

const extractInterviewDetails = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email content is required.",
      });
    }

    const prompt = `
You are an expert AI Interview Email Analyzer.

Analyze the following email carefully.

Extract ONLY the interview information.

Return ONLY valid JSON.

Rules:
- Do not include markdown.
- Do not include explanation.
- If a value is not available, return an empty string.
- Convert dates into readable format.
- Convert time into readable format.

JSON Format:

{
  "company": "",
  "role": "",
  "date": "",
  "time": "",
  "location": "",
  "meetingLink": "",
  "interviewer": "",
  "mode": "",
  "confidence": ""
}

Email:

${email}
`;

    const textResponse = await generateAIResponse(prompt, "You are an expert AI Interview Email Analyzer.");

    const interviewSchema = {
      company: "",
      role: "",
      date: "",
      time: "",
      location: "",
      meetingLink: "",
      interviewer: "",
      mode: "",
      confidence: ""
    };

    let extractedData;
    try {
      extractedData = parseCleanJSON(textResponse, interviewSchema);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Groq returned invalid JSON.",
        rawResponse: textResponse,
      });
    }

    return res.status(200).json({
      success: true,
      data: extractedData,
    });

  } catch (error) {
    console.error("Groq API Error in extractInterviewDetails:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to extract interview details.",
    });
  }
};

module.exports = {
  extractInterviewDetails,
};