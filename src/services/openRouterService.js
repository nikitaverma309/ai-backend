const axios = require("axios");
const { OPENROUTER_API_KEY, OPENROUTER_BASE_URL, DEFAULT_MODEL } = require("../config/env");

/**
 * Send a message to OpenRouter and get AI response.
 * @param {string} message - User message
 * @param {string} model - Optional model override
 * @param {Array} history - Optional chat history [{role, content}]
 * @returns {Promise<string>} - AI response text
 */
const askOpenRouter = async (message, model = DEFAULT_MODEL, history = []) => {
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
    `${OPENROUTER_BASE_URL}/chat/completions`,
    {
      model: model,
      messages: messages,
      max_tokens: 1024,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://aisona.app",
        "X-Title": "Aisona AI Chat",
      },
    }
  );

  return response.data.choices[0].message.content;
};

module.exports = { askOpenRouter };
