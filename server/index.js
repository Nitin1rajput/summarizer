const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const summarizeRoutes = require("./routes/summarize.route");
const chatRoutes = require("./routes/chat.route");
const port = process.env.BACKEND_PORT || 3080;

app.use(bodyParser.json());
app.use(cors());

app.use("/summarize", summarizeRoutes);
app.use("/chat", chatRoutes);
app.use("/", (req, res) => {
  res.json({
    message: "Welcome to Summarize",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
