import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ContractNavigator from "./ContractNavigator";
import CustomDrawer from "../CustomDrawer";
import Icon from "../../components/Icon";

const DrawerNavigator = createDrawerNavigator();

const CustomerNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator
        screenOptions={{ headerShown: false }}
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

const { width, height } = Dimensions.get("screen");
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function Check({ navigation }) {
  // const translateX = animatedValue.y.interpolate({
  //   inputRange: [0, height * 0.17],
  //   outputRange: [100, 0],
  //   extrapolate: "clamp",
  // });

  return (
    <View>
      <AnimatedTouchable
        onPress={() => navigation.openDrawer()}
        style={styles.drawerIcon}
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
