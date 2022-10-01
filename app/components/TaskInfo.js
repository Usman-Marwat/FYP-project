import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
const data = [
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360483.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360535.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046935.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7153/7153980.png" },
];

const TaskInfo = ({ task, navigation, taskId, getDataJ }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("TaskView", { taskId, getDataJ })}
    >
      <View style={styles.container}>
        <AntDesign
          name="checksquareo"
          size={20}
          color={task?.progress === 100 ? colors.primary : colors.medium}
          style={styles.taskProgressIndicator}
        />
        <View style={styles.taskMiddleColumn}>
          <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">
            title
          </Text>
          {/* <ProgressBar
             progress={Number(task?.progress)}
             color={task?.progress === 100 ? colors.primary : colors.light}
             style={styles.taskProgressBar}
           /> */}
        </View>
        <View style={styles.teamWrapper}>
          {data?.slice(0, 2)?.map((member) => (
            <Image
              key={Math.random().toString()}
              style={styles.memberPhoto}
              source={{ uri: member.image }}
            />
          ))}
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={25}
          color={colors.medium}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TaskInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    height: 60,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    margin: 1,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  taskProgressIndicator: { marginRight: 10 },
  taskMiddleColumn: { width: "50%", marginRight: "auto" },
  taskTitle: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  taskProgressBar: { borderRadius: 7, height: 6 },
  teamWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginRight: 10,
  },
  memberPhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: -10,
  },
});
