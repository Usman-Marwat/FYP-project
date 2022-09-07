import React, { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import ContractNavigator from "./app/navigation/CustomerNavigation/ContractNavigator";
import navigationTheme from "./app/navigation/navigationTheme";

import CustomDrawer from "./app/navigation/CustomDrawer";
import Icon from "./app/components/Icon";

export default function App() {
  const onCloseDrawer = useCallback(() => {
    //close animation
  });
  const onOpenDrawer = useCallback(() => {
    //close animation
  });

  return (
    // <NavigationContainer theme={navigationTheme}>
    //   <ContractNavigator />
    // </NavigationContainer>
    <View style={styles.container}>
      <CustomDrawer onPress={onCloseDrawer} />
      <TouchableOpacity onPress={onOpenDrawer} style={styles.drawerIcon}>
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
