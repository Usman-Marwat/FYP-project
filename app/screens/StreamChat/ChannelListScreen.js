import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ChannelList } from "stream-chat-expo";
import AuthContext from "../contexts/Authentication";

export default function ChannelListScreen({ navigation }) {
  const handleChannelPressed = (channel) => {
    navigation.navigate("Channel", { channel });
  };
  const { userId } = useContext(AuthContext);
  const filters = {
    members: {
      $in: [userId],
    },
  };

  return <ChannelList onSelect={handleChannelPressed} filters={filters} />;
}

const styles = StyleSheet.create({});
