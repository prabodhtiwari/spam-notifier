const express = require("express");
const { WebClient } = require("@slack/web-api");

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

const app = express();
app.use(express.json());

const client = new WebClient(SLACK_BOT_TOKEN);

app.post("/", async (req, res) => {
  try {
    const { Email, Type } = req.body;
    let responseMessage = "Not Spam";
    // Check if the payload is a spam notification
    if (Type === "SpamNotification") {
      const text = `New spam report from ${Email}`;
      responseMessage = "Spam! Alert sent to Slack";

      await client.chat.postMessage({
        token: SLACK_BOT_TOKEN,
        channel: CHANNEL_ID,
        text: text,
      });
    }
    res.status(200).send(responseMessage);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

if (process.env.NODE_ENV !== "test") {
  const port = 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

export const expressServer = app;
