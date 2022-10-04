import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useContext } from "react";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import * as Yup from "yup";
import { DataTable } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";

import ActivityIndicator from "../../components/ActivityIndicator";
import AppTextInput from "../../components/AppTextInput";
import AuthContext from "../../auth/context";
import contractorContractsApi from "../../api/Contractor/contracts";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import Header from "../../components/Header";
import messagesApi from "../../api/messages";
import Screen from "../../components/Screen";
import { translateMenuFold } from "../../navigation/navigationAnimations";

const validationSchema = Yup.object().shape({
  lumpsumbid: Yup.string().required().min(5).label("Lump Sum Bid"),
});

const BidInputScreen = ({ navigation, route }) => {
  const { bidType, title, contract_id, customer_id } = route.params;
  const { user } = useContext(AuthContext);
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const bidApi = useApi(contractorContractsApi.patchBid);
  const sendApi = useApi(messagesApi.send);

  const handleSubmit = async (bid) => {
    const result = await bidApi.request(contract_id, bid);
    if (result.ok) sendNotification();
  };
  const sendNotification = async () => {
    await sendApi.request(
      "Customer",
      customer_id,
      `Contract Name: ${title}`,
      user.name,
      `Bid sent from Contractor`
    );
  };

  return (
    <>
      <ActivityIndicator visible={bidApi.loading} />
      <Header translateX={translateX} navigation={navigation} />
      <Screen style={styles.container}>
        <View style={{ height: 90 }} />
        {bidType === "Lump sum bid" && (
          <AppForm
            initialValues={{
              lumpsumbid: "",
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
