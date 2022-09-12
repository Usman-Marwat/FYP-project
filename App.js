import React, { useCallback, useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import ContractorNavigator from "./app/navigation/ContractorNavigation/ContractorNavigator";
import ReceivedContracts from "./app/screens/Contractor/ReceivedContracts";
import OngoingContracts from "./app/screens/Contractor/OngoingContracts";
import OngoingContractsNavigator from "./app/navigation/ContractorNavigation/OngoingContractsNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <OngoingContractsNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
