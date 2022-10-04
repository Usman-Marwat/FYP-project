import React from "react";
import { StyleSheet, View } from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

function Icon({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
  style,
  family,
}) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      {family === "antDesign" && (
        <AntDesign name={name} color={iconColor} size={size * 0.5} />
      )}
      {family === "ionicons" && (
        <Ionicons name={name} color={iconColor} size={size * 0.5} />
      )}
      {family === "mci" && (
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.5}
        />
      )}
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
