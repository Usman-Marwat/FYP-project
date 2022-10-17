import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const useBiometricAuth = () => {
  const [biometricAuth, setBiometricAuth] = useState(null);

  const checkHardawareSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) handleBiometricAuth();
  };
  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return Alert.alert(
        "Biometric record not found",
        "Please verify your identity with your password",
        "OK",
        () => console.log("Fall back to default Auth")
      );
    doBiometricAuth();
  };

  const doBiometricAuth = async () => {
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage:
        "Your auth credentials are cashed but please login with biometrics",
    });
    setBiometricAuth(biometricAuth);
  };

  useEffect(() => {
    checkHardawareSupport();
  }, []);

  return { biometricAuth };
};
export default useBiometricAuth;
