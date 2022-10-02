import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useChatContext } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

export default function UserListItem({ chatUser, user }) {
  const { client } = useChatContext();
  const navigation = useNavigation();

  const handlePress = async () => {
    const channel = client.channel("messaging", {
      members: [chatUser.id, user.user_id],
    });
    //we do not need the target user prop; the chatUser will be the one we are clicking on
    await channel.watch();
    console.log(channel._data);
    navigation.navigate("Channel", { cid: channel.cid });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.root}>
      <Image style={styles.image} source={{ uri: user.image }}></Image>
      <Text>{chatUser.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    backgroundColor: "coral",
    borderRadius: 50,
    marginRight: 10,
  },
  root: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
});
