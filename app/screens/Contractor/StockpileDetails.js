import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SharedElement } from "react-navigation-shared-element";

import Header from "../../components/Header";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("screen");
const SIZE = 64;
const ICON_SIZE = SIZE * 0.6;
const SPACING = 12;
const s = width * 0.68;
const ITEM_WIDTH = s;
const ITEM_HEIGHT = s * 1.5;
const RADIUS = 18;
const FULL_SIZE = s + SPACING * 2;

const StockpileDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  return (
    <>
      <Header translateX={translateX} navigation={navigation} />
      <SharedElement
        id={`item.${item.key}.photo`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Image
          source={{ uri: item.image }}
          style={[StyleSheet.absoluteFillObject]}
        />
      </SharedElement>
      <SharedElement id={`item.${item.key}.shopName`}>
        <Text style={[styles.shopName]}>{item.shopName}</Text>
      </SharedElement>
    </>
  );
};

export default StockpileDetails;

const styles = StyleSheet.create({
  shopName: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    width: ITEM_WIDTH * 0.8,
    textTransform: "uppercase",
    position: "absolute",
    top: 70,
    left: SPACING * 2,
  },
});
