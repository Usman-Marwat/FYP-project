import React, { useState } from "react";
import { Modal, StyleSheet, View, ScrollView } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import AppButton from "./AppButton";

export default ContractTable = ({ isVisible, onModalVisible }) => {
  const [tableHead] = useState([
    "Head",
    "Head2",
    "Head3",
    "Head4",
    "Head5",
    "Head6",
    "Head7",
    "Head8",
    "Head9",
  ]);
  const [widthArr] = useState([40, 60, 80, 100, 120, 140, 160, 180, 200]);

  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }

  return (
    <Modal visible={isVisible}>
      <AppButton onPress={onModalVisible} />
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: "#F7F6E7" },
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "dodgerblue",
  },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
});
