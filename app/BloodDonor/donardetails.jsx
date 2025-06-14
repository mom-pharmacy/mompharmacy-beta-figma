import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DonorDetails = () => {
  const { donors } = useLocalSearchParams();
  const donorList = JSON.parse(donors || '[]');

  const renderDonorCard = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>Phone: {item.phone}</Text>
        <Text style={styles.available}>Available</Text>
        <View style={styles.iconRow}>
          <Text> {item.city}, {item.district}, {item.state}</Text>
        </View>
      </View>
      <View style={styles.bloodTypeContainer}>
        <MaterialIcons name="opacity" size={24} color="#f44336" />
        <Text style={styles.bloodText}>{item.bloodGroup}</Text>
      </View>
    </View>
  );

  if (!donorList.length) {
    return (
      <SafeAreaView>
      <View style={styles.centerContent}>
        <Text style={styles.emptyText}>No donors found.</Text>
        <Text style={styles.emptySubText}>
          Try adjusting your filters or try again later.
        </Text>
      </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="#00A99D"
          style={styles.arrowIcon}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Available Donors</Text>
      </View>

      <FlatList
        data={donorList}
        keyExtractor={(item, index) => item._id || index.toString()}
        renderItem={renderDonorCard}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    flex: 1,
  },
  filter: { 
    alignItems: 'flex-end',
    marginRight: 10,
  },
  filterBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    elevation: 1,
  },
  picker: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
  },
  disabledPicker: {
    backgroundColor: '#f5f5f5',
    borderColor: '#eee',
  },
  applyBtn: {
    backgroundColor: '#00A99D',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  errorText: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: '#00A99D',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 5,
    elevation: 2,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  listContainer: {
    flexGrow: 1,
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  available: {
    color: '#4CAF50',
    fontSize: 12,
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  icon: {
    marginRight: 15,
  },
  bloodTypeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: '#fff5f5',
    padding: 8,
    borderRadius: 8,
  },
  bloodText: {
    color: '#f44336',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 16,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalPicker: {
    width: '100%',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#00A99D',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
});

export default DonorDetails;