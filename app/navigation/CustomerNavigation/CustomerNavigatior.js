import { StyleSheet, Dimensions, Animated, View } from "react-native";
import React, { useState, useRef, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AppButton from "../../components/AppButton";
import BidsNavigator from "./BidsNavigator";
import ContractNavigator from "./ContractNavigator";
import CustomDrawer from "../CustomDrawer";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import MenuFoldButton from "../MenuFoldButton";
import navigationTheme from "../navigationTheme";
import RootNavigator from "../../Chat/RootNavigator";
import { translateMenuFold } from "../navigationAnimations";
import useAuth from "../../auth/useAuth";

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
      <NavigationContainer theme={navigationTheme}>
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

          <DrawerNavigator.Screen name="Bids" component={BidsNavigator} />
          <DrawerNavigator.Screen name="Chat" component={RootNavigator} />
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
    <>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <AppButton
          title="Logout"
          onPress={() => logOut()}
          style={{ width: 150 }}
        />
      </View>
    </>
  );
}
