import React, { useContext, useEffect, useState } from "react";
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
import Fontisto from "react-native-vector-icons/Fontisto";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import styles from "../styles/screens/profileStyle";
import appTheme from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLog, useSetIsLog } from "../context/LogContext";
import UpdateProfile from "../components/UpdateProfile";
import { LinearGradient } from "expo-linear-gradient";
import { getUserDb, updateUserDb } from "../db/demo";
import { combineData } from "../utils/DataHelper";
import { EmptyListComponent } from "../components/EmptyListComponent";

export function Profile({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  isLogged = useLog();
  setIsLogged = useSetIsLog();
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState({
    id: "0123V",
    username: "Usman Marwat",
    photo:
      "https://images.unsplash.com/photo-1609010697446-11f2155278f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    designation: "Lead Designer",
  });

  const getData = async () => {
    const userDb = await getUserDb();
    var base64Icon = `data:image/png;base64,${userDb.photo}`;
    userDb.photo = base64Icon;
    setUser(combineData(user, userDb));
  };

  const updateHandler = async (newUser) => {
    updateUserDb(newUser);
    await getData();
    setModalVisible(!modalVisible);
  };

  const showUpdateModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getData();
    setUserLoaded(true);
  }, []);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem("@user_me");
      setIsLogged(false);
    } catch (e) {
      // clear error
    }
  };

  return (
    <>
      {userLoaded ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.profileDetailsSection}>
            <View style={styles.profileInfoSection}>
              <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsText}>135</Text>
                <Text style={styles.statisticsTitle}>Completed Tasks</Text>
              </View>
              <Image
                style={styles.profilePhoto}
                source={{
                  uri: user?.photo,
                }}
              />
              <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsText}>20</Text>
                <Text style={styles.statisticsTitle}>Ongoing Tasks</Text>
              </View>
            </View>
            <View style={styles.profileCenterSection}>
              <Text style={styles.nameText}>{user?.username}</Text>
              <Text style={styles.designationText}>{user?.designation}</Text>
              <TouchableOpacity onPress={() => showUpdateModal()}>
                <LinearGradient
                  colors={[appTheme.GRADIENT_COLOR1, appTheme.GRADIENT_COLOR2]}
                  style={styles.editProfileWrapper}
                >
                  <Text style={styles.editProfileText}>Edit Profile</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.exploreSection}>
            <Text style={styles.exploreHeader}>Explore</Text>
            <View style={styles.exploreContent}>
              <TouchableOpacity style={styles.singleExplore}>
                <Ionicons name="people" size={22} color={appTheme.COLOR1} />
                <Text style={styles.exploreText}>Members</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.singleExplore}
                onPress={() => navigation.navigate("Todos")}
              >
                <MaterialCommunityIcons
                  name="crown"
                  size={22}
                  color={appTheme.COLOR1}
                />
                <Text style={styles.exploreText}>My-Todos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.singleExplore}>
                <Fontisto
                  name="pie-chart-1"
                  size={22}
                  color={appTheme.COLOR1}
                />
                <Text style={styles.exploreText}>Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.singleExplore}>
                <SimpleLineIcons
                  name="settings"
                  size={22}
                  color={appTheme.COLOR1}
                />
                <Text style={styles.exploreText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.singleExplore,
                  { marginRight: "auto", marginLeft: "7%" },
                ]}
                onPress={() => clearAsyncStorage()}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={22}
                  color={appTheme.COLOR1}
                />
                <Text style={styles.exploreText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <UpdateProfile
            navigation={navigation}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            updateHandler={updateHandler}
            user={user}
          />
        </SafeAreaView>
      ) : (
        <EmptyListComponent />
      )}
    </>
  );
}
