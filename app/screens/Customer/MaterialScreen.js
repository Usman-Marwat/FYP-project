import React, { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import DropDownPicker from "react-native-dropdown-picker";
import _ from "lodash";

import Card from "../../components/Card";
import colors from "../../config/colors";
import Header from "../../components/Header";
import Icon from "../../components/Icon";
import Pagination from "../../components/Pagination";
import routes from "../../navigation/routes";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import Tagline from "../../components/Tagline";

const width = Dimensions.get("window").width;
const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.17,
  shadowRadius: 10,
};
const badgeDotColors = [
  "#e76f51",
  "#00b4d8",
  "#e9c46a",
  "#e76f51",
  "#8ac926",
  "#00b4d8",
  "#e9c46a",
];
const keys = [
  {
    name: "Cement",
    imageUrl:
      "https://images.unsplash.com/photo-1560435650-7ec2e17ba926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "Bricks",
    imageUrl:
      "https://images.unsplash.com/photo-1633821051688-fc558b716185?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YnJpY2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  },
  {
    name: "Steel",
    imageUrl:
      "https://images.unsplash.com/photo-1530863506128-dc9eb5c3e0fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGNvbnN0cnVjdGlvbiUyMHN0ZWVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
  },
  // {
  //   name: "Wires",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1518181835702-6eef8b4b2113?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  // },
  {
    name: "Doors",
    imageUrl:
      "https://images.unsplash.com/photo-1601084213767-04a4dba01dbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fHJvb20lMjBkb29yc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60",
  },
];
const material = [
  [
    { label: "Lakki", value: "lakki" },
    { label: "Fauji", value: "fauji" },
    { label: "Barcelona", value: "barcelona" },
    { label: "s", value: "s" },
    { label: "d", value: "d" },
    { label: "a", value: "a" },
  ],
  [
    { label: "Brick1", value: "brick1" },
    { label: "Brick2", value: "brick2" },
    { label: "Brick3", value: "brick3" },
  ],
  [
    { label: "Steel1", value: "steel1" },
    { label: "Steel2", value: "steel2" },
  ],
  [
    { label: "Gate", value: "gate", disabled: "disabled" },
    {
      label: "Gate1",
      value: { name: "Gate1", parent: "Gate" },
      parent: "gate",
    },

    { label: "Room Doors", value: "roomDoors", disabled: "disabled" },
    {
      label: "Door2",
      value: { name: "Door2", parent: "Room Doors" },
      parent: "roomDoors",
    },

    { label: "Washroom Doors", value: "washroomDoors", disabled: "disabled" },
    {
      label: "Door3",
      value: { name: "Door3", parent: "Washroom Doors" },
      parent: "washroomDoors",
    },
    {
      label: "Door4",
      value: { name: "Door4", parent: "Washroom Doors" },
      parent: "washroomDoors",
    },
  ],
];

const MaterialScreen = ({ navigation }) => {
  const [allValues, setAllValues] = useState([
    ["lakki"],
    ["brick1"],
    ["steel1"],
    [],
  ]);
  const [keysValues, setKeysValues] = useState([
    "Cement",
    "Bricks",
    "Steel",
    undefined,
  ]);
  const [index, setIndex] = useState(0);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(allValues[0]);
  const [items, setItems] = useState(material[0]);

  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const handleCurrentItem = (index) => {
    setIndex(index);
    setValue(allValues[index]);
    setItems(material[index]);
  };

  const handleValueChange = (value) => {
    // if (_.isEqual(value, allValues[index])) return;

    // if the new value length >=1 or previous value was not zero
    if (value.length >= 1 || allValues[index].length >= 1) {
      const currentAllValues = [...allValues];
      let currentValue = [...currentAllValues[index]];
      currentValue = value;
      currentAllValues[index] = currentValue;
      setAllValues(currentAllValues);

      //we need to pass the current all values. Otherwise in the keysValueChange()
      //if we do if(allValues[index].length>0), allValues refers to previous state
      // The reason is because the function was registered/declared with the previous "allValues"
      handleKeysValuesChange(currentAllValues);
    }
  };

  const handleKeysValuesChange = (currentAllValues) => {
    let keysValues2 = _.cloneDeep(keysValues);
    let keyValue = keysValues2[index];
    if (currentAllValues[index].length > 0) keyValue = keys[index].name;
    else keyValue = undefined;
    keysValues2[index] = keyValue;
    setKeysValues(keysValues2);
  };

  // useEffect(() => {
  //   /* this hook will get called everytime when allValues has changed
  //   perform some action which will get fired everytime when myArr gets updated

  //   We had to do this becasue setAllvalues() in handleValueChange() was not causing re-render
  //   The callback method also did not work (it probably would have worked in class components)

  //   This is because
  //   Calling setState() in React is asynchronous, for various reasons (mainly performance).
  //   Under the covers React will batch multiple calls to setState() into a single state mutation,
  //   and then re-render the component a single time, rather than re-rendering for every state change.
  //   */
  //   console.log("All Values ----------------- \n", allValues);
  //   console.log("Updated State ----------------- \n", keysValues);
  //   // setCount((prevCount) => prevCount + 1);
  // });

  return (
    <View>
      <Header navigation={navigation} translateX={translateX} />
      <Tagline heading="Choose Materials" />
      <View>
        <Carousel
          loop
          width={width}
          height={width / 1.3}
          mode="parallax"
          pagingEnabled
          data={keys}
          scrollAnimationDuration={700}
          onSnapToItem={handleCurrentItem}
          renderItem={({ index }) => (
            <Card
              cardStyle={styles.cardStyle}
              imageUrl={keys[index].imageUrl}
              imageStyle={styles.imageStyle}
              subTitle="200>"
              title={keys[index].name}
              textAlign="center"
            />
          )}
        />
        <Pagination curPage={index} maxPage={keys.length} />
      </View>

      <View style={[styles.row, shadow]}>
        <DropDownPicker
          badgeDotColors={badgeDotColors}
          items={items}
          itemKey="label"
          dropDownContainerStyle={styles.dropDownContainerStyle}
          listItemLabelStyle={styles.itemLabel}
          mode="BADGE"
          multiple={true}
          open={open}
          onChangeValue={handleValueChange}
          placeholderStyle={styles.placeholderStyle}
          maxHeight={170}
          placeholder="Select the item(s)"
          setValue={setValue}
          value={value}
          setOpen={setOpen}
          setItems={setItems}
          style={styles.dropDownPicker}
          theme="DARK"
          TickIconComponent={({ style }) => (
            <Icon
              backgroundColor={colors.medium}
              name="check"
              size={20}
              style={{ marginRight: 9.5 }}
            />
          )}
          ArrowDownIconComponent={() => (
            <Icon
              backgroundColor={colors.silver}
              name="chevron-down"
              iconColor={colors.medium}
              size={42}
            />
          )}
          ArrowUpIconComponent={() => (
            <Icon
              backgroundColor={colors.silver}
              name="chevron-up"
              iconColor="black"
              size={42}
            />
          )}
        />
      </View>
      <TouchableOpacity
        style={{ alignItems: "center", top: 175 }}
        onPress={() =>
          navigation.navigate(routes.SPECIFICATIONS, { keysValues, allValues })
        }
      >
        <Icon name="check" size={45} backgroundColor={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default MaterialScreen;

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
    borderWidth: 0,
    backgroundColor: colors.silver,
  },

  dropDownContainerStyle: {
    marginTop: 1,
    backgroundColor: colors.silver,
    borderColor: colors.silver,
    borderTopColor: colors.medium,
    borderTopWidth: 0.2,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemLabel: {
    color: colors.medium,
  },
  placeholderStyle: {
    color: colors.medium,
    alignSelf: "center",
  },
  row: {
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
});

//data={[...new Array(6).keys()]}

// we should not call setValue inside handleValueChange() here because that is then causing infinite loop
// setValue(allValues[index]);
