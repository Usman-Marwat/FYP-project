import {
  Alert,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import AppButton from "./AppButton";
import colors from "../config/colors";
import AppTextInput from "./AppTextInput";

const MaterialInput = ({ modalVisible, onModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => onModalVisible(!modalVisible)}
        ></TouchableOpacity>
        <View style={styles.setModalDimensions("80%", "100%")}>
          <Text style={styles2.boldText}>Add a new Material</Text>
          <AppTextInput
            icon="plus"
            placeholder="hey"
            backgroundColor={colors.light}
          />
          <AppTextInput icon="table" backgroundColor={colors.light} />
          <AppButton title="Add" />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MaterialInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  closeButton: {
    height: 7,
    width: 80,
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  setModalDimensions: (height, width) => ({
    height,
    width,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 10,
    display: "flex",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),
});

const styles2 = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
  },
  textInput: {
    height: 40,
    width: "90%",
    borderRadius: 5,
    borderColor: colors.medium,
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
});
