import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { ProfileHeader } from "@freakycoder/react-native-header-view";
import { Left } from "react-native-component-separator";

import Screen from "../../components/Screen";
import Card from "../../components/Card";

const imageUrl =
  "https://images.unsplash.com/photo-1661977597155-1277a81affcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";

const ContractScreen = () => {
  return (
    <Screen>
      <ProfileHeader height={70} />
      <View style={styles.separator}>
        <Left borderColor="#e0e0e0" color="#616161">
          House Building
        </Left>
      </View>
      <View style={{ backgroundColor: "red" }}>
        <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
          <Card
            cardWidth={200}
            title="Premiuim"
            subTitle="200>"
            imageUrl={imageUrl}
            textAlign="center"
            imageStyle={styles.imageStyle}
            cardStyle={styles.cardStyle}
          />
        </ScrollView>
      </View>
    </Screen>
  );
};

export default ContractScreen;

const styles = StyleSheet.create({
  cardStyle: {
    height: 220,
    width: 170,
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginHorizontal: 30,
  },
  contentContainer: {
    paddingVertical: 10,
  },
  imageStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "red",
    shadowColor: "red",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
  },
  separator: {
    paddingLeft: 15,
    paddingRight: 30,
    marginVertical: 35,
    marginBottom: 15,
  },
});

/* 
import RNBounceable from "@freakycoder/react-native-bounceable";


You can put ANY children component inside the RNBounceable component, it will make it bounce when it is pressed

<RNBounceable onPress={() => {}}>
  <View style={styles.bounceButtonStyle}>
    <Text style={styles.bounceButtonTextStyle}>Bounce</Text>
  </View>
</RNBounceable>

*/
