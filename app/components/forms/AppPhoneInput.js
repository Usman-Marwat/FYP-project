import React, { useState, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useFormikContext } from "formik";

import colors from "../../config/colors";
import ErrorMessage from "./ErrorMessage";
import AppButton from "../AppButton";

const AppPhoneInput = ({ name, onCheck }) => {
  //   const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(null);

  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const handleText = (text) => {
    const valid = phoneInput.current?.isValidNumber(text);
    console.log("checkValid value is " + valid);
    setFieldValue(name, text);
    onCheck(valid);
  };

  return (
    <>
      <View>
        <PhoneInput
          ref={phoneInput}
          containerStyle={{ width: "100%" }}
          defaultCode="PK"
          onChangeText={handleText}
          value={values[name]}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          textInputProps={{
            placeholderTextColor: colors.medium,
            onBlur: () => setFieldTouched(name),
          }}
          textContainerStyle={{ backgroundColor: colors.light }}
          codeTextStyle={{ color: colors.medium, fontWeight: "700" }}
          withShadow
        />
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppPhoneInput;

const styles = StyleSheet.create({});
