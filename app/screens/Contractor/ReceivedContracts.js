import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import niceColors from "nice-color-palettes";
import { faker } from "@faker-js/faker";
import { SharedElement } from "react-navigation-shared-element";

import contractorContractsApi from "../../api/Contractor/contracts";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import MenuFoldButton from "../../navigation/MenuFoldButton";
import routes from "../../navigation/routes";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import useNotifications from "../../hooks/useNotifications";
import ActivityIndicator from "../../components/ActivityIndicator";
import MyMap from "../../components/MyMap";

faker.seed(1);
const colors = niceColors[1];

const data = [
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360483.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360535.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046935.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7153/7153980.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7880/7880183.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046934.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/6664/6664537.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/4982/4982394.png" },
];

const tabs = [
  "All",
  "Building",
  "Plumbing",
  "Electrician",
  "Painting",
  "Cleaning",
  "Something",
];
const fakerData = data.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  type: faker.commerce.product(),
  subType: faker.commerce.productName(),
  color: `${colors[index % colors.length]}66`,
  fullColor: colors[index % colors.length],

  description: [...Array(2).keys()]
    .map(faker.commerce.productDescription)
    .join(". "),
  price: `$${(faker.random.numeric(200) + 50) / 10}`.substring(0, 7),
  subCategories: faker.helpers.shuffle(data).slice(0, 3),
}));

const { width } = Dimensions.get("window");

const ORANGE = "#FB9B06";
const SPACING = 10;
const CELL_WIDTH = width * 0.64;
const imageUri = "https://cdn-icons-png.flaticon.com/256/4105/4105448.png";

const ReceivedContracts = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const { loading } = useNotifications();

  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const handleCurentIndex = (index) => {
    if (index < 0) return setCurrentIndex(0);
    if (index > fakerData.length - 1)
      return setCurrentIndex(fakerData.length - 1);
    setCurrentIndex(index);
  };

  const contractsApi = useApi(contractorContractsApi.getContracts);

  useEffect(() => {
    contractsApi.request("63390ba766243cb0ff33ecd5");
  }, []);

  return (
    <>
      <ActivityIndicator visible={contractsApi.loading} />
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <View style={{ paddingTop: 50 }}>
        <View>
          <FlatList
            data={tabs}
            horizontal
            style={{ flexGrow: 1, marginHorizontal: 50 }}
            contentContainerStyle={{ padding: SPACING }}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item: tab }) => {
              return (
                <TouchableOpacity onPress={() => setSelectedTab(tab)}>
                  <View
                    style={[
                      styles.pill,
                      {
                        backgroundColor:
                          selectedTab === tab ? ORANGE : "transparent",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        { color: selectedTab === tab ? "white" : "#000" },
                      ]}
                    >
                      {tab}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {contractsApi.data.length > 0 && (
          <>
            <View>
              <FlatList
                data={fakerData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                decelerationRate="fast"
                pagingEnabled
                onMomentumScrollEnd={(e) => {
                  const index = Math.floor(
                    Math.floor(e.nativeEvent.contentOffset.x) /
                      Math.floor(e.nativeEvent.layoutMeasurement.width)
                  );
                  handleCurentIndex(index);
                }}
                renderItem={({ item, index }) => {
                  if (index < contractsApi.data.length) {
                    const contract = contractsApi.data[index].contract;
                    return (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate(
                              routes.RECEIVED_CONTRACT_DETAILS,
                              {
                                item: contractsApi.data[index],
                                DB: true,
                                imageUri,
                              }
                            );
                          }}
                          style={styles.itemCell}
                        >
                          <View style={styles.itemContainer}>
                            <SharedElement
                              id={`item.${item.key}.bg`}
                              style={[StyleSheet.absoluteFillObject]}
                            >
                              <View
                                style={[
                                  StyleSheet.absoluteFillObject,
                                  {
                                    backgroundColor: "#C1CEE077",
                                    borderRadius: 16,
                                  },
                                ]}
                              />
                            </SharedElement>
                            <SharedElement
                              id={`item.${item.key}.meta`}
                              style={StyleSheet.absoluteFillObject}
                            >
                              <View style={styles.textContainer}>
                                <Text style={styles.type}>
                                  {contract.title}
                                </Text>
                                <Text style={styles.subType}>SubType</Text>
                              </View>
                            </SharedElement>
                            <SharedElement
                              id={`item.${item.key}.image`}
                              style={styles.image}
                            >
                              <Image
                                source={{ uri: imageUri }}
                                style={styles.image}
                              />
                            </SharedElement>
                          </View>
                        </TouchableOpacity>
                      </>
                    );
                  }
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(routes.RECEIVED_CONTRACT_DETAILS, {
                          item,
                        });
                      }}
                      style={styles.itemCell}
                    >
                      <View style={styles.itemContainer}>
                        <SharedElement
                          id={`item.${item.key}.bg`}
                          style={[StyleSheet.absoluteFillObject]}
                        >
                          <View
                            style={[
                              StyleSheet.absoluteFillObject,
                              { backgroundColor: item.color, borderRadius: 16 },
                            ]}
                          />
                        </SharedElement>
                        <SharedElement
                          id={`item.${item.key}.meta`}
                          style={StyleSheet.absoluteFillObject}
                        >
                          <View style={styles.textContainer}>
                            <Text style={styles.type}>{item.type}</Text>
                            <Text style={styles.subType}>{item.subType}</Text>
                          </View>
                        </SharedElement>
                        <SharedElement
                          id={`item.${item.key}.image`}
                          style={styles.image}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                          />
                        </SharedElement>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            {currentIndex < contractsApi.data.length && (
              <View>
                <ScrollView>
                  <Text>{currentIndex}</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <Text>bchasjbchjas</Text>
                  <MyMap
                    style={styles.map}
                    region={{
                      ...contractsApi.data[currentIndex].contract.location,
                      latitudeDelta: 0.017,
                      longitudeDelta: 0.017,
                    }}
                  />
                  <View style={{ height: 700 }} />
                </ScrollView>
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default ReceivedContracts;

const styles = StyleSheet.create({
  itemCell: {
    height: CELL_WIDTH,
    width: width - 20,
    margin: SPACING,
  },
  itemContainer: {
    flex: 1,
    padding: SPACING,
    justifyContent: "center",
  },
  image: {
    width: CELL_WIDTH * 0.5,
    height: CELL_WIDTH * 0.5,
    alignSelf: "center",
    resizeMode: "contain",
    position: "absolute",
    right: 7,
    bottom: 20,
  },
  map: {
    width: 350,
    height: 300,
  },
  pill: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 2,
    borderRadius: 12,
  },
  pillText: {
    fontWeight: "700",
  },
  subType: {
    color: "grey",
  },
  type: { fontWeight: "800" },
  textContainer: {
    position: "absolute",
    left: SPACING,
    top: SPACING * 2,
  },
});
