import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Transition, Transitioning } from "react-native-reanimated";

import Screen from "../../components/Screen";
import colors from "../../config/colors";

let screenHeight = Dimensions.get("window").height;
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
    category: "usman",
    subCategories: [
      "Air ",
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
    category: "khan",
    subCategories: [
      "Air purrs",
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

const SpecificationScreen = () => {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        onContentSizeChange={() => {
          if (currentIndex == 6)
            return scrollView.current.scrollToEnd({ animated: true });
        }}
      >
        <Transitioning.View
          ref={ref}
          transition={transition}
          style={styles.container}
        >
          {data.map(({ bg, color, category, subCategories }, index) => {
            return (
              <TouchableOpacity
                key={category}
                onPress={() => {
                  ref.current.animateNextTransition();
                  setCurrentIndex(index === currentIndex ? null : index);
                }}
                style={styles.cardContainer}
                activeOpacity={0.9}
              >
                <View style={[styles.card, { backgroundColor: bg }]}>
                  <Text style={[styles.heading, { color }]}>{category}</Text>
                  {index === currentIndex && (
                    <View style={styles.subCategoriesList}>
                      {subCategories.map((subCategory) => (
                        <Text
                          key={subCategory}
                          style={[styles.body, { color }]}
                        >
                          {subCategory}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </Transitioning.View>
      </ScrollView>
    </View>
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
    flexGrow: 1,
    shadowColor: colors.primary,
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
    fontSize: 38,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
  subCategoriesList: {
    marginTop: 20,
  },
});
