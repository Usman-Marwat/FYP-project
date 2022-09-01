import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

import ContractScreen from "./app/screens/Customer/ContractScreen";

export default function App() {
  return <ContractScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
