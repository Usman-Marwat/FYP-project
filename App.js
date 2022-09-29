import * as React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import useLocations from "./app/hooks/useLocations";

export default function App() {
  const { latitude, longitude } = useLocations();
  return (
    <View style={styles.container}>
      {latitude && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.017,
            longitudeDelta: 0.017,
          }}
        >
          <Marker
            draggable
            coordinate={{ latitude, longitude }}
            onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
