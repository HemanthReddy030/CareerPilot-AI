const Groq = require("groq-sdk");

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

const generateAIResponse = async (prompt, systemInstruction = "You are CareerPilot AI, a professional job search and interview preparation assistant.") => {
  if (!groq) {
    throw new Error("No Groq API key configured.");
  }
  
  const model = process.env.GROQ_MODEL || "qwen/qwen3.6-27b";
  const params = {
    model: model,
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
  };

  // If using a Qwen, reasoning, or compound model on Groq, request a higher completion token budget to accommodate thinking blocks
  if (model.includes("qwen") || model.includes("reasoning") || model.includes("compound")) {
    params.max_completion_tokens = 4096;
  }

  const completion = await groq.chat.completions.create(params);

  const rawContent = completion.choices?.[0]?.message?.content || "";
  return rawContent.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, "").trim();
};

module.exports = {
  groq,
  generateAIResponse,
};