import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import niceColors from "nice-color-palettes";
import { AntDesign } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";

import Screen from "../../components/Screen";

const { height, width } = Dimensions.get("window");
const SPACING = 10;
const colors = [...niceColors[1], ...niceColors[2]];
const buttons = ["Get a free serveice", "Save 10% and buy now!"];

const OngoingContractsDetails = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <View>
      <SharedElement id={`item.${item.key}.image`} style={styles.image}>
        <Image
          source={{ uri: item.image }}
          style={{
            resizeMode: "contain",
            width: width * 2.1,
            height: width * 0.7,
          }}
        />
      </SharedElement>
      <View style={styles.meta}>
        <SharedElement id={`item.${item.key}.modal`}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.model}>
            {item.model}
          </Text>
        </SharedElement>
        <SharedElement id={`item.${item.key}.description`}>
          <Text style={styles.description}>{item.description}</Text>
        </SharedElement>
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
    </View>
  );
};

export default OngoingContractsDetails;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    opacity: 0.7,
    position: "absolute",
    top: SPACING + 30,
  },
  image: {
    width: width * 2.1,
    height: width * 0.7,
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
    position: "absolute",
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
