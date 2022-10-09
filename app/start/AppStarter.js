import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

import CustomerNavigator from "../navigation/CustomerNavigation/CustomerNavigatior";
import ContractorNavigator from "../navigation/ContractorNavigation/ContractorNavigator";
import SupplierNavigator from "../navigation/Supplier/SupplierNavigator";
import EmployeeNavigator from "../navigation/Employee/EmployeeNavigator";

const Api_Key = "fnmp8yh8yfe2";
const client = StreamChat.getInstance(Api_Key);

const AppStarter = ({ user }) => {
  const connectUser = async (id, name, image) => {
    await client.connectUser({ id, name, image }, client.devToken(id));
  };

  useEffect(() => {
    connectUser(user.user_id, user.name, user.image);
    return () => client.disconnectUser();
  }, []);

  return (
    <OverlayProvider>
      <View style={styles.container}>
        <Chat client={client}>
          {user.actor === "Customer" && <CustomerNavigator />}
          {user.actor === "Contractor" && <ContractorNavigator />}
          {user.actor === "Supplier" && <SupplierNavigator />}
          {user.actor === "Employee" && <EmployeeNavigator />}
        </Chat>
      </View>
    </OverlayProvider>
  );
};

export default AppStarter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
