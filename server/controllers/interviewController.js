const Groq = require("groq-sdk");

const groq = process.env.GROQ_API_KEY
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "gpt-4.1-mini";
const OLLAMA_API_URL = process.env.OLLAMA_API_URL;
const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY;
const OLLAMA_API_MODEL = process.env.OLLAMA_API_MODEL || "llama-3b";

const generateWithGroq = async (prompt) => {
  if (!groq) {
    throw new Error("No Groq API key configured.");
  }
  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL || "qwen/qwen3.6-27b",
    messages: [
      {
        role: "system",
        content: "You are CareerPilot AI, a professional job search and interview preparation assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
  });

  const rawContent = completion.choices?.[0]?.message?.content || "";
  return rawContent.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
};

const isQuotaError = (error) => {
  const message =
    error?.response?.data?.message || error?.message || "";

  return /429|Quota exceeded|Too Many Requests|rate limit|rate-limit/i.test(
    message
  );
};

const getOfflineQuestionFallback = (type) => {
  const normalizedType = String(type || "").toLowerCase();

  const technicalQuestions = [
    "Explain the most challenging bug you've fixed and the steps you took to solve it.",
    "Describe the difference between SQL and NoSQL databases, and when you would use each.",
    "How does the Event Loop work in Node.js, and how does it handle asynchronous operations?",
    "What is the difference between REST APIs and GraphQL, and what are the trade-offs of each?",
    "Explain the concept of time complexity (Big O notation) and how you optimize algorithm performance."
  ];

  const hrQuestions = [
    "Describe a time when you faced conflict on a team and how you resolved it.",
    "Where do you see yourself in five years, and how does this role align with your career goals?",
    "What is your greatest professional strength and how have you demonstrated it in the past?",
    "Why do you want to work for our company, and what do you know about our culture?",
    "Describe a time when you had to work under a tight deadline and how you managed your time."
  ];

  const resumeQuestions = [
    "Tell me about a key accomplishment from your resume and why it mattered.",
    "Walk me through a project listed on your resume and explain your role in it.",
    "Why did you choose the technologies you used in the projects on your resume?",
    "How does your past experience prepare you for the challenges of this role?",
    "Explain any gaps or transitions in your employment history listed on your resume."
  ];

  let selectedList = [
    "Tell me about a recent problem you solved at work and what you learned from it."
  ];

  if (normalizedType.includes("technical")) {
    selectedList = technicalQuestions;
  } else if (normalizedType.includes("hr")) {
    selectedList = hrQuestions;
  } else if (normalizedType.includes("resume")) {
    selectedList = resumeQuestions;
  }

  const randomIndex = Math.floor(Math.random() * selectedList.length);
  return selectedList[randomIndex];
};

const getOfflineEvaluationFallback = (question, answer) => {
  return `Fallback evaluation (AI quota unavailable):\nScore: 78/100\nFeedback:\nYour answer is thoughtful and highlights real effort, but it would be stronger with more concrete impact and results.\nSuggestions:\n- Mention specific metrics or outcomes.\n- Describe your exact role and actions.\n- Keep the answer concise and focused on the result.`;
};

const makeOpenRouterRequest = async (prompt) => {
  const response = await fetch("https://api.openrouter.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || `OpenRouter error ${response.status}`);
  }

  const text = data?.choices?.[0]?.message?.content;
  return String(text || "").trim();
};

const makeOllamaRequest = async (prompt) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (OLLAMA_API_KEY) {
    headers.Authorization = `Bearer ${OLLAMA_API_KEY}`;
  }

  const response = await fetch(`${OLLAMA_API_URL}/v1/outputs`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: OLLAMA_API_MODEL,
      input: prompt,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `Ollama error ${response.status}`);
  }

  const output = data?.output?.[0];
  if (!output) {
    throw new Error("Ollama returned an invalid response.");
  }

  const content = output?.content;
  if (Array.isArray(content)) {
    return content.map((item) => item?.text || "").join(" ").trim();
  }

  return String(content || "").trim();
};

const generateFromProviders = async (prompt) => {
  const providers = [];

  if (groq) {
    providers.push({
      name: "Groq AI",
      handler: (text) => generateWithGroq(text),
    });
  }

  if (OPENROUTER_API_KEY) {
    providers.push({ name: "OpenRouter", handler: makeOpenRouterRequest });
  }

  if (OLLAMA_API_URL) {
    providers.push({ name: "Ollama", handler: makeOllamaRequest });
  }

  for (const provider of providers) {
    try {
      const text = await provider.handler(prompt);
      if (text) {
        return { text, provider: provider.name };
      }
    } catch (error) {
      console.error(`${provider.name} failed:`, error);
      continue;
    }
  }

  return null;
};

const formatGroqErrorMessage = (error) => {
  const message =
    error?.response?.data?.message || error?.message || "AI service error.";

  if (
    message.includes("429") ||
    message.includes("Quota exceeded") ||
    message.includes("rate limit") ||
    message.includes("Rate limit")
  ) {
    return "Groq quota exceeded. Please retry later or upgrade your API plan.";
  }

  return message;
};

const generateQuestion = async (req, res) => {
  try {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Interview type is required.",
      });
    }

    const prompt = `
You are an expert interview question generator.

Generate one engaging ${type} interview question for a job candidate.

Return only the interview question.
`;

    const result = await generateFromProviders(prompt);

    if (result?.text) {
      return res.status(200).json({
        success: true,
        question: result.text,
        provider: result.provider,
        notice: result.provider
          ? `Generated by ${result.provider}.`
          : undefined,
      });
    }

    const question = getOfflineQuestionFallback(type);
    return res.status(200).json({
      success: true,
      question,
      fallback: true,
      notice: "AI quota unavailable. Using offline fallback question so you can continue.",
    });
  } catch (error) {
    console.error("generateQuestion error:", error);

    res.status(500).json({
      success: false,
      message: formatGroqErrorMessage(error) || "Failed to generate interview question",
      details:
        process.env.NODE_ENV !== "production"
          ? error?.stack || error
          : undefined,
    });
  }
};

const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required.",
      });
    }

    const prompt = `
You are an interview evaluator.

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate this answer.

Return exactly in this format:

Score: <number out of 100>

Feedback:
<feedback>

Suggestions:
<improvement suggestions>
`;

    const result = await generateFromProviders(prompt);

    if (result?.text) {
      return res.status(200).json({
        success: true,
        feedback: result.text,
        provider: result.provider,
        notice: result.provider
          ? `Evaluated by ${result.provider}.`
          : undefined,
      });
    }

    return res.status(200).json({
      success: true,
      feedback: getOfflineEvaluationFallback(question, answer),
      fallback: true,
      notice: "AI quota unavailable. Using offline fallback evaluation so you can continue.",
    });
  } catch (error) {
    console.error("evaluateAnswer error:", error);

    res.status(500).json({
      success: false,
      message: formatGroqErrorMessage(error) || "Failed to evaluate answer",
      details:
        process.env.NODE_ENV !== "production"
          ? error?.stack || error
          : undefined,
    });
  }
};

module.exports = {
  generateQuestion,
  evaluateAnswer,
};