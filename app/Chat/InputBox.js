import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  AttachButton,
  SendButton,
  useChatContext,
  useMessageInputContext,
  useMessagesContext,
  ImageUploadPreview,
  FileUploadPreview,
  AutoCompleteInput,
  useChannelContext,
} from "stream-chat-expo";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { CustomSendButton } from "./CustomSendButton";

function getDurationFormatted(millis) {
  const minutes = millis / 1000 / 60;
  const minutesDisplay = Math.floor(minutes);
  const seconds = Math.round((minutes - minutesDisplay) * 60);
  const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutesDisplay}:${secondsDisplay}`;
}

export const InputBox = () => {
  const { client } = useChatContext();
  const {
    text,
    giphyActive,
    imageUploads,
    fileUploads,
    toggleAttachmentPicker,
  } = useMessageInputContext();
  const { updateMessage } = useMessagesContext();
  const { channel } = useChannelContext();

  const [recordingActive, setRecordingActive] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState(0);
  const [message, setMessage] = React.useState("");
  const [recording, setRecording] = React.useState();

  const sendVoiceMessage = async (uri) => {
    // Compose a message object to be sent.
    const message = {
      attachments: [
        {
          asset_url: uri,
          file_size: 200,
          mime_type: "audio/m4a",
          title: "test.m4a",
          type: "voice-message",
          audio_length: recordTime,
        },
      ],
      status: "sending",
      type: "regular",
      user: client.user,
    };

    // Add the message optimistically to local state first.
    updateMessage(message);

    // Upload the file to cdn.
    const res = await channel.sendFile(uri, "test.m4a", "audio/m4a");
    const {
      created_at,
      html,
      type,
      status,
      user,
      ...messageWithoutReservedFields
    } = message;

    messageWithoutReservedFields.attachments[0].asset_url = res.file;

    // Send the message on channel.
    await channel.sendMessage(messageWithoutReservedFields);
  };

  const onStartRecord = async () => {
    try {
      setRecordingActive(true);

      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording, status } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
          (status) => {
            setRecordSecs(status.durationMillis / 1000);
            setRecordTime(getDurationFormatted(status.durationMillis));
          }
        );
        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const onStopRecord = async () => {
    await recording.stopAndUnloadAsync();
    await sendVoiceMessage(recording.getURI());

    setRecordingActive(false);
    setRecordSecs(0);
    setRecording(undefined);
  };

  const emptyInput =
    !text && !imageUploads.length && !fileUploads.length && !giphyActive;

  return (
    <View style={styles.fullWidth}>
      <ImageUploadPreview />
      <FileUploadPreview />
      <View style={[styles.fullWidth, styles.row, styles.inputContainer]}>
        {!recordingActive ? (
          <View style={[styles.flex, styles.row]}>
            <AttachButton handleOnPress={toggleAttachmentPicker} />
            <View style={styles.autoCompleteInputContainer}>
              <AutoCompleteInput />
            </View>
          </View>
        ) : (
          <View style={styles.flex}>
            <Text>Recording Voice {recordTime}</Text>
          </View>
        )}
        {emptyInput ? (
          <TouchableOpacity
            onPress={() => console.log("hi")}
            onLongPress={onStartRecord}
            onPressOut={onStopRecord}
          >
            <MaterialCommunityIcons name="microphone" size={22} color="black" />
          </TouchableOpacity>
        ) : (
          <CustomSendButton />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  fullWidth: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    height: 40,
  },
  autoCompleteInputContainer: {
    marginHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
  },
});
