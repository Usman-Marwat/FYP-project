import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppButton from "../components/AppButton";

import routes from "../navigation/routes";

const { width, height } = Dimensions.get("screen");

const screen = routes.REGISTER;

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    actor: "Contractor",
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI WelcomeScreenlication!",
    image: "https://cdn-icons-png.flaticon.com/512/3571/3571572.png",
    screen,
  },
  {
    actor: "Customer",
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: "https://cdn-icons-png.flaticon.com/128/3571/3571747.png",
    screen,
  },
  {
    actor: "Employee",
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: "https://cdn-icons-png.flaticon.com/512/3571/3571680.png",
    screen,
  },
  {
    actor: "Supplier",
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: "https://cdn-icons-png.flaticon.com/512/3571/3571603.png",
    screen,
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View style={styles.paginationConatiner}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 0.9, 0.5],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={i}
            style={[
              styles.paginationDot,
              { transform: [{ scale: scale }], opacity },
            ]}
          ></Animated.View>
        );
      })}
    </View>
  );
};

const BackDrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <Animated.View
      style={[styles.square, { transform: [{ rotate }, { translateX }] }]}
    />
  );
};

export default function WelcomeScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemWrapper}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.buttonsRow}>
        <AppButton
          color="transparent"
          style={[styles.button, { width: 120 }]}
          title="Login"
        />
        <AppButton
          color="transparent"
          style={[styles.button, { width: 190 }]}
          title={"Register"}
        />
      </View>
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
    borderWidth: 7,
    borderColor: "white",
  },
  buttonsRow: {
    flexDirection: "row",
    position: "absolute",
    bottom: 80,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainerStyle: {
    paddingBottom: 100,
  },
  description: {
    fontWeight: "300",
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  image: {
    width: width / 2,
    height: width / 2.5,
    resizeMode: "contain",
  },
  itemWrapper: {
    alignItems: "center",
    padding: 20,
    width,
  },
  paginationConatiner: {
    bottom: 20,
    flexDirection: "row",
    position: "absolute",
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 10,
  },
  square: {
    width: height,
    height: height,
    backgroundColor: "#fff",
    borderRadius: 86,
    position: "absolute",
    top: -height * 0.6,
    left: -height * 0.3,
  },
  title: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
  },
});
