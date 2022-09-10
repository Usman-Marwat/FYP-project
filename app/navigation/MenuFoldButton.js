import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import Icon from "../components/Icon";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const MenuFoldButton = ({ navigation, translateX }) => {
  return (
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
  );
};

export default MenuFoldButton;

const styles = StyleSheet.create({
  drawerIcon: {
    position: "absolute",
    top: 35,
    right: 20,
    backgroundColor: "transparent",
    zIndex: 1,
  },
});
