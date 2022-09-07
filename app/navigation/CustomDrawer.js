import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";

import AppButton from "../components/AppButton";
import Icon from "../components/Icon";

const { width, height } = Dimensions.get("screen");
const routes = [
  "Get Started",
  "Features",
  "Tools",
  "Services",
  "Portfolio",
  "Careers",
  "Contact",
];
const links = ["Follow us", "Quota", "Awesome link"];
const colors = [
  "#69d2e7",
  "#a7dbd8",
  "#e0e4cc",
  "#f38630",
  "#fa6900",
  "#f34365",
  "#fc9d9a",
  "#f9cdad",
  "#c8c8a9",
  "#83af9b",
  "#ecd078",
  "#d9fb43",
  "#c02942",
  "#53777a",
];

const CustomDrawer = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={onPress} style={styles.closeIcon}>
          <Icon name="close" size={34} antDesign={true} />
        </TouchableOpacity>
        <View style={styles.menu}>
          <View>
            {routes.map((route, index) => {
              return (
                <AppButton
                  key={route}
                  title={route}
                  onPress={onPress}
                  color="transparent"
                  titleStyle={{ ...styles.button, color: colors[index] }}
                />
              );
            })}
          </View>
          <View>
            {links.map((link, index) => {
              return (
                <AppButton
                  key={link}
                  title={link}
                  onPress={onPress}
                  color="transparent"
                  titleStyle={{
                    ...styles.buttonSmall,
                    color: colors[index + routes.length + 1],
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  button: {
    fontSize: 34,
    lineHeight: 34 * 1.5,
  },
  buttonSmall: {
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  container: {
    flex: 1,
  },
  closeIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "transparent",
  },
  menu: {
    flex: 1,
    justifyContent: "space-between",
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "#222",
    alignItems: "flex-start",
    paddingTop: 80,
    paddingBottom: 30,
    paddingLeft: 30,
  },
});
