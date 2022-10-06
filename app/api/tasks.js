import client from "./client";

const endpoint = "/tasks";

const getTasks = (projectId) => client.get(`${endpoint}/${projectId}`);
const getTask = (id) => client.get(`${endpoint}/single/${id}`);
const deleteTask = (id) => client.delete(`${endpoint}/${id}`);

const addTask = (task) => client.post(endpoint, task);
export default {
  getTasks,
  addTask,
  getTask,
  deleteTask,
};
