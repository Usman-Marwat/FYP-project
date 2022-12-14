import React from "react";
import { Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import LoginScreen from "../screens/LoginScreen";
import navigationTheme from "./navigationTheme";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createSharedElementStackNavigator();

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
  // cardStyleInterpolator: ({ current: { progress } }) => {
  //   return {
  //     cardStyle: { opacity: progress },
  //   };
  // },
});

const AuthNavigator = () => (
  <NavigationContainer theme={navigationTheme}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        sharedElements={(route) => {
          const { item } = route.params;
          return [
            { id: `item.${item.key}.image`, animation: "fade" },
            { id: `item.${item.key}.actor`, animation: "fade-out" },
            { id: "actor_title" },
          ];
        }}
        options={options}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        sharedElements={(route) => {
          const { item } = route.params;
          return [{ id: `item.${item.key}.image` }];
        }}
        options={options}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthNavigator;
