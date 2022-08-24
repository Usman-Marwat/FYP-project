import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, Ionicons, Octicons } from "@expo/vector-icons";
import styles from "../styles/screens/loginStyle";
import appTheme from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { isUserDb } from "../db/demo";

export function Login({ navigation, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  // const { itemId, otherParam } = route.params;

  const verifyCredentials = async () => {
    let item = await AsyncStorage.getItem("@user_me");
    var parsed = await JSON.parse(item);
    if (parsed) {
      //if comming from the onBorading screen to login
      if (parsed.username === username && parsed.password === password)
        setIsLogged(true);
      //if comming to the login screen directly
    } else {
      const isUser = await isUserDb({ username, password });
      if (isUser) {
        await AsyncStorage.setItem(
          "@user_me",
          JSON.stringify({
            username,
            password,
            email,
          })
        );
        setIsLogged(true);
      } else {
        Alert.alert("OOPs!", "The credentials are not correct", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }
  };

  useEffect(() => {
    //if comming from the onBorading screen to login
    if (route.params?.username && route.params?.password) {
      setUsername(route.params.username);
      setPassword(route.params.password);
      setEmail(route.params.email);
    }
    //if coming to the login screen directly
  }, []);

  const handleBackButton = () => {
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handleBackButton()}
        >
          <MaterialIcons name="keyboard-arrow-left" size={25} color="gray" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContent}>
        <Text style={styles.largeText}>Welcome Back!</Text>
        <Text style={styles.smallText}>
          Log into your account &amp; make {"\n"}a successful company
        </Text>
        <View style={styles.inputRow}>
          <Ionicons name="person-outline" size={20} color="gray" />
          <TextInput
            placeholder="Username"
            placeholderTextColor="gray"
            style={styles.textInput}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputRow}>
          <MaterialIcons name="lock-outline" size={20} color="gray" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Octicons name="eye-closed" size={20} color="gray" />
        </View>
        <View style={styles.savePwdRow}>
          <Text style={styles.savePwdText}>Save Password</Text>
          <Switch
            trackColor={{
              false: appTheme.GRADIENT_COLOR1,
              true: appTheme.GRADIENT_COLOR1,
            }}
            ios_backgroundColor={appTheme.GRADIENT_COLOR2}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TouchableOpacity onPress={verifyCredentials}>
          <LinearGradient
            colors={[appTheme.GRADIENT_COLOR1, appTheme.GRADIENT_COLOR2]}
            style={styles.loginBtnWrapper}
          >
            <Text style={styles.loginBtnText}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpBtnWrapper}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.signUpBtnText}>
            Don't have an account? SIGN UP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.indexBtnWrapper}
          onPress={() => navigation.navigate("Onboarding")}
        >
          <Text>Home?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
