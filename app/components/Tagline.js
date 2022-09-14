import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";

const Tagline = () => {
  return (
    <View
      style={{
        // width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#e5e4e2",
        paddingVertical: 10,
        marginTop: 50,
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 15, color: colors.primary }}>
        Select Material
      </Text>
    </View>
  );
};

export default Tagline;

const styles = StyleSheet.create({});
