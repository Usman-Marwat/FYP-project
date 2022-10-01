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
import React, { useState } from "react";
import AppButton from "./AppButton";
import AppTextInput from "./AppTextInput";
import colors from "../config/colors";
import { combineData } from "../utility/dataHelper";

const dataImages = [
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360483.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360535.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046935.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7153/7153980.png" },
];

const CreateTask = ({ modalVisible, setModalVisible, ProjectId, getDataP }) => {
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

  //   const getData = async () => {
  //     try {
  //       let membersDb = await membersApi.getMembers();
  //       setMembers(membersDb.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getData();
  //   }, []);

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
            <AppTextInput placeholder="Title" />
            <AppTextInput placeholder="Description" />
            <View style={styles2.teamTextWrapper}>
              <Text style={styles2.teamText}>Select Members</Text>
            </View>

            <View style={styles2.teamSection}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles2.teamWrapper}>
                  {dataImages?.map((member) => (
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
                        source={{ uri: member?.image }}
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
                        name
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
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    display: "flex",
    alignItems: "center",
  },
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
    borderColor: colors.light,
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 7,
  },
  teamTextWrapper: { width: "90%", marginBottom: 10 },
  teamText: {
    fontSize: 17,
    color: "gray",
    paddingLeft: 7,
    marginTop: 20,
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
  teamSection: { height: 180, width: "90%" },
  teamWrapper: {
    display: "flex",
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
