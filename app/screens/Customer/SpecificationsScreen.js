import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Transition, Transitioning } from "react-native-reanimated";
import { ProfileHeader } from "@freakycoder/react-native-header-view";

import colors from "../../config/colors";
import Icon from "../../components/Icon";
import AppTextInput from "../../components/AppTextInput";
import ContractTable from "../../components/ContractTable";
import routes from "../../navigation/routes";

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

  return (
    <>
      <ScrollView
        ref={scrollView}
        onContentSizeChange={() => {
          if (currentIndex == 4)
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
      </ScrollView>
      <View style={styles.tagline}>
        <Text>Add Specificatons</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity>
          <Icon name="bookmark" size={35} backgroundColor={colors.medium} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Icon name="table" size={50} backgroundColor={colors.medium} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(routes.FIRMSLIST)}>
          <Icon name="arrow-right" size={35} backgroundColor={colors.medium} />
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
    minHeight: 120,
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
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },
  subCategoriesList: {
    marginTop: 20,
  },
  tagline: {
    marginVertical: 20,
    alignItems: "center",
  },
});
