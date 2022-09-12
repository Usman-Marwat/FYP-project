import React, { useCallback, useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import ContractorNavigator from "./app/navigation/ContractorNavigation/ContractorNavigator";
import ReceivedContracts from "./app/screens/Contractor/ReceivedContracts";
import OngoingContracts from "./app/screens/Contractor/OngoingContracts";

export default function App() {
  return <OngoingContracts />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
