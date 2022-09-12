import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { faker } from "@faker-js/faker";
import { SharedElement } from "react-navigation-shared-element";

import Screen from "../../components/Screen";
import routes from "../../navigation/routes";
import MenuFoldButton from "../../navigation/MenuFoldButton";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";

faker.seed(1);

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

const OngoingContracts = ({ navigation }) => {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  return (
    <View>
      <MenuFoldButton translateX={translateX} navigation={navigation} />

      <FlatList
        contentContainerStyle={{ padding: SPACING }}
        style={{ paddingTop: 70 }}
        data={fakerData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.ONGOING_CONTRACTS_DETAILS, { item })
              }
            >
              <View style={styles.item}>
                <View>
                  <SharedElement id={`item.${item.key}.modal`}>
                    <Text style={styles.model}>{item.model}</Text>
                  </SharedElement>
                  <SharedElement id={`item.${item.key}.description`}>
                    <Text style={styles.description}>{item.description}</Text>
                  </SharedElement>
                </View>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={styles.image}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ flex: 1, resizeMode: "contain" }}
                  />
                </SharedElement>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default OngoingContracts;

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
    right: "-30%",
  },
  model: {
    fontSize: 18,
    fontWeight: "700",
    position: "absolute",
  },
});
