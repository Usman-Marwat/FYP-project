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
import Tagline from "../../components/Tagline";
import MaterialInput from "../../components/MaterialInput";

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

const SpecificationScreen = ({ navigation, route }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [descriptions, setDescriptions] = useState([]);
  const [keys, setKeys] = useState(route.params.keys);
  const [allValues, setAllValues] = useState(route.params.allValues);

  const ref = React.useRef();
  const scrollView = useRef();
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const scrollY = useRef(new Animated.Value(0)).current;

  //calling handle description againand again is not costly becasue its not changing the UI
  const handleAddDescriotion = (text, index) => {
    const currentDescriptions = descriptions;
    currentDescriptions[index] = text;
    setDescriptions(currentDescriptions);
  };

  const calculateAnimations = (index) => {
    const inputRange = [-1, 0, 150 * index, 150 * (index + 2)];
    const opcaityInputRange = [-1, 0, 150 * index, 150 * (index + 0.7)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: opcaityInputRange,
      outputRange: [1, 1, 1, 0],
    });
    return { inputRange, opcaityInputRange, scale, opacity };
  };

  return (
    <>
      <Header navigation={navigation} translateX={translateX} />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        ref={scrollView}
        showsHorizontalScrollIndicator={false}
      >
        <Transitioning.View
          ref={ref}
          transition={transition}
          style={styles.container}
        >
          <Tagline heading="Add Specifications" headingColor="black" />

          {keys.map(({ name, image }, index) => {
            const { scale, opacity } = calculateAnimations(index);
            return (
              <TouchableOpacity
                key={name}
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
                <View
                  style={[styles.card, { backgroundColor: data[index].bg }]}
                >
                  <Text style={[styles.heading, { color: data[index].color }]}>
                    {name}
                  </Text>
                  {index === currentIndex && (
                    <View style={styles.accordianContent}>
                      {allValues[index].map((value, j) => {
                        return value.parent ? (
                          <View style={styles.list} key={j}>
                            <View
                              style={[
                                styles.listItemDot,
                                { backgroundColor: data[index].color },
                              ]}
                            />
                            <View>
                              <Text
                                style={[
                                  styles.body,
                                  { color: data[index].color },
                                ]}
                              >
                                {value.name}
                                <Text style={styles.parent}>
                                  {" - " + value.parent}
                                </Text>
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View style={styles.list} key={j}>
                            <View
                              style={[
                                styles.listItemDot,
                                { backgroundColor: data[index].color },
                              ]}
                            />
                            <Text
                              key={j}
                              style={[
                                styles.body,
                                { color: data[index].color },
                              ]}
                            >
                              {value}
                            </Text>
                          </View>
                        );
                      })}
                      <AppTextInput
                        minHeight={80}
                        placeholder="add Description"
                        placeholderTextColor={colors.white}
                        backgroundColor={data[index].color}
                        width="97%"
                        value={descriptions[index]}
                        onChangeText={(text) =>
                          handleAddDescriotion(text, index)
                        }
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={styles.emptyCardContainer}>
            <TouchableOpacity
              style={[styles.shadow, { shadowColor: colors.medium }]}
              onPress={() => setIsVisible(!isVisible)}
            >
              <Icon name="plus" size={55} backgroundColor={colors.secondary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.cardContainer]}></TouchableOpacity>
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
          onPress={() => setIsTableVisible(true)}
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
      <MaterialInput
        modalVisible={isVisible}
        onModalVisible={() => setIsVisible(!isVisible)}
      />
      <ContractTable
        isVisible={isTableVisible}
        onModalVisible={() => setIsTableVisible(false)}
      />
    </>
  );
};

export default SpecificationScreen;

const styles = StyleSheet.create({
  accordianText: {
    marginLeft: 50,
  },
  accordianContent: {
    alignItems: "flex-start",
    marginTop: 20,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
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
  emptyCardContainer: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.4,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10 / 2,
    marginLeft: 40,
  },
  listItemDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  parent: {
    lineHeight: 12,
    fontSize: 10.7,
    color: colors.medium,
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
