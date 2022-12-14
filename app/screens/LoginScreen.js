import React, { useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

import ActivityIndicator from "../components/ActivityIndicator";

import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";

import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import Icon from "../components/Icon";
import colors from "../config/colors";

const { width, height } = Dimensions.get("screen");
const DURATION = 400;

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation, route }) {
  const { item, bg } = route.params;
  const [error, setError] = useState();
  const loginApi = useApi(authApi.login);
  const { logIn } = useAuth();

  const handleSubmit = async (userInfo) => {
    const result = await loginApi.request({ ...userInfo, actor: item.actor });
    if (!result.ok) {
      if (result.data) setError(result.data.email + result.data.password);
      else setError("An unexpected error occurred.");
      return;
    }
    logIn(result.data);
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <View style={styles.container}>
        <View style={styles.headingConatiner}>
          <SharedElement id={`item.${item.key}.image`}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </SharedElement>
          <Animatable.View animation="fadeInUp" delay={DURATION / 2}>
            <Text style={styles.title}>{item.actor}</Text>
          </Animatable.View>
          <Animatable.View
            animation="fadeInUp"
            delay={DURATION}
            style={[
              StyleSheet.absoluteFillObject,
              styles.backdrop,
              { backgroundColor: bg },
            ]}
          >
            <View />
          </Animatable.View>
          <View style={styles.square} />
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
            <SubmitButton title="Login" bg={bg} />
          </AppForm>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon
              family="mci"
              name="keyboard-backspace"
              backgroundColor="#fff"
              iconColor={colors.medium}
            />
            <Text style={{ color: colors.medium }}>back</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  backdrop: {
    backgroundColor: "#ff355e",
    zIndex: -5,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
  },
  container: {
    padding: 10,
    paddingTop: 10,
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
  square: {
    width: height,
    height: height,
    backgroundColor: "#fff",
    borderRadius: 86,
    position: "absolute",
    top: -height * 0.88,
    left: -height * 0.35,
    zIndex: -1,
    transform: [{ rotate: "35deg" }],
  },
  title: {
    fontWeight: "800",
    fontSize: 32,
    textTransform: "uppercase",
    color: "#fff",
    marginVertical: 40,
  },
});

export default LoginScreen;
