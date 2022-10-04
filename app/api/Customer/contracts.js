import client from "../client";

const endpoint = "/contractor/contracts";

const getBidContracts = (customer_id) =>
  client.get(`${endpoint}/${customer_id}`);

const patchSignature = (contract_id, signature) =>
  client.patch(`${endpoint}/${contract_id}`, { signature });

export default {
  getBidContracts,
  patchSignature,
};
