import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import ContractNavigator from "./app/navigation/CustomerNavigation/ContractNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import Pagination from "./app/components/Pagination";
import Screen from "./app/components/Screen";

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <ContractNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
