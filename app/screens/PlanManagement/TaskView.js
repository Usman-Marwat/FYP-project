import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles2 from "../styles/screens/taskViewStyle";
import appTheme from "../constants/colors";
import {
  getTaskDb,
  addTaskDetails,
  getTaskDetailsDb,
  updateTaskDetailsDb,
  deleteTaskDb,
} from "../db/demo";
import { EmptyListComponent } from "../components/EmptyListComponent";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { combineData } from "../utils/DataHelper";
import tasksApi from "../api/tasks";
import taskDetailsApi from "../api/taskDetails";

export function TaskView({ navigation, ProjectId, route }) {
  const { taskId, getDataJ } = route.params;
  const [task, setTask] = useState({});
  const getData = async () => {
    try {
      const taskDb = await tasksApi.getTask(taskId);
      const taskDetailsDb = await taskDetailsApi.getTaskDetails(taskId);
      setTask(combineData(...taskDb.data, ...taskDetailsDb.data));
      // setTask(...taskDb.data);
      console.log(task);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteTask = () => {
    Alert.alert("Delete!", "Are You sure want to remove the task?", [
      {
        text: "Yes",
        onPress: () => {
          tasksApi.deleteTask(taskId);
          navigation.navigate("Project", { ProjectId });
          getDataJ();
        },
      },
      {
        text: "No",
        onPress: () => {},
      },
    ]);
  };

  // Time Picker Logic
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [schedule, setSchedule] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate;
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const setTaskData = async () => {
    console.log(task);
    await taskDetailsApi.updateTaskDetails({ task, date });
    getData();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <SafeAreaView style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate("Project", { ProjectId })}
        ></TouchableOpacity>
        <View style={styles.setModalDimensions("90%", "100%")}>
          {task?.id ? (
            <View style={styles2.container}>
              <View style={styles2.topWrapper}>
                <View style={styles2.taskProgressWrapper}>
                  <ProgressCircle
                    percent={task?.progress}
                    radius={30}
                    borderWidth={7}
                    color="#6AC67E"
                    shadowColor="#f4f4f4"
                    bgColor="#fff"
                  >
                    <Text style={styles2.taskProgress}>{task?.progress}%</Text>
                  </ProgressCircle>
                </View>
                <Text style={styles2.taskTitle}>{task?.title}</Text>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => deleteTask()}
                >
                  <AntDesign name="delete" size={24} color={appTheme.COLOR3} />
                </TouchableOpacity>
              </View>
              <Text style={styles2.taskTeamText}>Team</Text>
              <View style={styles2.taskMembersWrapper}>
                {task?.selectedMembers?.map((member) => (
                  <Image
                    key={Math.random().toString()}
                    style={styles2.taskMemberPhoto}
                    source={{ uri: member?.profile_image?.small }}
                  />
                ))}
                <TouchableOpacity style={styles2.plusBtnContainer}>
                  <MaterialCommunityIcons name="plus" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles2.scheduleWrapper}>
                <View style={styles2.scheduleRow}>
                  <MaterialCommunityIcons
                    name="clock"
                    size={20}
                    color={appTheme.INACTIVE_COLOR}
                  />
                  <Text style={styles2.scheduleText}>1:30PM - 2:00PM</Text>
                </View>
                <View style={styles2.scheduleRow}>
                  <AntDesign
                    name="calendar"
                    size={20}
                    color={appTheme.INACTIVE_COLOR}
                  />
                  <Text style={styles2.scheduleText}>June 13 2021</Text>
                </View>
              </View>
              {/* <Text >{task?.description}</Text> */}
              <View style={styles.teamSection}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.teamWrapper}>
                    <Text>The Current scheduled Date: {task?.date}</Text>
                    <TouchableOpacity
                      onPress={showDatepicker}
                      style={styles.btnWrapper}
                    >
                      <Text style={styles.btnText}>Schedule Date</Text>
                    </TouchableOpacity>
                    <View style={styles.datePicker}>
                      {show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={onChange}
                        />
                      )}
                    </View>

                    <TouchableOpacity
                      onPress={showTimepicker}
                      style={styles.btnWrapper}
                    >
                      <Text style={styles.btnText}>Schedule Time</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
              <View style={[styles2.bottomWrapper]}>
                <TouchableOpacity onPress={() => setTaskData()}>
                  <LinearGradient
                    colors={[
                      appTheme.GRADIENT_COLOR1,
                      appTheme.GRADIENT_COLOR2,
                    ]}
                    style={styles2.btnWrapper}
                  >
                    <Text style={styles2.btnText}>Set schedule</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <EmptyListComponent />
          )}
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
  teamSection: { height: 300 },
  teamWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWrapper: {
    height: 45,
    backgroundColor: appTheme.PRIMARY_COLOR,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    width: "70%",
    borderRadius: 7,
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteBtn: {
    marginLeft: 70,
  },
  datePicker: {
    marginTop: 20,
    marginRight: 210,
    width: "100%",
    justifyContent: "center",
  },
});
