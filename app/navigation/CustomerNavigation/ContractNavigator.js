import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ContractScreen from "../../screens/Customer/ContractScreen";
import MaterialScreen from "../../screens/Customer/MaterialScreen";
import SpecificationScreen from "../../screens/Customer/SpecificationsScreen";

const Stack = createNativeStackNavigator();

export default function ContractNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contract" component={ContractScreen} />
      <Stack.Screen name="Material" component={MaterialScreen} />
      <Stack.Screen name="Specifications" component={SpecificationScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
