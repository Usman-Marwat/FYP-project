import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChannelListScreen from "./ChannelListScreen";
import UsersScreen from "./UsersScreen";
import ChannelScreen from "./ChannelScreen";

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="list" component={ChannelListScreen} />
      <Tab.Screen name="users" component={UsersScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
