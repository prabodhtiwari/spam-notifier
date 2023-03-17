import request from "supertest";
import { expressServer as app } from "./index";

jest.mock("@slack/web-api", () => {
  const slackFun = {
    chat: {
      postMessage: jest.fn(),
    },
  };
  return { WebClient: jest.fn(() => slackFun) };
});

describe("Spam Notifier Test", () => {
  test("test spam", async () => {
    const res = await request(app).post("/").send({
      RecordType: "Bounce",
      Type: "SpamNotification",
      TypeCode: 512,
      Name: "Spam notification",
      Tag: "",
      MessageStream: "outbound",
      Description:
        "The message was delivered, but was either blocked by the user, or classified as spam, bulk mail, or had rejected content.",
      Email: "zaphod@example.com",
      From: "notifications@honeybadger.io",
      BouncedAt: "2023-02-27T21:41:30Z",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Spam! Alert sent to Slack");
  });

  test("test not a spam", async () => {
    const res = await request(app).post("/").send({
      RecordType: "Bounce",
      MessageStream: "outbound",
      Type: "HardBounce",
      TypeCode: 1,
      Name: "Hard bounce",
      Tag: "Test",
      Description:
        "The server was unable to deliver your message (ex: unknown user, mailbox not found).",
      Email: "arthur@example.com",
      From: "notifications@honeybadger.io",
      BouncedAt: "2019-11-05T16:33:54.9070259Z",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Not Spam");
  });
});
