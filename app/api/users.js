import client from "./client";

const register = (data) => client.post("/users", data);
const otp = (userInfo) => client.post("/users/otp", userInfo);

export default { register, otp };
