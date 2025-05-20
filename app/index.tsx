import { userAuth } from '@/Context/authContext';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import GetStarted from './Login/getstart';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Index() {
  const { userDetails, isLoggedIn, isRegistrationComplete, ExtractParseToken, loading } = userAuth();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const init = async () => {
      const token = await ExtractParseToken();

      console.log("Token:", token);
      console.log("UserDetails:", userDetails);
      console.log("This from index:", isLoggedIn, token);

      if (isLoggedIn && token) {
        if (!userDetails?.isRegistered) {
          router.replace("/Login/signup");
        } else {
          router.replace("/BottomNavbar/home");
        }
      } else {
        router.replace("/Login/Login");
      }

      const pushToken = await registerForPushNotificationsAsync();
      if (pushToken) {
        console.log("Expo Push Token:", pushToken);
        setExpoPushToken(pushToken);
      }

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification received in foreground:', notification);
        setNotification(notification);
        Alert.alert(
          notification.request.content.title,
          notification.request.content.body
        );
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log('User interacted with notification:', response);
        setNotification(response.notification);
      });
    };

    init();

    // Cleanup
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <GetStarted />

      {notification && (
        <View style={{ marginTop: 20, backgroundColor: '#eee', padding: 10, borderRadius: 8 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {notification.request.content.title}
          </Text>
          <Text>{notification.request.content.body}</Text>
        </View>
      )}
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert('Must use physical device for Push Notifications');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  const tokenData = await Notifications.getExpoPushTokenAsync();
  return tokenData.data;
}