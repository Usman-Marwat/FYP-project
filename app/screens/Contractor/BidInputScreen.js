import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useContext, useState } from "react";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import * as Yup from "yup";
import { DataTable } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { FieldArray } from "formik";

import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import Screen from "../../components/Screen";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import Header from "../../components/Header";
import AppTextInput from "../../components/AppTextInput";

const validationSchema = Yup.object().shape({
  lumpsumbid: Yup.string().required().min(7).label("Lump Sum Bid"),
});
const numberOfItemsPerPageList = [2, 3, 4];

const BidInputScreen = ({ navigation, route }) => {
  const { bidType, contract_id } = route.params;
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([[]]);

  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, 4);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const handleSubmit = async (bid) => {
    console.log(bid);
    // const result = await firmProfileApi.register({
    //   ...profile,
    //   actor_id: "63390ba866243cb0ff33ecd7",
    // });
    // if (!result.ok) {
    //   setuploadVisible(false);
    //   return alert("Could not save the listings");
    // }
  };
  return (
    <>
      <Header translateX={translateX} navigation={navigation} />
      <Screen style={styles.container}>
        <View style={{ height: 90 }} />
        {bidType === "Lump sum bid" && (
          <AppForm
            initialValues={{
              friends: ["jared", "ian", "brent"],
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              maxLength={255}
              name="lumpsumbid"
              placeholder="Lump Sum Bid"
            />
            <SubmitButton title="Send" />
          </AppForm>
        )}
        {bidType === "Per square foot bid" && (
          <PaperProvider>
            <View style={styles.container}>
              <AppForm>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                    <DataTable.Title>Price / square feet</DataTable.Title>
                  </DataTable.Header>

                  <ScrollView>
                    <DataTable.Row style={styles.row}>
                      <DataTable.Cell>John</DataTable.Cell>
                      <DataTable.Cell>
                        <Text>john@kindacode.comnaksjnjkasnckj</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <View>
                          <AppTextInput width={130} />
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style={styles.row}>
                      <DataTable.Cell>Bob</DataTable.Cell>
                      <DataTable.Cell>test@test.com</DataTable.Cell>
                      <DataTable.Cell>
                        <View>
                          <AppTextInput width={130} />
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row style={styles.row}>
                      <DataTable.Cell>Mei</DataTable.Cell>
                      <DataTable.Cell>mei@kindacode.com</DataTable.Cell>
                      <DataTable.Cell>
                        <View>
                          <AppTextInput width={130} />
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={styles.row}>
                      <DataTable.Cell>Mei</DataTable.Cell>
                      <DataTable.Cell>mei@kindacode.com</DataTable.Cell>
                      <DataTable.Cell>
                        <View>
                          <AppTextInput width={130} />
                        </View>
                      </DataTable.Cell>
                    </DataTable.Row>
                  </ScrollView>
                </DataTable>
              </AppForm>
            </View>
          </PaperProvider>
        )}
      </Screen>
    </>
  );
};

export default BidInputScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  row: {
    height: 70,
    paddingTop: 5,
  },
});
