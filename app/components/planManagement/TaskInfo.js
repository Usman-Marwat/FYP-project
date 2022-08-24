import React, { useContext, useState } from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ProgressBar } from "react-native-paper";
// import shortid from "shortid";
import styles from "./taskInfoStyle";
import appTheme from "../constants/colors";
import { AuthContext } from "../context";

export function TaskInfo({ task, navigation, taskId, getDataJ }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("TaskView", { taskId, getDataJ })}
    >
      <View style={styles.container}>
        <AntDesign
          name="checksquareo"
          size={20}
          color={
            task?.progress === 100 ? appTheme.COLOR2 : appTheme.INACTIVE_COLOR
          }
          style={styles.taskProgressIndicator}
        />
        <View style={styles.taskMiddleColumn}>
          <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">
            {task?.title}
          </Text>
          <ProgressBar
            progress={Number(task?.progress)}
            color={task?.progress === 100 ? appTheme.COLOR2 : appTheme.COLOR1}
            style={styles.taskProgressBar}
          />
        </View>
        <View style={styles.teamWrapper}>
          {task?.selectedMembers?.slice(0, 2)?.map((member) => (
            <Image
              key={Math.random().toString()}
              style={styles.memberPhoto}
              source={{ uri: member?.profile_image?.small }}
            />
          ))}
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={25}
          color={appTheme.INACTIVE_COLOR}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
