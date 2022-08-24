import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}

//we see that background color is not accessible here in styles. (if we are not using inline styling then)
//For that we would need to have a global variable and a state variable to update that global variable.
// const styles = StyleSheet.create({
//   container: {
//     width: size,
//     height: size,
//     borderRadius: size / 2,
//     backgroundColor,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

export default Icon;
