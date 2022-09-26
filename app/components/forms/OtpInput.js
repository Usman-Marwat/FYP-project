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

const otpLength = 6;

const OtpInput = ({ otpVisible, onOtpVisible, onSendOtp }) => {
  const [disabled, setDisabled] = useState(true);
  const [otp, setOtp] = useState("");

  const handleInputText = (text) => {
    setOtp(text);
    if (text.length === otpLength) setDisabled(false);
    else setDisabled(true);
  };

  return (
    <Modal
      animationType="slide"
      visible={otpVisible}
      style={{ backgroundColor: "red", flex: 1 }}
    >
      <Button title="Close" onPress={() => onOtpVisible(!otpVisible)} />
      <SafeAreaView style={styles.modalContainer}>
        <Text style={styles.text}>Enter Email Otp</Text>
        <View style={styles.wrapper}>
          <OTPTextInput
            textInputStyle={styles.textInput}
            handleTextChange={handleInputText}
            inputCount={6}
            tintColor="#ff355e"
          />
          <AppButton
            disabled={disabled}
            title="Send"
            titleStyle={{ color: colors.primary }}
            style={styles.buttonStyle}
            onPress={() => {
              onSendOtp(otp);
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.white,
    width: 120,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.07)",
  },
  text: {
    // color: colors.white,
    fontWeight: "700",
    fontSize: 25,
    textTransform: "uppercase",
  },
  textInput: {
    marginHorizontal: 7,
    borderWidth: 1,
    backgroundColor: "white",
  },
  wrapper: {
    // backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginHorizontal: 2,
    marginVertical: 10,
    borderRadius: 10,
  },
});
