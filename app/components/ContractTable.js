import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
} from "react-native";
import AppButton from "./AppButton";
import ImageInput from "./ImageInput";
import ImageInputList from "./ImageInputList";

export default ContractTable = ({
  allValues,
  descriptions,
  imageUris,
  keys,
  isVisible,
  onModalVisible,
}) => {
  console.log(
    "---------------------------------------------------------------------------------------"
  );
  console.log(keys);
  console.log(allValues);
  console.log(descriptions);
  console.log(imageUris);
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
            <View style={{ flexDirection: "row" }}>
              <View style={styles.keyContainer}>
                <Text>{item}</Text>
              </View>
              <View style={styles.keyContainer}>
                <Text>{item + " Values"}</Text>
                <Text>{allValues[index].name}</Text>
              </View>
              <View style={styles.keyContainer}>
                <Text>{item + " Descriptions"}</Text>
                <Text>{descriptions[index]}</Text>
              </View>
              <View style={styles.keyContainer}>
                <Text>{item + " Images"}</Text>
              </View>
              <View style={styles.keyContainer}>
                <ScrollView horizontal>
                  {imageUris.length > 0 &&
                    imageUris[index] !== undefined &&
                    imageUris[index].length > 0 &&
                    imageUris[index].map((uri) => {
                      console.log(index);
                      return <ImageInput imageUri={uri} key={uri} />;
                    })}
                </ScrollView>
              </View>
            </View>
          );
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    backgroundColor: "silver",
    margin: 2,
  },
});
