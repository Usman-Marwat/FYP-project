import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../../components/Screen";

const { height, width } = Dimensions.get("window");
const SPACING = 10;
const CELL_WIDTH = width * 0.64;

const ReceivedContractDetails = ({ navigatio, route }) => {
  const { item } = route.params;
  return (
    <Screen>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: item.color, borderRadius: 16 },
        ]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.subType}>{item.subType}</Text>
      </View>
      <View style={{ marginTop: height * 0.1 }}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: SPACING * 3,
          }}
        >
          {item.subCategories.map((subCategory, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: "white",
                  padding: SPACING,
                  borderRadius: 50,
                }}
              >
                <Image
                  style={styles.iconImage}
                  source={{ uri: subCategory.image }}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View style={{ padding: SPACING }}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </Screen>
  );
};

export default ReceivedContractDetails;

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },
  image: {
    width: CELL_WIDTH * 0.7,
    height: CELL_WIDTH * 0.7,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: SPACING * 4,
  },
  iconImage: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: SPACING / 2,
  },
  subType: {
    color: "grey",
  },
  type: { fontWeight: "800" },
  textContainer: {
    position: "absolute",
    left: SPACING * 2,
    top: SPACING * 4,
  },
});
