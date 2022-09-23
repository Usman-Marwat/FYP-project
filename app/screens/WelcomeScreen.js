import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI WelcomeScreenlication!",
    image: "https://cdn-icons-png.flaticon.com/512/3571/3571572.png",
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: "https://cdn-icons-png.flaticon.com/128/3571/3571747.png",
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: "https://cdn-icons-png.flaticon.com/512/3571/3571680.png",
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: "https://cdn-icons-png.flaticon.com/512/3571/3571603.png",
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View style={styles.paginationConatiner}>
      {DATA.map((_, i) => {
        return <View key={i} style={styles.paginationDot}></View>;
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

export default function WelcomeScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <BackDrop scrollX={scrollX} />
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
        scrollEventThrottle={32}
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
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    bottom: 100,
    flexDirection: "row",
    position: "absolute",
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#333",
    margin: 10,
  },
  title: {
    // color: "white",
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
  },
});
