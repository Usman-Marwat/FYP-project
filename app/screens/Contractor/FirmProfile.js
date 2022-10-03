import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../../components/forms";
import * as Yup from "yup";

import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import firmProfileApi from "../../api/Contractor/firmProfile";
import MenuFoldButton from "../../navigation/MenuFoldButton";
import Screen from "../../components/Screen";
import { translateMenuFold } from "../../navigation/navigationAnimations";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  tagline: Yup.string().required().min(1).label("Tagline"),
});

const FirmProfile = ({ navigation }) => {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const handleSubmit = async (profile) => {
    const result = await firmProfileApi.register({
      ...profile,
      actor_id: "63390ba866243cb0ff33ecd7",
    });

    if (!result.ok) {
      setuploadVisible(false);
      return alert("Could not save the listings");
    }
  };
  return (
    <Screen style={styles.container}>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <AppForm
        initialValues={{
          name: "",
          tagline: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField maxLength={255} name="name" placeholder="Name" />
        <AppFormField name="tagline" placeholder="Tagline" />
        <SubmitButton title="Send" />
      </AppForm>
    </Screen>
  );
};

export default FirmProfile;

const styles = StyleSheet.create({});
