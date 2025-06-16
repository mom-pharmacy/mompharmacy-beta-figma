import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Get device width for responsive scaling
const { width } = Dimensions.get('window');

const BloodDonation = () => (
  <TouchableOpacity style={styles.container} onPress={() => router.push('/BloodDonor/front')}>
    <Image source={require('../../assets/images/blooddonation.jpeg')} style={styles.image} />

    <View style={styles.textContainer}>
      <Text style={styles.title}>Blood Donation</Text>
      <Text style={styles.subtitle}>Want to donate blood?</Text>
    </View>

    <View style={styles.rightContainer}>
      <Text style={styles.register}>Register Now</Text>
      <MaterialIcons name="arrow-forward" size={22} color="#B5000A" style={{ marginLeft: 5 }} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#B5000A0D',
    borderColor: '#B5000A',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  image: {
    height: 32,
    width: 26,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#444444',
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 14,
    color: '#444444',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  register: {
    color: "#B5000A",
    fontWeight: '600',
    fontSize: 14,
  },
});

export default BloodDonation;
