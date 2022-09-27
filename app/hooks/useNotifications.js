import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

import navigation from "../navigation/rootNavigation";

import expoPushTokensApi from "../api/expoPushTokens";

// Required
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default useNotifications = () => {
  const [notification, setNotification] = useState(false);
  const [token, setToken] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotifications();

    // Notifications.addNotificationReceivedListener((notification) =>
    //   console.log(notification)
    // );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response.notification.request.content);
        navigation.navigate("AccountS");
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permissions = await Notifications.getPermissionsAsync();
      if (!permissions.granted) {
        const finalPermissions = await Notifications.requestPermissionsAsync();
        if (!finalPermissions.granted) {
          console.log("permissions NOT granted!");
          return;
        }
      }
      // console.log("permissions granted!");

      const token = await Notifications.getExpoPushTokenAsync();
      setToken(token);
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };

  return { token };
};
