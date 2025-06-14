import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RequestForServiceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#027A6D" />
        <Text style={styles.headerText}>Request For Service</Text>
      </View>

      <Text style={styles.subText}>
        We need these details to start services in the places where high request for deliver has been received
      </Text>

      <TextInput style={styles.input} placeholder="Your Name" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Your Email Id" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Delivery City" placeholderTextColor="#aaa" />
      <TextInput style={styles.input} placeholder="Delivery Location" placeholderTextColor="#aaa" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sent Request</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#027A6D',
  },
  subText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#027A6D',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});