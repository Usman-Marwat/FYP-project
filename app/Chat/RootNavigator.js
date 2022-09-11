import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthContext from "../contexts/Authentication";
import BottomTabNavigator from "./BottomTabNavigator";
import ChannelScreen from "../Screens/ChannelScreen";
import SignupScreen from "../Screens/SignupScreen";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { userId } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {!userId ? (
        <Stack.Screen
          name="Auth"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Channel" component={ChannelScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
