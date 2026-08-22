const Groq = require("groq-sdk");

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

const generateAIResponse = async (prompt, systemInstruction = "You are CareerPilot AI, a professional job search and interview preparation assistant.") => {
  if (!groq) {
    throw new Error("No Groq API key configured.");
  }
  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL || "qwen/qwen3.6-27b",
    messages: [
      {
        role: "system",
        content: systemInstruction,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
  });

  const rawContent = completion.choices?.[0]?.message?.content || "";
  return rawContent.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, "").trim();
};

module.exports = {
  groq,
  generateAIResponse,
};