import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import ReceivedContracts from "../../screens/Contractor/ReceivedContracts";
import ReceivedContractDetails from "../../screens/Contractor/ReceivedContractDetails";

const Stack = createSharedElementStackNavigator();

export default function ReceivedContractNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecievedContracts" component={ReceivedContracts} />
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
}

const styles = StyleSheet.create({});
