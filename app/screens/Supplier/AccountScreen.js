import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import Screen from "../../components/Screen";
import ListItem from "../../components/ListItem";
import ListItemSeparatorComponent from "../../components/ListItemSeparator";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import useAuth from "../../auth/useAuth";
import MenuFoldButton from "../../navigation/MenuFoldButton";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import { translateMenuFold } from "../../navigation/navigationAnimations";

const menuItems = [
  {
    title: "My Shops",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages",
  },
];

function AccountScreen({ navigation }) {
  //useAuth is like caaling the context of user/setuser
  const { user, logOut } = useAuth();
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  return (
    <Screen style={styles.screen}>
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image="https://cdn-icons-png.flaticon.com/512/8360/8360483.png"
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparatorComponent}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                  family="mci"
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={
          <Icon name="logout" backgroundColor="#ffe66d" family="mci" />
        }
        // onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    paddingTop: 50,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
