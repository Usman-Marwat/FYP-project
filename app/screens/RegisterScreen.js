import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Yup from "yup";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

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
import colors from "../config/colors";
import AppPhoneInput from "../components/forms/AppPhoneInput";
import OtpInput from "../components/forms/OtpInput";

const { width, height } = Dimensions.get("screen");
const DURATION = 400;

const schemaFunction = (isValid) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
    phone: Yup.string()
      .required()
      .test(
        "test-name",
        "phone input should be like (0)3125103497",
        (value) => isValid
      ),
  });
  return validationSchema;
};

function RegisterScreen({ route }) {
  const { item } = route.params;
  const [otpVisible, setOtpVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({ actor: item.actor });
  const [error, setError] = useState();

  const registerApi = useApi(usersApi.register);
  const otpApi = useApi(usersApi.otp);
  const loginApi = useApi(authApi.login);
  const { logIn } = useAuth();

  const handleSubmit = async (userInfo, { resetForm }) => {
    const result = await otpApi.request(userInfo);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else setError("An unexpected error occurred.");
      return;
    }
    setFormData({ ...formData, ...userInfo, ...result.data });
    setOtpVisible(!otpVisible);
    // resetForm();
  };

  const handleOtp = async (otp) => {
    setOtpVisible(!otpVisible);
    const result = await registerApi.request({ ...formData, otp });
    console.log(result.data);
    if (!result.ok) return setError(result.data.error);
    // handleLogin();
  };

  const handleLogin = async () => {
    const { data: authToken } = await loginApi.request(formData);
    logIn(authToken);
  };

  return (
    <>
      {/* <Button title="open" onPress={() => setOtpVisible(!otpVisible)} /> */}
      <ActivityIndicator visible={registerApi.loading || otpApi.loading} />
      <View style={styles.container}>
        <View style={styles.headingConatiner}>
          <SharedElement id={`item.${item.key}.image`}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </SharedElement>
          <Animatable.View animation="bounceIn" delay={DURATION / 2}>
            <Text style={styles.title}>{item.actor}</Text>
          </Animatable.View>
        </View>
        <Animatable.View animation="fadeInUp" delay={DURATION}>
          <Form
            initialValues={{ name: "", email: "", password: "", phone: "" }}
            onSubmit={handleSubmit}
            validationSchema={schemaFunction(isValid)}
          >
            <ErrorMessage error={error} visible={error} />
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
            <AppPhoneInput name="phone" onCheck={(val) => setIsValid(val)} />
            <SubmitButton title="Register" />
          </Form>
        </Animatable.View>
        <OtpInput
          otpVisible={otpVisible}
          onOtpVisible={(v) => setOtpVisible(v)}
          onSendOtp={handleOtp}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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

/* 
Comments in handleSubmit before - if (!result.ok) 

if (!result.ok) returns true that means the result failed
    //if result has data that means the server properly processed our request and sent us an error
    // else if the server did not send us the data that means something unexpected happen
    // maybe the server is offline or we do not have internet connection; we have offline notice
    // to care of this but its good to show a generic error message
    if (!result.ok) {
*/

/* 
"console.log(data)"
this gives us "null" when printed directly after setData()

"setData({ ...data, otp });
console.log(data);"
In handleOTP(), doing this above "const result = await registerApi.request(data)" sends the previous data without otp
The reason is because the component rerenders which redefines the handleotp() but the previous handleOtp 
funtion is executed. May be becasue its an asynchronous function because of logic of react.

*/
