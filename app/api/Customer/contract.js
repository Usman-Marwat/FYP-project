import client from "../client";

const endpoint = "/customer/contract";

export const addContract = (onUploadProgress) => {
  const data = new FormData();
  data.append("title", "Contract");
  data.append("myarray", JSON.stringify(["Usman", "khan", "marwat"]));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addContract,
};
