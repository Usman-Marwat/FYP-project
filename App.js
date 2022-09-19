import React, { useState } from "react";
import { StyleSheet } from "react-native";

import useApi from "./app/hooks/useApi";
import ImageInputList from "./app/components/ImageInputList";
import AppButton from "./app/components/AppButton";
import customerContractApi from "./app/api/Customer/contract";
import CustomerNavigator from "./app/navigation/CustomerNavigation/CustomerNavigatior";

export default function App() {
  const [imageUris, setImageUris] = useState([]);

  sendData = async () => {
    const result = await customerContractApi.addContract((prog) =>
      console.log(prog)
    );
    console.log(result.data);

    if (!result.ok) {
      return alert("Could not save the listings");
    }
  };

  const appendUris = (uri) => {
    setImageUris([...imageUris, uri]);
  };
  return <CustomerNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
