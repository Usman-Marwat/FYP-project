import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import Icon from "../components/Icon";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const MenuFoldButton = ({
  navigation,
  translateX,
  menuFoldPosition = "absolute",
}) => {
  return (
    <AnimatedTouchable
      onPress={() => navigation.openDrawer()}
      style={[
        styles.drawerIcon,
        {
          transform: [{ translateX: translateX }],
          position: menuFoldPosition,
          top: menuFoldPosition === "relative" ? 0 : 35,
          right: menuFoldPosition === "relative" ? 0 : 20,
        },
      ]}
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
    backgroundColor: "transparent",
    zIndex: 1,
  },
});
