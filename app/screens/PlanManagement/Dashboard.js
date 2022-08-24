import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../styles/screens/dashboardStyle";
import { TaskInfo } from "../components/TaskInfo";
import { formatCurrentDate } from "../utils/DataHelper";
import appTheme from "../constants/colors";

export function Dashboard() {
  const tasks = [
    {
      id: 1,
      projectId: 1,
      title: "Dashboard Design",
      members: [
        {
          name: "John Doe",
          photo:
            "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        },
        {
          name: "Ann Smith",
          photo:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
      ],
      progress: 15,
    },
    {
      id: 2,
      projectId: 1,
      title: "Mobile App Design",
      members: [
        {
          name: "Miriam Cooper",
          photo:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
        {
          name: "Jessica Leonard",
          photo:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        },
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
      ],
      progress: 100,
    },
    {
      id: 3,
      projectId: 2,
      title: "Wireframe Design",
      members: [
        {
          name: "Baron Dunecr",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
        {
          name: "Ferindah Yerstu",
          photo:
            "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
      ],
      progress: 80,
    },
    {
      id: 4,
      projectId: 2,
      title: "A/B Testing",
      members: [
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
        {
          name: "Ferindah Yerstu",
          photo:
            "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
      ],
      progress: 80,
    },
    {
      id: 4,
      projectId: 2,
      title: "A/B Testing",
      members: [
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
        {
          name: "Ferindah Yerstu",
          photo:
            "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
      ],
      progress: 80,
    },
    {
      id: 4,
      projectId: 2,
      title: "A/B Testing",
      members: [
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
        {
          name: "Ferindah Yerstu",
          photo:
            "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
      ],
      progress: 80,
    },
    {
      id: 4,
      projectId: 2,
      title: "A/B Testing",
      members: [
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
        {
          name: "Ferindah Yerstu",
          photo:
            "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
      ],
      progress: 80,
    },
    {
      id: 4,
      projectId: 2,
      title: "A/B Testing",
      members: [
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
        {
          name: "Ferindah Yerstu",
          photo:
            "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
      ],
      progress: 80,
    },
    {
      id: 4,
      projectId: 2,
      title: "A/B Testing",
      members: [
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
        {
          name: "Ferindah Yerstu",
          photo:
            "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
      ],
      progress: 80,
    },
    {
      id: 4,
      projectId: 2,
      title: "A/B Testing",
      members: [
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
        {
          name: "Ferindah Yerstu",
          photo:
            "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
      ],
      progress: 80,
    },
    {
      id: 4,
      projectId: 2,
      title: "A/B Testing",
      members: [
        {
          name: "Jeff Atwood",
          photo:
            "https://images.unsplash.com/photo-1558203728-00f45181dd84?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80",
        },
        {
          name: "Ferindah Yerstu",
          photo:
            "https://images.unsplash.com/photo-1604072366595-e75dc92d6bdc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
      ],
      progress: 80,
    },
  ];
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

  return (
    <SafeAreaView>
      <View style={styles.contentBody}>
        <View style={styles.statisticsSection}>
          <Text style={styles.contentTitle}>All Contracts</Text>
          <View style={styles.statisticsContainer}>
            <View
              style={[
                styles.statisticsContent,
                { backgroundColor: appTheme.PRIMARY_COLOR },
              ]}
            >
              <FontAwesome
                name="refresh"
                size={17}
                color="#fff"
                style={styles.statisticsIcon}
              />
              <View style={styles.statisticsCounter}>
                <Text style={styles.statisticsValue}>14</Text>
                <Text style={styles.statisticsTitle}>Ongoing</Text>
              </View>
            </View>
            <View
              style={[
                styles.statisticsContent,
                { backgroundColor: appTheme.COLOR1 },
              ]}
            >
              <Feather
                name="clock"
                size={17}
                color="#fff"
                style={styles.statisticsIcon}
              />
              <View style={styles.statisticsCounter}>
                <Text style={styles.statisticsValue}>20</Text>
                <Text style={styles.statisticsTitle}>In Process</Text>
              </View>
            </View>
            <View
              style={[
                styles.statisticsContent,
                { backgroundColor: appTheme.COLOR2 },
              ]}
            >
              <MaterialCommunityIcons
                name="file-check-outline"
                size={19}
                color="#fff"
                style={styles.statisticsIcon}
              />
              <View style={styles.statisticsCounter}>
                <Text style={styles.statisticsValue}>35</Text>
                <Text style={styles.statisticsTitle}>Completed</Text>
              </View>
            </View>
            <View
              style={[
                styles.statisticsContent,
                { backgroundColor: appTheme.COLOR3 },
              ]}
            >
              <MaterialCommunityIcons
                name="file-remove-outline"
                size={19}
                color="#fff"
                style={styles.statisticsIcon}
              />
              <View style={styles.statisticsCounter}>
                <Text style={styles.statisticsValue}>28</Text>
                <Text style={styles.statisticsTitle}>Cancelled</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.tasksSection}>
          <View style={styles.tasksBody}>
            {/* <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.tasksList}>
                {getTasks()?.map((task) => (
                  <TaskInfo task={task} key={Math.random().toString()} />
                ))}
              </View>
            </ScrollView> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
