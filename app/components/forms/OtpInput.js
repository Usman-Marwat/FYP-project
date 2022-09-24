import React, { useState, useRef } from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import colors from "../../config/colors";
import AppButton from "../AppButton";

const OtpInput = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const handleInputText = (text) => {
    console.log(text);
  };
  return (
    <Modal visible={isVisible} style={{ backgroundColor: "red", flex: 1 }}>
      <SafeAreaView style={styles.modalContainer}>
        <Text style={styles.text}>Enter your otp</Text>
        <View style={styles.wrapper}>
          <OTPTextInput
            textInputStyle={{ marginHorizontal: 25, borderWidth: 1 }}
            handleTextChange={handleInputText}
            tintColor="#ff355e"
          />
        </View>
        <AppButton
          disabled={isDisabled}
          title="Send"
          onPress={() => setIsVisible(false)}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  text: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 25,
    textTransform: "uppercase",
  },
  wrapper: {
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
});
