import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import AppStarter from "./app/start/AppStarter";
import storage from "./app/auth/storage";

///------------------------------------------------------------
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

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [user, setUser] = useState();
  const [appIsReady, setAppIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) {
      setUser(user);
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <OfflineNotice />
        {user ? <AppStarter actor={user.actor} /> : <AuthNavigator />}
      </AuthContext.Provider>
    </View>
  );
};



export default App;


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
