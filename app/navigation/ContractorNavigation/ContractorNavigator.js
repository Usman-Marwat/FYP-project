import { StyleSheet, Dimensions, Animated, View, Text } from "react-native";
import React, { useState, useRef, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from "../CustomDrawer";
import MenuFoldButton from "../MenuFoldButton";
import { translateMenuFold } from "../navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import ReceivedContractNavigator from "./ReceivedContractNavigator";
import OngoingContractsNavigator from "./OngoingContractsNavigator";
import EmployeesList from "../../screens/Contractor/EmployeesList";
import navigationTheme from "../navigationTheme";
import RootNavigator from "../../Chat/RootNavigator";
import FirmProfileNavigator from "./FirmProfileNavigator";

const DrawerNavigator = createDrawerNavigator();
const { width, height } = Dimensions.get("screen");

const ContractorNavigator = () => {
  const [fromCords] = useState({ x: 0, y: height });
  const [toCords] = useState({ x: width, y: 0 });
  const animatedValue = useRef(new Animated.ValueXY(fromCords)).current;

  const customDrawerOptions = {
    headerShown: false,
    drawerStyle: {
      backgroundColor: "transparent",
      width: 0,
    },
    drawerType: "permanent",
    overlayColor: "transparent",
  };
  return (
    <DrawerAnimationContext.Provider
      value={{ fromCords, toCords, animatedValue }}
    >
      <NavigationContainer theme={navigationTheme}>
        <DrawerNavigator.Navigator
          screenOptions={customDrawerOptions}
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
          <DrawerNavigator.Screen name="Check" component={Check} />

          <DrawerNavigator.Screen name="Employees" component={EmployeesList} />
          <DrawerNavigator.Screen
            name="Received"
            component={ReceivedContractNavigator}
          />
          <DrawerNavigator.Screen
            name="Ongoing"
            component={OngoingContractsNavigator}
          />
          <DrawerNavigator.Screen
            name="Profile"
            component={FirmProfileNavigator}
          />
          <DrawerNavigator.Screen name="Chat" component={RootNavigator} />
        </DrawerNavigator.Navigator>
      </NavigationContainer>
    </DrawerAnimationContext.Provider>
  );
};

export default ContractorNavigator;

function Check({ navigation }) {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <View>
        <Text>Check 1</Text>
      </View>
    </View>
  );
}

function Check2({ navigation }) {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <View>
        <Text>Check 2</Text>
      </View>
    </View>
  );
}
