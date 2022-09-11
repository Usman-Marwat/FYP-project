import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChannelPreviewMessage } from "stream-chat-expo";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ListPreviewMessage = ({ latestMessagePreview }) => {
  const latestMessageAttachments =
    latestMessagePreview.messageObject?.attachments;

  if (
    latestMessageAttachments &&
    latestMessageAttachments.length === 1 &&
    latestMessageAttachments[0].type === "voice-message"
  ) {
    return (
      <View style={styles.voiceMessagePreview}>
        <MaterialCommunityIcons name="microphone" size={15} color="black" />
        <Text style={styles.voiceMessagePreviewText}>Voice Message</Text>
      </View>
    );
  }

  return <ChannelPreviewMessage latestMessagePreview={latestMessagePreview} />;
};

const styles = StyleSheet.create({
  voiceMessagePreview: {
    flexDirection: "row",
  },
  voiceMessagePreviewText: {
    marginHorizontal: 5,
    color: "grey",
    fontSize: 12,
  },
});
