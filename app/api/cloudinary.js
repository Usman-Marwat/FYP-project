import { create } from "apisauce";

const endpoint = "/upload";

const apiClient = create({
  baseURL: "https://api.cloudinary.com/v1_1/dhhmnhd8c",
});

export const addImage = (image, onUploadProgress) => {
  const data = new FormData();
  data.append("upload_preset", "SmartConstructionContractor");
  data.append("cloud_name", "dhhmnhd8c");

  data.append("file", {
    name: "image",
    type: "image/jpeg",
    uri: image,
  });

  return apiClient.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addImage,
};
