import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { interpolate } from "react-native-reanimated";
import Icon from "../../components/Icon";
import colors from "../../config/colors";

const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.18;
const SPACING = 10;
const TOP_HEADER_HEIGHT = height * 0.3;
const detailsIcons = [
  { color: "#9FD7F1", icon: "chat-outline" },
  { color: "#F3B000", icon: "trophy-outline" },
  { color: "#F2988F", icon: "account-edit" },
];

const FirmsListDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={[styles.bg, { backgroundColor: item.color }]} />
      <Text style={styles.name}>{item.name}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.iconRow}>
          {detailsIcons.map((detail, index) => {
            return (
              <Icon
                key={`${detail.icon}-${index}`}
                size={64}
                backgroundColor={detail.color}
                name={detail.icon}
              ></Icon>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FirmsListDetailsScreen;

const styles = StyleSheet.create({
  bg: {
    //make borderRadius to 0 instead of removing the property as whole
    //for reference with previous screen
    borderRadius: 0,
    ...StyleSheet.absoluteFillObject,
    //applying height after making it absoluteFillObject
    height: TOP_HEADER_HEIGHT + 32,
  },
  container: {
    flex: 1,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8,
    right: SPACING,
  },
  jobTitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  name: {
    fontWeight: "700",
    fontSize: 20,
    top: TOP_HEADER_HEIGHT - SPACING * 3,
    left: SPACING,
  },
  overlay: {
    position: "absolute",
    width,
    height,
    backgroundColor: colors.white,
    transform: [{ translateY: TOP_HEADER_HEIGHT }],
    borderRadius: 32,
    padding: SPACING,
    paddingTop: 32 + SPACING,
  },
});
