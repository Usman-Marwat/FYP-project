import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useChatContext } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

// import AuthContext from "./Authentication";

export default function UserListItem({ user }) {
  const { client } = useChatContext();
  // const { userId } = useContext(AuthContext);
  const userId = "Contractor";

  const navigation = useNavigation();

  const handlePress = async () => {
    const channel = client.channel("messaging", { members: [user.id, userId] });
    await channel.watch();
    navigation.navigate("Channel", { cid: channel.cid });
  };

  return (
    <Pressable onPress={handlePress} style={styles.root}>
      <Image style={styles.image} source={{ uri: user.image }}></Image>
      <Text>{user.name}</Text>
    </Pressable>
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
