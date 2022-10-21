import { Dimensions, Animated, View, Text, SafeAreaView } from "react-native";
import React, { useState, useRef, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AppButton from "../../components/AppButton";
import CustomDrawer from "../CustomDrawer";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import MenuFoldButton from "../MenuFoldButton";
import navigationTheme from "../navigationTheme";
import RootNavigator from "../../Chat/RootNavigator";
import { translateMenuFold } from "../navigationAnimations";
import useAuth from "../../auth/useAuth";
import useNotifications from "../../hooks/useNotifications";
import FirmsNavigator from "./FirmsNavigator";

const DrawerNavigator = createDrawerNavigator();
const { width, height } = Dimensions.get("screen");

const EmployeeNavigator = () => {
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
            header: () => null,
            headerStatusBarHeight: 0,
            drawerStyle: {
              backgroundColor: "transparent",
              width: 0,
              paddingVertical: -100,
            },
            // drawerType: "permanent",
            // overlayColor: "transparent",
          }}
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
          <DrawerNavigator.Screen name="Check-Employee">
            {(props) => <Check {...props} />}
          </DrawerNavigator.Screen>
          <DrawerNavigator.Screen name="Firms" component={FirmsNavigator} />
          <DrawerNavigator.Screen name="Chat" component={RootNavigator} />
        </DrawerNavigator.Navigator>
      </NavigationContainer>
    </DrawerAnimationContext.Provider>
  );
};

export default EmployeeNavigator;

function Check({ navigation }) {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const { logOut } = useAuth();
  const { loading } = useNotifications();

  return (
    <>
      <MenuFoldButton translateX={translateX} navigation={navigation} />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "coral",
          paddingTop: 0,
        }}
      >
        <AppButton
          title="Logout"
          onPress={() => logOut()}
          style={{ width: 150 }}
        />
      </View>
    </>
  );
}
