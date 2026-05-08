const axios = require("axios");
const { OPENAI_API_KEY, OPENAI_BASE_URL } = require("../config/env");

/**
 * Send a message to OpenAI and get AI response.
 * @param {string} message - User message
 * @param {string} model - OpenAI model name
 * @param {Array} history - Optional chat history [{role, content}]
 * @returns {Promise<string>} - AI response text
 */
const askOpenAI = async (message, model = "gpt-4o-mini", history = []) => {
  const messages = [
    {
      role: "system",
      content:
        "You are Aisona, a helpful and friendly AI assistant. Be concise, clear, and helpful in your responses.",
    },
    ...history,
    {
      role: "user",
      content: message,
    },
  ];

  const response = await axios.post(
    `${OPENAI_BASE_URL}/chat/completions`,
    {
      model: model,
      messages: messages,
      max_tokens: 1024,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};

module.exports = { askOpenAI };
