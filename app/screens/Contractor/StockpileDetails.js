import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import { SharedElement } from "react-navigation-shared-element";
import BottomSheet from "@gorhom/bottom-sheet";

import Header from "../../components/Header";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import Screen from "../../components/Screen";

const { width } = Dimensions.get("screen");
const SPACING = 12;
const s = width * 0.68;
const ITEM_WIDTH = s;

const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

const StockpileDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "50%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <>
      <Screen>
        <Header translateX={translateX} navigation={navigation} />
        <SharedElement
          id={`item.${item.key}.photo`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <Image
            source={{ uri: item.image }}
            style={[StyleSheet.absoluteFillObject]}
          />
        </SharedElement>
        <SharedElement id={`item.${item.key}.shopName`}>
          <Text style={[styles.shopName]}>{item.shopName}</Text>
        </SharedElement>
        <View style={styles.locationContainer}>
          <Text style={styles.location}>Locations</Text>
          <FlatList
            data={[...Array(8).keys()]}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: SPACING }}
            renderItem={({ item, index }) => {
              return (
                <Animatable.View
                  animation={zoomIn}
                  duration={700}
                  delay={400 + index * 100}
                  style={styles.mapContainer}
                >
                  <Image
                    source={{
                      uri: "https://img.freepik.com/free-vector/informational-city-map-with-streets-name_23-2148309621.jpg?w=1800&t=st=1665058548~exp=1665059148~hmac=c1ba21ab8e84c3261052035695b73e1bdb5fe01e1b1ea0afb3b63e9ac176079e",
                    }}
                    style={styles.mapImage}
                  />
                  <Text style={styles.locationText}>Location #{item + 1}</Text>
                </Animatable.View>
              );
            }}
          />
        </View>
        <StatusBar hidden />
      </Screen>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.bottomSheetContent}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </>
  );
};

export default StockpileDetails;

const styles = StyleSheet.create({
  //   bottomSheetContainer: {
  //     padding: 24,
  //     backgroundColor: "red",
  //   },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
  },
  locationContainer: {
    position: "absolute",
    top: 250,
  },
  location: {
    fontSize: 16,
    width: "100%",
    textTransform: "uppercase",
    fontWeight: "800",
    color: "#fff",
    marginHorizontal: SPACING,
  },
  locationText: {
    fontWeight: "700",
    marginTop: 10,
  },
  mapContainer: {
    backgroundColor: "#fff",
    padding: SPACING,
    width: width * 0.33,
    height: width * 0.5,
    marginRight: SPACING,
  },
  mapImage: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
  shopName: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    width: ITEM_WIDTH * 0.8,
    textTransform: "uppercase",
    position: "absolute",
    top: 70,
    left: SPACING * 2,
  },
});
