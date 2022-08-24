import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import AppButton from "../components/AppButton";

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={7}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-red.png")}
        ></Image>
        <Text style={styles.tagLine}> Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate("Login")} />
        <View style={styles.spaceView} />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate("Register")}
        />
        <View style={styles.spaceView} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    width: "100%",
  },
  // loginButton: {
  //   width: "100%",
  //   height: 70,
  //   backgroundColor: "#fc5c65",
  // },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  // registerButton: {
  //   width: "100%",
  //   height: 70,
  //   backgroundColor: "#4ecdc4",
  // },
  spaceView: {
    height: 17,
  },
  tagLine: {
    fontSize: 25,
    fontWeight: "600",
    marginVertical: 10,
  },
});
