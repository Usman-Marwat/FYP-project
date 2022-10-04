import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import Icon from "../components/Icon";

const BackButton = ({ navigation, iconName = "arrowleft", containerStyle }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={containerStyle}
    >
      <Icon
        family="antDesign"
        name={iconName}
        backgroundColor="white"
        size={35}
        iconColor="#222"
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
