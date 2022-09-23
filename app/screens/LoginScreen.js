import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import { SharedElement } from "react-navigation-shared-element";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";

import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const { width, height } = Dimensions.get("screen");

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ route }) {
  const [loginFailed, setLoginFailed] = useState(false);
  // const { logIn } = useAuth();

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    logIn(result.data);
  };
  const { item } = route.params;

  return (
    <>
      {/* <ActivityIndicator visible={registerApi.loading || loginApi.loading} /> */}
      <Screen style={styles.container}>
        {/* <Image style={styles.logo} source={require("../assets/logo-red.png")} /> */}
        <SharedElement id={`item.${item.key}.image`}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </SharedElement>
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error="Invalid Email and/or Password."
            visible={loginFailed}
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Login" />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  image: {
    width: width / 2,
    height: width / 2.5,
    marginTop: 30,
    marginLeft: 90,
    resizeMode: "contain",
  },
});

export default LoginScreen;
