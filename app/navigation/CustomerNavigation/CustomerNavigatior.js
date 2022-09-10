import { StyleSheet, Dimensions, Animated, View } from "react-native";
import React, { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ContractNavigator from "./ContractNavigator";
import CustomDrawer from "../CustomDrawer";
import MenuFoldButton from "../MenuFoldButton";
import { translateMenuFold } from "../navigationAnimations";

const DrawerNavigator = createDrawerNavigator();
const { width, height } = Dimensions.get("screen");

const CustomerNavigator = () => {
  const [fromCords] = useState({ x: 0, y: height });
  const [toCords] = useState({ x: width, y: 0 });
  const animatedValue = useRef(new Animated.ValueXY(fromCords)).current;

  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "transparent",
            width: 0,
          },
          drawerType: "permanent",
          overlayColor: "transparent",
        }}
        // overlayColor="transparent"
        drawerContent={(props) => {
          return (
            <CustomDrawer
              navigation={props.navigation}
              routes={props.state.routeNames}
              selectedRoute={props.state.routeNames[props.state.index]}
              fromCords={fromCords}
              toCords={toCords}
              animatedValue={animatedValue}
            />
          );
        }}
      >
        <DrawerNavigator.Screen name="Check">
          {(props) => (
            <Check
              fromCords={fromCords}
              toCords={toCords}
              animatedValue={animatedValue}
              {...props}
            />
          )}
        </DrawerNavigator.Screen>

        <DrawerNavigator.Screen
          name="Contracts"
          component={ContractNavigator}
        />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default CustomerNavigator;

const styles = StyleSheet.create({});

function Check({ animatedValue, fromCords, navigation }) {
  const translateX = translateMenuFold(animatedValue, height);

  return (
    <View>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
    </View>
  );
}
