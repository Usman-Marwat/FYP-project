import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import MenuFoldButton from "../navigation/MenuFoldButton";
import colors from "../config/colors";
import Icon from "./Icon";
import BackButton from "../navigation/BackButton";
const { height, width } = Dimensions.get("window");

const Header = ({ navigation, translateX, heading }) => {
  return (
    <View style={[styles.headerContainer, styles.shadow]}>
      <BackButton navigation={navigation} />
      {heading && (
        <View style={[styles.holder]}>
          <Text style={[styles.title]}>{heading}</Text>
        </View>
      )}

      <MenuFoldButton
        navigation={navigation}
        translateX={translateX}
        menuFoldPosition="relative"
      />
      {/* 
      <View
        style={[
          {
            position: "absolute",
            width: "170%",
            height: 60,
            top: 0,
            backgroundColor: "white",
            opacity: 0.7,
            zIndex: -1,
          },
          styles.shadow,
        ]}
      /> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 17,
    borderBottomColor: "silver",

    position: "absolute",
    top: 2,
    zIndex: 1,
  },
  title: {
    fontWeight: "500",
    fontSize: 15,
    zIndex: 1,
  },
  shadow: {
    // backgroundColor: "white",
    shadowColor: "silver",
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  holder: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 17,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "white",
  },
});

/* 
 <View
        style={[
          styles.shadow,
          {
            backgroundColor: "white",
            position: "absolute",

            top: 30,
            left: width / 4,
            height: 15,
            width: width / 2,
            borderRadius: 200,
          },
        ]}
      /> */
