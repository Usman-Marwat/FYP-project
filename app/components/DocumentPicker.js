import React, { useState, useCallback } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as DP from "expo-document-picker";

const DocumentPicker = () => {
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DP.getDocumentAsync({
        copyToCacheDirectory: false,
      });
      console.log(response);
      setFileResponse(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.uri}
          numberOfLines={1}
          ellipsizeMode={"middle"}
        >
          {file?.uri}
        </Text>
      ))} */}
      <Button title="Select 📑" onPress={handleDocumentSelection} />
    </View>
  );
};

export default DocumentPicker;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  uri: {
    paddingBottom: 8,
    paddingHorizontal: 18,
  },
});
