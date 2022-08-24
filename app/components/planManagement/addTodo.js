import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import appTheme from "../constants/colors";

export default function AddTodo({
  submitHandler,
  toggleBtns,
  setToggleBtns,
  updateHandler,
  updateText,
  UpdateCurrent,
}) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(updateText);
    console.log(text + "-----------");
  }, [updateText]);
  const changeHandler = (val) => {
    setText(val);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new todo..."
        onChangeText={changeHandler}
        value={text}
      />
      {!toggleBtns && (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => submitHandler(text)}>
            <LinearGradient
              colors={[appTheme.GRADIENT_COLOR1, appTheme.GRADIENT_COLOR2]}
              style={styles.btnWrapper}
            >
              <Text style={styles.btnText}>Add Todo</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
      {toggleBtns && (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => UpdateCurrent(text)}>
            <LinearGradient
              colors={[appTheme.GRADIENT_COLOR1, appTheme.GRADIENT_COLOR2]}
              style={styles.btnWrapper}
            >
              <Text style={styles.btnText}>Update</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  btnWrapper: {
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: 140,
    borderRadius: 7,
    marginHorizontal: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});
