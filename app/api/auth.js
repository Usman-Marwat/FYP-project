import client from "./client";

const login = (userInfo) => client.post("/auth", userInfo);

const refreshUserToken = (user) => client.post("/auth/refreshToken", { user });

export default {
  login,
  refreshUserToken,
};
