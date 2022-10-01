import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import AppStarter from "./app/start/AppStarter";
import storage from "./app/auth/storage";

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
        {user ? <AppStarter user={user} /> : <AuthNavigator />}
      </AuthContext.Provider>
    </View>
  );
};

export default App;
