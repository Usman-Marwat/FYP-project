import { useState, useEffect, useContext } from "react";
import React from "react";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
  InputGiphySearch,
} from "stream-chat-expo";
import _ from "lodash";

import { VoiceMessageAttachment } from "./VoiceMessageAttachment";
import { InputBox } from "./InputBox";
import ActivityIndicator from "../components/ActivityIndicator";
import AuthContext from "../auth/context";

export default function ChannelScreen({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const cid = route.params?.cid;
  const { client } = useChatContext();

  //we are querry the channel again instead of passing it as prop because of not serializable issue
  const getChannel = async () => {
    const channel = await client.queryChannels({
      cid: cid,
    });
    setChannel(channel[0]);
    // const message = {
    //   attachments: [
    //     {
    //       asset_url: uri,
    //       title: "test.m4a",
    //       mime_type: "audio/m4a",
    //       type: "voice-message",
    //       audio_length: 2000,
    //     },
    //   ],
    //   status: "sending",
    //   type: "regular",
    //   user: client.user,
    // };
    // // Upload the file to cdn.
    // const res = await channel[0].sendFile(uri, "test.m4a", "audio/m4a");
    // const {
    //   created_at,
    //   html,
    //   type,
    //   status,
    //   user,
    //   ...messageWithoutReservedFields
    // } = message;

    // messageWithoutReservedFields.attachments[0].asset_url = res.file;

    // // Send the message on channel.
    // await channel[0].sendMessage(messageWithoutReservedFields);
  };

  useEffect(() => {
    getChannel();
  }, []);

  if (channel === null) return <ActivityIndicator visible={true} />;
  const targetIds = _.pull(Object.keys(channel?.state.members), user.user_id);
  const sender = channel._client._user.name;
  return (
    <Channel
      channel={channel}
      Card={VoiceMessageAttachment}
      Input={() => <InputBox targetIds={targetIds} sender={sender} />}
      InputGiphySearch={InputGiphySearch}
    >
      <MessageList />
      <MessageInput />
    </Channel>
  );
}

const uri =
  "file:///var/mobile/Containers/Data/Application/A7232574-F208-41E7-BD32-F4DB2FDF19A1/Library/Caches/ExponentExperienceData/%2540snack%252Fsdk.46.0.0-PIkSclUjEu/AV/recording-24AAE54F-82BE-4A05-97F8-602BBB74DDDA.m4a";
