import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import Header from "../components/header";
import TodoItem from "../components/todoItem";
import AddTodo from "../components/addTodo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Todos({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [toggleBtns, setToggleBtns] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [updateKey, setUpdateKey] = useState("");

  const getData = async () => {
    let items = await AsyncStorage.getItem("@todos_me");
    var parsed = await JSON.parse(items);
    if (parsed) setTodos(parsed);
  };

  useEffect(() => {
    getData();
  }, []);

  const updateHandler = (key) => {
    console.log(todos.length);
    todos.forEach((todo, index) => {
      if (todo.key === key) {
        setUpdateText(todo.text);
        setUpdateKey(key);
      }
    });
    setToggleBtns(!toggleBtns);
  };

  const pressHandler = (key) => {
    Alert.alert("Delete!", "Are You sure want to remove this todo?", [
      {
        text: "Yes",
        onPress: () => {
          //directlt if e update throygh the
          let newTodos = todos;
          newTodos = newTodos.filter((todo) => todo.key != key);
          AsyncStorage.setItem("@todos_me", JSON.stringify(newTodos));
          getData();
        },
      },
      {
        text: "No",
        onPress: () => {},
      },
    ]);
  };

  const UpdateCurrent = (text) => {
    let newTodos = todos;
    if (text.length > 3) {
      newTodos.forEach((todo, index) => {
        if (todo.key === updateKey) {
          todo.text = text;
        }
      });
      //this component rerender below was important after setting th
      setToggleBtns(!toggleBtns);
      setUpdateText("");
      AsyncStorage.setItem("@todos_me", JSON.stringify(newTodos));
      getData();
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  const submitHandler = async (text) => {
    if (text.length > 3) {
      await AsyncStorage.getItem("@todos_me", (err, result) => {
        const todo = [{ text, key: Math.random().toString() }];
        if (result !== null) {
          var newTodos = JSON.parse(result).concat(todo);
          AsyncStorage.setItem("@todos_me", JSON.stringify(newTodos));
        } else {
          console.log("Data Not Found");
          AsyncStorage.setItem("@todos_me", JSON.stringify(todo));
        }
      });
      getData();
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo
          submitHandler={submitHandler}
          toggleBtns={toggleBtns}
          setToggleBtns={setToggleBtns}
          updateHandler={updateHandler}
          updateText={updateText}
          UpdateCurrent={UpdateCurrent}
        />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                pressHandler={pressHandler}
                toggleBtns={toggleBtns}
                setToggleBtns={setToggleBtns}
                updateHandler={updateHandler}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyList}>
                There is not Data in the List
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 30,
  },
  content: {
    padding: 40,
    // marginBottom: 30,
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  emptyList: {
    marginTop: 150,
    textAlign: "center",
  },
});
