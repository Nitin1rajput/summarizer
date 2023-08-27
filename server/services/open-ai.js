const OpenAI = require("openai").default;
const API_KEY = "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";
// const API_KEY = "sk-AXGV5bOQqrN2JMk28XJJT3BlbkFJpS2GHwWk7S6LtO2hR2S";

module.exports = new OpenAI({
  apiKey: API_KEY,
});
