import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import { useRoute } from "@react-navigation/native";

export default function ChannelScreen() {
  const route = useRoute();
  const channel = route.params?.channel;

  if (!channel) return <Text>Channel Not Found</Text>;
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}

const styles = StyleSheet.create({});
