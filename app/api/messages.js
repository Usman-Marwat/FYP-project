import client from "./client";

const send = (expoPushToken, title, subtitle, body) =>
  client.post("/messages", {
    expoPushToken,
    title,
    subtitle,
    body,
  });

export default {
  send,
};
