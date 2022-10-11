import { Easing, StyleSheet } from "react-native";
import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import ContractScreen from "../../screens/Customer/ContractScreen";
import MaterialScreen from "../../screens/Customer/MaterialScreen";
import SpecificationScreen from "../../screens/Customer/SpecificationsScreen";
import FirmsList from "../../screens/Customer/FirmsList";
import FirmsListDetailsScreen from "../../screens/Customer/FirmsListDetailsScreen";
import Credentials from "../../screens/Customer/Credentials";

const Stack = createSharedElementStackNavigator();

export default function ContractNavigator() {
  const options = () => ({
    gestureEnabled: false,
    headerBackTitleVisible: false,
    transitionSpec: {
      open: {
        animation: "timing",
        config: { duration: 300, easing: Easing.inOut(Easing.ease) },
      },
      close: {
        animation: "timing",
        config: { duration: 300, easing: Easing.inOut(Easing.ease) },
      },
    },
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: { opacity: progress },
      };
    },
  });
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
        options={options}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
