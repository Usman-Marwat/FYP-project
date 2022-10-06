import {
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { AntDesign } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { StatusBar } from "expo-status-bar";

import AppText from "../../components/AppTextGeneral";
import ActivityIndicator from "../../components/ActivityIndicator";
import colors from "../../config/colors";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import ListItem from "../../components/ListItem";
import MenuFoldButton from "../../navigation/MenuFoldButton";
import routes from "../../navigation/routes";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import useNotifications from "../../hooks/useNotifications";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../components/Icon";

const { width, height } = Dimensions.get("screen");
const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
const SPACING = 20;

const images = [
  "https://images.pexels.com/photos/1799912/pexels-photo-1799912.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1769524/pexels-photo-1769524.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1758101/pexels-photo-1758101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1698394/pexels-photo-1698394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://images.pexels.com/photos/1684429/pexels-photo-1684429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://images.pexels.com/photos/1668211/pexels-photo-1668211.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://images.pexels.com/photos/1616164/pexels-photo-1616164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://images.pexels.com/photos/1799901/pexels-photo-1799901.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://images.pexels.com/photos/1774301/pexels-photo-1774301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://images.pexels.com/photos/1734364/pexels-photo-1734364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://images.pexels.com/photos/1724888/pexels-photo-1724888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];

const titles = [
  "Mansions",
  " Bungalow",
  "Apartment",
  "Cottage",
  "Semi-Detached Home",
];
faker.seed(10);
const DATA = [...Array(images.length).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: images[i],
    title: titles[i],
    subtitle: faker.company.bs(),
    price: faker.finance.amount(700, 1700, 0),
  };
});

const renovation = [
  {
    category: "Painting",
    image: "https://cdn-icons-png.flaticon.com/128/1001/1001327.png",
  },
  {
    category: "Plumbing",
    image: "https://cdn-icons-png.flaticon.com/128/313/313022.png",
  },
  {
    category: "flooring",
    image: "https://cdn-icons-png.flaticon.com/128/4647/4647616.png",
  },
  {
    category: "Wiring",
    image: "https://cdn-icons-png.flaticon.com/128/3540/3540105.png",
  },
  {
    category: "Carpentry",
    image: "https://cdn-icons-png.flaticon.com/128/7482/7482326.png",
  },
  {
    category: "Roofing",
    image: "https://cdn-icons-png.flaticon.com/128/7899/7899526.png",
  },
];

const Content = ({ item }) => {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.contentTitle} numberOfLines={1} adjustsFontSizeToFit>
        {item.title}
      </Text>
      <Text style={{ fontSize: 12, opacity: 0.4 }}>{item.subtitle}</Text>
      <View style={{ flexDirection: "row", marginTop: SPACING }}>
        <Text style={styles.contentPrice}>{item.price}</Text>
        <Text style={styles.contentCurrency}>USD</Text>
      </View>
      <TouchableOpacity
        style={{ position: "absolute", bottom: "-20%", right: "-30%" }}
        onPress={() => navigation.navigate(routes.MATERIAL)}
      >
        <AntDesign name="swapright" size={42} color="red" />
      </TouchableOpacity>
    </>
  );
};

const ContractScreen = ({ navigation }) => {
  const { loading } = useNotifications();

  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const scrollX = useRef(new Animated.Value(0)).current;
  const progress = Animated.modulo(Animated.divide(scrollX, width), width);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <MenuFoldButton navigation={navigation} translateX={translateX} />

      <View style={{ backgroundColor: "#A5F1FA", flex: 1 }}>
        <StatusBar hidden />
        <View style={{ marginTop: SPACING * 2 }}>
          <View style={{ height: IMAGE_HEIGHT * 2.1 }}>
            <Animated.FlatList
              data={DATA}
              keyExtractor={(item) => item.key}
              horizontal
              pagingEnabled
              bounces={false}
              style={{ flexGrow: 0, zIndex: 9999 }}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                setCurrentIndex(
                  Math.floor(
                    Math.floor(event.nativeEvent.contentOffset.x) /
                      Math.floor(event.nativeEvent.layoutMeasurement.width)
                  )
                );
              }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 1) * width,
                  index * width,
                  (index + 1) * width,
                ];
                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0, 1, 0],
                });
                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange: [50, 0, 20],
                });

                return (
                  <Animated.View
                    style={[
                      styles.imageContainer,
                      { opacity, transform: [{ translateY }] },
                    ]}
                  >
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </Animated.View>
                );
              }}
            />
            <View style={styles.contentContainer}>
              {DATA.map((item, index) => {
                const inputRange = [
                  (index - 0.2) * width,
                  index * width,
                  (index + 0.2) * width,
                ];
                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0, 1, 0],
                });
                const rotateY = scrollX.interpolate({
                  inputRange,
                  outputRange: ["45deg", "0deg", "45deg"],
                });
                return (
                  <Animated.View
                    key={item.key}
                    style={{
                      position: "absolute",
                      opacity,
                      transform: [
                        { perspective: IMAGE_WIDTH * 4 },
                        { rotateY },
                      ],
                    }}
                  >
                    <Content item={item} />
                  </Animated.View>
                );
              })}
            </View>
            <Animated.View
              style={[
                styles.underlay,
                {
                  transform: [
                    {
                      perspective: IMAGE_WIDTH * 4,
                    },
                    {
                      rotateY: progress.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: ["0deg", "90deg", "180deg"],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>

          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => {}}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="swapleft" size={42} color="black" />
                <Text style={{ fontSize: 12, fontWeight: "800" }}>PREV</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 12, fontWeight: "800" }}>NEXT</Text>
                <AntDesign name="swapright" size={42} color="black" />
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={renovation}
            keyExtractor={(item) => item.category}
            renderItem={({ item, index }) => {
              return (
                <ListItem
                  image={item.image}
                  title={item.category}
                  subTitle="Renovation"
                  style={{
                    marginBottom: 1,
                    marginHorizontal: 10,
                    borderRadius: 20,
                    height: 100,
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
};

export default ContractScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: IMAGE_WIDTH + SPACING * 4,
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
  },
  contentTitle: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
    textTransform: "uppercase",
  },
  contentPrice: {
    fontSize: 42,
    letterSpacing: 3,
    fontWeight: "900",
    marginRight: 8,
  },
  contentCurrency: {
    fontSize: 16,
    lineHeight: 36,
    fontWeight: "800",
    alignSelf: "flex-end",
  },
  contentContainer: {
    width: IMAGE_WIDTH,
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
    marginLeft: SPACING * 3.5,
    zIndex: 99,
  },

  imageContainer: {
    width,
    paddingVertical: SPACING,
    height: IMAGE_HEIGHT + SPACING * 2,
    paddingHorizontal: SPACING * 3.5,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: "cover",
  },
  underlay: {
    width: IMAGE_WIDTH + SPACING * 4 + 20,
    position: "absolute",
    backgroundColor: "white",
    backfaceVisibility: true,
    zIndex: -1,
    top: SPACING * 2,
    left: SPACING,
    bottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
