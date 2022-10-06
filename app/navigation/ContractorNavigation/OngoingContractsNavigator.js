import { StyleSheet } from "react-native";
import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import OngoingContracts from "../../screens/Contractor/OngoingContracts";
import OngoingContractsDetails from "../../screens/Contractor/OngoingContractsDetails";

const Stack = createSharedElementStackNavigator();

const OngoingContractsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OngoingContracts" component={OngoingContracts} />
      <Stack.Screen
        name="OngoingContractsDetails"
        component={OngoingContractsDetails}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item.key}.modal` },
            { id: `item.${item.key}.image` },
            { id: `item.${item.key}.description` },
            { id: `item.${item.key}.team` },
          ];
        }}
      />
    </Stack.Navigator>
  );
};

export default OngoingContractsNavigator;

const styles = StyleSheet.create({});
