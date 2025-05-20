import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MomPharmacyScreen = () => {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { router.back()}}>
          <MaterialIcons name="arrow-back" size={24} color="#007E71" />
        </TouchableOpacity>
        <Text style={styles.title}>mom pharmacy</Text>
      </View>
      <Text style={styles.subtitle}>Your health, your home, our tests</Text>
      <Text style={styles.comingSoon}>Coming soon..</Text>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
    padding: 20,
    height:"100%"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#008080', 
    marginLeft: 80,
    marginTop:20,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },
  comingSoon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 250,
    textAlign: 'center',
  },
});

export default MomPharmacyScreen;