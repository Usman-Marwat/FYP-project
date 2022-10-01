import React, { useContext, useEffect } from "react";
import { ChannelList, useChatContext } from "stream-chat-expo";
import { StyleSheet, Text, View } from "react-native";

// import AuthContext from "./Authentication";

import { ListPreviewMessage } from "./ListPreviewMessage";

const options = {
  state: true,
  watch: true,
};

export default function ChannelListScreen({ navigation }) {
  // const { userId } = useContext(AuthContext);
  const userId = "Contractor";
  const { client } = useChatContext();
  const handleChannelPressed = (channel) => {
    navigation.navigate("Channel", { cid: channel.cid });
  };
  const filters = {
    members: {
      $in: [userId],
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
    <View style={{ height: "100%" }}>
      <ChannelList
        PreviewMessage={ListPreviewMessage}
        onSelect={handleChannelPressed}
        filters={filters}
        options={options}
      />
    </View>
  );
}
