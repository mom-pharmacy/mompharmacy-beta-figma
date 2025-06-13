import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLOR } from '@/constants/color';
import { useLocationContext } from '../../Context/locationContext';
import { useNotificationContext } from '../../Context/notifficationContext';
import Group2 from '../../assets/images/location';
import Notify from '../../assets/images/notification';

const { width, height } = Dimensions.get('window');

const TopNavbar = ({ showBack = false, onBack }) => {
  const { shortAddress } = useLocationContext();
  const { unreadCount } = useNotificationContext();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBack ? onBack : () => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={32} color="#1A7563" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}
        <Text style={styles.title}>medicine on minutes</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.addressContainer}>
        <TouchableOpacity onPress={() => router.push('/Maps/myAddress')}>
          <View style={styles.locationWrapper}>
            <Group2 width={25} height={25} />
            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
              {shortAddress || 'Fetching location...'}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={30} color={COLOR.primary} />
          </View>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={() => router.push('/Notification')}
          style={styles.notificationIconWrapper}
        >
          <Notify width={70} height={70} />
          {unreadCount > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.13,
    width: width,
    backgroundColor: COLOR.light,
    paddingHorizontal: 20,
    paddingTop: 5,
    marginTop: -10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  backButton: {
    width: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    color: COLOR.primary,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginTop:10
  },
  addressContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 3,
    flexShrink: 1,
  },
  notificationIconWrapper: {
    position: 'relative',
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TopNavbar;
