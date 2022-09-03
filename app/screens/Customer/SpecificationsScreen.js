import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ProfileHeader } from "@freakycoder/react-native-header-view";

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

const SpecificationsScreen = () => {
  const [material, setMaterial] = useState(["aluminium", "sand"]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(["finland"]);
  const [items, setItems] = useState([
    { label: "Spain", value: "spain" },
    {
      label: "Madrid",
      value: "madrid",
      icon: () => (
        <Image
          source={require("../../assets/icon.png")}
          style={styles.iconStyle}
        />
      ),
    },
    { label: "Barcelona", value: "barcelona" },
    { label: "Italy", value: "italy" },
    { label: "Rome", value: "rome" },
    { label: "Finland", value: "finland" },
  ]);
  const [items2, setItems2] = useState([]);

  return (
    <Screen>
      <ProfileHeader height={70} />
      <View style={styles.row}>
        <AppText style={styles.titleText}> Aluminiuim</AppText>
        <DropDownPicker
          badgeDotColors={badgeDotColors}
          items={items}
          mode="BADGE"
          multiple={true}
          open={open}
          setOpen={(open) => console.log(open)}
          setValue={(value) => setValue(value)}
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
          value={value}
        />
      </View>
      <View style={styles.row}>
        <AppText style={styles.titleText}> Aluminiuim</AppText>
        <DropDownPicker
          badgeDotColors={badgeDotColors}
          items={items2}
          mode="BADGE"
          multiple={true}
          open={open}
          setOpen={setOpen}
          setValue={(value) => setValue(value)}
          setItems={setItems2}
          style={{
            borderColor: "white",
          }}
          containerStyle={styles.dropDownPicker}
          dropDownContainerStyle={{
            marginHorizontal: 1,
            width: "99.3%",
          }}
          theme="DARK"
          value={value}
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
