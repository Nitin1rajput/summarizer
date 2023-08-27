const { summarizeConstants } = require("../constants");
const openAi = require("../services/open-ai");

exports.summarizeContent = async (req, res) => {
  try {
    const { content, type } = req.body;
    let prompt = [];
    if (type === summarizeConstants.KEY_POINTS) {
      prompt = [
        {
          role: "system",
          content: "Give me 5 majorPoints for the provide content",
        },
      ];
    } else {
      prompt = [
        {
          role: "system",
          content: "Summarize the content you are provided within 100 words",
        },
      ];
    }

    if (content && content.length) {
      prompt.push({
        role: "user",
        content: content,
      });
    } else {
      throw new Error("Please provide valid content");
    }
    // const response = await openAi.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: prompt,
    //   temperature: 0.5,
    //   max_tokens: 1024,
    // });
    // res.json({
    //     status: 'success',
    //     data: response.choices[0].message
    // })
    res.json({
      status: "success",
      data: "1. Node.js is an open-source and cross-platform JavaScript runtime environment that allows developers to run JavaScript code outside of the browser.\n\n2. Node.js runs on the V8 JavaScript engine, which is the same engine used by Google Chrome, making it highly performant.\n\n3. Node.js uses a single process to handle multiple requests, avoiding the need to create new threads for each request. This allows it to handle thousands of concurrent connections without the burden of managing thread concurrency.\n\n4. Node.js provides asynchronous I/O primitives in its standard library, allowing JavaScript code to run non-blocking and preventing blocking behavior from becoming the norm.\n\n5. Node.js allows frontend developers who are already familiar with JavaScript to write server-side code, eliminating the need to learn a different language. It also allows the use of new ECMAScript standards without waiting for browser updates, giving developers more control over the language features they can use.",
    });
  } catch (err) {
    res.json({
      status: "failure",
      message: err.message || "Something Went Wrong!",
    });
  }
};

exports.summarizeWebpage = async (req, res) => {
  try {
    const { url } = req.query;
    if (url) {
      const isValid = new URL(url);
      if (!isValid) {
        throw new Error("Please provide valid url");
      }
    } else {
      throw new Error("Please provide an url");
    }
    const response = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Summarize this webpage in max of 500 words: ${url}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 1024,
    });
    res.json({
      status: "success",
      message: "success",
      data: response.choices[0].message,
    });
  } catch (error) {
    res.json({
      status: "failure",
      message: error.message || "Something Went Wrong",
    });
  }
};
