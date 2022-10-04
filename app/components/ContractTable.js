import React from "react";
import {
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

import Icon from "./Icon";
import colors from "../config/colors";

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
  { name: "Material Name", width: 225 },
  { name: "Types Selected", width: 225 },
  { name: "Description", width: 298 },
  { name: "Images", width: 298 },
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
            <View
              key={j}
              style={[styles.headingTabs, { width: heading.width }]}
            >
              <Text>{heading.name}</Text>
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
          decelerationRate="fast"
          numColumns={1}
          data={keys}
          keyExtractor={() => Math.random().toString()}
          renderItem={({ item, index }) => {
            const currentColor = colorsPalette[index % colorsPalette.length];
            if (item === undefined || item === null) {
              //This does not work with ternaru opeartors ???
              if (index === 0) return <MapHeadings />;
              else return null;
            }
            return (
              <>
                {index === 0 ? <MapHeadings /> : null}
                <View style={[styles.tableRow, { shadowColor: currentColor }]}>
                  <View
                    style={[
                      styles.keyContainer,
                      { borderColor: currentColor, width: 230 },
                    ]}
                  >
                    <Text style={[styles.heading, { color: currentColor }]}>
                      {item}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.keyContainer,
                      { borderColor: currentColor, width: 230 },
                    ]}
                  >
                    {allValues[index].map((value, j) => {
                      return value.parent ? (
                        <View style={styles.list} key={j}>
                          <View
                            style={[
                              styles.listItemDot,
                              {
                                backgroundColor: currentColor,
                              },
                            ]}
                          />
                          <View>
                            <Text
                              style={[
                                styles.body,
                                {
                                  color: currentColor,
                                },
                              ]}
                            >
                              {value.name}
                              <Text style={styles.parent}>
                                {" - " + value.parent}
                              </Text>
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View style={styles.list} key={j}>
                          <View
                            style={[
                              styles.listItemDot,
                              {
                                backgroundColor: currentColor,
                              },
                            ]}
                          />
                          <Text
                            key={j}
                            style={[
                              styles.body,
                              {
                                color: currentColor,
                              },
                            ]}
                          >
                            {value}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <View
                    style={[styles.keyContainer, { borderColor: currentColor }]}
                  >
                    {descriptions[index] ? (
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text>{descriptions[index]}</Text>
                      </ScrollView>
                    ) : (
                      <View style={styles.empty}>
                        <Text style={styles.emptyText}>Description Added</Text>
                      </View>
                    )}
                  </View>

                  <View
                    style={[
                      styles.keyContainer,
                      { borderColor: currentColor, marginRight: 45 },
                    ]}
                  >
                    {imageUris.length > 0 &&
                      imageUris[index] !== undefined &&
                      imageUris[index] !== null &&
                      imageUris[index].length > 0 && (
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                        >
                          {imageUris[index].map((uri, index) => {
                            return (
                              <View key={index} style={styles.imageContainer}>
                                <Image source={{ uri }} style={styles.image} />
                              </View>
                            );
                          })}
                        </ScrollView>
                      )}
                    {imageUris[index] === undefined && (
                      <View style={styles.empty}>
                        <Text style={styles.emptyText}>Images Chosen</Text>
                      </View>
                    )}
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
  empty: {
    fontSize: 15,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyText: {
    fontWeight: "700",
    textDecorationLine: "line-through",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: -2,
    marginVertical: 40,
    marginLeft: 30,
  },
  headingTabs: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    width: 225,
    height: 50,
    backgroundColor: "#FECBCD",
    borderRadius: 10,
    marginBottom: 10,
  },

  imageContainer: {
    alignItems: "center",
    borderRadius: 15,
    height: 120,
    justifyContent: "center",
    overflow: "hidden",
    width: 120,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },

  keyContainer: {
    // alignItems: "center",
    // justifyContent: "center",
    width: 300,
    height: 150,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5,
    borderRightWidth: 1,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
  },
  listItemDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  modal: {
    flex: 1,
    paddingTop: 60,
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
  parent: {
    lineHeight: 12,
    fontSize: 10.7,
    color: colors.medium,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 20,

    shadowColor: "silver",
    shadowOffset: {
      width: -10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
