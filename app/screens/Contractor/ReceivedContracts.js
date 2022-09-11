import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import niceColors from "nice-color-palettes";
import { faker } from "@faker-js/faker";
import { SharedElement } from "react-navigation-shared-element";

import Screen from "../../components/Screen";
import routes from "../../navigation/routes";

faker.seed(1);
const colors = niceColors[1];

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

const tabs = ["All", "Building", "Plumbing", "Electrician", "Painting"];
const fakerData = data.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  subType: faker.commerce.productName(),
  color: `${colors[index % colors.length]}66`,
  fullColor: colors[index % colors.length],

  description: [...Array(2).keys()]
    .map(faker.commerce.productDescription)
    .join(". "),
  price: `$${(faker.random.numeric(200) + 50) / 100}`,
  subcategories: faker.helpers.shuffle(data).slice(0, 3),
}));

const { height, width } = Dimensions.get("window");

const ORANGE = "#FB9B06";
const SPACING = 10;
const CELL_WIDTH = width * 0.64;
const CELL_HEIGHT = CELL_WIDTH * 1.4;

const ReceivedContracts = () => {
  return (
    <View>
      <Text>ReceivedContracts</Text>
    </View>
  );
};

export default ReceivedContracts;

const styles = StyleSheet.create({});
