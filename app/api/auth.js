import client from "./client";

const login = (email, password, actor) =>
  client.post("/auth", { email, password, actor });

export default {
  login,
};
