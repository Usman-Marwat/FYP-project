import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useRef, useState } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { StatusBar } from "expo-status-bar";

import MenuFoldButton from "../../navigation/MenuFoldButton";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import { translateMenuFold } from "../../navigation/navigationAnimations";

const data = [
  {
    key: "1",
    shopName: "Masonry",
    numberOfShops: 9,
    image:
      "https://images.unsplash.com/photo-1550379469-5a14b2ae1244?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    color: "#OC212D",
  },
  {
    key: "2",
    shopName: "Steel",
    numberOfShops: 6,
    image:
      "https://images.unsplash.com/photo-1507486076008-3c60cfcce36f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fHN0ZWVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    color: "#F8EACE",
  },
  {
    key: "3",
    shopName: "Mortar",
    numberOfShops: 5,
    image:
      "https://images.unsplash.com/photo-1564483335100-3413b45dbd37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
    color: "#E4EFEA",
  },
  {
    key: "4",
    shopName: "Others",
    numberOfShops: 7,
    image:
      "https://img.freepik.com/free-psd/construction-helmet-mockup_47987-2963.jpg?w=1800&t=st=1665042664~exp=1665043264~hmac=0a4f9f9e3ea7d1becfb09903d881ca94a396ed835cd4e877d51765481db048cb",
    color: "#E4EFEA",
  },
];

const { width } = Dimensions.get("screen");
const SPACING = 12;
const s = width * 0.68;
const ITEM_WIDTH = s;
const ITEM_HEIGHT = s * 1.5;
const RADIUS = 18;
const FULL_SIZE = s + SPACING * 2;

const Stockpile = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <View>
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={FULL_SIZE}
          decelerationRate="fast"
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          viewabilityConfig={viewabilityConfig}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * FULL_SIZE,
              index * FULL_SIZE,
              (index + 1) * FULL_SIZE,
            ];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.1, 1],
            });
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("StockpileDetailsScreen", { item });
                }}
                style={styles.itemContainer}
              >
                <SharedElement
                  id={`item.${item.key}.photo`}
                  style={[
                    StyleSheet.absoluteFillObject,
                    { overflow: "hidden", borderRadius: RADIUS },
                  ]}
                >
                  <Animated.Image
                    source={{ uri: item.image }}
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        resizeMode: "cover",
                        transform: [{ scale }],
                      },
                    ]}
                  />
                </SharedElement>

                <SharedElement id={`item.${item.key}.shopName`}>
                  <Animated.Text
                    style={[styles.shopName, { transform: [{ translateX }] }]}
                  >
                    {item.shopName}
                  </Animated.Text>
                </SharedElement>

                <View style={styles.shopsNumberContainer}>
                  <Text style={styles.shopsValue}>{item.numberOfShops}</Text>
                  <Text style={styles.shopsLabel}>shops</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <StatusBar hidden />
    </>
  );
};

export default Stockpile;

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
  },
  shopsNumberContainer: {
    position: "absolute",
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
  },
  shopsValue: {
    fontWeight: "800",
    color: "#fff",
    fontSize: 18,
  },
  shopsLabel: {
    color: "#fff",
    fontSize: 10,
  },
  shopName: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    width: ITEM_WIDTH * 0.8,
    textTransform: "uppercase",
    position: "absolute",
    top: SPACING * 2,
    left: SPACING * 2,
  },
});
