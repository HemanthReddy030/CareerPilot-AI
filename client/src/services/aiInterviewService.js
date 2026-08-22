import axios from "../api/axios";

export const generateQuestion = async (type) => {
  try {
    const response = await axios.post("/interview/generate-question", {
      type,
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Failed to generate question.";
    console.error("Error generating question:", message, error);
    throw new Error(message);
  }
};

export const evaluateAnswer = async (question, answer) => {
  try {
    const response = await axios.post("/interview/evaluate-answer", {
      question,
      answer,
    });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Failed to evaluate answer.";
    console.error("Error evaluating answer:", message, error);
    throw new Error(message);
  }
};
