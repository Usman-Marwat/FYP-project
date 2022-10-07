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
import niceColors from "nice-color-palettes";
import { SharedElement } from "react-navigation-shared-element";

import { combineData } from "../../utility/dataHelper";
import TaskInfo from "../../components/TaskInfo";
import CreateTask from "../../components/CreateTask";
import Icon from "../../components/Icon";
import colors from "../../config/colors";

const AnimatableScrollview = Animatable.createAnimatableComponent(ScrollView);
const animation = {
  0: { opacity: 0, translateX: 50 },
  1: { opacity: 1, translateX: 0 },
};

const { width } = Dimensions.get("window");
const SPACING = 10;

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
    <>
      <View style={{}}>
        <SharedElement
          id={`item.${item.key}.image`}
          style={styles.progressContainer}
        >
          <CircularProgress
            value={70}
            radius={70}
            inActiveStrokeColor={"#9b59b6"}
            inActiveStrokeOpacity={0.4}
            inActiveStrokeWidth={25}
            activeStrokeWidth={20}
            progressValueStyle={{ fontWeight: "100", color: "grey" }}
          />
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
        <SharedElement
          id={`item.${item.key}.team`}
          style={{ bottom: 120, left: 30 }}
        >
          <View>
            <Text style={styles.projectTeamTitle}>Team</Text>
            <View style={styles.projectTeamWrapper}>
              {dataImages.map((member) => (
                <Image
                  key={Math.random().toString()}
                  style={styles.projectMemberPhoto}
                  source={{ uri: member.image }}
                />
              ))}
            </View>
          </View>
        </SharedElement>
      </View>

      <Animatable.View
        useNativeDriver
        animation={animation}
        delay={400}
        style={styles.projectBody}
      >
        <View style={styles.projectTabs}>
          {tabs?.map((tab) => (
            <TouchableOpacity
              style={[styles.projectTab]}
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {tasks.map((task) => (
              <TaskInfo
                task={task}
                key={Math.random().toString()}
                navigation={navigation}
                // taskId={task.id}
                // getDataJ={getData}
              />
            ))}

            <TouchableOpacity onPress={() => handleCreateTask()}>
              <Icon
                family="mci"
                name="plus"
                size={42}
                backgroundColor={colors.medium}
              />
            </TouchableOpacity>
          </ScrollView>
        ) : data?.activeTab === "File" ? (
          <></>
        ) : null}
      </Animatable.View>
      <CreateTask
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        // ProjectId={ProjectId}
        // getDataP={getData}
      />
    </>
  );
};

export default OngoingContractsDetails;

const styles = StyleSheet.create({
  activeProjectTabText: {
    color: "#fff",
    backgroundColor: "silver",
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    position: "absolute",
    top: SPACING + 30,
  },

  inActiveProjectTabText: {
    color: colors.medium,
  },

  meta: {
    position: "absolute",
    top: SPACING * 4,
    left: SPACING,
    width: width * 0.6,
  },
  model: {
    fontSize: 25,
    fontWeight: "700",
    position: "absolute",
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

  projectBody: {
    paddingTop: 20,
    paddingHorizontal: 16,
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
  projectTabText: {
    fontSize: 16,
    paddingVertical: 7,
    textAlign: "center",
  },
  progressContainer: {
    width: width * 2.1,
    height: width * 0.7,
    top: 80,
    left: 250,
  },
  swatch: {
    height: 56,
    width: 56,
    borderRadius: 16,
    marginRight: SPACING,
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
});
