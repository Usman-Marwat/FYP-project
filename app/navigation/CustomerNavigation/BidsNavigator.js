import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BidsScreen from "../../screens/Customer/BidsScreen";
import BidsDetailsScreen from "../../screens/Customer/BidsDetailsScreen";

const Stack = createNativeStackNavigator();

const BidsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BidsScreen" component={BidsScreen} />
      <Stack.Screen name="BidsDetail" component={BidsDetailsScreen} />
    </Stack.Navigator>
  );
};

export default BidsNavigator;

const styles = StyleSheet.create({});
