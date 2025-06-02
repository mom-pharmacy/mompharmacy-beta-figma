import { useAddress } from '@/Context/addressContext';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  Modal,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const wp = (percentage: string) => (width * parseFloat(percentage)) / 100;
const hp = (percentage: string) => (height * parseFloat(percentage)) / 100;

const initialAddresses = [
  {
    id: '1',
    title: 'Home',
    details: 'Pooja, 13-55, beside HP petrol bunk, Yadav Nagar, Malkajgiri, Secunderabad',
  },
  {
    id: '2',
    title: 'Address1',
    details: 'Rohith Raj, 14-52, beside HP petrol bunk, Yadav Nagar, Malkajgiri, Secunderabad',
  },
  {
    id: '3',
    title: 'Address2',
    details: 'Sahithya, 18-63, beside HP petrol bunk, Yadav Nagar, Malkajgiri, Secunderabad',
  },
];

export default function AddressBook() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [primaryId, setPrimaryId] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [newDetails, setNewDetails] = useState('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPrimaryModalVisible, setIsPrimaryModalVisible] = useState(false);

  const { address, deleteAddress, googleLoc } = useAddress()
  const handleEdit = (address: any) => {
    setSelectedAddress(address);
    setNewDetails(address.details);
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (selectedAddress && newDetails.trim()) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === selectedAddress.id ? { ...item, details: newDetails } : item
        )
      );
      setIsEditModalVisible(false);
      setSelectedAddress(null);
      setNewDetails('');
    } else {
      Alert.alert('Error', 'Please enter valid address details.');
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete', 'Are you sure you want to delete this address?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteAddress(id)
        },
      },
    ]);
  };

  const handleShare = async (details: string) => {
    try {
      await Share.share({ message: details });
    } catch {
      Alert.alert('Error', 'Failed to share address');
    }
  };

  const handleRequest = () => {
    const message = 'Hi, can you share your address with me?';
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappURL);
  };

  const handleSetPrimary = () => {
    if (selectedAddress) {
      setPrimaryId(selectedAddress.id);
    }
    setIsPrimaryModalVisible(false);
  };

  return (

    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp('10%') }}>
      <SafeAreaView>
        <View style={styles.header}>
          <MaterialIcons name="arrow-back" size={hp('3%')} color="#00695c" onPress={()=> router.back()} />
          <Text style={styles.headerText}>Address Book</Text>
        </View>

        <Text style={styles.subHeader}>Your Saved Address</Text>

        {address.map((item, index) => {
          console.log("this is particular address", item)
          const detailsAddress = `${item.street}, ${item.pincode}, ${item.city}, ${item.state}`
          return (
            <View
              key={item._id}
              style={[
                styles.card,
                item.id === primaryId && { backgroundColor: '#00a99d20', borderColor: '#00a99d', borderWidth: 1 },
              ]}
            >
              <View style={styles.cardHeader}>
                <Ionicons name="home" size={hp('3%')} color="#00695c" />
                <Text style={styles.cardTitle}>Address {index + 1}</Text>
                <Entypo
                  name="dots-three-vertical"
                  size={hp('2.5%')}
                  color="#444"
                  style={{ marginLeft: 'auto' }}
                  onPress={() => {
                    setSelectedAddress(item);
                    setIsPrimaryModalVisible(true);
                  }}
                />
              </View>
              <Text style={styles.cardText}>{detailsAddress}</Text>
              <View style={styles.actionRow}>
                
                <TouchableOpacity onPress={() => handleDelete(item._id)}>
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleShare(item.details)}>
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}

        <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
          <Ionicons name="logo-whatsapp" size={hp('2.5%')} color="#00695c" />
          <Text style={styles.requestText}>Request address from someone else</Text>
          <Ionicons name="chevron-forward" size={hp('2.5%')} color="#00695c" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/Maps/addAddress')}>
          <Text style={styles.addButtonText}>+ Add New Address</Text>
        </TouchableOpacity>

        {/* Edit Modal */}
        <Modal visible={isEditModalVisible} transparent animationType="slide" onRequestClose={() => setIsEditModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Edit Address</Text>
              <TextInput
                style={styles.inputField}
                value={newDetails}
                onChangeText={setNewDetails}
                placeholder="Enter new address"
              />
              <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.modalButton, { marginRight: 10 }]} onPress={handleSaveEdit}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => setIsEditModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Primary Modal */}
        <Modal visible={isPrimaryModalVisible} transparent animationType="fade" onRequestClose={() => setIsPrimaryModalVisible(false)}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Set as primary address</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={handleSetPrimary}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.button} onPress={() => setIsPrimaryModalVisible(false)}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp('5%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  headerText: {
    fontSize: hp('3%'),
    fontWeight: '700',
    marginLeft: wp('4%'),
    color: '#00695c',
  },
  subHeader: {
    backgroundColor: '#b2dfdb',
    padding: wp('3%'),
    borderRadius: 8,
    fontWeight: '600',
    color: '#333',
    marginBottom: hp('1.5%'),
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: wp('4%'),
    borderRadius: 12,
    marginBottom: hp('2%'),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  cardTitle: {
    fontSize: hp('2%'),
    fontWeight: '700',
    marginLeft: wp('2%'),
  },
  cardText: {
    fontSize: hp('1.8%'),
    color: '#555',
    marginBottom: hp('1.5%'),
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
  },
  actionText: {
    color: '#009688',
    fontWeight: '600',
  },
  requestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2f1',
    padding: wp('4%'),
    borderRadius: 25,
    justifyContent: 'space-between',
    marginVertical: hp('2%'),
  },
  requestText: {
    color: '#00695c',
    fontSize: hp('1.8%'),
    marginLeft: wp('2%'),
    flex: 1,
  },
  addButton: {
    alignItems: 'center',
  },
  addButtonText: {
    color: '#00796b',
    fontSize: hp('2%'),
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  modalContainer: {
    width: wp('80%'),
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: wp('5%'),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: hp('2.2%'),
    fontWeight: '700',
    marginBottom: hp('2%'),
  },
  inputField: {
    width: '100%',
    height: hp('6%'),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: wp('2%'),
    marginBottom: hp('2%'),
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  modalButton: {
    backgroundColor: '#00796b',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: hp('1.8%'),
  },
  overlay: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: hp('2%'),
    fontWeight: '600',
    marginBottom: hp('2%'),
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc',
  },
});

