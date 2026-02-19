import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_URI,
});

/**
 * Stream a chat completion from OpenAI.
 * @param {Array<{role: string, content: string}>} messages — full message history
 * @returns {AsyncIterable} — stream of completion chunks
 */
export const streamChat = async (messages) => {
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    stream: true,
    temperature: 0.7,
    max_tokens: 1024,
  });
  return stream;
};

export default openai;
