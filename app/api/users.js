import client from "./client";

const register = (data) => client.post("/users", data);
const check = (userInfo) => client.post("/users/check", userInfo);

export default { register, check };
