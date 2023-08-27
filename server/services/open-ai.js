const OpenAI = require("openai").default;
const API_KEY = "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";
// const API_KEY = "sk-AXGV5bOQqrN2JMk28XJJT3BlbkFJpS2GHwWk7S6LtO2hR2S";

module.exports = new OpenAI({
  apiKey: API_KEY,
});
