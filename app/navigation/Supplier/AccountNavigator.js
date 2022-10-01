import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../../screens/Supplier/AccountScreen";
import MessagesScreen from "../../screens/Supplier/MessagesScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
