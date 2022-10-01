import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import CustomerNavigator from "../navigation/CustomerNavigation/CustomerNavigatior";

import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import ContractorNavigator from "../navigation/ContractorNavigation/ContractorNavigator";

const Api_Key = "fnmp8yh8yfe2";
const client = StreamChat.getInstance(Api_Key);

const AppStarter = ({ actor }) => {
  const connectUser = async (username, fullname) => {
    await client.connectUser(
      {
        id: username,
        name: fullname,
        // image:
        //   "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      },
      client.devToken(username)
    );
  };

  useEffect(() => {
    connectUser("Contractor", "1234");
    return () => client.disconnectUser();
  }, []);

  return (
    <OverlayProvider>
      <SafeAreaView style={styles.container}>
        <Chat client={client}>
          {actor === "Customer" && <CustomerNavigator />}
          {actor === "Contractor" && <ContractorNavigator />}
        </Chat>
      </SafeAreaView>
    </OverlayProvider>
  );
  // if (actor === "Customer") return <CustomerNavigator />;
  // else if (actor === "Contractor") return null;
};

export default AppStarter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

///------------------------------------------------------------
/* 

import AuthContext from "./app/Chat/Authentication";
import RootNavigator from "./app/Chat/RootNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler"; 

*/

// function App2() {
//   const [userId, setUserId] = useState("");

//   return (
//     <AuthContext.Provider value={{ userId, setUserId }}>

//     </AuthContext.Provider>
//   );
// }
