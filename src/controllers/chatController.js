const { askOpenRouter } = require("../services/openRouterService");
const { askOpenAI } = require("../services/openAIService");

// Models that use OpenAI directly
const OPENAI_MODELS = ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo", "gpt-5-nano"];

/**
 * POST /api/chat
 * Body: { message: string, model?: string, history?: Array }
 */
const sendMessage = async (req, res) => {
  try {
    const { message, model, history } = req.body;

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "message field is required and must be a non-empty string.",
      });
    }

    const historyArr = Array.isArray(history) ? history : [];
    const selectedModel = model || "deepseek/deepseek-chat";

    let aiResponse;

    // Route to correct provider based on model
    if (OPENAI_MODELS.includes(selectedModel)) {
      aiResponse = await askOpenAI(message.trim(), selectedModel, historyArr);
    } else {
      aiResponse = await askOpenRouter(message.trim(), selectedModel, historyArr);
    }

    return res.json({
      success: true,
      response: aiResponse,
      model: selectedModel,
    });
  } catch (error) {
    console.error("[ChatController] Error:", error?.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

module.exports = { sendMessage };
