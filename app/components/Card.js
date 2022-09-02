import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "./AppText";
import colors from "../config/colors";

function Card({
  title,
  subTitle,
  imageUrl,
  onPress,
  thumbnailUrl,
  ...extraProps
}) {
  const { cardStyle, textAlign, imageStyle } = extraProps;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, cardStyle]}>
        <Image
          style={[styles.image, imageStyle]}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
        <View style={styles.detailsContainer}>
          <AppText style={[styles.title, { textAlign }]}>{title}</AppText>
          <AppText style={[styles.subTitle, { textAlign }]}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    //because the image was overflowing
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
