import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";

import WelcomeScreen from "./app/screens/WelcomeScreen";

export default function App() {
  return <AuthNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
