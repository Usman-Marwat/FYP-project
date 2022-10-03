import _ from "lodash";

import client from "../client";

const endpoint = "/customer/contract";

export const addContract = (contract, onUploadProgress) => {
  const data = new FormData();
  data.append("title", contract.title);
  data.append("customer_id", contract.customer_id);
  data.append("contractor_id", contract.contractor_id);
  data.append("keys", JSON.stringify(contract.keys));
  data.append("location", JSON.stringify(contract.location));
  data.append("allValues", JSON.stringify(contract.allValues));
  data.append("descriptions", JSON.stringify(contract.descriptions));
  data.append("imagesUris", JSON.stringify(contract.imagesUris));

  let imagesUris = _.chain(contract.imagesUris)
    .cloneDeep()
    .flattenDeep()
    .compact()
    .value();

  imagesUris.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addContract,
};
