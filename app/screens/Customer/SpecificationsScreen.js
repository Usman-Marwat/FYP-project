import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProfileHeader } from "@freakycoder/react-native-header-view";

import Screen from "../../components/Screen";

const SpecificationsScreen = () => {
  return (
    <Screen>
      <ProfileHeader height={70} />
    </Screen>
  );
};

export default SpecificationsScreen;

const styles = StyleSheet.create({});
