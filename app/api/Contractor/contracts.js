import client from "../client";

const endpoint = "/contractor/contracts";

const getContracts = (contractor_id) =>
  client.get(`${endpoint}/${contractor_id}`);

const patchBid = (contract_id, bid) =>
  client.patch(`${endpoint}/${contract_id}`, { bid });

export default {
  getContracts,
  patchBid,
};
