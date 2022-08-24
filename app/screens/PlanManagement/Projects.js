import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
// import shortid from "shortid";
// import { nanoid } from "nanoid";
import styles from "../styles/screens/projectsStyle";
import { AuthContext } from "../context";
import { TabScreenHeader } from "../components/TabScreenHeader";
import { ProjectCard } from "../components/ProjectCard";
import { EmptyListComponent } from "../components/EmptyListComponent";
import { combineData } from "../utils/DataHelper";
import { getProjectsDb } from "../db/demo";
import axios from "axios";
import projectsApi from "../api/projects";
import useApi from "../hooks/useApi";

export function Projects({ navigation }) {
  // const [projects, setProjects] = useState([]);
  // const getData = async () => {
  //   try {
  //     let projectsDb = await getProjectsDb();
  //     let projectsDbArray = [];
  //     for (let projectDb in projectsDb) {
  //       if (!projectsDb.hasOwnProperty(projectDb)) {
  //         continue;
  //       }
  //       projectsDbArray.push(projectsDb[projectDb]);
  //     }
  //     setProjects(projectsDbArray);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  // const [projects, setProjects] = useState([]);
  // useEffect(() => {
  //   async function getAllProjects() {
  //     try {
  //       const projects = await axios.get(
  //         "http://10.113.49.226:8000/api/project"
  //       );
  //       console.log(projects.data);
  //       setProjects(projects.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getAllProjects();
  // }, []);

  // const [projects, setProjects] = useState([]);
  const {
    data: projects,
    error,
    loading,
    request: loadProjects,
  } = useApi(projectsApi.getProjects);

  useEffect(() => {
    loadProjects();
  }, []);

  const tabs = ["All", "Ongoing", "Completed"];

  //data can have more than active tab
  const [data, setData] = useState({ activeTab: "All" });

  const toggleTab = (tab) => {
    setData(combineData(data, { activeTab: tab }));
  };

  const isActiveTab = (tab) => {
    const value = data?.activeTab === tab;
    return value;
  };

  const getProjects = () => {
    let { activeTab } = data;
    let projectsToRender = [];
    if (activeTab === "All") {
      projectsToRender = projects;
    } else {
      projectsToRender =
        projects?.filter(
          (project) => project.status === activeTab?.toLowerCase()
        ) || [];
    }

    return projectsToRender;
  };

  const renderProjectInfo = ({ item }) => {
    return (
      <ProjectCard
        project={item}
        key={Math.random().toString()}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabScreenHeader
        leftComponent={() => <Text style={styles.headerTitle}>Projects</Text>}
        isSearchBtnVisible={true}
        isMoreBtnVisible={true}
      />
      <View style={styles.projectsBody}>
        <View style={styles.projectsTabs}>
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
        {projects?.length > 0 ? (
          <FlatList
            data={getProjects()}
            keyExtractor={(item, index) => Math.random().toString()}
            renderItem={renderProjectInfo}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyListComponent />
        )}
      </View>
    </SafeAreaView>
  );
}
