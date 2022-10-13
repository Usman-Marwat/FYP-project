import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import Icon from "../components/Icon";

const BackButton = ({
  navigation,
  iconName = "chevron-left",
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={containerStyle}
    >
      <Icon
        family="mci"
        name={iconName}
        backgroundColor="transparent"
        iconColor="#fff"
        size={55}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
