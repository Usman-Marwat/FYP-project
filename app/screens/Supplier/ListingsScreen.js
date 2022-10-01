import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import AppButton from "../../components/AppButton";
import ActivityIndicator from "../../components/ActivityIndicator";
import AppText from "../../components/AppText";
import Card from "../../components/Card";
import colors from "../../config/colors";
import listingsApi from "../../api/listings";
import routes from "../../navigation/routes";
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";

function ListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings);

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText> Couldn't retrieve the listings</AppText>
            <AppButton title="Retry" onPress={loadListings} />
          </>
        )}
        <FlatList
          data={listings}
          keyExtractor={(listing) => Math.random().toString()}
          renderItem={({ item }) => (
            <Card
              title={item._doc ? item._doc.title : item.title}
              subTitle={"$" + (item._doc ? item._doc.price : item.price)}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
          refreshing={refreshing}
          onRefresh={loadListings}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
