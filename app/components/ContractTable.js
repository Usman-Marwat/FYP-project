import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import niceColors from "nice-color-palettes";

import AppButton from "./AppButton";
import Icon from "./Icon";
import colors from "../config/colors";
import auth from "../api/auth";

const { width, height } = Dimensions.get("window");
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

const tableHeading = [
  "Material Name",
  "Types Selected",
  "Description",
  "Images",
];

export default ContractTable = ({
  allValues,
  descriptions,
  imageUris,
  keys,
  isVisible,
  onModalVisible,
}) => {
  const MapHeadings = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        {tableHeading.map((heading, j) => {
          return (
            <View key={j} style={styles.headingTabs}>
              <Text>{heading}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modal}>
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={onModalVisible}
        >
          <Icon name="close" size={35} backgroundColor="transparent" />
        </TouchableOpacity>

        <FlatList
          style={{ padding: 20 }}
          contentContainerStyle={{ alignSelf: "flex-start" }}
          numColumns={1}
          data={keys}
          keyExtractor={() => Math.random().toString()}
          renderItem={({ item, index }) => {
            if (item === undefined) {
              //This does not work with ternaru opeartors ???
              if (index === 0) return <MapHeadings />;
              else return null;
            }
            return (
              <>
                {index === 0 ? <MapHeadings /> : null}
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.keyContainer}>
                    <Text>{item}</Text>
                  </View>
                  <View style={styles.keyContainer}>
                    <Text>{item + " Values"}</Text>
                    <Text>{allValues[index].name}</Text>
                  </View>
                  <View
                    style={[styles.keyContainer, styles.descriptionsContainer]}
                  >
                    <ScrollView>
                      <Text>
                        {descriptions[index] +
                          " Descriptions nkjsdnkj cndklcnksdcn skjdnbcjksdcnkjsd sdnsdklcnsdkl klsdnclks skdjbncjksnckjs cksjc jksd k ks  kjnsdjcknsdkjcnklsdncklsdnclksdnlcndslc sjdncklnsdlkcn lsjknclsdnlkc ksdncjklnsdlcn sdncsdncoicmrwifgyiw ciuscnsdc bvewipfhwe "}
                      </Text>
                    </ScrollView>
                  </View>

                  <View style={[styles.keyContainer, styles.imagesContainer]}>
                    <ScrollView
                      horizontal
                      contentContainerStyle={{ alignItems: "center" }}
                    >
                      {imageUris.length > 0 &&
                        imageUris[index] !== undefined &&
                        imageUris[index].length > 0 &&
                        imageUris[index].map((uri) => {
                          return (
                            <Image
                              source={{ uri }}
                              key={uri}
                              style={{
                                height: 90,
                                width: 90,
                                marginHorizontal: 5,
                                overflow: "hidden",
                              }}
                            />
                          );
                        })}
                    </ScrollView>
                  </View>
                </View>
              </>
            );
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  descriptionsContainer: {
    alignSelf: "flex-start",
  },
  headingTabs: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
    marginHorizontal: 2,
    backgroundColor: "#FECBCD",
    borderRadius: 10,
    marginBottom: 10,
  },
  imagesContainer: {
    height: 100,
    alignSelf: "center",
    marginRight: 45,
  },
  keyContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 150,
    padding: 15,
    backgroundColor: "silver",
    margin: 2,
    borderRadius: 30,
  },
  modal: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  modalCloseButton: {
    backgroundColor: colors.primary,
    position: "absolute",
    top: 0,
    width: 60,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
});
