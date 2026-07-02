import { askGroq } from "./groq.service.js";

export const generateAIResponse = async (
  model,
  messages
) => {
  return await askGroq(messages);
};