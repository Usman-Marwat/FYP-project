import React, { useState, useRef } from "react";
import { SafeAreaView, StyleSheet, View, Button } from "react-native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import OTPTextInput from "react-native-otp-textinput";
import OtpInput from "./app/components/forms/OtpInput";
import AppButton from "./app/components/AppButton";

const App = () => {
  return <AuthNavigator />;
};

const styles = StyleSheet.create({});

export default App;
