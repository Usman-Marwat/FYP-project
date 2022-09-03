import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { ProfileHeader } from "@freakycoder/react-native-header-view";
import Carousel from "react-native-reanimated-carousel";

import DropDownPicker from "react-native-dropdown-picker";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";

const badgeDotColors = [
  "#e76f51",
  "#00b4d8",
  "#e9c46a",
  "#e76f51",
  "#8ac926",
  "#00b4d8",
  "#e9c46a",
];

const width = Dimensions.get("window").width;
const keys = ["Aluminium", "Sand"];
const material = [
  [
    { label: "Spain", value: "spain" },
    { label: "Madrid", value: "madrid" },
    { label: "Barcelona", value: "barcelona" },
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
const allValues = [["madrid"], ["rome"], ["Pakistan"], ["Morocco"]];

const SpecificationsScreen = () => {
  const [index, setIndex] = useState(0);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(material[0]);
  const [count, setCount] = useState(0);

  const handleCurrentItem = (index) => {
    setIndex(index);
    setValue(allValues[index]);
    setItems(material[index]);

    // setValue(allValues[index]);
  };

  const handleValueChange = (value) => {
    console.log("----------------------" + count + "--------------------");
    setCount((prevCount) => prevCount + 1);

    // if the new value length >=1 or previous value was not zero
    if (value.length >= 1 || allValues[index].length >= 1)
      allValues[index] = value;
    console.log(allValues);
  };

  return (
    <Screen>
      <ProfileHeader height={70} />
      <View>
        <Carousel
          loop
          width={width}
          height={width / 2}
          mode="parallax"
          pagingEnabled
          data={[...new Array(4).keys()]}
          scrollAnimationDuration={1000}
          onSnapToItem={handleCurrentItem}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 30 }}>
                {"blah" + index}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.row}>
        <AppText style={styles.titleText}> Aluminiuim</AppText>
        <DropDownPicker
          badgeDotColors={badgeDotColors}
          items={items}
          mode="BADGE"
          value={value}
          setValue={setValue}
          onChangeValue={handleValueChange}
          multiple={true}
          open={open}
          setOpen={setOpen}
          setItems={setItems}
          style={{
            borderColor: "white",
          }}
          containerStyle={styles.dropDownPicker}
          dropDownContainerStyle={{
            marginHorizontal: 1,
            width: "99.3%",
          }}
          theme="DARK"
        />
      </View>
    </Screen>
  );
};

export default SpecificationsScreen;

const styles = StyleSheet.create({
  dropDownPicker: {
    flex: 1,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  row: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 70,
  },
  titleText: {
    marginRight: 20,
    width: "25%",
    textAlign: "center",
  },
});

//data={[...new Array(6).keys()]}
