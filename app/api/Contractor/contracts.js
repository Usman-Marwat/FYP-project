import client from "../client";

const endpoint = "/contractor/contracts";

const getContracts = (contractor_id) =>
  client.get(`${endpoint}/${contractor_id}`);

export default {
  getContracts,
};
