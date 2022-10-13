import {} from "react-native";
import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { options } from "../navigationOptions";
import FirmsList from "../../screens/Employee/FirmsList";
import FirmsListDetails from "../../screens/Employee/FirmsListDetails";

const Stack = createSharedElementStackNavigator();

const FirmsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FirmsList" component={FirmsList} />
      <Stack.Screen
        name="FirmsListDetails"
        component={FirmsListDetails}
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
};

export default FirmsNavigator;
