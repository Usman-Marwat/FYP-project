import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FirmProfile from "../../screens/Contractor/FirmProfile";
import FirmProfileDetails from "../../screens/Contractor/FirmProfileDetails";

const Stack = createNativeStackNavigator();

const FirmProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FirmProfile" component={FirmProfile} />
      <Stack.Screen name="FirmProfileDetails" component={FirmProfileDetails} />
    </Stack.Navigator>
  );
};

export default FirmProfileNavigator;

const styles = StyleSheet.create({});
