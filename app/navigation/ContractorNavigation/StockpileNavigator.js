import { Easing } from "react-native";
import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import Stockpile from "../../screens/Contractor/Stockpile";
import StockpileDetails from "../../screens/Contractor/StockpileDetails";

const Stack = createSharedElementStackNavigator();

const StockpileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StockpileScreen" component={Stockpile} />
      <Stack.Screen
        name="StockpileDetailsScreen"
        component={StockpileDetails}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item.key}.photo` },
            { id: `item.${item.key}.shopName` },
          ];
        }}
        options={() => ({
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
        })}
      />
    </Stack.Navigator>
  );
};

export default StockpileNavigator;
