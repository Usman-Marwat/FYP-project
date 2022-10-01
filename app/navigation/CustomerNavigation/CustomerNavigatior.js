import { StyleSheet, Dimensions, Animated, View } from "react-native";
import React, { useState, useRef, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ContractNavigator from "./ContractNavigator";
import CustomDrawer from "../CustomDrawer";
import MenuFoldButton from "../MenuFoldButton";
import { translateMenuFold } from "../navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import AppButton from "../../components/AppButton";
import useAuth from "../../auth/useAuth";
import BottomTabNavigator from "../../Chat/BottomTabNavigator";

const DrawerNavigator = createDrawerNavigator();
const { width, height } = Dimensions.get("screen");

const CustomerNavigator = () => {
  const [fromCords] = useState({ x: 0, y: height });
  const [toCords] = useState({ x: width, y: 0 });
  const animatedValue = useRef(new Animated.ValueXY(fromCords)).current;

  return (
    <DrawerAnimationContext.Provider
      value={{ fromCords, toCords, animatedValue }}
    >
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
              />
            );
          }}
        >
          <DrawerNavigator.Screen name="Check">
            {(props) => <Check {...props} />}
          </DrawerNavigator.Screen>

          <DrawerNavigator.Screen
            name="Contracts"
            component={ContractNavigator}
          />
          <DrawerNavigator.Screen name="Chat" component={BottomTabNavigator} />
        </DrawerNavigator.Navigator>
      </NavigationContainer>
    </DrawerAnimationContext.Provider>
  );
};

export default CustomerNavigator;

const styles = StyleSheet.create({});

function Check({ navigation }) {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const { logOut } = useAuth();

  return (
    <View>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <AppButton title="Logout" onPress={() => logOut()} />
    </View>
  );
}
