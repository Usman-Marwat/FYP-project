import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import MenuFoldButton from "../MenuFoldButton";
import { translateMenuFold } from "../navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";

const SavedContractsNavigator = ({ navigation }) => {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  return (
    <View>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
    </View>
  );
};

export default SavedContractsNavigator;

const styles = StyleSheet.create({});
