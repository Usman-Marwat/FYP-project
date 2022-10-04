import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { faker } from "@faker-js/faker";

import customerContractApi from "../../api/Customer/contract";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import MenuFoldButton from "../../navigation/MenuFoldButton";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import useApi from "../../hooks/useApi";

faker.seed(1);

const SPACING = 10;
const data = [
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360483.png" },
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

const BidsScreen = ({ navigation }) => {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  return (
    <>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <FlatList
        contentContainerStyle={{ padding: SPACING }}
        style={{ paddingTop: 70 }}
        data={fakerData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("BidsDetail")}>
              <View style={styles.item}>
                <View>
                  <Text style={styles.model}>{item.model}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default BidsScreen;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    opacity: 0.7,
    position: "absolute",
    top: SPACING + 17,
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
    bottom: 10,
    right: "-60%",
  },
  model: {
    fontSize: 18,
    fontWeight: "700",
    position: "absolute",
  },
});
