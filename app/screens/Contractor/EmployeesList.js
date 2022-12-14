import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";

import React, { useRef, useContext } from "react";
import { faker } from "@faker-js/faker";

import MenuFoldButton from "../../navigation/MenuFoldButton";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import Screen from "../../components/Screen";

const { width, height } = Dimensions.get("screen");

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

faker.seed(10);

const BG_IMG =
  "https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&w=800";
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: faker.image.people(640, 480, true),
    name: faker.name.firstName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const EmployeesList = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  return (
    <Screen style={{ paddingTop: 40 }}>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <Image
        source={{ uri: BG_IMG }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        data={DATA}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opcaityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.7),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opcaityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <AnimatedTouchable
              style={[
                styles.itemWrapper,
                { opacity, transform: [{ scale: scale }] },
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flexShrink: 1 }}>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    opacity: 0.7,
                  }}
                >
                  {item.jobTitle}
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.8, color: "#0099cc" }}>
                  {item.email}
                </Text>
              </View>
            </AnimatedTouchable>
          );
        }}
      />
      <StatusBar hidden />
    </Screen>
  );
};

export default EmployeesList;

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: "row",
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  image: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING,
  },
});
