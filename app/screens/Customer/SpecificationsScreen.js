import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";
import niceColors from "nice-color-palettes";

import colors from "../../config/colors";
import Icon from "../../components/Icon";
import AppTextInput from "../../components/AppTextInput";
import ContractTable from "../../components/ContractTable";
import routes from "../../navigation/routes";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import Header from "../../components/Header";
import Tagline from "../../components/Tagline";
import MaterialInput from "../../components/MaterialInput";
import _ from "lodash";
import ImageInputList from "../../components/ImageInputList";
import customerContractApi from "../../api/Customer/contract";

const colorsPalette = [
  "#3F5B98",
  ...niceColors[39],
  "#FCBE4A",
  "#FD5963",
  ...niceColors[8],
  "#FECBCD",
  ...niceColors[10].slice(1, 5),
  ...niceColors[6],
  ...niceColors[14],
  ...niceColors[21].slice(1, 3),
  ...niceColors[41],
  ...niceColors[50].slice(0, 3),
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
  const [descriptions, setDescriptions] = useState(["", "", "", ""]);
  const [imagesUris, setImagesUris] = useState(route.params.imagesUris);
  const [keys, setKeys] = useState(route.params.keysValues);
  const [allValues, setAllValues] = useState(route.params.allValues);

  const ref = React.useRef();
  const scrollView = useRef();
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);
  const scrollY = useRef(new Animated.Value(0)).current;

  //calling handle description again and again is not costly becasue its not changing the UI
  //check that using useEffect
  const handleAddDescription = (text, index) => {
    const currentDescriptions = _.cloneDeep(descriptions);
    currentDescriptions[index] = text;
    setDescriptions(currentDescriptions);
  };
  const handleAddImage = (uri, index, newMaterial = true) => {
    const imagesUris2 = _.cloneDeep(imagesUris);
    if (newMaterial)
      Array.isArray(uri) ? imagesUris2.push(uri) : imagesUris2.push([uri]);
    else {
      let imageUris = imagesUris2[index];
      imageUris === undefined
        ? (imagesUris2[index] = [uri])
        : imageUris.push(uri);
    }
    setImagesUris(imagesUris2);
  };
  const handleRemoveImage = (uri, index) => {
    const imagesUris2 = _.cloneDeep(imagesUris);
    imagesUris2[index] = imagesUris2[index].filter(
      (imageUri) => imageUri !== uri
    );
    if (imagesUris2[index] < 1) imagesUris2[index] = undefined;
    setImagesUris(imagesUris2);
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
  const addMaterial = (MaterialData) => {
    const newAllValues = _.cloneDeep(allValues);
    const newKeys = _.cloneDeep(keys);
    newAllValues.push([
      { name: MaterialData.material, parent: MaterialData.category },
    ]);
    newKeys.push(MaterialData.material);
    handleAddDescription(MaterialData.description, newAllValues.length - 1);
    handleAddImage(MaterialData.images);

    setKeys(newKeys);
    setAllValues(newAllValues);
  };

  // useEffect(() => {
  //   console.log("hi");
  // });

  // useEffect(() => {
  //   console.log("The images URis are ");
  //   console.log(imagesUris);
  // }, [allValues, imagesUris]);

  const sendData = async () => {
    const contract = { keys, allValues, descriptions, imagesUris };
    const result = await customerContractApi.addContract(contract, (prog) =>
      console.log(prog)
    );
    console.log(result.data);
    if (!result.ok) {
      return alert("Could not save the Contract");
    }
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

          {keys.map((key, index) => {
            const { scale, opacity } = calculateAnimations(index);
            const alias = colorsPalette[index % colorsPalette.length];
            if (key === undefined) return null;
            return (
              <TouchableOpacity
                key={index}
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
                <View style={[styles.card, { backgroundColor: colors.white }]}>
                  <Text style={[styles.heading, { color: alias }]}>{key}</Text>
                  {index === currentIndex && (
                    <View style={styles.accordianContent}>
                      {allValues[index].map((value, j) => {
                        return value.parent ? (
                          <View style={styles.list} key={j}>
                            <View
                              style={[
                                styles.listItemDot,
                                { backgroundColor: alias },
                              ]}
                            />
                            <View>
                              <Text style={[styles.body, { color: alias }]}>
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
                                { backgroundColor: alias },
                              ]}
                            />
                            <Text
                              key={j}
                              style={[styles.body, { color: alias }]}
                            >
                              {value}
                            </Text>
                          </View>
                        );
                      })}

                      <AppTextInput
                        minHeight={80}
                        multiline
                        placeholder="add Description"
                        width="97%"
                        value={descriptions[index]}
                        onChangeText={(text) =>
                          handleAddDescription(text, index)
                        }
                      />
                      <View style={styles.scrollViewContainer}>
                        <ImageInputList
                          imageUris={imagesUris[index]}
                          onAddImage={(uri) =>
                            handleAddImage(uri, index, false)
                          }
                          onRemoveImage={(uri) => {
                            handleRemoveImage(uri, index);
                          }}
                        />
                      </View>
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
              <Icon name="plus" size={55} backgroundColor={colors.medium} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.cardContainer]}></TouchableOpacity>
        </Transitioning.View>
      </Animated.ScrollView>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.shadow, { alignItems: "center" }]}>
          <Icon
            name="bookmark"
            iconColor="#222"
            size={35}
            backgroundColor={colors.white}
          />
          <Text style={styles.buttonTitle}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shadow, { alignItems: "center" }]}
          onPress={() => setIsTableVisible(true)}
        >
          <Icon
            name="grid"
            iconColor="#222"
            size={50}
            backgroundColor={colors.white}
          />
          <Text style={styles.buttonTitle}>Table View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.shadow, { alignItems: "center" }]}
          onPress={() =>
            navigation.navigate(routes.FIRMSLIST, {
              contract: { keys, allValues, descriptions, imagesUris },
            })
          }
        >
          <Icon name="arrow-right" size={35} backgroundColor={colors.primary} />
          <Text style={styles.buttonTitle}>Send</Text>
        </TouchableOpacity>
      </View>
      <MaterialInput
        modalVisible={isVisible}
        onModalVisible={() => setIsVisible(!isVisible)}
        onValuesChange={addMaterial}
      />
      <ContractTable
        allValues={allValues}
        descriptions={descriptions}
        imageUris={imagesUris}
        keys={keys}
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
    top: -20,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
  buttonTitle: {
    marginTop: 3,
    fontSize: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  cardContainer: {
    minHeight: 150,
    flexGrow: 1,
    shadowColor: "silver",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
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
    marginVertical: 30,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 30,
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
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 2,
    justifyContent: "space-between",
    alignItems: "center",

    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tagline: {
    marginVertical: 20,
    alignItems: "center",
  },
  scrollViewContainer: {
    height: 120,
    width: 400,
  },
});
