import React, { useState, useCallback, useEffect } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import AppStarter from "./app/start/AppStarter";
import { StatusBar } from "expo-status-bar";
import useBiometricAuth from "./app/extras/useBiometricAuth";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [user, setUser] = useState();
  const [appIsReady, setAppIsReady] = useState(false);
  const { biometricAuth } = useBiometricAuth();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
    setAppIsReady(true);
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <OfflineNotice />
          {user ? (
            biometricAuth?.success ? (
              <AppStarter user={user} />
            ) : (
              <Text>
                Please provide biometric auth or disable biometric feature
              </Text>
            )
          ) : (
            <AuthNavigator />
          )}
        </AuthContext.Provider>
      </GestureHandlerRootView>
      <StatusBar hidden />
    </View>
  );
};

export default App;
