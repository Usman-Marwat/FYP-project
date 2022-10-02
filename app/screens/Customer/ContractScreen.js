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
import React, { useContext } from "react";
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
import Screen from "../../components/Screen";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import useNotifications from "../../hooks/useNotifications";

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
  "https://images.pexels.com/photos/1684429/pexels-photo-1684429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1668211/pexels-photo-1668211.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1647372/pexels-photo-1647372.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1616164/pexels-photo-1616164.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1799901/pexels-photo-1799901.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1789968/pexels-photo-1789968.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1774301/pexels-photo-1774301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1734364/pexels-photo-1734364.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1724888/pexels-photo-1724888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];
faker.seed(10);
const DATA = [...Array(images.length).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: images[i],
    title: faker.commerce.productName(),
    subtitle: faker.company.bs(),
    price: faker.finance.amount(80, 200, 0),
  };
});

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

const ContractScreen = ({ navigation }) => {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const { loading } = useNotifications();

  return (
    <>
      <ActivityIndicator visible={loading} />
      <MenuFoldButton navigation={navigation} translateX={translateX} />

      <View style={{ backgroundColor: "#A5F1FA", flex: 1 }}>
        <StatusBar hidden />
        <SafeAreaView style={{ marginTop: SPACING * 4 }}>
          <View style={{ height: IMAGE_HEIGHT * 2.1 }}>
            <FlatList
              data={DATA}
              keyExtractor={(item) => item.key}
              horizontal
              pagingEnabled
              bounces={false}
              style={{ flexGrow: 0 }}
              contentContainerStyle={{
                height: IMAGE_HEIGHT + SPACING * 2,
                paddingHorizontal: SPACING * 2,
              }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </View>
                );
              }}
            />
            <View style={styles.contentContainer}>
              <Content item={DATA[0]} />
            </View>
            <View style={styles.underlay} />
          </View>
          <View style={styles.buttonContainer}>
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
          </View>
        </SafeAreaView>
      </View>

      {/* <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <RNBounceable>
            <View>
              <ListItem
                image={require("../../assets/pi.jpg")}
                title="Usman Marwat"
                subTitle="5 vitual shops"
              />
            </View>
          </RNBounceable>
          <RNBounceable>
            <View>
              <ListItem
                image={require("../../assets/pi.jpg")}
                title="Usman Marwat"
                subTitle="5 vitual shops"
              />
            </View>
          </RNBounceable>
          <RNBounceable>
            <View>
              <ListItem
                image={require("../../assets/pi.jpg")}
                title="Usman Marwat"
                subTitle="5 vitual shops"
              />
            </View>
          </RNBounceable>
          <RNBounceable>
            <View>
              <ListItem
                image={require("../../assets/pi.jpg")}
                title="Usman Marwat"
                subTitle="5 vitual shops"
              />
            </View>
          </RNBounceable>
        </ScrollView> */}
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
    marginLeft: SPACING * 2,
  },

  imageContainer: {
    width,
    paddingVertical: SPACING,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: "cover",
  },
  underlay: {
    width: IMAGE_WIDTH + SPACING * 2,
    position: "absolute",
    backgroundColor: "white",
    backfaceVisibility: true,
    zIndex: -1,
    top: SPACING * 2,
    left: SPACING,
    bottom: 0,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});

/* 
import RNBounceable from "@freakycoder/react-native-bounceable";


You can put ANY children component inside the RNBounceable component, it will make it bounce when it is pressed

<RNBounceable onPress={() => {}}>
  <View style={styles.bounceButtonStyle}>
    <Text style={styles.bounceButtonTextStyle}>Bounce</Text>
  </View>
</RNBounceable>

*/

const imageUrl =
  "https://images.unsplash.com/photo-1661977597155-1277a81affcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";
