import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Button } from "react-native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import CustomerNavigator from "./app/navigation/CustomerNavigation/CustomerNavigatior";
import jwtDecode from "jwt-decode";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";

const App = () => {
  const [user, setUser] = useState();
  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;
    setUser(jwtDecode(token));
  };

  useEffect(() => {
    restoreToken();
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
