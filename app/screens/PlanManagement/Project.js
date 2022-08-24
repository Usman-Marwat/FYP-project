import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProgressCircle from "react-native-progress-circle";
// import shortid from "shortid";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../styles/screens/projectStyle";
import { TabScreenHeader } from "../components/TabScreenHeader";
import { TaskInfo } from "../components/TaskInfo";
import { combineData } from "../utils/DataHelper";
import { EmptyListComponent } from "../components/EmptyListComponent";
import { AuthContext } from "../context";
import appTheme from "../constants/colors";
import { TaskView } from "./TaskView";
import { getProjectDb, getTasksDb } from "../db/demo";
import { CreateTask } from "../components/CreateTask";

import projectsApi from "../api/projects";
import tasksApi from "../api/tasks";
import useApi from "../hooks/useApi";

export function Project({ navigation, route }) {
  const { ProjectId } = route.params;
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);

  // const getData = async () => {
  //   try {
  //     const projectDb = await getProjectDb(ProjectId);
  //     const tasksDb = await getTasksDb(ProjectId);
  //     let tasksDbArray = [];
  //     for (let taskDb in tasksDb) {
  //       if (!tasksDb.hasOwnProperty(taskDb)) {
  //         continue;
  //       }
  //       if (tasksDb[taskDb].ProjectId == ProjectId)
  //         tasksDbArray.push(tasksDb[taskDb]);
  //     }
  //     setProject(projectDb);
  //     setTasks(tasksDbArray);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  const getData = async () => {
    try {
      // const projectDb = await getProjectDb(ProjectId);
      const projectDb = await projectsApi.getProject(ProjectId);
      const tasksDb = await tasksApi.getTasks(ProjectId);
      setProject(projectDb.data);
      setTasks(tasksDb.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const tabs = ["Task List", "File", "Comments"];

  const [data, setData] = useState({
    activeTab: "Task List",
  });
  //the states below are used for dropdown picker

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "All Tasks", value: "All Tasks" },
    { label: "Ongoing", value: "Ongoing" },
    { label: "Completed", value: "Completed" },
  ]);

  const getTasks = () => {
    let tasksToRender = [];
    if (!value || value === "All Tasks") {
      tasksToRender = tasks;
    } else if (value === "Ongoing") {
      tasksToRender = tasks.filter((task) => task.progress < 100) || [];
    } else if (value === "Completed") {
      tasksToRender = tasks.filter((task) => task.progress === 100) || [];
    }

    return tasksToRender;
  };

  const handleBackButton = () => {
    navigation?.goBack();
  };

  const toggleTab = (tab) => {
    setData(combineData(data, { activeTab: tab }));
  };

  const isActiveTab = (tab) => {
    const value = data?.activeTab === tab;
    return value;
  };

  const handleCreateTask = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {project?.title ? (
        <>
          <TabScreenHeader
            leftComponent={() => (
              <TouchableOpacity
                onPress={() => handleBackButton()}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back-outline" size={25} color="#000" />
              </TouchableOpacity>
            )}
            isSearchBtnVisible={true}
            isMoreBtnVisible={true}
          />
          <View>
            <View style={styles.projectDetailsSection}>
              <View style={styles.projectTitleWrapper}>
                <Text style={styles.projectTitle}>{project?.title}</Text>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="calendar-month-outline"
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.projectDescription}>
                {project?.description}
              </Text>
              <View style={styles.projectTeamAndProgress}>
                <View style={styles.projectProgressWrapper}>
                  <ProgressCircle
                    percent={project?.progress}
                    radius={50}
                    borderWidth={10}
                    color="#6AC67E"
                    shadowColor="#f4f4f4"
                    bgColor="#fff"
                  >
                    <Text style={styles.projectProgress}>
                      {project?.progress}%
                    </Text>
                  </ProgressCircle>
                </View>
                <View>
                  <Text style={styles.projectTeamTitle}>Team</Text>
                  <View style={styles.projectTeamWrapper}>
                    {project?.team?.map((member) => (
                      <Image
                        key={Math.random().toString()}
                        style={styles.projectMemberPhoto}
                        source={{ uri: member?.photo }}
                      />
                    ))}
                    <TouchableOpacity style={styles.plusBtnContainer}>
                      <MaterialCommunityIcons
                        name="plus"
                        size={22}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text style={styles.projectStatus}>{project?.status}</Text>
            </View>
            <View style={styles.projectBody}>
              <View style={styles.projectTabs}>
                {tabs?.map((tab) => (
                  <TouchableOpacity
                    style={[
                      styles.projectTab,
                      isActiveTab(tab) ? styles.activeProjectTab : null,
                    ]}
                    onPress={() => toggleTab(tab)}
                    key={Math.random().toString()}
                  >
                    <Text
                      style={[
                        styles.projectTabText,
                        isActiveTab(tab)
                          ? styles.activeProjectTabText
                          : styles.inActiveProjectTabText,
                      ]}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {data?.activeTab === "Task List" ? (
                <>
                  <View style={styles.tasksHeader}>
                    <TouchableOpacity
                      style={styles.tasksRow}
                      onPress={() => handleCreateTask()}
                    >
                      <Text style={styles.tasksLeftText}>Add Task</Text>
                      <View style={styles.plusBtnContainer2}>
                        <MaterialCommunityIcons
                          name="plus"
                          size={19}
                          color="#fff"
                        />
                      </View>
                    </TouchableOpacity>
                    <DropDownPicker
                      placeholder="All Tasks"
                      placeholderStyle={{ fontSize: 15 }}
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      containerStyle={{
                        width: 130,
                      }}
                      style={{
                        borderColor: "transparent",
                        backgroundColor: "transparent",
                      }}
                      dropDownContainerStyle={{
                        backgroundColor: "#fff",
                        borderColor: "transparent",
                      }}
                      labelStyle={{
                        fontSize: 15,
                      }}
                    />
                  </View>
                  <View style={styles.bottomContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <View style={styles.bottomContent}>
                        {getTasks()?.map((task) => (
                          <TaskInfo
                            task={task}
                            key={Math.random().toString()}
                            navigation={navigation}
                            taskId={task.id}
                            getDataJ={getData}
                          />
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                </>
              ) : data?.activeTab === "File" ? (
                <></>
              ) : null}
            </View>
          </View>
          <CreateTask
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            ProjectId={ProjectId}
            getDataP={getData}
          />
        </>
      ) : (
        <EmptyListComponent />
      )}
    </SafeAreaView>
  );
}
