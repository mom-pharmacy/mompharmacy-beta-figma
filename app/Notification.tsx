import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNotificationContext } from '../Context/notifficationContext';

const staticToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODBjZDAxYjYyZjA4MjA3MGJkMjQ3ZGMiLCJpYXQiOjE3NDczOTM2ODZ9.uDSuw6xOuJq5i17196v5pq2vs4ZDKckJEKjmi1e_rrk';

const getRelativeTime = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

  const days = Math.floor(diff / 86400);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;

  return past.toLocaleDateString();
};

const NotificationItem = ({ item }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.bul}>•</Text>
    <View style={styles.notificationTextContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{item.title} </Text>
        <Icon name={item.icon || 'bell'} size={16} color="#00a99d" />
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.time}>{getRelativeTime(item.createdAt)}</Text>
    </View>
  </View>
);

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();
  const { setUnreadCount } = useNotificationContext(); 

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        'https://mom-beta-server-obcx.onrender.com/api/notification/notification',
        {
          headers: {
            Authorization: `Bearer ${staticToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.length); 
      } else {
        Alert.alert('Error', 'Failed to load notifications');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch notifications');
      console.error(error);
    }
  };

  const clearNotifications = () => {
    Alert.alert('Clear All Notifications', 'Are you sure you want to clear all notifications?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(
              'https://mom-beta-server1.onrender.com/api/notification/notification-clear',
              {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${staticToken}`,
                },
              }
            );
            if (response.ok) {
              setNotifications([]);
              setUnreadCount(0); 
              Alert.alert('Success', 'Notifications cleared');
            } else {
              Alert.alert('Error', 'Failed to clear notifications');
            }
          } catch (error) {
            Alert.alert('Error', 'Unable to clear notifications');
            console.error(error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchNotifications();
    setUnreadCount(0); 

    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        console.log('Expo Push Token:', token);
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received in foreground:', notification);
      const { title, body } = notification.request.content;
      const newNotification = {
        _id: notification.request.identifier || new Date().toISOString(),
        title,
        description: body,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('User tapped notification:', response);
    });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove(); 
      }
      if (responseListener.current) {
        responseListener.current.remove(); 
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={clearNotifications} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications available</Text>}
      />
    </SafeAreaView>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Permission denied for push notifications!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    Alert.alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00A99D',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#00a99d',
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bul: {
    fontSize: 40,
    marginRight: 8,
    color: '#000',
    marginTop: -10,
  },
  notificationTextContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default NotificationsScreen;