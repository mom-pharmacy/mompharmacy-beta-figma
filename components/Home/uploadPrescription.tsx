import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window'); 

const UploadPrescription = () => (
  <TouchableOpacity onPress={() => router.push('/prescription')}>
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/prescription.png')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Upload Prescription</Text>
        <Text style={styles.subtitle}>Need a quick Service?</Text>
      </View>
      <View style={styles.action}>
        <Text style={styles.register}>Upload Now</Text>
        <MaterialIcons name="arrow-forward" size={30} color="#00a99d" />
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: height * 0.08,
    width: width * 0.95,
    borderRadius: 10,
    backgroundColor: '#007E710D',
    padding: 12,
    borderColor: '#007E71',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    alignSelf: 'center',
  },
  image: {
    height: height * 0.04,
    width: width * 0.07,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
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
  register: {
    color: '#007E71',
    fontWeight: '600',
    fontSize: 16,
    paddingVertical: 5,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default UploadPrescription;