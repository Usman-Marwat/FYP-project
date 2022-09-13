import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";

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
