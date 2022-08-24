import * as Location from "expo-location";
import { useState, useEffect } from "react";

export default function useLocations(params) {
  const [location, setLocation] = useState({});

  const getLocation = async () => {
    try {
      // console.log("before await");
      const { granted } = await Location.requestForegroundPermissionsAsync();
      // console.log("after await");
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  // console.log("-------------------------------");
  // console.log("This is state: ");
  // console.log(location);
  return location;
}
