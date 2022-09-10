import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ContractNavigator from "./ContractNavigator";
import CustomDrawer from "../CustomDrawer";
import Icon from "../../components/Icon";

const DrawerNavigator = createDrawerNavigator();

const { width, height } = Dimensions.get("screen");
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

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
        overlayColor="transparent"
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

const styles = StyleSheet.create({
  drawerIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "transparent",
  },
});

function Check({ animatedValue, fromCords, navigation }) {
  const translateX = animatedValue.y.interpolate({
    inputRange: [0, height * 0.17],
    outputRange: [100, 0],
    extrapolate: "clamp",
  });

  return (
    <View>
      <AnimatedTouchable
        onPress={() => navigation.openDrawer()}
        style={[styles.drawerIcon, { transform: [{ translateX: translateX }] }]}
      >
        <Icon
          antDesign={true}
          name="menufold"
          backgroundColor="white"
          size={34}
          iconColor="#222"
        />
      </AnimatedTouchable>
    </View>
  );
}
