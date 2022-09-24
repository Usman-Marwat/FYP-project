import _ from "lodash";

import client from "../client";

const endpoint = "/customer/contract";

export const addContract = (contract, onUploadProgress) => {
  const data = new FormData();
  data.append("title", "Contract");
  data.append("keys", JSON.stringify(contract.keys));
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
