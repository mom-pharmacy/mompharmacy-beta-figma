import apiClient from "@/utils/apiClient";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert, FlatList,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const DonorDetails = () => {
  const { donors } = useLocalSearchParams();
  const donorList = JSON.parse(donors || '[]');
  const [showModal, setShowModal] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [customReason, setCustomReason] = useState('');

  const handleSendReport = async () => {
    const finalReport = (suggestion === 'Other' ? customReason : suggestion)?.trim();
  
    if (!finalReport) {
      Alert.alert('Please select or enter a reason');
      return;
    }
  
    console.log('Sending report:', finalReport);
  
    try {
      const response = await apiClient('api/report/reportdetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report: finalReport }),
      });
  
      console.log('API Response:', response);
  
      if (!response) {
        throw new Error('Report failed');
      }
  
      Alert.alert('Report sent successfully');
      setShowModal(false);
      setSuggestion('');
      setCustomReason('');
    } catch (error) {
      console.error('Report Error:', error);
      Alert.alert('Failed to send report');
    }
  };
  

  const renderDonorCard = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>Phone: {item.phone}</Text>
        <Text style={styles.available}>Available</Text>
        <View style={styles.iconRow}>
          <Text>
            {item.city}, {item.district}, {item.state}
          </Text>
        </View>
        <View style={styles.actionIcons}>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
            <Ionicons name="call" size={22} color="#00A99D" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`sms:${item.phone}`)}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="#00A99D" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Ionicons name="alert-circle" size={22} color="#00A99D" style={styles.icon} />
          </TouchableOpacity>
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

        {/* Modal moved out below */}
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

      {/* Report Modal (always rendered) */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close-circle" size={30} color="#00a99d" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Report an Issue</Text>
            <Text style={styles.modalSubtitle}>
              Didn't find what you're looking for? Please report an issue or missing information.
            </Text>

            <Picker
              selectedValue={suggestion}
              onValueChange={setSuggestion}
              style={styles.modalPicker}
            >
              <Picker.Item label="Select a reason" value="" />
              <Picker.Item label="Not Available" value="Not Available" />
              <Picker.Item label="Not Answering the Call" value="Not Answering the Call" />
              <Picker.Item label="Not Interested" value="Not Interested" />
              <Picker.Item label="Wrong number" value="Wrong number" />
              <Picker.Item label="Donated recently" value="Donated recently" />
              <Picker.Item label="Can't donate anymore" value="Can't donate anymore" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            {suggestion === 'Other' && (
              <TextInput
                style={styles.modalInput}
                placeholder="Enter your reason"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                value={customReason}
                onChangeText={setCustomReason}
              />
            )}

            <TouchableOpacity style={styles.sendButton} onPress={handleSendReport}>
              <Text style={styles.sendButtonText}>Send Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DonorDetails;

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
  actionIcons: {
    flexDirection: 'row',
    marginTop: 10,
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  modalPicker: {
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  }
});



