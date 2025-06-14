import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MOM PHARMACY</Text>
      </View>

      <View style={styles.locationCard}>
        <View style={styles.locationInfo}>
          <MaterialIcons name="location-on" size={24} color="#42beb5" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.locationTitle}>Sundarbagh Main road</Text>
            <Text style={styles.locationAddress}>Hebbal, Kempapura, Bengaluru, Karnataka</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.changeLocationButton}>
          <Text style={styles.changeLocationButtonText}>Change Location</Text>
        </TouchableOpacity>

        <View style={styles.serviceStatus}>
          <Text style={styles.serviceStatusText}>This Location is not serviceable</Text>
          <Text style={styles.serviceMessage}>Our mom team is working tirelessly to deliver medicines in 10 minutes to your location.</Text>
        </View>

        <TouchableOpacity style={styles.requestServiceButton}>
          <Text style={styles.requestServiceButtonText}>Request Service for this Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Coming Soon at Your Doorstep!</Text>
        <Text style={styles.sectionSubtitle}>Meanwhile Explore Amazing Features</Text>
      </View>

    
      <TouchableOpacity style={[styles.featureCard, { backgroundColor: '#FFEBEE', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.featureCardTitle}>Looking for blood donor?</Text>
          <Text style={styles.featureCardDescription}>Search nearby donors here</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
             <Text style={styles.featureCardLink}>Search</Text>
             <MaterialIcons name="arrow-forward" size={16} color="#E57373" style={{ marginLeft: 5 }} />
          </View>
        </View>
         
         <View style={{ width: 80, height: 80, backgroundColor: '#FFCDD2', borderRadius: 40 }} />
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#E0F2F7',
    padding:15
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
  },
  locationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
  },
  changeLocationButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#E0F2F7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  changeLocationButtonText: {
    fontSize: 12,
    color: '#00796B',
    fontWeight: 'bold',
  },
  serviceStatus: {
     marginBottom: 15,
     paddingTop: 10,
     borderTopWidth: 1,
     borderTopColor: '#E0F2F7',
  },
  serviceStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
    textAlign:'center',
  },
  serviceMessage: {
    fontSize: 14,
    color: '#666',
     textAlign:'center',
  },
  requestServiceButton: {
    backgroundColor: '#E0F2F7',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestServiceButtonText: {
    fontSize: 16,
    color: '#00796B',
    fontWeight: 'bold',
  },
  sectionTitleContainer: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  featureCard: {
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden', 
  },
  featureCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  featureCardDescription: {
    fontSize: 14,
    color: '#666',
  },
  featureCardLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  horizontalFeatureCards: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  horizontalCard: {
    width: (width / 2) - 30, 
    marginHorizontal: 10,
  },
});