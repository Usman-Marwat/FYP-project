import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { ProfileHeader } from "@freakycoder/react-native-header-view";
import { Left } from "react-native-component-separator";
import RNBounceable from "@freakycoder/react-native-bounceable";

import Card from "../../components/Card";
import colors from "../../config/colors";
import ListItem from "../../components/ListItem";
import Screen from "../../components/Screen";

const ContractScreen = ({ navigation }) => {
  return (
    <Screen>
      <ProfileHeader height={70} />
      <View style={styles.separator}>
        <Left borderColor="#e0e0e0" color="#616161">
          House Building
        </Left>
      </View>
      <View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
        >
          <RNBounceable>
            <Card
              cardStyle={styles.cardStyle}
              heading="Premiuim"
              imageUrl={imageUrl}
              imageStyle={styles.imageStyle}
              subTitle="200>"
              title="Premiuim"
              textAlign="center"
              onPress={() => navigation.navigate("Specifications")}
            />
          </RNBounceable>
          <RNBounceable>
            <Card
              cardStyle={styles.cardStyle}
              heading="Premiuim"
              imageUrl={imageUrl}
              imageStyle={styles.imageStyle}
              subTitle="200>"
              title="Premiuim"
              textAlign="center"
            />
          </RNBounceable>
          <RNBounceable>
            <Card
              cardStyle={styles.cardStyle}
              heading="Premiuim"
              imageUrl={imageUrl}
              imageStyle={styles.imageStyle}
              subTitle="200>"
              title="Premiuim"
              textAlign="center"
            />
          </RNBounceable>
        </ScrollView>
      </View>
      <View style={styles.separator}>
        <Left borderColor="white" color="#616161">
          Renovation
        </Left>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <RNBounceable>
            <View>
              <ListItem
                image={require("../../assets/pi.jpg")}
                title="Usman Marwat"
                subTitle="5 vitual shops"
              />
            </View>
          </RNBounceable>
          <RNBounceable>
            <View>
              <ListItem
                image={require("../../assets/pi.jpg")}
                title="Usman Marwat"
                subTitle="5 vitual shops"
              />
            </View>
          </RNBounceable>
          <RNBounceable>
            <View>
              <ListItem
                image={require("../../assets/pi.jpg")}
                title="Usman Marwat"
                subTitle="5 vitual shops"
              />
            </View>
          </RNBounceable>
          <RNBounceable>
            <View>
              <ListItem
                image={require("../../assets/pi.jpg")}
                title="Usman Marwat"
                subTitle="5 vitual shops"
              />
            </View>
          </RNBounceable>
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
    borderRadius: 30,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    //shadowprops
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.17,
    shadowRadius: 10,
  },
  container: {
    marginHorizontal: 30,
  },
  contentContainer: {
    paddingTop: 20,
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginVertical: 15,
    backgroundColor: "red",
    shadowColor: "red",
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
  },
  screen: {
    backgroundColor: colors.light,
  },
  separator: {
    paddingLeft: 15,
    paddingRight: 30,
    marginTop: 20,
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

const imageUrl =
  "https://images.unsplash.com/photo-1661977597155-1277a81affcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";
