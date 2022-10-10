import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import colors from "../config/colors";

const MaterialDetails = ({ modalVisible, onModalVisible, data }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => onModalVisible(!modalVisible)}
        ></TouchableOpacity>
        <View style={styles.setModalDimensions("75%", "100%")}>
          <Text style={styles.boldText}>{data.name} details</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.items?.map((item, i) => (
              <View key={i}>
                <View style={styles.list}>
                  <View style={[styles.listItemDot]} />
                  <Text style={styles.itemName}>{item?.name}</Text>
                </View>
                <Text>{item.description}</Text>
                <Image source={{ uri: item?.image }} style={styles.image} />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MaterialDetails;

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  closeButton: {
    height: 7,
    width: 80,
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    borderRadius: 20,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "500",
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 20,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: colors.dark,
  },
  modalContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  setModalDimensions: (height, width) => ({
    height,
    width,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 10,
    display: "flex",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),
});
