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
import Icon from "./app/components/Icon";

const { width, height } = Dimensions.get("screen");

export default function App() {
  const [fromCords] = useState({ x: 0, y: height });
  const [toCords] = useState({ x: width, y: 0 });

  const animatedValue = useRef(new Animated.ValueXY(fromCords)).current;
  const animate = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue: toValue === 1 ? toCords : fromCords,
      duration: 2000,
      useNativeDriver: true,
    });
  };

  const handleCloseDrawer = useCallback(() => {
    //close animation
  }, []);
  const handleOpenDrawer = useCallback(() => {
    animate(1).start();
  }, []);

  return (
    <View style={styles.container}>
      <CustomDrawer
        animate={animate}
        animatedValue={animatedValue}
        fromCords={fromCords}
        onPress={handleCloseDrawer}
        toCords={toCords}
      />
      <TouchableOpacity onPress={handleOpenDrawer} style={styles.drawerIcon}>
        <Icon antDesign={true} name="menufold" size={34} color="#222" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "transparent",
  },
});
