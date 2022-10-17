import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import AppStarter from "./app/start/AppStarter";
import authStorage from "./app/auth/storage";
import {
  BiometricComponent,
  doBiometricAuth,
} from "./app/extras/biometricAuth";
import OfflineNotice from "./app/components/OfflineNotice";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [user, setUser] = useState();
  const [appIsReady, setAppIsReady] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(null);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) {
      setUser(user);
      handleBiometric();
    }
    setAppIsReady(true);
  };

  const handleBiometric = async () => {
    const authResult = await doBiometricAuth();
    setBiometricAuth(authResult);
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
              <BiometricComponent onBiometric={handleBiometric} />
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
