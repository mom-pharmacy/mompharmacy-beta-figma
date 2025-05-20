import { userAuth } from '@/Context/authContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { logout } = userAuth();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const hasCheckedPermissions = useRef(false);

  useEffect(() => {
    if (!hasCheckedPermissions.current) {
      checkNotificationPermissions();
      hasCheckedPermissions.current = true;
    }
  }, []);

  const checkNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    const isGranted = existingStatus === 'granted';
    if (notificationsEnabled !== isGranted) {
      setNotificationsEnabled(isGranted);
    }
  };

  const requestNotificationPermission = async (enable: boolean) => {
    setNotificationsEnabled(enable);

    Alert.alert(
      enable ? 'Enable Notifications' : 'Disable Notifications',
      `To ${enable ? 'receive' : 'stop'} notifications, please ${
        enable ? 'enable' : 'disable'
      } them manually in your device settings.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]
    );
  };

  const handleNotificationsToggle = (newValue: boolean) => {
    requestNotificationPermission(newValue);
  };

  const handleLogout = async () => {
    await logout();
    Alert.alert('Logged Out', 'You have been logged out successfully.');
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container, { backgroundColor: darkTheme ? '#1e1e1e' : '#fff' }]}>
        <View style={styles.headerRow}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="#00A99D"
            style={styles.arrowIcon}
            onPress={handleBack}
          />
          <Text style={styles.header}>Settings</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.label, { color: darkTheme ? '#fff' : '#000' }]}>
            Enable Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleNotificationsToggle}
            thumbColor={notificationsEnabled ? '#ffffff' : '#ffffff'}
            trackColor={{ false: '#ccc', true: '#00856F' }}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={[styles.label, { color: darkTheme ? '#fff' : '#000' }]}>
            Daily Reminders
          </Text>
          <Switch
            value={remindersEnabled}
            onValueChange={setRemindersEnabled}
            thumbColor={remindersEnabled ? '#ffffff' : '#ffffff'}
            trackColor={{ false: '#ccc', true: '#00856F' }}
          />
        </View>

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