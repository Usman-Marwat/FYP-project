import client from "../client";

const endpoint = "/customer/contractors";

const getContractors = () => client.get(endpoint);

export default {
  getContractors,
};
