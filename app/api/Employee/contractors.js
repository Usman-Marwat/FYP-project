import client from "../client";

const endpoint = "/employee/contractors";

const getContractors = () => client.get(endpoint);

const patchRequest = (contractor_id, employee_id) =>
  client.patch(`${endpoint}/${contractor_id}`, { employee_id });

export default {
  getContractors,
  patchRequest,
};
