
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyReports() {
  return (
    <SafeAreaView style={styles.screen}>
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons
          name="chevron-back-outline"
          size={26}
          color="#00A99D"
          style={styles.arrowIcon}
          onPress={() => router.back()}
        />
        <Text style={styles.header}>Reports</Text>
      </View>

      <View style={styles.txt}>
        <Text style={styles.comingSoonText}>Coming Soon</Text>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  txt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 8,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A99D',
    marginLeft: 8,
  },
  arrowIcon: {
    marginLeft: 0,
  },
  comingSoonText: {
    fontSize: 22,
    color: '#555',
  },
   screen: {
    flex: 1,
    backgroundColor: '#fff',

  },
});

