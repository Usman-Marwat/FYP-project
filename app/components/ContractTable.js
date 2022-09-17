import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  Image,
} from "react-native";

import AppButton from "./AppButton";

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
  // console.log(
  //   "---------------------------------------------------------------------------------------"
  // );
  // console.log(keys);
  // console.log(allValues);
  // console.log(descriptions);
  // console.log(imageUris);
  return (
    <Modal visible={isVisible}>
      <AppButton onPress={onModalVisible} title="Close" />

      <FlatList
        contentContainerStyle={{ alignSelf: "flex-start" }}
        numColumns={1}
        data={keys}
        keyExtractor={(item) => Math.random().toString()}
        renderItem={({ item, index }) => {
          if (item === undefined) return null;
          return (
            <>
              {index === 0 && (
                <View style={{ flexDirection: "row" }}>
                  {tableHeading.map((heading, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: 300,
                          height: 50,
                          marginHorizontal: 2,
                          backgroundColor: "#FECBCD",
                        }}
                      >
                        <Text>{heading}</Text>
                      </View>
                    );
                  })}
                </View>
              )}

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
                      {item +
                        " Descriptions nkjsdnkj skdjbncjksnckjs cksjc jksd k ks  kjnsdjcknsdkjcnklsdncklsdnclksdnlcndslc sjdncklnsdlkcn lsjknclsdnlkc ksdncjklnsdlcn sdncsdncoicmrwifgyiw ciuscnsdc bvewipfhwe "}
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  descriptionsContainer: {
    alignSelf: "flex-start",
  },
  imagesContainer: {
    height: 100,
    alignSelf: "center",
  },
  keyContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 200,
    padding: 20,
    backgroundColor: "silver",
    margin: 2,
    borderRadius: 30,
  },
});
