import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { faker } from "@faker-js/faker";
import { SharedElement } from "react-navigation-shared-element";
import CircularProgress from "react-native-circular-progress-indicator";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import routes from "../../navigation/routes";
import MenuFoldButton from "../../navigation/MenuFoldButton";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import colors from "../../config/colors";

faker.seed(1);

const SPACING = 10;
const data = [
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360483.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/8360/8360535.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/5046/5046935.png" },
  { image: "https://cdn-icons-png.flaticon.com/512/7153/7153980.png" },
];
const fakerData = data.map((item, index) => ({
  ...item,
  key: faker.datatype.uuid(),
  model: faker.commerce.product(),
  description: [...Array(2).keys()]
    .map(faker.commerce.productDescription)
    .join(". ")
    .substring(0, 20),
}));
const ITEM_SIZE = 120;
const BG_COLOR = "#C1CEE077";

const OngoingContracts = ({ navigation }) => {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  return (
    <View>
      <MenuFoldButton translateX={translateX} navigation={navigation} />

      <FlatList
        contentContainerStyle={{ padding: SPACING }}
        style={{ paddingTop: 70 }}
        data={fakerData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(routes.ONGOING_CONTRACTS_DETAILS, { item })
              }
            >
              <View style={styles.item}>
                <View>
                  <SharedElement id={`item.${item.key}.modal`}>
                    <Text style={styles.model}>{item.model}</Text>
                  </SharedElement>
                  <SharedElement id={`item.${item.key}.description`}>
                    <Text style={styles.description}>{item.description}</Text>
                  </SharedElement>
                </View>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={styles.image}
                >
                  <CircularProgress
                    value={70}
                    inActiveStrokeColor={"#9b59b6"}
                    inActiveStrokeOpacity={0.4}
                    inActiveStrokeWidth={25}
                    activeStrokeWidth={20}
                    progressValueStyle={{ fontWeight: "100", color: "grey" }}
                  />
                </SharedElement>
                <SharedElement id={`item.${item.key}.team`}>
                  <View style={{ top: 80, left: 25 }}>
                    <Text style={styles.projectTeamTitle}>Team</Text>
                    <View style={styles.projectTeamWrapper}>
                      {data.map((member) => (
                        <Image
                          key={Math.random().toString()}
                          style={styles.projectMemberPhoto}
                          source={{ uri: member?.image }}
                        />
                      ))}
                      <TouchableOpacity style={styles.plusBtnContainer}>
                        <MaterialCommunityIcons
                          name="plus"
                          size={22}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </SharedElement>
                <View style={styles.rowJustifyBetween}>
                  <View style={styles.flexRow}>
                    <MaterialCommunityIcons
                      name="calendar-month-outline"
                      size={20}
                      color={colors.medium}
                    />
                    <Text style={styles.projectBottomText}>12 10 2020</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <MaterialCommunityIcons
                      name="checkbox-marked"
                      size={20}
                      color={colors.medium}
                    />
                    <Text style={styles.projectBottomText}>Tasks</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default OngoingContracts;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    opacity: 0.7,
    position: "absolute",
    top: SPACING + 17,
  },
  item: {
    height: ITEM_SIZE * 1.7,
    borderRadius: 12,
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: BG_COLOR,
    overflow: "hidden",
  },
  image: {
    height: ITEM_SIZE * 1.2,
    width: "100%",
    position: "absolute",
    bottom: 10,
    right: "-60%",
  },
  model: {
    fontSize: 18,
    fontWeight: "700",
    position: "absolute",
  },
  rowJustifyBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 170,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  projectBottomText: {
    marginLeft: 5,
    fontSize: 14,
  },
  projectDescription: {
    color: colors.medium,
    marginBottom: 10,
  },
  projectTeamTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectTeamWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  projectMemberPhoto: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: -17,
  },
  plusBtnContainer: {
    backgroundColor: colors.primary,
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: -10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
