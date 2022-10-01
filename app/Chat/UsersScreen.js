import { StyleSheet, View, FlatList } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useChatContext } from "stream-chat-expo";

// import AuthContext from "./Authentication";
import UserListItem from "./UserListItem";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { client } = useChatContext();
  // const { userId } = useContext(AuthContext);
  const userId = "Contractor";

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await client.queryUsers({
      id: { $nin: ["usman-marwat", userId] },
    });
    setUsers(response.users);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserListItem user={item} />}
        refreshing={isLoading}
        onRefresh={fetchUsers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
