import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useContext, useRef } from "react";
import niceColors from "nice-color-palettes";
import { faker } from "@faker-js/faker";

import { SharedElement } from "react-navigation-shared-element";

import AppButton from "../../components/AppButton";
import routes from "../../navigation/routes";
import Header from "../../components/Header";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";

faker.seed(1);
const colors = [
  ...niceColors[4].slice(3, 5),
  ...niceColors[47].slice(0, 4),
  ...niceColors[1].slice(2, 5),
  ...niceColors[42].slice(1, 5),
  ...niceColors[63].slice(1, 4),
  ...niceColors[64].slice(2, 3),
  ...niceColors[65].slice(0, 2),
  ...niceColors[66].slice(1, 2),
  ...niceColors[12].slice(0, 1),
  ...niceColors[70].slice(1, 3),
  ...niceColors[75].slice(2, 4),
];

const data = [
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360483.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360535.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046935.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7153/7153980.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7880/7880183.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046934.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/6664/6664537.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/4982/4982394.png" },
];

const fakerData = data.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  color: colors[index % colors.length],
  name: faker.name.firstName(),
  jobTitle: faker.name.jobTitle(),
  categories: [...Array(3).keys()].map(() => {
    return {
      key: faker.datatype.uuid(),
      title: faker.name.jobType(),
      subcats: [...Array(5).keys()].map(faker.name.jobType),
    };
  }),
}));

const { height, width } = Dimensions.get("window");
const ITEM_HEIGHT = height * 0.18;
const SPACING = 10;

const imageUri = "https://cdn-icons-png.flaticon.com/256/4105/4105448.png";

const FirmsList = ({ navigation, route }) => {
  // const { contract } = route.params;
  // console.log(contract);
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const headerHeight = 60 * 2;
  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight);
  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight / 2],
  });
  const translateYNumber = useRef();
  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });
  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ zIndex: 1, transform: [{ translateY }] }}>
        <Header navigation={navigation} translateX={translateX} />
      </Animated.View>

      <Animated.FlatList
        onScroll={handleScroll}
        contentContainerStyle={{ padding: SPACING }}
        style={{ paddingTop: 55 }}
        data={fakerData}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          if (index === 0)
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log("hi");
                }}
                style={styles.itemContainer}
              >
                <View style={{ flex: 1, padding: SPACING }}>
                  <SharedElement
                    id={`item.${item.key}.bg`}
                    style={StyleSheet.absoluteFillObject}
                  >
                    <View
                      style={[styles.bg, { backgroundColor: colors[19] }]}
                    />
                  </SharedElement>
                  <SharedElement id={`item.${item.key}.name`}>
                    <Text style={styles.name}>Name</Text>
                  </SharedElement>
                  <Text style={styles.jobTitle}>jobTitle</Text>
                  <SharedElement
                    id={`item.${item.key}.image`}
                    style={styles.image}
                  >
                    <Image source={{ uri: imageUri }} style={styles.image} />
                  </SharedElement>
                </View>
              </TouchableOpacity>
            );

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.FIRMSLISTDETAILS, { item });
              }}
              style={styles.itemContainer}
            >
              <View style={{ flex: 1, padding: SPACING }}>
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
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={styles.image}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                </SharedElement>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <SharedElement id="general.bg">
        <View style={styles.overlay} />
      </SharedElement>
      <StatusBar hidden />
    </SafeAreaView>
  );
};

export default FirmsList;

const styles = StyleSheet.create({
  bg: {
    borderRadius: 16,
    ...StyleSheet.absoluteFillObject,
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
    right: SPACING,
  },
  itemContainer: {
    marginBottom: SPACING,
    height: ITEM_HEIGHT,
  },
  jobTitle: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 32,
  },
  name: {
    fontWeight: "700",
    fontSize: 18 * 1.3,
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    width,
    height,
    backgroundColor: "red",
    transform: [{ translateY: height }],
    borderRadius: 32,
  },
});
