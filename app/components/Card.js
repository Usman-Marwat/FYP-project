import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "./AppText";
import colors from "../config/colors";

function Card({
  title,
  subTitle,
  imageUrl,
  IconComponent,
  onPress,
  thumbnailUrl,
  ...extraProps
}) {
  const { cardStyle, imageStyle, contentStyle, heading } = extraProps;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, cardStyle]}>
        {heading && (
          <Text style={{ color: colors.medium, fontSize: "17" }}>
            {heading}
          </Text>
        )}
        <Image
          style={[styles.image, imageStyle]}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
        <View style={[styles.detailsContainer, contentStyle]}>
          <AppText style={[styles.title]}>{title}</AppText>
          {subTitle && <AppText style={[styles.subTitle]}>{subTitle}</AppText>}
          {IconComponent}
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
    color: "black",
    fontSize: 20,
    fontWeight: "700",
  },
});

export default Card;
