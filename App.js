import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { NavigationContainer } from "@react-navigation/native";

import AuthContext from "./app/Chat/Authentication";
import RootNavigator from "./app/Chat/RootNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Api_Key = "fnmp8yh8yfe2";
const client = StreamChat.getInstance(Api_Key);

export default function App() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    return () => client.disconnectUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      <OverlayProvider>
        <SafeAreaView style={styles.container}>
          <Chat client={client}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </Chat>
        </SafeAreaView>
      </OverlayProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
