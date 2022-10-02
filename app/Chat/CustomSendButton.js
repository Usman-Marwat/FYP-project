import React, { useContext } from "react";
import { SendButton, Channel, useMessageInputContext } from "stream-chat-expo";

import useApi from "../hooks/useApi";
import messagesApi from "../api/messages";
import AuthContext from "../auth/context";

export const CustomSendButton = () => {
  const { sendMessage, text } = useMessageInputContext();

  const sendApi = useApi(messagesApi.send);
  const { user } = useContext(AuthContext);

  const handleMessage = async () => {
    await sendApi.request(
      user.expoPushToken,
      "Stream Chat",
      "Check Message",
      text
    );
    sendMessage();
  };

  return <SendButton sendMessage={handleMessage} />;
};

/* 
I did not pass the handleMessage() directly into <SensButton> on Channel Screen But encapsulated it not custom button
BENEFITS:
      1-no props apssing into to the button channelscreen
      2-the handle message is encapsulated with the button
      3-tommorrow if we wanted to add "disable" functionality, the logic would be encapsulated here
      4-Furthere more all these handleMessage() and disable logic would not pollute the Channel Screen where 
        they are irerelevant 
      ---> This is the same logic behind Mosh's sendButton of formik component.  
 */
