import { StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useContext, useState } from "react";
import Signature from "react-native-signature-canvas";

import Header from "../../components/Header";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import { translateMenuFold } from "../../navigation/navigationAnimations";

import customerContractsApi from "../../api/Customer/contracts";
import messagesApi from "../../api/messages";
import useApi from "../../hooks/useApi";
import AppButton from "../../components/AppButton";

const BidsDetailsScreen = ({ navigation, route }) => {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const { title, contractor_id, contract_id, customerName } = route.params;
  const [signature, setSign] = useState(null);

  const signatureApi = useApi(customerContractsApi.patchSignature);
  const sendApi = useApi(messagesApi.send);

  const handleSignaturePatch = async () => {
    const result = await signatureApi.request(contract_id, signature);
    if (result.ok) sendNotification();
  };

  const sendNotification = async () => {
    await sendApi.request(
      "Contractor",
      contractor_id,
      `Contract Name: ${title}`,
      customerName,
      `Contract signed by Customer`
    );
  };

  return (
    <>
      <Header navigation={navigation} translateX={translateX} />
      <View style={{ flex: 1, marginTop: 50 }}>
        <View style={styles.preview}>
          {signature ? (
            <Image
              resizeMode={"contain"}
              style={{ width: 335, height: 114 }}
              source={{ uri: signature }}
            />
          ) : null}
        </View>
        <Signature
          onOK={setSign}
          descriptionText="Sign"
          clearText="Clear"
          confirmText="Save"
          webStyle={style}
        />
      </View>
      <AppButton title="Send" onPress={handleSignaturePatch} />
    </>
  );
};

export default BidsDetailsScreen;

const styles = StyleSheet.create({
  preview: {
    marginTop: 100,
    width: 400,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    height: 250,
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});

const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;
