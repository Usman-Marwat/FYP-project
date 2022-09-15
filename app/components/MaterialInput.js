import {
  Alert,
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import FormImagePicker from "./forms/FormImagePicker";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).label("Price"),
});

const MaterialInput = ({ modalVisible, onModalVisible }) => {
  const handleSubmit = () => {};
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
          <Text style={styles.boldText}>Add a new Material</Text>
          <Form
            initialValues={{
              material: "",
              category: "",
              description: "",
              images: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              width={"70%"}
              name="material"
              placeholder="Material"
              backgroundColor={colors.light}
            />
            <AppFormField
              name="category"
              placeholder="Category"
              width={"50%"}
            />

            <AppFormField
              minHeight={120}
              multiline
              name="description"
              numberOfLines={3}
              placeholder="Description"
            />
            <FormImagePicker name="images" />
            <View style={styles.buttonContainer}>
              <SubmitButton title="Add" />
            </View>
          </Form>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MaterialInput;

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 60,
  },
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
