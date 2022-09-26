import client from "./client";

const login = (userInfo) => client.post("/auth", userInfo);

export default {
  login,
};
