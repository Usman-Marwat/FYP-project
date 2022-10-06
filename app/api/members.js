import client from "./client";

const endpoint = "/members";

const getMembers = () => client.get(endpoint);

const addMember = (member) => client.post(endpoint, member);
export default {
  getMembers,
  addMember,
};
