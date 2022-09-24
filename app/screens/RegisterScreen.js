import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import { SharedElement } from "react-navigation-shared-element";

import Screen from "../components/Screen";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import {
  ErrorMessage,
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import usersApi from "../api/users";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";

const { width, height } = Dimensions.get("screen");

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen({ route }) {
  // const registerApi = useApi(usersApi.register);
  // const loginApi = useApi(authApi.login);
  // const auth = useAuth();
  // const [error, setError] = useState();

  const { item } = route.params;

  const handleSubmit = async (userInfo) => {
    //userInfo is the objet that formik gives us
    const result = await registerApi.request(userInfo);

    //if (!result.ok) returns true that means the result failed
    //if result has data that means the server properly processed our request and sent us an error
    // else if the server did not send us the data that means something unexpected happen
    // maybe the server is offline or we do not have internet connection; we have offline notice
    // to care of this but its good to show a generic error message
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };
  //registerApi.loading || loginApi.loading
  return (
    <>
      {/* <ActivityIndicator visible={registerApi.loading || loginApi.loading} /> */}
      <Screen style={styles.container}>
        <View style={styles.headingConatiner}>
          <SharedElement id={`item.${item.key}.image`}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </SharedElement>
          <Text style={styles.title}>{item.actor}</Text>
        </View>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {/* <ErrorMessage error={error} visible={error} /> */}
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headingConatiner: {
    alignItems: "center",
    marginTop: 7,
    marginBottom: 20,
  },
  image: {
    width: width / 2,
    height: width / 2.5,
    marginTop: 30,
    marginBottom: 30,
    resizeMode: "contain",
    zIndex: 1,
  },
  square: {
    width: height,
    height: height,
    borderColor: "pink",
    borderWidth: 3,

    borderRadius: 50,
    position: "absolute",
    top: -height * 0.65,
    left: -height * 0.3,
    zIndex: 0,
    transform: [{ rotateX: "40deg" }, { rotateZ: "0.685398rad" }],
  },
  title: {
    fontWeight: "800",
    fontSize: 32,
    textTransform: "uppercase",
  },
});

export default RegisterScreen;
