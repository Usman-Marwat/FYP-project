import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { SharedElement } from "react-navigation-shared-element";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import Header from "../../components/Header";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import Screen from "../../components/Screen";
import ListItem from "../../components/ListItem";
import AppButton from "../../components/AppButton";
import AppTextInput from "../../components/AppTextInput";

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

const shops = [
  {
    image:
      "https://img.freepik.com/free-photo/large-steel-factory-warehouse_1127-3285.jpg?w=1800&t=st=1665071783~exp=1665072383~hmac=46c472e4b154f78692a7fd6eaa5f91664062aa1adb8e42f5e35e443a296287d5",
  },
  {
    image:
      "https://img.freepik.com/free-photo/manual-worker-with-face-mask-stacking-wood-planks-shelf-carpentry-workshop_637285-11717.jpg?w=1800&t=st=1665071930~exp=1665072530~hmac=a11ab314ef74acaab7a9a0dc4261f955bc8cbc136d47692a6cadced3e97c9824",
  },
  {
    image:
      "https://img.freepik.com/free-photo/man-is-working-with-giant-drill-busy-metal-factory_613910-17164.jpg?w=1800&t=st=1665071970~exp=1665072570~hmac=ae278e01bd17e0d5d08f11057277d4369adecac1df68ed35b06b2512ef520049",
  },
  {
    image:
      "https://img.freepik.com/premium-photo/metal-bar-3d_103577-96.jpg?w=2000",
  },
  {
    image:
      "https://img.freepik.com/free-photo/craftsman-creating-wood-piece_1157-45890.jpg?w=1800&t=st=1665072218~exp=1665072818~hmac=45b6ed5dedf7d79cf8c8b005df2dfddb1ccbe01cd7654ff0075a6d9844327180",
  },
  {
    image:
      "https://img.freepik.com/free-photo/male-worker-factory_1303-14262.jpg?w=1800&t=st=1665071626~exp=1665072226~hmac=d38f686e9c41b221f7266e1988ac5edef613f40509ff663fa7b36567b1d8501a",
  },
  {
    image:
      "https://img.freepik.com/premium-photo/metal-frame-construction-site-with-blurry-plan_220838-118.jpg?w=1800",
  },
];

const StockpileDetails = ({ navigation, route }) => {
  const { item } = route.params;
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const [showUp, setShowUp] = useState(false);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["10%", "40%", "70%"], []);

  const handleClosePress = () => bottomSheetRef.current.close();
  const handleSnapToIndex = () => bottomSheetRef.current.snapToIndex(0);

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
            onScrollBeginDrag={handleClosePress}
            contentContainerStyle={{ padding: SPACING }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleSnapToIndex}
                >
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
                    <Text style={styles.shopText}>Shop #{item + 1}</Text>
                  </Animatable.View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <StatusBar hidden />
      </Screen>

      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
        {!showUp && (
          <Animatable.View
            animation="fadeInLeft"
            duration={700}
            delay={10}
            style={{ flex: 1 }}
          >
            <ListItem
              title="Faisal steel provider"
              onPress={() => setShowUp(true)}
            />

            <BottomSheetFlatList
              data={shops}
              keyExtractor={(item) => item.image}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexGrow: 0 }}
              renderItem={({ item }) => {
                return (
                  <View style={styles.shopImageContainer}>
                    <Image
                      source={{ uri: item.image }}
                      style={[
                        StyleSheet.absoluteFillObject,
                        { borderRadius: 20 },
                      ]}
                    />
                  </View>
                );
              }}
            />
            <BottomSheetScrollView>
              {shops.map((shop, index) => (
                <View key={index} style={{ marginLeft: 40 }}>
                  <Text style={styles.subTitle}>Material {index}</Text>
                  {[...Array(3).keys()].map((_, i) => (
                    <View style={styles.list} key={i}>
                      <View
                        style={[
                          styles.listItemDot,
                          { backgroundColor: "black" },
                        ]}
                      />
                      <Text>hey</Text>
                    </View>
                  ))}
                </View>
              ))}
            </BottomSheetScrollView>
          </Animatable.View>
        )}
        {showUp && (
          <Animatable.View
            animation="fadeInRight"
            duration={700}
            delay={10}
            style={{ alignItems: "center" }}
          >
            <AppButton
              title="close"
              onPress={() => setShowUp(!showUp)}
              style={{ width: 100 }}
            />
            <AppTextInput />
            <AppTextInput />
            <AppTextInput />
            <AppTextInput />
          </Animatable.View>
        )}
      </BottomSheet>
    </>
  );
};

export default StockpileDetails;

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
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
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING / 2,
    marginLeft: SPACING,
  },
  listItemDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: SPACING,
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
  shopText: {
    fontWeight: "700",
    marginTop: 10,
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
  shopImageContainer: {
    padding: 20,
    marginHorizontal: 10,
    width: 200,
    height: 200,
  },
});
