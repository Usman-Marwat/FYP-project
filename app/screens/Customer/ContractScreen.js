import { View, Text } from "react-native";
import React from "react";
import { ProfileHeader } from "@freakycoder/react-native-header-view";

import Screen from "../../components/Screen";

const ContractScreen = () => {
  return (
    <Screen>
      <ProfileHeader height={70} />
    </Screen>
  );
};

export default ContractScreen;

/* 
import RNBounceable from "@freakycoder/react-native-bounceable";


You can put ANY children component inside the RNBounceable component, it will make it bounce when it is pressed

<RNBounceable onPress={() => {}}>
  <View style={styles.bounceButtonStyle}>
    <Text style={styles.bounceButtonTextStyle}>Bounce</Text>
  </View>
</RNBounceable>

*/
