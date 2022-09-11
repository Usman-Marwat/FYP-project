import React, { useCallback, useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import ContractorNavigator from "./app/navigation/ContractorNavigation/ContractorNavigator";

export default function App() {
  return <ContractorNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
