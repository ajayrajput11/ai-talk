import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

console.log("GROQ API:", process.env.GROQ_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const askGroq = async (messages) => {
  try {
    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
      });

    return {
      text: completion.choices[0].message.content,
      tokens: completion.usage?.total_tokens || 0,
    };
  } catch (error) {
    console.log("GROQ ERROR:", error);

    return {
      text: "AI service unavailable. Please try again.",
      tokens: 0,
    };
  }
};