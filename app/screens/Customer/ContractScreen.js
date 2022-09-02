import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ProfileHeader } from "@freakycoder/react-native-header-view";
import { Left } from "react-native-component-separator";

import Screen from "../../components/Screen";

const staticData = [
  {
    title: "",
    value: "8,984",
    unit: "Steps",
    primaryColor: "#10CFE4",
    imageSource: require("../../assets/icon.png"),
  },
  {
    title: "",
    value: "2.6",
    unit: "Mil",
    primaryColor: "#c84cf0",
    imageSource: require("../../assets/icon.png"),
  },
  {
    title: "",
    value: "9501",
    unit: "Stoke",
    primaryColor: "#10E471",
    imageSource: require("../../assets/icon.png"),
  },
];

const imageUrl =
  "https://images.unsplash.com/photo-1661977597155-1277a81affcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";

const ContractScreen = () => {
  return (
    <Screen>
      <ProfileHeader height={70} />
      <View style={styles.separator}>
        <Left borderColor="#e0e0e0" color="#616161">
          House Building
        </Left>
      </View>
    </Screen>
  );
};

export default ContractScreen;

const styles = StyleSheet.create({
  separator: {
    paddingLeft: 15,
    paddingRight: 30,
    marginVertical: 35,
    marginBottom: 15,
  },
});

/* 
import RNBounceable from "@freakycoder/react-native-bounceable";


You can put ANY children component inside the RNBounceable component, it will make it bounce when it is pressed

<RNBounceable onPress={() => {}}>
  <View style={styles.bounceButtonStyle}>
    <Text style={styles.bounceButtonTextStyle}>Bounce</Text>
  </View>
</RNBounceable>

*/
