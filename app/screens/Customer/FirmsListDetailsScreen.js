import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { interpolate } from "react-native-reanimated";
import Icon from "../../components/Icon";
import colors from "../../config/colors";

const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.18;
const SPACING = 10;
const TOP_HEADER_HEIGHT = height * 0.3;
const detailsIcons = [
  { color: "#9FD7F1", icon: "chat-outline" },
  { color: "#F3B000", icon: "trophy-outline" },
  { color: "#F2988F", icon: "account-edit" },
];

const FirmsListDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={[styles.bg, { backgroundColor: item.color }]} />
      <Text style={styles.name}>{item.name}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.overlay}>
        <ScrollView>
          <View style={styles.iconRow}>
            {detailsIcons.map((detail, index) => {
              return (
                <Icon
                  key={`${detail.icon}-${index}`}
                  size={64}
                  backgroundColor={detail.color}
                  name={detail.icon}
                ></Icon>
              );
            })}
          </View>
          <View style={{ flex: 1 }}>
            {item.categories.map((category) => {
              return (
                <View key={category.key} style={{ marginVertical: SPACING }}>
                  <Text style={styles.title}>{category.title}</Text>
                  {category.subcats.map((subcat, index) => {
                    return (
                      <View style={styles.list} key={index}>
                        <View
                          style={[
                            styles.listItemDot,
                            { backgroundColor: item.color },
                          ]}
                        />
                        <Text style={styles.subTitle}>{subcat}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default FirmsListDetailsScreen;

const styles = StyleSheet.create({
  bg: {
    //make borderRadius to 0 instead of removing the property as whole
    //for reference with previous screen
    borderRadius: 0,
    ...StyleSheet.absoluteFillObject,
    //applying height after making it absoluteFillObject
    height: TOP_HEADER_HEIGHT + 32,
  },
  container: {
    flex: 1,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: SPACING,
    marginBottom: SPACING + 32,
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8,
    right: SPACING,
  },
  jobTitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING / 2,
    marginLeft: SPACING,
  },
  listItemDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: SPACING,
  },
  name: {
    fontWeight: "700",
    fontSize: 20,
    top: TOP_HEADER_HEIGHT - SPACING * 3,
    left: SPACING,
  },
  overlay: {
    position: "absolute",
    width,
    height,
    backgroundColor: colors.white,
    transform: [{ translateY: TOP_HEADER_HEIGHT }],
    borderRadius: 32,
    padding: SPACING,
    paddingTop: 32 + SPACING,
    flex: 1,
  },
  subTitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: SPACING,
  },
});
