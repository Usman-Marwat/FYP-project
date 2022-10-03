import client from "../client";

const register = (profile) => client.patch("contractor/firmProfile", profile);

export default { register };
