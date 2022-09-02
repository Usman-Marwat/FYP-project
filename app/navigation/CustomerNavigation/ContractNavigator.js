import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ContractScreen from "../../screens/Customer/ContractScreen";
import SpecificationsScreen from "../../screens/Customer/SpecificationsScreen";

const Stack = createNativeStackNavigator();

export default function ContractNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contract" component={ContractScreen} />
      <Stack.Screen name="Specifications" component={SpecificationsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
