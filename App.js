import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import ContractNavigator from "./app/navigation/CustomerNavigation/ContractNavigator";
import navigationTheme from "./app/navigation/navigationTheme";

import CustomDrawer from "./app/navigation/CustomDrawer";
import CustomerNavigator from "./app/navigation/CustomerNavigation/CustomerNavigatior";
import Icon from "./app/components/Icon";

export default function App() {
  return <CustomerNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
