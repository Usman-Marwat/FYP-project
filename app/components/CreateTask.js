import {
  Image,
  Modal,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import AppButton from "./AppButton";
import AuthContext from "../auth/context";
import AppTextInput from "./AppTextInput";
import colors from "../config/colors";
import membersApi from "../api/members";
import messagesApi from "../api/messages";
import tasksApi from "../api/tasks";
import useApi from "../hooks/useApi";

const dataImages = [
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360483.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360535.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046935.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7153/7153980.png" },
];

const CreateTask = ({ modalVisible, setModalVisible, ProjectId, getDataP }) => {
  const [members, setMembers] = useState([]);
  const [newTask, setNewTask] = useState({
    ProjectId,
    id: Math.random().toString(),
    title: "",
    description: "",
    selectedMembers: [],
    progress: Math.floor(Math.random() * 100) + 1,
  });
  const { user } = useContext(AuthContext);
  const sendApi = useApi(messagesApi.send);

  const getData = async () => {
    let result = await membersApi.getMembers();
    if (result.ok) setMembers(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSetValue = (field, value) => {
    let task = { ...newTask };
    if (field === "selectedMembers") {
      let { selectedMembers } = task;
      const foundIndex = selectedMembers?.findIndex((a) => a?.id === value?.id);
      if (foundIndex === -1) selectedMembers.push(value);
      else selectedMembers = selectedMembers.filter((a) => a?.id !== value?.id);
      task["selectedMembers"] = selectedMembers;
    } else task[field] = value;
    setNewTask(task);
  };

  const isSelectedMember = (member) => {
    let { selectedMembers } = newTask;
    const foundIndex = selectedMembers?.findIndex(
      (a) => a?.id?.toLowerCase() == member?.id?.toLowerCase()
    );
    if (foundIndex > -1) return true;
  };

  const handleTaskAssign = () => {
    console.log("---------------------------------------------------");
    console.log(newTask);
    console.log("--------------------------------------------");
    // tasksApi.addTask(data.newTask);
    setModalVisible(!modalVisible);
    sendNotification();
    // getDataP();
  };

  const sendNotification = async () => {
    await sendApi.request(
      "Employee",
      "6342be186f0cc9835d9de5e0",
      `Contractor Name: ${user.name}`,
      user.name,
      `Task Assigned`
    );
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
            <AppTextInput placeholder="Title" />
            <AppTextInput placeholder="Description" />

            <Text style={styles2.teamText}>Select Members</Text>
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
                      onPress={() => handleSetValue("selectedMembers", member)}
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
                        {member.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <AppButton title="Assign" onPress={handleTaskAssign} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
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

  teamText: {
    fontSize: 17,
    textAlign: "center",
    color: colors.medium,
    paddingLeft: 7,
    marginVertical: 20,
  },
  btnWrapper: {
    height: 35,
    backgroundColor: colors.primary,
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
  teamSection: {
    height: 180,
    width: "90%",
  },
  teamWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  activeTeamWrapper: {
    backgroundColor: "silver",
  },
  memberWrapper: {
    width: "23%",
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
  memberPhoto: { height: 40, width: 40, borderRadius: 50 },
  memberName: { width: 60, textAlign: "center", color: "#000", fontSize: 13 },
  activeMemberName: { color: "#fff" },
});
