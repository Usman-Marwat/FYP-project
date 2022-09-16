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
        renderItem={({ item }, index) => {
          if (item === undefined) return null;
          return (
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 200,
                  height: 200,
                  backgroundColor: "silver",
                  margin: 2,
                }}
              >
                <Text>{item}</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 200,
                  height: 200,
                  backgroundColor: "silver",
                  margin: 2,
                }}
              >
                <Text>{item + " Values"}</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 200,
                  height: 200,
                  backgroundColor: "silver",
                  margin: 2,
                }}
              >
                <Text>{item + " Descriptions"}</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 200,
                  height: 200,
                  backgroundColor: "silver",
                  margin: 2,
                }}
              >
                <Text>{item + " Images"}</Text>
              </View>
            </View>
          );
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({});
