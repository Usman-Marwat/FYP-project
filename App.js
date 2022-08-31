import "react-native-gesture-handler";
import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
} from "stream-chat-expo";

import AuthContext from "./contexts/Authentication";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./routes/RootNavigator";

const Api_Key = "fnmp8yh8yfe2";
const client = StreamChat.getInstance(Api_Key);

export default function App() {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    return () => client.disconnectUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AuthContext.Provider value={{ userId, setUserId }}>
        <OverlayProvider>
          <Chat client={client}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </Chat>
        </OverlayProvider>
      </AuthContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
