import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { useChatContext } from "stream-chat-expo";

import AuthContext from "../contexts/Authentication";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const { client } = useChatContext();
  const { setUserId } = useContext(AuthContext);

  const connectUser = async (username, fullname) => {
    await client.connectUser(
      {
        id: username,
        name: fullname,
        // image:
        //   "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
      },
      client.devToken(username)
    );
    setUserId(username);
  };

  const handleSignup = () => {
    connectUser(username, fullname);
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.input}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setFullname}
          placeholder="Fullname"
          style={styles.input}
          value={fullname}
        />
      </View>
      <View style={{ marginTop: 17 }}></View>
      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={{ color: "white" }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#fc5c65",
    borderRadius: "50%",
    padding: 20,
    width: "70%",
  },
  input: {},
  inputContainer: {
    borderBottomWidth: 0.5,
    marginVertical: 20,
    padding: 17,
    width: "100%",
  },
  root: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
