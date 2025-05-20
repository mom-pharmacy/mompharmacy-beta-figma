import { userAuth } from '@/Context/authContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const {logout} = userAuth()

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleLogout = async () => {
    await logout();
    Alert.alert('Logged Out', 'You have been logged out successfully.');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => Alert.alert("Account deleted") }
      ]
    );
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.push('/profile');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
    <View style={[styles.container, { backgroundColor: darkTheme ? '#1e1e1e' : '#fff' }]}>
      <View style={styles.headerRow}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="#00A99D"
          style={styles.arrowIcon}
          onPress={handleBack}
        />
        <Text style={styles.header}>Settings</Text>
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.label, { color: darkTheme ? '#fff' : '#000' }]}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={notificationsEnabled ? '#00856F' : '#ccc'}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.label, { color: darkTheme ? '#fff' : '#000' }]}>Daily Reminders</Text>
        <Switch
          value={remindersEnabled}
          onValueChange={setRemindersEnabled}
          thumbColor={remindersEnabled ? '#00856F' : '#ccc'}
        />
      </View>

      {/* <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity> */}

       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A99D',
    marginLeft: 3,
  },
  arrowIcon: {
    marginLeft: -10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  // deleteButton: {
  //   backgroundColor: '#e5322e',
  //   paddingVertical: 14,
  //   marginTop: 30,
  //   borderRadius: 25,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '50%',
  //   alignSelf: 'center',
  // },
  // deleteText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
  logoutButton: {
    backgroundColor: '#fbd9d3',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
   screen: {
    flex: 1,
    backgroundColor: '#fff',

  },
});