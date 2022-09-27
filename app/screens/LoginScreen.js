import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, Image, Text, View } from "react-native";
import * as Yup from "yup";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

import ActivityIndicator from "../components/ActivityIndicator";
import Screen from "../components/Screen";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";

import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";

const { width } = Dimensions.get("screen");
const DURATION = 400;

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ route }) {
  const { item } = route.params;
  const [error, setError] = useState();
  const loginApi = useApi(authApi.login);
  const { logIn } = useAuth();

  const handleSubmit = async (userInfo) => {
    const result = await loginApi.request({ ...userInfo, actor: item.actor });
    if (!result.ok) return setError(result.data.email + result.data.password);
    logIn(result.data);
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <Screen style={styles.container}>
        <View style={styles.headingConatiner}>
          <SharedElement id={`item.${item.key}.image`}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </SharedElement>
          <Animatable.View animation="bounceIn" delay={DURATION / 2}>
            <Text style={styles.title}>{item.actor}</Text>
          </Animatable.View>
        </View>
        <Animatable.View animation="fadeInUp" delay={DURATION}>
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessage error={error} visible={error} />
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
        </Animatable.View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 0,
  },
  headingConatiner: {
    alignItems: "center",
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
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontWeight: "800",
    fontSize: 32,
    textTransform: "uppercase",
  },
});

export default LoginScreen;
