import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

const Stack = createSharedElementStackNavigator();

const OngoingContractsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OngoingContracts" component={ReceivedContracts} />
      <Stack.Screen
        name="RecievedContractDetails"
        component={ReceivedContractDetails}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item.key}.bg` },
            { id: `item.${item.key}.image` },
            { id: `item.${item.key}.meta`, animation: "fade" },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

export default OngoingContractsNavigator;

const styles = StyleSheet.create({});
