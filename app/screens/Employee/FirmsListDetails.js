import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { SharedElement } from "react-navigation-shared-element";

import Icon from "../../components/Icon";
import colors from "../../config/colors";
import BackButton from "../../navigation/BackButton";

const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.18;
const SPACING = 10;
const TOP_HEADER_HEIGHT = height * 0.27;
const detailsIcons = [
  { color: "#F2988F", icon: "profile", family: "antDesign" },
  { color: "#F3B000", icon: "trophy-outline", family: "ionicons" },
  { color: "#9FD7F1", icon: "chat-outline", family: "mci" },
];
const DURATION = 400;

const FirmsListDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <BackButton
        navigation={navigation}
        containerStyle={{ position: "absolute", top: 25, left: 10, zIndex: 1 }}
      />
      <SharedElement
        id={`item.${item.key}.bg`}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={[styles.bg, { backgroundColor: item.color }]} />
      </SharedElement>
      <SharedElement
        id={`item.${item.key}.name`}
        style={{ alignItems: "flex-start" }}
      >
        <Text style={styles.name}>{item.name}</Text>
      </SharedElement>
      <SharedElement id={`item.${item.key}.image`}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </SharedElement>

      <SharedElement id="general.bg">
        <View style={styles.overlay}>
          <ScrollView>
            <View style={styles.iconRow}>
              {detailsIcons.map((detail, index) => {
                return (
                  <Animatable.View
                    animation="bounceIn"
                    delay={DURATION + index * 100}
                    key={`${detail.icon}-${index}`}
                  >
                    <TouchableOpacity activeOpacity={0.5}>
                      <Icon
                        family={detail.family}
                        size={64}
                        backgroundColor={detail.color}
                        name={detail.icon}
                      />
                    </TouchableOpacity>
                  </Animatable.View>
                );
              })}
            </View>

            {item.categories.map((category, index) => {
              return (
                <Animatable.View
                  animation="fadeInUp"
                  delay={DURATION * 2 + index * 200}
                  key={category.key}
                  style={{ marginVertical: SPACING }}
                >
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
                </Animatable.View>
              );
            })}
          </ScrollView>
        </View>
      </SharedElement>
    </View>
  );
};

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
    width: ITEM_HEIGHT * 1.3,
    height: ITEM_HEIGHT * 1.3,
    resizeMode: "contain",
    position: "absolute",
    top: TOP_HEADER_HEIGHT - ITEM_HEIGHT * 1.5,
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
    fontWeight: "500",
    fontSize: 40,
    letterSpacing: 3,
    color: colors.white,
    top: TOP_HEADER_HEIGHT - SPACING * 8,
    left: SPACING * 3,
  },
  overlay: {
    position: "absolute",
    width,
    height,
    backgroundColor: colors.white,
    transform: [{ translateY: TOP_HEADER_HEIGHT - 40 }],
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

export default FirmsListDetailsScreen;
