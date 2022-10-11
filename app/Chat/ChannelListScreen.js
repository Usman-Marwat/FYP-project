import React, { useContext, useEffect } from "react";
import { ChannelList, useChatContext } from "stream-chat-expo";
import { StyleSheet, Text, View } from "react-native";

import { translateMenuFold } from "../navigation/navigationAnimations";
import DrawerAnimationContext from "../contexts/drawerAnimationContext";
import Header from "../components/Header";

import { ListPreviewMessage } from "./ListPreviewMessage";
import AuthContext from "../auth/context";

const options = {
  state: true,
  watch: true,
};

export default function ChannelListScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { client } = useChatContext();
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const handleChannelPressed = (channel) => {
    navigation.navigate("Channel", { cid: channel.cid });
  };
  const filters = {
    members: {
      $in: [user.user_id],
    },
  };

  // //will return all channels in which these both are members
  // const filters = {
  //   members: [userId, "Contractor"],
  // };

  const sendMessages = async () => {
    const channels = await client.queryChannels(filters);

    channels.map(async (channel) => {
      const message = await channel.sendMessage(
        {
          text: "@Usman I told them I was pesca-pescatarian. Which is one who eats solely fish who eat other fish.",
          attachments: [
            {
              type: "image",
              asset_url: "https://bit.ly/2K74TaG",
              thumb_url: "https://bit.ly/2Uumxti",
              myCustomField: 123,
            },
          ],
          anotherCustomField: 234,
        },
        { skip_push: true }
      );
    });
  };

  useEffect(() => {
    // sendMessages();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} translateX={translateX} />
      <ChannelList
        PreviewMessage={ListPreviewMessage}
        onSelect={handleChannelPressed}
        filters={filters}
        options={options}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
