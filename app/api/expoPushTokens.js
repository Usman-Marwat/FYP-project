import client from "./client";

const register = (user_id, expoPushToken) =>
  client.put("/expoPushTokens", { user_id, expoPushToken });

export default {
  register,
};
