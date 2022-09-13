import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

import MenuFoldButton from "../navigation/MenuFoldButton";
import colors from "../config/colors";

const { height, width } = Dimensions.get("window");

const Header = ({ navigation, translateX }) => {
  return (
    <View style={[styles.headerContainer, styles.shadow]}>
      <Button title="back" onPress={() => navigation.goBack()} />
      <Text style={[styles.title]}>Add Specificatons</Text>
      <MenuFoldButton
        navigation={navigation}
        translateX={translateX}
        menuFoldPosition="relative"
      />
      <View
        style={[
          styles.shadow,
          {
            position: "absolute",

            top: 50,
            left: width / 4,
            height: 15,
            width: width / 2,
            borderRadius: 200,
          },
        ]}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 17,

    position: "absolute",
    top: 2,
    zIndex: 1,
  },
  title: {
    fontWeight: "700",
    fontSize: 13,
    zIndex: 1,
  },
  shadow: {
    backgroundColor: "white",
    shadowColor: "siver",
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
