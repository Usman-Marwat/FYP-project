import React, { useState } from "react";
import { StyleSheet } from "react-native";

import BrandAnimation from "./app/start/BrandAnimation";
import useApi from "./app/hooks/useApi";
import cloudinaryApi from "./app/api/cloudinary";
import ImageInputList from "./app/components/ImageInputList";
import AppButton from "./app/components/AppButton";

export default function App() {
  const { data, error, request: addImage } = useApi(cloudinaryApi.addImage);
  const [imageUris, setImageUris] = useState([]);

  const handleImage = async () => {
    const image = imageUris[0];
    await addImage(image, (prog) => console.log(prog));
    console.log(error);
    console.log(data);
  };

  const appendUris = (uri) => {
    setImageUris([...imageUris, uri]);
  };
  return (
    <>
      <ImageInputList imageUris={imageUris} onAddImage={appendUris} />
      <AppButton title="Send" onPress={handleImage} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
