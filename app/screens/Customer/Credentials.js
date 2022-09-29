import React, { useContext } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Yup from "yup";

import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../../components/forms";
import Screen from "../../components/Screen";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import Header from "../../components/Header";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  address: Yup.string().required().min(4).label("Address"),
});

const Credentials = ({ navigation }) => {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const handleSubmit = async (credentials) => {};

  return (
    <Screen style={styles.screen}>
      <Header navigation={navigation} translateX={translateX} />
      <AppForm
        initialValues={{ title: "", address: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          name="title"
          placeholder="Title"
          width="50%"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          name="address"
          placeholder="Address"
        />
      </AppForm>
    </Screen>
  );
};

export default Credentials;
const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
    paddingHorizontal: 10,
  },
});
