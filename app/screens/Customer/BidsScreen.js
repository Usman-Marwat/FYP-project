import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";

import customerContractsApi from "../../api/Customer/contracts";
import DrawerAnimationContext from "../../contexts/drawerAnimationContext";
import MenuFoldButton from "../../navigation/MenuFoldButton";
import { translateMenuFold } from "../../navigation/navigationAnimations";
import useApi from "../../hooks/useApi";
import AuthContext from "../../auth/context";
import ActivityIndicator from "../../components/ActivityIndicator";

const SPACING = 10;

const ITEM_SIZE = 120;
const BG_COLOR = "#C1CEE077";
const imageUri = "https://cdn-icons-png.flaticon.com/256/4105/4105448.png";

const BidsScreen = ({ navigation }) => {
  const { animatedValue } = useContext(DrawerAnimationContext);
  const translateX = translateMenuFold(animatedValue);

  const { user } = useContext(AuthContext);

  const {
    data,
    loading,
    request: loadContracts,
  } = useApi(customerContractsApi.getBidContracts);

  useEffect(() => {
    loadContracts(user.actor_id);
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <MenuFoldButton translateX={translateX} navigation={navigation} />
      <FlatList
        contentContainerStyle={{ padding: SPACING }}
        style={{ paddingTop: 70 }}
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BidsDetail", {
                  title: item.contract.title,
                  contractor_id: item.contractor_id,
                  contract_id: item._id,
                  customerName: user.name,
                })
              }
            >
              <View style={styles.item}>
                <Text style={styles.model}>{item.contract.title}</Text>
                <Text style={styles.description}>contract description</Text>
                <Text style={styles.lumpsumbid}>Bid: {item.lumpsumbid}</Text>
                <Image source={{ uri: imageUri }} style={styles.image} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default BidsScreen;

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: SPACING,
  },
  item: {
    height: ITEM_SIZE * 1.7,
    borderRadius: 12,
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: BG_COLOR,
    overflow: "hidden",
  },
  image: {
    height: ITEM_SIZE * 1.2,
    width: "30%",
    position: "absolute",
    right: 20,
    top: 20,
  },
  lumpsumbid: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 70,
    marginLeft: 10,
  },
  model: {
    fontSize: 18,
    fontWeight: "700",
  },
});
