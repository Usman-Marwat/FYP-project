import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React, { useContext, useRef, useEffect, useState } from "react";
import niceColors from "nice-color-palettes";
import { faker } from "@faker-js/faker";
import { SharedElement } from "react-navigation-shared-element";

import employeeContractorsApi from "../../api/Employee/contractors";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import routes from "../../navigation/routes";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import useApi from "../../hooks/useApi";
import UploadScreen from "../UploadScreen";
import ActivityIndicator from "../../components/ActivityIndicator";
import MenuFoldButton from "../../navigation/MenuFoldButton";
import AppButton from "../../components/AppButton";
import useNotifications from "../../hooks/useNotifications";

faker.seed(1);
const colorsP = [
  ...niceColors[66].slice(1, 2),
  ...niceColors[4].slice(3, 5),
  ...niceColors[47].slice(0, 4),
  ...niceColors[1].slice(2, 5),
  ...niceColors[42].slice(1, 5),
  ...niceColors[63].slice(1, 4),
  ...niceColors[64].slice(2, 3),
  ...niceColors[65].slice(0, 2),
  ...niceColors[12].slice(0, 1),
  ...niceColors[70].slice(1, 3),
  ...niceColors[75].slice(2, 4),
];

const images = [
  { image: "https://cdn-icons-png.flaticon.com/256/4193/4193253.png" },
  { image: "https://cdn-icons-png.flaticon.com/256/4193/4193257.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7880/7880183.png" },
  { image: "https://cdn-icons-png.flaticon.com/256/4193/4193278.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/6664/6664537.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/4982/4982394.png" },
];

const fakerData = images.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  color: colorsP[index % colorsP.length],
  name: faker.name.firstName(),
  jobTitle: faker.name.jobTitle(),
  categories: [...Array(2).keys()].map(() => {
    return {
      key: faker.datatype.uuid(),
      title: faker.name.jobType(),
      subcats: [...Array(3).keys()].map(faker.name.jobType),
    };
  }),
}));

const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.28;
const SPACING = 10;

const FirmsList = ({ navigation }) => {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const { loading } = useNotifications();

  const contractorsApi = useApi(employeeContractorsApi.getContractors);

  useEffect(() => {
    contractorsApi.request();
  }, []);

  if (!contractorsApi.data) return null;

  return (
    <View style={styles.container}>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <ActivityIndicator visible={contractorsApi.loading || loading} />

      <Animated.FlatList
        contentContainerStyle={{ padding: SPACING }}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 55, paddingBottom: 170 }}
        data={contractorsApi.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          const firmProfile = item.firmProfile;
          const userData = item.user_id;
          return (
            <View style={styles.itemContainer}>
              <SharedElement
                id={`item.${item._id}.bg`}
                style={StyleSheet.absoluteFillObject}
              >
                <View
                  style={[styles.bg, { backgroundColor: colorsP[index] }]}
                />
              </SharedElement>
              <SharedElement id={`item.${item._id}.name`}>
                <Text style={styles.name}>{firmProfile.name}</Text>
              </SharedElement>
              <Text style={styles.jobTitle}>{firmProfile.tagline}</Text>
              <AppButton
                title="Show more"
                color="dark"
                style={styles.button}
                titleStyle={styles.buttonTitle}
                onPress={() => {
                  navigation.navigate(routes.FIRMSLISTDETAILS, {
                    item,
                    DB: true,
                    bgColor: colorsP[index],
                  });
                }}
              />
              <SharedElement id={`item.${item._id}.image`} style={styles.image}>
                <Image source={{ uri: userData.image }} style={styles.image} />
              </SharedElement>
            </View>
          );
        }}
      />

      <Animated.FlatList
        contentContainerStyle={{ padding: SPACING }}
        showsVerticalScrollIndicator={false}
        data={fakerData}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemContainer}>
              <SharedElement
                id={`item.${item.key}.bg`}
                style={StyleSheet.absoluteFillObject}
              >
                <View style={[styles.bg, { backgroundColor: item.color }]} />
              </SharedElement>
              <SharedElement id={`item.${item.key}.name`}>
                <Text style={styles.name}>{item.name}</Text>
              </SharedElement>
              <Text style={styles.jobTitle}>{item.jobTitle}</Text>

              <AppButton
                title="Show more"
                color="dark"
                style={styles.button}
                titleStyle={styles.buttonTitle}
                onPress={() => {
                  navigation.navigate(routes.FIRMSLISTDETAILS, { item });
                }}
              />

              <SharedElement id={`item.${item.key}.image`} style={styles.image}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </SharedElement>
            </View>
          );
        }}
      />

      <SharedElement id="general.bg">
        <View style={styles.overlay} />
      </SharedElement>
      <StatusBar hidden />
    </View>
  );
};

export default FirmsList;

const styles = StyleSheet.create({
  bg: {
    borderRadius: 16,
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    width: "40%",
    position: "absolute",
    bottom: 20,
    left: 30,
    padding: 10,
  },
  buttonTitle: {
    fontSize: 13,
  },
  container: {
    flex: 1,
  },
  image: {
    width: ITEM_HEIGHT * 0.8,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: "contain",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  itemContainer: {
    marginBottom: SPACING * 2,
    height: ITEM_HEIGHT,
    marginHorizontal: 20,
  },
  jobTitle: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 47,
    left: 20,
  },
  name: {
    fontWeight: "700",
    fontSize: 18 * 1.3,
    position: "absolute",
    marginTop: 12,
    color: "#fff",
    left: 20,
  },
  overlay: {
    position: "absolute",
    width,
    height,
    // backgroundColor: "red",
    transform: [{ translateY: height }],
    borderRadius: 32,
  },
});
