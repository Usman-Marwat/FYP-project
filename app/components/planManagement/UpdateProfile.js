import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import styles2 from "./createTaskStyle";
import { combineData } from "../utils/DataHelper";
import { LinearGradient } from "expo-linear-gradient";
import appTheme from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Feather } from "@expo/vector-icons";

export function UpdateProfile({
  navigation,
  modalVisible,
  setModalVisible,
  user,
  updateHandler,
}) {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    newUser: {
      username: user.username,
      designation: user.designation,
      photo: "",
    },
  });

  const handleSetValue = (field, value) => {
    let { newUser } = data;
    newUser[field] = value;
    setData(combineData(data, newUser));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    const photo = await FileSystem.readAsStringAsync(result.uri, {
      encoding: "base64",
    });
    console.log(photo);
    if (!result.cancelled) {
      setImage(result.uri);
    }
    handleSetValue("photo", photo);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <SafeAreaView style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(!modalVisible)}
        ></TouchableOpacity>
        <View style={styles.setModalDimensions("70%", "100%")}>
          <View style={styles2.container}>
            <Text style={styles2.boldText}>Create Task</Text>
            <TextInput
              placeholder="UserName"
              placeholderTextColor="gray"
              style={styles2.textInput}
              value={data.newUser.username}
              onChangeText={(text) => handleSetValue("username", text)}
            />
            <TextInput
              placeholder="Designation"
              placeholderTextColor="gray"
              style={styles2.textInput}
              value={data.newUser.designation}
              onChangeText={(text) => handleSetValue("designation", text)}
            />
            <View style={styles2.teamTextWrapper}>
              {/* <Text style={styles2.teamText}>Select Members</Text> */}
            </View>
            <View style={styles.teamSection}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.teamWrapper}>
                  <TouchableOpacity
                    onPress={() => pickImage()}
                    style={styles.btnWrapper}
                  >
                    <Feather name="image" size={24} color="black" />
                    <Text style={styles.btnText}> Upload Photo</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>

            <TouchableOpacity
              onPress={() => updateHandler(combineData(user, data))}
            >
              <LinearGradient
                colors={[appTheme.GRADIENT_COLOR1, appTheme.GRADIENT_COLOR2]}
                style={styles2.btnWrapper}
              >
                <Text style={styles2.btnText}> Set Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

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
  teamSection: { height: 180, width: "90%" },
  teamWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWrapper: {
    height: 75,
    backgroundColor: appTheme.PRIMARY_COLOR,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 65,
    width: 140,
    borderRadius: 7,
    marginHorizontal: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default UpdateProfile;
