import { useAddress } from '@/Context/addressContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Linking, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AddressBookScreen = () => {
  const router = useRouter();

  const {address}  = useAddress()
  console.log("this is running " , address)

  const handleEdit = () => {
    Alert.alert('Edit', 'Edit functionality coming soon!');
  };

  const handleDelete = () => {
    Alert.alert('Delete', 'Delete functionality coming soon!');
  };

  const handleShare = async () => {
    try {
      const message = 'Pooja, 13-55, beside HP petrol bunk, Yadav Nagar, Malkajgiri, Secunderabad.';
      await Share.share({ message });
    } catch (error) {
      console.error('Error sharing address:', error);
    }
  };

  const handleRequestAddress = () => {
    const message = 'Please share your delivery location for smooth delivery.';
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed on your device');
    });
  };

  const handleAddAddress = () => {
    router.push('./addAddress');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color="#00A99D"
          style={styles.arrowIcon}
          onPress={() => router.back()}
        />
        <Text style={styles.header}>Address Book</Text>
      </View>

      <View style={styles.savedAddressLabel}>
        <Text style={styles.savedAddressText}>Your Saved address</Text>
      </View>

      <View style={styles.addressCard}>
        <View style={styles.cardHeader}>
          <Image source={require('@/assets/images/home.png')} style={{ height: 30, width: 30 }} />
          <Text style={styles.cardTitle}>Home</Text>
        </View>

        <Text style={styles.cardAddress}>
          Pooja, 13-55, beside HP petrol bunk, Yadav Nagar, Malkajgiri, Secunderabad
        </Text>

        <View style={styles.actionRow}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleRequestAddress} style={styles.requestButton}>
    
        <Ionicons name="logo-whatsapp" size={20} color="#00A99D" style={styles.whatsappIcon} />
        <Text style={styles.requestText}>Request address from someone else</Text>
        <Ionicons name="chevron-forward" size={20} color="#00A99D" style={styles.arrowIcon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddAddress}>
        <Text style={styles.addNewAddressText}>+ Add new address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddressBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    marginLeft: 10,
  },
  savedAddressLabel: {
    backgroundColor: '#D1EDEC',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  savedAddressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardAddress: {
    color: '#555',
    marginBottom: 15,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  actionText: {
    color: '#00A99D',
    marginRight: 20,
    fontWeight: 'bold',
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1EDEC',
    borderWidth: 1,
    borderColor: '#00A99D',
    padding: 12,
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  whatsappIcon: {
    marginLeft: 10,
  },
  requestText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  addNewAddressText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A99D',
  },
});
