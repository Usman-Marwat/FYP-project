import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import niceColors from "nice-color-palettes";
import { faker } from "@faker-js/faker";
import { SharedElement } from "react-navigation-shared-element";
import Screen from "../../components/Screen";
import { FlatList } from "react-native-gesture-handler";

faker.seed(1);
const buttons = ["Get a free serveice", "Save 10% and buy now!"];
const colors = niceColors[1];
const SPACING = 10;
const data = [
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360483.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360535.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046935.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7153/7153980.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7880/7880183.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046934.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/6664/6664537.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/4982/4982394.png" },
];
const fakerData = data.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  model: faker.commerce.product(),
  description: [...Array(2).keys()]
    .map(faker.commerce.productDescription)
    .join(". ")
    .substring(0, 20),
}));
const ITEM_SIZE = 120;
const BG_COLOR = "#C1CEE077";

const OngoingContracts = () => {
  return (
    <Screen>
      <FlatList
        contentContainerStyle={{ padding: SPACING }}
        data={fakerData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <View style={styles.item}>
                <View>
                  <Text style={styles.model}>{item.model}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
};

export default OngoingContracts;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    opacity: 0.7,
  },
  item: {
    height: ITEM_SIZE * 1.7,
    borderRadius: 12,
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: BG_COLOR,
    overflow: "hidden",
  },
  image: {
    height: ITEM_SIZE * 1.2,
    width: "100%",
    position: "absolute",
    resizeMode: "contain",
    bottom: 10,
    right: "-30%",
  },
  model: {
    fontSize: 18,
    fontWeight: "700",
  },
});
