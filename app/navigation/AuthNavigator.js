import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import navigationTheme from "./navigationTheme";

const Stack = createSharedElementStackNavigator();

const AuthNavigator = () => (
  <NavigationContainer theme={navigationTheme}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        sharedElements={(route) => {
          const { item } = route.params;
          return [{ id: `item.${item.key}.image` }, { id: `item.${0}.btn` }];
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        sharedElements={(route) => {
          const { item } = route.params;
          return [{ id: `item.${item.key}.image` }];
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthNavigator;
