import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import niceColors from "nice-color-palettes";
import { AntDesign } from "@expo/vector-icons";

import Screen from "../../components/Screen";

const { height, width } = Dimensions.get("window");
const SPACING = 10;
const colors = [...niceColors[1], ...niceColors[2]];
const buttons = ["Get a free serveice", "Save 10% and buy now!"];

const OngoingContractsDetails = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <Screen>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.meta}>
        <Text style={styles.model}>{item.model}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: SPACING }}
        style={{ flexGrow: 0, marginVertical: SPACING }}
      >
        {colors.map((color, index) => {
          return (
            <View
              key={index}
              style={[styles.swatch, { backgroundColor: color }]}
            ></View>
          );
        })}
      </ScrollView>
      {buttons.map((text, index) => {
        return <RowButton key={index} text={text} />;
      })}
    </Screen>
  );
};

export default OngoingContractsDetails;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    opacity: 0.7,
  },
  image: {
    width: width * 2.1,
    height: width * 0.9,
    resizeMode: "contain",
  },
  meta: {
    position: "absolute",
    top: SPACING * 4,
    left: SPACING,
    width: width * 0.6,
  },
  model: {
    fontSize: 32,
    fontWeight: "700",
  },
  swatch: {
    height: 56,
    width: 56,
    borderRadius: 16,
    marginRight: SPACING,
  },
});

const RowButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          padding: SPACING * 2,
          justifyContent: "space-between",
          borderColor: "rgba(0,0,0,0.1)",
          borderBottomWidth: 1,
          borderTopWidth: 1,
        }}
      >
        <Text style={{ fontSize: 14 }}>{text}</Text>
        <AntDesign name="arrowright" color="rgba(0,0,0,0.8)" size={17} />
      </View>
    </TouchableOpacity>
  );
};
