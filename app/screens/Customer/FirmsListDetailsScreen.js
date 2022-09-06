import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { interpolate } from "react-native-reanimated";

const FirmsListDetailsScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>{route.params.item.key}</Text>
    </View>
  );
};

export default FirmsListDetailsScreen;

const styles = StyleSheet.create({});
