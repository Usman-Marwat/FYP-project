import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as DP from "expo-document-picker";
import _ from "lodash";
import niceColors from "nice-color-palettes";

import AppButton from "./AppButton";
import colors from "../config/colors";

const colorsP = [
  "#3F5B98",
  ...niceColors[39],
  "#FCBE4A",
  "#FD5963",
  ...niceColors[8],
  "#FECBCD",
  ...niceColors[10].slice(1, 5),
  ...niceColors[6],
];

const DocumentPicker = () => {
  const [filesUris, setFilesUris] = useState([]);
  const scrollView = useRef();

  const handleDocumentSelection = async () => {
    try {
      const response = await DP.getDocumentAsync({
        copyToCacheDirectory: false,
      });
      if (response.type === "cancel") throw Error("Canceled");
      const filesUris2 = _.cloneDeep(filesUris);
      filesUris2.push(response);
      console.log(filesUris2.length);
      setFilesUris(filesUris2);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        {filesUris.map((file, index) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              key={index.toString()}
            >
              <View
                style={[
                  styles.listItemDot,
                  { backgroundColor: colorsP[index] },
                ]}
              />
              <Text style={styles.fileName}>{file?.name}</Text>
            </TouchableOpacity>
          );
        })}
        <AppButton
          style={styles.appButton}
          titleStyle={{ fontSize: 12, color: colors.medium }}
          title="Select 📑"
          onPress={handleDocumentSelection}
        />
      </ScrollView>
    </View>
  );
};

export default DocumentPicker;

const styles = StyleSheet.create({
  appButton: {
    width: 90,
    padding: 7,
    marginRight: 20,
    backgroundColor: "transparent",
  },
  container: {
    justifyContent: "center",
    height: 40,
    marginVertical: 10,
  },
  itemContainer: {
    alignItems: "center",
    backgroundColor: colors.light,
    flexDirection: "row",
    borderRadius: 40,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 7,
    backgroundColor: "black",
  },
});
