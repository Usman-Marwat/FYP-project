import React, { useContext, useState, useEffect } from "react";
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

export function CreateProject({ modalVisible, setModalVisible }) {
  const members = [
    {
      id: "1234A",
      name: "Mary Houston",
      photo:
        "https://images.unsplash.com/photo-1609132718484-cc90df3417f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "2345B",
      name: "Alex Johan",
      photo:
        "https://images.unsplash.com/photo-1590031905406-f18a426d772d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHxwcm9maWxlJTIwcGhvdG98ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "3456C",
      name: "Veronica Tshult",
      photo:
        "https://images.unsplash.com/photo-1541787457429-b1766a4766b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE1fHxwcm9maWxlJTIwcGhvdG98ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "4567D",
      name: "Bayo Olade",
      photo:
        "https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "5678E",
      name: "Ahmad Hussein",
      photo:
        "https://images.unsplash.com/photo-1542178243-bc20204b769f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "6789F",
      name: "Gina Malo",
      photo:
        "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHdvbWVuJTIwcHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "7890G",
      name: "Wilfred Opeh",
      photo:
        "https://images.unsplash.com/photo-1573341830496-e89fcae7f5eb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fHdvbWVuJTIwcHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "8901H",
      name: "Stacy Abraham",
      photo:
        "https://images.unsplash.com/photo-1606247193592-53da505571f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHdvbWVuJTIwcHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "9012I",
      name: "Owen McClaren",
      photo:
        "https://images.unsplash.com/photo-1611774119019-461b5dbd3ae8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHdvbWVuJTIwcHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "0123J",
      name: "David Judah",
      photo:
        "https://images.unsplash.com/photo-1610261003803-224ee66747e1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWVuJTIwcHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "1234K",
      name: "Blessing Opharevhe",
      photo:
        "https://images.unsplash.com/photo-1612983133700-739c8f358334?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHdvbWVuJTIwcHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
    {
      id: "2345L",
      name: "Chinwe Joseph",
      photo:
        "https://images.unsplash.com/photo-1607050132114-8241718a5b4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHdvbWVuJTIwcHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      designation: "Lead Designer",
      lastSeen: "4:20 PM",
    },
  ];
  const [data, setData] = useState({
    newTask: { title: "", description: "", selectedMembers: [] },
  });
  const handleSetValue = (field, value) => {
    let { newProject } = data;
    if (field === "selectedMembers") {
      let { selectedMembers } = newProject;
      const foundIndex = selectedMembers?.findIndex((a) => a?.id === value?.id);
      if (foundIndex === -1) {
        selectedMembers.push(value);
      } else {
        selectedMembers = selectedMembers.filter((a) => a?.id !== value?.id);
      }
      newProject["selectedMembers"] = selectedMembers;
    } else {
      newProject[field] = value;
    }

    setData(
      combineData(data, {
        newProject,
      })
    );
  };

  const isSelectedMember = (member) => {
    let value;
    let { selectedMembers } = data?.newProject;
    const foundIndex = selectedMembers?.findIndex(
      (a) => a?.id?.toLowerCase() == member?.id?.toLowerCase()
    );
    if (foundIndex > -1) {
      value = true;
    }
    return value;
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
            <Text style={styles2.boldText}>Create Project</Text>
            <TextInput
              placeholder="Title"
              placeholderTextColor="gray"
              style={styles2.textInput}
              onChangeText={(text) => handleSetValue("title", text)}
            />
            <TextInput
              placeholder="Description"
              placeholderTextColor="gray"
              style={styles2.textInput}
              onChangeText={(text) => handleSetValue("description", text)}
            />
            <View style={styles2.teamTextWrapper}>
              <Text style={styles2.teamText}>Select Members</Text>
            </View>
            <View style={styles2.teamSection}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles2.teamWrapper}>
                  {members?.map((member) => (
                    <TouchableOpacity
                      key={shortid.generate()}
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
                        source={{ uri: member?.photo }}
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
            <TouchableOpacity style={styles.btnWrapper}>
              <Text style={styles.btnText}>Send</Text>
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
