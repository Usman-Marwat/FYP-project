import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../../screens/Supplier/ListingsScreen";
import ListingDetailsScreen from "../../screens/Supplier/ListingDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Listings"
      component={ListingsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
