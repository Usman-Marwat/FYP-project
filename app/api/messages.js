import client from "./client";

const send = (user_id, title, subtitle, body) =>
  client.post("/messages", {
    user_id,
    title,
    subtitle,
    body,
  });

export default {
  send,
};
