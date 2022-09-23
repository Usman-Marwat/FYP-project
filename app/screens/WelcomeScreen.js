import * as React from "react";
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

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <View>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: width / 2,
                  height: width / 2.5,
                  resizeMode: "contain",
                }}
              />
            </View>
          );
        }}
      />
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
});