// const styles = StyleSheet.create({
//   // Main screen wrapper
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     padding: 20,
//   },

//   // Header section
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginLeft: 16,
//     color: '#00695c',
//   },

//   // Subheader section with background
//   subHeader: {
//     backgroundColor: '#b2dfdb',
//     padding: 12,
//     borderRadius: 8,
//     fontWeight: '600',
//     color: '#333333',
//     marginBottom: 12,
//   },

//   // Card style container
//   card: {
//     backgroundColor: '#f5f5f5',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
//   cardText: {
//     fontSize: 14,
//     color: '#555555',
//     marginBottom: 12,
//   },

//   // Row with actions or links
//   actionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   actionText: {
//     color: '#009688',
//     fontWeight: '600',
//   },

//   // Request-style button
//   requestButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e0f2f1',
//     padding: 16,
//     borderRadius: 25,
//     justifyContent: 'space-between',
//     marginVertical: 16,
//   },
//   requestText: {
//     color: '#00695c',
//     fontSize: 14,
//     marginLeft: 8,
//     flex: 1,
//   },

//   // Add button at the bottom
//   addButton: {
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#00796b',
//     fontSize: 16,
//     fontWeight: '600',
//   },

//   // Modal background overlay
//   // modalOverlay: {
//   //   flex: 1,
//   //   justifyContent: 'center',
//   //   alignItems: 'center',
//   //   backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   // },
//   modalOverlay: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent black
// },


//   // Modal content box
//   modalContainer: {
//     width: '80%',
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   inputField: {
//     width: '100%',
//     height: 48,
//     borderColor: '#cccccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 10,
//     marginBottom: 16,
//   },
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 8,
//   },
//   modalButton: {
//     backgroundColor: '#00796b',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   modalButtonText: {
//     color: '#ffffff',
//     fontWeight: '600',
//     fontSize: 14,
//   },

//   modalText: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 16,
//   },

//   // Row of buttons at bottom of modal
//   buttonRow: {
//     flexDirection: 'row',
//     width: '100%',
//     borderTopWidth: 1,
//     borderColor: '#cccccc',
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: '500',
//   },

//   // Line between buttons
//   divider: {
//     width: 1,
//     backgroundColor: '#cccccc',
//   },
// });