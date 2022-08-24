import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Illustration from "../assets/pic2.jpg";
import styles from "../styles/screens/onboardingStyle";
import { LinearGradient } from "expo-linear-gradient";
import appTheme from "../constants/colors";

export function Onboarding({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.illustrationWrapper}>
        <Image source={Illustration} style={styles.illustrationContent} />
      </View>
      <Text style={styles.largeText}>Smart Construction Contractor</Text>
      <Text style={styles.smallText}>
        This smart tool is designed to help you {"\n"} organize your work,
        evaluate your progress{"\n"}better manage your tasks
      </Text>
      <TouchableOpacity
        style={styles.loginBtnWrapper}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginBtnText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <LinearGradient
          colors={[appTheme.GRADIENT_COLOR1, appTheme.GRADIENT_COLOR2]}
          style={styles.signUpBtnWrapper}
        >
          <Text style={styles.signUpBtnText}>REGISTER</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
