import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const notifications = [
  {
    id: '1',
    title: 'Your cart misses you!',
    icon: 'cart',
    description: 'Still thinking about those health essentials? Grab them now before they sell out!',
    time: '12 seconds ago',
  },
  {
    id: '2',
    title: 'Emergency kits on discount!',
    icon: 'lock',
    description: 'Get 30% OFF today only – because safety should never wait!',
    time: '14 minutes ago',
  },
  {
    id: '3',
    title: 'Voice Ordering coming soon!',
    icon: 'microphone',
    description: 'Say it, don’t type it. Ordering meds is about to get easier!',
    time: 'Today',
  },
  {
    id: '4',
    title: 'You saved this but didn’t order!',
    icon: 'bookmark',
    description: 'The thermometer you liked is still in your list. Need it now?',
    time: 'Yesterday',
  },
];

const NotificationItem = ({ item }) => (
  <View style={styles.notificationItem}>
    <Text style={styles.bul}>•</Text>
    <View style={styles.notificationTextContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{item.title} </Text>
        <Icon name={item.icon} size={16} color="#00a99d" />
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  </View>
);

const NotificationsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.screen}>
    <View >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={40} color="#00a99d" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: "40%" }} />
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00A99D',
    
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
});

export default NotificationsScreen;