import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

const { width } = Dimensions.get("window");

const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign);
const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

const quotes = [
  {
    quote:
      "For the things we have to learn before we can do them, we learn by doing them.",
    author: "Aristotle, The Nicomachean Ethics",
    image: "https://cdn-icons-png.flaticon.com/512/7899/7899486.png",
  },
  {
    quote: "The fastest way to build an app.",
    author: "The Expo Team",
    image: "https://cdn-icons-png.flaticon.com/512/7899/7899565.png",
  },
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    image: "https://cdn-icons-png.flaticon.com/512/7899/7899473.png",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    image: "https://cdn-icons-png.flaticon.com/512/7899/7899416.png",
  },
];
const colors = [
  {
    initialBgColor: "#cb4154",
    bgColor: "#ffa07a",
    nextBgColor: "#ff355e",
  },
  {
    initialBgColor: "#ffa07a",
    bgColor: "#ff355e",
    nextBgColor: "#A5BBFF",
  },
  {
    initialBgColor: "#ff355e",
    bgColor: "#A5BBFF",
    nextBgColor: "#cb4154",
  },
  {
    initialBgColor: "#A5BBFF",
    bgColor: "#cb4154",
    nextBgColor: "#ffa07a",
  },
];

export default function BrandAnimation() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [...Array(quotes.length).keys()];
  const [index, setIndex] = React.useState(0);

  const animate = (i) =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animate((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
  };

  return (
    <View style={styles.container}>
      <Circle
        index={index}
        onPress={onPress}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
      />
      <Animated.View
        style={{
          flexDirection: "row",
          transform: [
            {
              translateX: sliderAnimatedValue.interpolate({
                inputRange,
                outputRange: quotes.map((_, i) => -i * width * 2),
              }),
            },
          ],
          opacity: sliderAnimatedValue.interpolate({
            inputRange: [...Array(quotes.length * 2 + 1).keys()].map(
              (i) => i / 2
            ),
            outputRange: [...Array(quotes.length * 2 + 1).keys()].map((i) =>
              i % 2 === 0 ? 1 : 0
            ),
          }),
        }}
      >
        {quotes.slice(0, colors.length).map(({ quote, image }, i) => {
          return (
            <View style={styles.content} key={i}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.text, { color: colors[i].nextBgColor }]}>
                  {quote}
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
}

const Circle = ({ onPress, index, animatedValue, animatedValue2 }) => {
  const { initialBgColor, nextBgColor, bgColor } = colors[index];
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });
  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        { backgroundColor },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: dotBgColor,
            transform: [
              { perspective: 200 },
              {
                rotateY: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },

              {
                scale: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 6, 1],
                }),
              },

              {
                translateX: animatedValue2.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [
                  {
                    scale: animatedValue.interpolate({
                      inputRange: [0, 0.05, 0.5, 1],
                      outputRange: [1, 0, 0, 1],
                      // extrapolate: "clamp",
                    }),
                  },
                  {
                    rotateY: animatedValue.interpolate({
                      inputRange: [0, 0.5, 0.9, 1],
                      outputRange: ["0deg", "180deg", "180deg", "180deg"],
                    }),
                  },
                ],
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.05, 0.9, 1],
                  outputRange: [1, 0, 0, 1],
                }),
              },
            ]}
          >
            <AnimatedAntDesign name="arrowright" size={28} color={"white"} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  circleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    paddingBottom: 50,
  },
  circle: {
    backgroundColor: "turquoise",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  content: {
    paddingRight: width,
    width: width * 2,
    alignItems: "center",
  },
  image: {
    width: width,
    height: width / 2,
    resizeMode: "contain",
  },
  imageContainer: {
    backgroundColor: "#fff",
    width: 300,
    alignItems: "center",
    borderRadius: 70,
    marginBottom: 30,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Menlo",
    color: "white",
  },
  textContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 350,
  },
});
