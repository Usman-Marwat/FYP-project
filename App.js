import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Button } from "react-native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import AppStarter from "./app/start/AppStarter";
import storage from "./app/auth/storage";

const App = () => {
  const [user, setUser] = useState();

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
      {user ? <AppStarter actor={user.actor} /> : <AuthNavigator />}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
