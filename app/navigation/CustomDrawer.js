import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";
import MaskedView from "@react-native-masked-view/masked-view";

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

// const fromCords = { x: 0, y: height };
// const toCords = { x: width, y: 0 };
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CustomDrawer = ({
  animate,
  animatedValue,
  fromCords,
  onCloseDrawer,
  toCords,
}) => {
  const polygonRef = useRef();
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  useEffect(() => {
    animatedValue.addListener((value) => {
      if (polygonRef?.current) {
        polygonRef.current.setNativeProps({
          points: `0,0 ${value.x},${value.y} ${width}, ${height} 0, ${height}`,
        });
      }
    });
  });

  return (
    <MaskedView
      style={styles.container}
      maskElement={
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ backgroundColor: "transparent" }}
        >
          <AnimatedPolygon
            ref={polygonRef}
            fill="red"
            points={`0,0 ${fromCords.x},${fromCords.y} ${width}, ${height} 0, ${height}`}
          />
        </Svg>
      }
    >
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={onCloseDrawer} style={styles.closeIcon}>
          <Icon
            name="close"
            backgroundColor="transparent"
            iconColor="white"
            size={34}
            antDesign={true}
          />
        </TouchableOpacity>
        <View style={styles.menu}>
          <View>
            {routes.map((route, index) => {
              return (
                <AppButton
                  key={route}
                  title={route}
                  onPress={() => {
                    setSelectedRoute(route);
                    onCloseDrawer();
                  }}
                  color="transparent"
                  style={[styles.button]}
                  titleStyle={{
                    ...styles.buttonTitle,
                    color: colors[index],
                    textDecorationLine:
                      route === selectedRoute ? "line-through" : "none",
                  }}
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
                  onPress={onCloseDrawer}
                  color="transparent"
                  style={styles.button}
                  titleStyle={{
                    ...styles.buttonSmallTitle,
                    color: colors[index + routes.length + 1],
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>
    </MaskedView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  button: { padding: 0, alignItems: "flex-start" },
  buttonTitle: {
    fontSize: 34,
    lineHeight: 34 * 1.5,
  },
  buttonSmallTitle: {
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
