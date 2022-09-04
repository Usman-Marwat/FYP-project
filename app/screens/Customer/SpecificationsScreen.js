import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ProfileHeader } from "@freakycoder/react-native-header-view";
import Carousel from "react-native-reanimated-carousel";
import DropDownPicker from "react-native-dropdown-picker";

import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import Pagination from "../../components/Pagination";
import Screen from "../../components/Screen";

const badgeDotColors = [
  "#e76f51",
  "#00b4d8",
  "#e9c46a",
  "#e76f51",
  "#8ac926",
  "#00b4d8",
  "#e9c46a",
];
const keys = ["ALUMINIUM", "Sand", "Bajri", "Rock"];
const material = [
  [
    { label: "Spain", value: "spain" },
    { label: "Madrid", value: "madrid" },
    { label: "Barcelona", value: "barcelona" },
    { label: "s", value: "s" },
    { label: "d", value: "d" },
    { label: "a", value: "a" },
  ],
  [
    { label: "Italy", value: "italy" },
    { label: "Rome", value: "rome" },
    { label: "Finland", value: "finland" },
  ],
  [
    { label: "Pakistan", value: "Pakistan" },
    { label: "India", value: "India" },
  ],
  [
    { label: "Morocco", value: "Morocco" },
    { label: "Egypt", value: "Egypt" },
  ],
];

const width = Dimensions.get("window").width;

const SpecificationsScreen = () => {
  const [allValues, setAllValues] = useState([
    ["madrid"],
    ["rome"],
    ["Pakistan"],
    ["Morocco"],
  ]);
  const [index, setIndex] = useState(0);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(allValues[0]);
  const [items, setItems] = useState(material[0]);

  const handleCurrentItem = (index) => {
    setIndex(index);
    setValue(allValues[index]);
    setItems(material[index]);
  };

  const handleValueChange = (value) => {
    // if the new value length >=1 or previous value was not zero
    if (value.length >= 1 || allValues[index].length >= 1) {
      const currentAllValues = [...allValues];
      let currentValue = [...currentAllValues[index]];
      currentValue = value;
      currentAllValues[index] = currentValue;
      setAllValues(currentAllValues);
    }
  };

  return (
    <Screen>
      <ProfileHeader height={70} />
      <View>
        <Carousel
          // style={{ borderWidth: 1 }}
          loop
          width={width}
          height={width / 1.3}
          mode="parallax"
          pagingEnabled
          data={[...new Array(4).keys()]}
          scrollAnimationDuration={700}
          onSnapToItem={handleCurrentItem}
          renderItem={({ index }) => (
            <Card
              cardStyle={styles.cardStyle}
              imageUrl={imageUrl}
              imageStyle={styles.imageStyle}
              subTitle="200>"
              title="Premiuim"
              textAlign="center"
            />
          )}
        />
        <Pagination
          activeDotColor={colors.medium}
          curPage={index}
          maxPage={allValues.length}
          style={{ alignItems: "center", bottom: 30 }}
        />
      </View>

      <View style={styles.row}>
        <DropDownPicker
          ArrowDownIconComponent={({ style }) => (
            <Icon
              backgroundColor={colors.silver}
              name="chevron-down"
              iconColor={colors.medium}
              size={42}
            />
          )}
          ArrowUpIconComponent={({ style }) => (
            <Icon
              backgroundColor={colors.silver}
              name="chevron-up"
              iconColor="black"
              size={42}
            />
          )}
          badgeDotColors={badgeDotColors}
          containerStyle={styles.dropDownPicker}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          items={items}
          listItemLabelStyle={{
            color: colors.medium,
          }}
          mode="BADGE"
          multiple={true}
          open={open}
          onChangeValue={handleValueChange}
          placeholderStyle={{
            color: colors.medium,
            alignSelf: "center",
          }}
          maxHeight={170}
          placeholder="Select the item(s)"
          setValue={setValue}
          value={value}
          setOpen={setOpen}
          setItems={setItems}
          style={{
            borderWidth: 0,
            backgroundColor: colors.silver,
          }}
          theme="DARK"
          TickIconComponent={({ style }) => (
            <Icon
              backgroundColor={colors.medium}
              name="check"
              size={20}
              style={{ marginRight: 9.5 }}
            />
          )}
        />
      </View>
      <TouchableOpacity
        style={{ alignItems: "center", top: 175 }}
        onPress={() => console.log("hi")}
      >
        <Icon name="check" size={45} backgroundColor={colors.primary} />
      </TouchableOpacity>
    </Screen>
  );
};

export default SpecificationsScreen;

const styles = StyleSheet.create({
  cardStyle: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    //shadowprops
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.17,
    shadowRadius: 10,
  },
  dropDownPicker: {
    flex: 1,
  },
  dropDownContainerStyle: {
    marginTop: 0.2,
    marginHorizontal: 1,
    width: "99.3%",
    backgroundColor: colors.silver,
    borderColor: colors.silver,
    borderTopColor: colors.medium,
    borderTopWidth: 0.2,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  row: {
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
});

//data={[...new Array(6).keys()]}

const imageUrl =
  "https://images.unsplash.com/photo-1661977597155-1277a81affcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";

// we should not call setValue inside handleValueChange() here because that is then causing infinite loop
// setValue(allValues[index]);
