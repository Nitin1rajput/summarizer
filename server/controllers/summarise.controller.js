const OpenAI = require("openai").default;
const API_KEY = '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'

const openai = new OpenAI({
    apiKey: API_KEY,
});

exports.summarizeContent = async (req, res) => {
    const { wordLimit, content } = req.body;
    let prompt = [];
    if (wordLimit) {
        prompt = [
            {
                "role": "system",
                "content": "Summarize content you are provided within "
            },
            {
                "role": "user",
                "content": "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus."
            }
        ]
    }
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: ,
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
}