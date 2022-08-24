import React, { useState, useEffect } from "react";
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
// import { CreateProject } from "../Project";
// import { CreateTask } from "../Task";
import styles2 from "./createTaskStyle";
import { AuthContext } from "../context";
import { combineData } from "../utils/DataHelper";
import { addTask, getMembers } from "../db/demo";
import { EmptyListComponent } from "../components/EmptyListComponent";
import { NavigationContainer } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import appTheme from "../constants/colors";
import membersApi from "../api/members";
import tasksApi from "../api/tasks";

export function CreateTask({
  modalVisible,
  setModalVisible,
  ProjectId,
  getDataP,
}) {
  const [members, setMembers] = useState([]);
  const [data, setData] = useState({
    newTask: {
      ProjectId,
      id: Math.random().toString(),
      title: "",
      description: "",
      selectedMembers: [],
      progress: Math.floor(Math.random() * 100) + 1,
    },
  });

  const getData = async () => {
    try {
      let membersDb = await membersApi.getMembers();
      setMembers(membersDb.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSetValue = (field, value) => {
    //component will not re render when we are modifying newTask
    //because this newTask variable is a new variable
    let { newTask } = data;
    if (field === "selectedMembers") {
      let { selectedMembers } = newTask;
      const foundIndex = selectedMembers?.findIndex((a) => a?.id === value?.id);
      if (foundIndex === -1) {
        selectedMembers.push(value);
      } else {
        selectedMembers = selectedMembers.filter((a) => a?.id !== value?.id);
      }
      newTask["selectedMembers"] = selectedMembers;
    } else {
      newTask[field] = value;
    }

    setData(
      combineData(data, {
        newTask,
      })
    );
  };

  const isSelectedMember = (member) => {
    let value;
    let { selectedMembers } = data?.newTask;
    const foundIndex = selectedMembers?.findIndex(
      (a) => a?.id?.toLowerCase() == member?.id?.toLowerCase()
    );
    if (foundIndex > -1) {
      value = true;
    }
    return value;
  };

  const handleTaskAssign = () => {
    console.log("--------------------------------------------");
    console.log(data.newTask);
    console.log("--------------------------------------------");
    tasksApi.addTask(data.newTask);
    setModalVisible(!modalVisible);
    getDataP();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(!modalVisible)}
        ></TouchableOpacity>
        <View style={styles.setModalDimensions("80%", "100%")}>
          <View style={styles2.container}>
            <Text style={styles2.boldText}>Create Task</Text>
            <TextInput
              placeholder="Title"
              placeholderTextColor="gray"
              style={styles2.textInput}
              onChangeText={(text) => handleSetValue("title", text)}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="gray"
              style={[styles2.textInput]}
              onChangeText={(text) => handleSetValue("description", text)}
            />
            <View style={styles2.teamTextWrapper}>
              <Text style={styles2.teamText}>Select Members</Text>
            </View>
            {members?.length ? (
              <View style={styles2.teamSection}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles2.teamWrapper}>
                    {members?.map((member) => (
                      <TouchableOpacity
                        key={Math.random().toString()}
                        style={[
                          styles2.memberWrapper,
                          isSelectedMember(member)
                            ? styles2.activeTeamWrapper
                            : null,
                        ]}
                        onPress={() =>
                          handleSetValue("selectedMembers", member)
                        }
                      >
                        <Image
                          style={styles2.memberPhoto}
                          source={{ uri: member?.profile_image.small }}
                        />
                        <Text
                          style={[
                            styles2.memberName,
                            isSelectedMember(member)
                              ? styles2.activeMemberName
                              : null,
                          ]}
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {member?.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            ) : (
              <EmptyListComponent />
            )}
            <TouchableOpacity onPress={() => handleTaskAssign()}>
              <LinearGradient
                colors={[appTheme.GRADIENT_COLOR1, appTheme.GRADIENT_COLOR2]}
                style={styles2.btnWrapper}
              >
                <Text style={styles2.btnText}> Assign</Text>
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
});

export default CreateTask;
