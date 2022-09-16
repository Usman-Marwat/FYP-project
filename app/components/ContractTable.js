import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import AppButton from "./AppButton";
import ImageInputList from "./ImageInputList";

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

  // return (
  //   <Modal visible={isVisible}>
  //     <AppButton onPress={onModalVisible} />
  //     <View style={styles.container}>
  //       <ScrollView horizontal={true}>
  //         <View>
  //           <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
  //             <Row
  //               data={tableHead}
  //               widthArr={widthArr}
  //               style={styles.header}
  //               textStyle={styles.text}
  //             />
  //           </Table>
  //           <ScrollView style={styles.dataWrapper}>
  //             <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
  //               {tableData.map((rowData, index) => (
  //                 <Row
  //                   key={index}
  //                   data={rowData}
  //                   widthArr={widthArr}
  //                   style={[
  //                     styles.row,
  //                     index % 2 && { backgroundColor: "#F7F6E7" },
  //                   ]}
  //                   textStyle={styles.text}
  //                 />
  //               ))}
  //             </Table>
  //           </ScrollView>
  //         </View>
  //       </ScrollView>
  //     </View>
  //   </Modal>
  // );

  return (
    <Modal visible={isVisible}>
      <AppButton onPress={onModalVisible} title="Close" />

      <FlatList
        contentContainerStyle={{ alignSelf: "flex-start" }}
        numColumns={Math.ceil(10)}
        data={[...new Array(20).keys()]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 200,
                height: 200,
                backgroundColor: "red",
                margin: 2,
              }}
            >
              <ScrollView
                scrollEnabled={true}
                // horizontal
                style={{ backgroundColor: "yellow", flex: 1 }}
              >
                <Text>{1}</Text>
                <Text>{2}</Text>
                <Text>{3}</Text>
                <Text>{4}</Text>
                <Text>{5}</Text>
                <Text>{6}</Text>
                <Text>{7}</Text>
                <Text>{8}</Text>
                <Text>{9}</Text>
                <Text>{10}</Text>
                <Text>{11}</Text>
                <Text>{12}</Text>
                <Text>{13}</Text>
                <Text>{14}</Text>
                <Text>{14}</Text>
                <Text>{14}</Text>
                <Text>{14}</Text>
                <Text>{14}</Text>
                <Text>{14}</Text>
                <ImageInputList
                  imageUris={[
                    "https://images.unsplash.com/photo-1663167289057-a07f174a0ed7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60",
                    "https://images.unsplash.com/photo-1663167289057-a07f174a0ed7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60",
                  ]}
                />
              </ScrollView>
            </View>
          );
        }}
      />
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
