import React, { useContext } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import Screen from "../../components/Screen";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import Header from "../../components/Header";
import AppFormDocumentPicker from "../../components/forms/AppFormDocumentPicker";
import AppFormMap from "../../components/forms/AppFormMap";
import routes from "../../navigation/routes";

const width = Dimensions.get("screen").width;

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  address: Yup.string().required().min(4).label("Address"),
});

const Credentials = ({ navigation, route }) => {
  const { contract } = route.params;
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const handleSubmit = async (credentials) => {
    navigation.navigate(routes.FIRMSLIST, {
      contract: { ...contract, ...credentials },
    });
  };

  return (
    <>
      <Header navigation={navigation} translateX={translateX} />
      <Screen style={styles.screen}>
        <AppForm
          initialValues={{ title: "", address: "", files: [], location: {} }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="format-title"
            name="title"
            placeholder="Title"
            width="70%"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="select-place"
            name="address"
            placeholder="Address"
          />
          <AppFormDocumentPicker name="files" />
          <AppFormMap name="location" />
          <SubmitButton title="Send" />
        </AppForm>
      </Screen>
    </>
  );
};

export default Credentials;
const styles = StyleSheet.create({
  screen: {
    paddingTop: 45,
    paddingHorizontal: 10,
  },
});
