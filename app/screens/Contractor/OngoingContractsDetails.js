import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import CircularProgress from "react-native-circular-progress-indicator";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import niceColors from "nice-color-palettes";
import { SharedElement } from "react-navigation-shared-element";

import { combineData } from "../../utility/dataHelper";
import TaskInfo from "../../components/TaskInfo";
import CreateTask from "../../components/CreateTask";

const AnimatableScrollview = Animatable.createAnimatableComponent(ScrollView);
const animation = {
  0: { opacity: 0, translateX: 50 },
  1: { opacity: 1, translateX: 0 },
};

const { width } = Dimensions.get("window");
const SPACING = 10;
const colors = [...niceColors[1], ...niceColors[2]];

const dataImages = [
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360483.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360535.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046935.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7153/7153980.png" },
];

const tasks = [
  { id: 1, progress: 30 },
  { id: 2, progress: 30 },
  { id: 3, progress: 30 },
];

const OngoingContractsDetails = ({ navigation, route }) => {
  const { item } = route.params;

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
    <View>
      <View style={styles.projectCard}>
        <SharedElement id={`item.${item.key}.image`} style={styles.image}>
          <View style={styles.progressContainer}>
            <CircularProgress
              value={70}
              inActiveStrokeColor={"#9b59b6"}
              inActiveStrokeOpacity={0.4}
              radius={70}
              inActiveStrokeWidth={25}
              activeStrokeWidth={20}
              progressValueStyle={{ fontWeight: "100", color: "grey" }}
            />
          </View>
        </SharedElement>
        <View style={styles.meta}>
          <SharedElement id={`item.${item.key}.modal`}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.model}>
              {item.model}
            </Text>
          </SharedElement>
          <SharedElement id={`item.${item.key}.description`}>
            <Text style={styles.description}>{item.description}</Text>
          </SharedElement>
        </View>
      </View>
      <View style={{ bottom: 120, left: 30 }}>
        <Text style={styles.projectTeamTitle}>Team</Text>
        <View style={styles.projectTeamWrapper}>
          {dataImages.map((member) => (
            <Image
              key={Math.random().toString()}
              style={styles.projectMemberPhoto}
              source={{ uri: member.image }}
            />
          ))}
          <TouchableOpacity style={styles.plusBtnContainer}>
            <MaterialCommunityIcons name="plus" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <AnimatableScrollview
        useNativeDriver
        animation={animation}
        delay={400}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: SPACING }}
        style={{ flexGrow: 0 }}
      >
        {colors.map((color, index) => {
          return (
            <View
              key={index}
              style={[styles.swatch, { backgroundColor: color }]}
            ></View>
          );
        })}
      </AnimatableScrollview>

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
                  <MaterialCommunityIcons name="plus" size={19} color="#fff" />
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
                containerStyle={{ width: 130 }}
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
                  {tasks.map((task) => (
                    <TaskInfo
                      task={task}
                      key={Math.random().toString()}
                      navigation={navigation}
                      // taskId={task.id}
                      // getDataJ={getData}
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
      <CreateTask
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        // ProjectId={ProjectId}
        // getDataP={getData}
      />
    </View>
  );
};

export default OngoingContractsDetails;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    opacity: 0.7,
    position: "absolute",
    top: SPACING + 30,
  },
  image: {
    width: width * 2.1,
    height: width * 0.7,
  },
  meta: {
    position: "absolute",
    top: SPACING * 4,
    left: SPACING,
    width: width * 0.6,
  },
  model: {
    fontSize: 32,
    fontWeight: "700",
    position: "absolute",
  },
  progressContainer: {
    position: "absolute",
    bottom: 80,
    left: 250,
  },
  projectCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  swatch: {
    height: 56,
    width: 56,
    borderRadius: 16,
    marginRight: SPACING,
  },

  projectTeamTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectTeamWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  projectMemberPhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: -17,
  },
  plusBtnContainer: {
    backgroundColor: colors.primary,
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: -10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  projectBody: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  projectTabs: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 3,
    borderRadius: 7,
    marginBottom: 5,
  },
  projectTab: {
    width: "30%",
    borderRadius: 7,
  },
  activeProjectTab: {
    backgroundColor: colors.medium,
  },
  projectTabText: { fontSize: 16, paddingVertical: 7, textAlign: "center" },
  activeProjectTabText: {
    color: "#fff",
  },
  inActiveProjectTabText: {
    color: colors.medium,
  },

  bottomContainer: {
    height: "65%",
  },
  bottomContent: {
    paddingBottom: 200,
  },
  tasksHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 0,
  },
  tasksRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  tasksLeftText: {
    marginRight: 7,
    fontWeight: "bold",
    fontSize: 15,
  },
  plusBtnContainer2: {
    backgroundColor: colors.primary,
    height: 30,
    width: 30,
    borderRadius: 50,
    marginLeft: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
