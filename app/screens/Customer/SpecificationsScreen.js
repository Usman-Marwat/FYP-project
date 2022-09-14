import React, { useRef, useState, useContext } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Transition, Transitioning } from "react-native-reanimated";

import colors from "../../config/colors";
import Icon from "../../components/Icon";
import AppTextInput from "../../components/AppTextInput";
import ContractTable from "../../components/ContractTable";
import routes from "../../navigation/routes";
import MenuFoldButton from "../../navigation/MenuFoldButton";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import Header from "../../components/Header";

const data = [
  {
    bg: colors.silver,
    color: "#3F5B98",
    category: "Healthcare",
    subCategories: ["Skincare", "Personal care", "Health", "Eye care"],
  },
  {
    bg: colors.silver,
    color: "#FCBE4A",
    category: "Food & Drink",
    subCategories: [
      "Fruits & Vegetables",
      "Frozen Food",
      "Bakery",
      "Snacks & Desserts",
      "Beverages",
      "Alcoholic beverages",
      "Noodles & Pasta",
      "Rice & Cooking oil",
    ],
  },
  {
    bg: colors.silver,
    color: "#FD5963",
    category: "Beauty",
    subCategories: ["Skincare", "Makeup", "Nail care", "Perfume"],
  },
  {
    bg: colors.silver,
    color: "#FECBCD",
    category: "Baby & Kids",
    subCategories: [
      "Toys",
      "Trolleys",
      "LEGO®",
      "Electronics",
      "Puzzles",
      "Costumes",
      "Food",
      "Hygiene & Care",
      "Child's room",
      "Feeding accessories",
    ],
  },
  {
    bg: colors.silver,
    color: colors.secondary,
    category: "Homeware",
    subCategories: [
      "Air purifiers",
      "Stoves, hoods & ovens",
      "Refrigerators",
      "Coffee & Tea",
      "Air conditioning",
      "Grilling",
      "Vacuum cleaners",
    ],
  },
  {
    bg: colors.silver,
    color: colors.secondary,
    category: "Homeware2",
    subCategories: [
      "Air purifiers",
      "Stoves, hoods & ovens",
      "Refrigerators",
      "Coffee & Tea",
      "Air conditioning",
      "Grilling",
      "Vacuum cleaners",
    ],
  },
];

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const SpecificationScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef();
  const scrollView = useRef();

  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Header navigation={navigation} translateX={translateX} />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        ref={scrollView}
        // style={{ paddingVertical: 150 }}
        // onContentSizeChange={() => {
        //   if (currentIndex == 4)
        //     return scrollView.current.scrollToEnd({ animated: true });
        // }}
        showsHorizontalScrollIndicator={false}
      >
        <Transitioning.View
          ref={ref}
          transition={transition}
          style={styles.container}
        >
          <View
            key={Math.random().toString()}
            style={{ width: "100%", height: 100 }}
          />
          {data.map(({ bg, color, category, subCategories }, index) => {
            const inputRange = [-1, 0, 130 * index, 130 * (index + 2)];
            const opcaityInputRange = [-1, 0, 130 * index, 130 * (index + 0.7)];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opcaityInputRange,
              outputRange: [1, 1, 1, 0],
            });

            return (
              <TouchableOpacity
                key={category}
                onPress={() => {
                  ref.current.animateNextTransition();
                  setCurrentIndex(index === currentIndex ? null : index);
                }}
                style={[
                  styles.cardContainer,
                  { opacity, transform: [{ scale: scale }] },
                ]}
                activeOpacity={0.9}
              >
                <View style={[styles.card, { backgroundColor: bg }]}>
                  <Text style={[styles.heading, { color }]}>{category}</Text>
                  {index === currentIndex && (
                    <View style={styles.subCategoriesList}>
                      {subCategories.map((subCategory, index) => (
                        <View key={subCategory}>
                          <Text style={[styles.body, { color }]}>
                            {subCategory}
                          </Text>
                        </View>
                      ))}
                      <AppTextInput
                        minHeight={50}
                        placeholder="add Description"
                        placeholderTextColor={colors.white}
                        backgroundColor={color}
                        width="90%"
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </Transitioning.View>
      </Animated.ScrollView>

      <View style={styles.row}>
        <TouchableOpacity style={styles.shadow}>
          <Icon
            name="bookmark"
            iconColor="#222"
            size={35}
            backgroundColor={colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shadow}
          onPress={() => setIsVisible(true)}
        >
          <Icon
            name="grid"
            iconColor="#222"
            size={50}
            backgroundColor={colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shadow}
          onPress={() => navigation.navigate(routes.FIRMSLIST)}
        >
          <Icon
            name="arrow-right"
            iconColor="#222"
            size={35}
            backgroundColor={colors.white}
          />
        </TouchableOpacity>
      </View>
      <ContractTable
        isVisible={isVisible}
        onModalVisible={() => setIsVisible(false)}
      />
      <StatusBar hidden={false} />
    </>
  );
};

export default SpecificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  cardContainer: {
    minHeight: 150,
    // paddingHorizontal: 20,
    flexGrow: 1,
    shadowColor: "silver",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",

    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  subCategoriesList: {
    marginTop: 20,
  },
  shadow: {
    // backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  tagline: {
    marginVertical: 20,
    alignItems: "center",
  },
});
