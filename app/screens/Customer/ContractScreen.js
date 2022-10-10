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
  TouchableWithoutFeedback,
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
  // "https://images.pexels.com/photos/1799912/pexels-photo-1799912.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  // "https://img.freepik.com/premium-photo/mediterranean-house_190619-1500.jpg?w=2000",
  "https://images.unsplash.com/photo-1622328331602-663066fcecc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",

  // "https://images.pexels.com/photos/1769524/pexels-photo-1769524.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://img.freepik.com/free-photo/cottage-with-green-trees_1149-127.jpg?1&w=1380&t=st=1665387432~exp=1665388032~hmac=e1606ce3a68a991981550b02cc81b490521a8bd78b9a155b0f172bb25cfcbbb9",

  // "https://images.pexels.com/photos/1758101/pexels-photo-1758101.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80",

  // "https://images.pexels.com/photos/1738434/pexels-photo-1738434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.unsplash.com/photo-1576343547429-1a9ac89d7013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlbnRob3VzZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
  // "https://images.unsplash.com/photo-1481308648610-b65eb1b1978a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxwZW50aG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
];
const titles = ["Farm House", "House", "Flat", "PentHouse"];

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

const ContractScreen = ({ navigation }) => {
  const { loading } = useNotifications();
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef();

  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const scrollX = useRef(new Animated.Value(0)).current;
  const progress = Animated.modulo(Animated.divide(scrollX, width), width);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <MenuFoldButton navigation={navigation} translateX={translateX} />

      <View style={{ backgroundColor: "#A5F1FA", flex: 1 }}>
        <StatusBar hidden />
        <View style={{ marginTop: SPACING * 2 }}>
          <View style={{ height: IMAGE_HEIGHT * 2.1 }}>
            <Animated.FlatList
              ref={listRef}
              data={DATA}
              keyExtractor={(item) => item.key}
              horizontal
              pagingEnabled
              scrollEnabled={false}
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
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate(routes.MATERIAL)}
                  >
                    <Animated.View
                      style={[
                        styles.imageContainer,
                        { opacity, transform: [{ translateY }] },
                      ]}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                    </Animated.View>
                  </TouchableWithoutFeedback>
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
                      marginTop: 10,
                      // borderWidth: 1,
                      alignItems: "center",
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={currentIndex === 0}
              style={{ opacity: currentIndex === 0 ? 0.2 : 1 }}
              onPress={() => {
                listRef?.current?.scrollToOffset({
                  offset: (currentIndex - 1) * width,
                  animated: true,
                });
              }}
            >
              <View style={styles.buttonHolder}>
                <AntDesign name="swapleft" size={42} color="black" />
                <Text style={styles.buttonText}>PREV</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={currentIndex === titles.length - 1}
              style={{ opacity: currentIndex === titles.length - 1 ? 0.2 : 1 }}
              onPress={() => {
                listRef?.current?.scrollToOffset({
                  offset: (currentIndex + 1) * width,
                  animated: true,
                });
              }}
            >
              <View style={styles.buttonHolder}>
                <Text style={styles.buttonText}>NEXT</Text>
                <AntDesign name="swapright" size={42} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={renovation}
          keyExtractor={(item) => item.category}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ListItem
                image={item.image}
                title={item.category}
                subTitle="Renovation"
                style={styles.listItem}
              />
            );
          }}
        />
      </View>
    </>
  );
};

export default ContractScreen;

const Content = ({ item }) => {
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
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: SPACING * 2,
    paddingBottom: SPACING,
  },
  buttonHolder: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "800",
  },
  contentTitle: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 22,
    textTransform: "uppercase",
  },
  contentPrice: {
    fontSize: 22,
    letterSpacing: 3,
    fontWeight: "900",
    marginRight: 8,
  },
  contentCurrency: {
    fontSize: 12,
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
    paddingTop: 10,
    height: IMAGE_HEIGHT + SPACING * 2.5,
    paddingHorizontal: SPACING * 3.5,
    alignItems: "center",
  },
  image: {
    width: IMAGE_WIDTH + SPACING,
    height: IMAGE_HEIGHT + SPACING * 2.5,
    resizeMode: "cover",
  },
  listItem: {
    marginBottom: 1,
    marginHorizontal: SPACING,
    borderRadius: 20,
    height: 100,
  },
  underlay: {
    width: IMAGE_WIDTH + SPACING * 4 + 23,
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
