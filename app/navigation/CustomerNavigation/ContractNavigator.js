import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import ContractScreen from "../../screens/Customer/ContractScreen";
import MaterialScreen from "../../screens/Customer/MaterialScreen";
import SpecificationScreen from "../../screens/Customer/SpecificationsScreen";
import FirmsList from "../../screens/Customer/FirmsList";
import FirmsListDetailsScreen from "../../screens/Customer/FirmsListDetailsScreen";
import Credentials from "../../screens/Customer/Credentials";

const Stack = createSharedElementStackNavigator();

export default function ContractNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contract" component={ContractScreen} />
      <Stack.Screen name="Material" component={MaterialScreen} />
      <Stack.Screen name="Specifications" component={SpecificationScreen} />
      <Stack.Screen name="Credentials" component={Credentials} />
      <Stack.Screen name="FirmsList" component={FirmsList} />
      <Stack.Screen
        name="FirmsListDetails"
        component={FirmsListDetailsScreen}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item.key}.bg` },
            { id: `item.${item.key}.name`, animation: "fade" },
            { id: `item.${item.key}.image` },
            { id: "general.bg" },
          ];
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
