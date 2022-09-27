import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Button } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigator from "./app/navigation/AuthNavigator";
import CustomerNavigator from "./app/navigation/CustomerNavigation/CustomerNavigatior";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import useNotifications from "./app/hooks/useNotifications";

const App = () => {
  const [user, setUser] = useState();
  const { token } = useNotifications();

  // expoPushTokensApi.register(token.data);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      {user ? <CustomerNavigator /> : <AuthNavigator />}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
