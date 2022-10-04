import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import useLocations from "../hooks/useLocations";

const { width, height } = Dimensions.get("window");

const MyMap = ({ region = null, onAddlocation, style }) => {
  const { latitude, longitude } = useLocations();
  const defaultRegion = {
    latitude,
    longitude,
  };

  return (
    <View style={[styles.mapContainer, style]}>
      {latitude && longitude && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region ? region : defaultRegion}
        >
          <Marker
            draggable
            coordinate={{ latitude, longitude }}
            onDragEnd={(e) => onAddlocation(e.nativeEvent.coordinate)}
          >
            <Callout>
              <Text>Select an approximate location of site</Text>
            </Callout>
          </Marker>
        </MapView>
      )}
    </View>
  );
};

export default MyMap;

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
