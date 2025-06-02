// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';


// import { router, useLocalSearchParams } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { FlatList, Image, Linking, Modal, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// const locationData = { Telangana: { Hyderabad: ['Gachibowli', 'Madhapur', 'Uppal'], Rangareddy: ['Ghatkesar', 'LB Nagar'], HitechCity: ['Cyber Towers', 'Mindspace'], }, 'Andhra Pradesh': { Vijayawada: ['Labbipet', 'Benz Circle'], }, };
// const AvailableDonorsScreen = () => {
//   const params = useLocalSearchParams();
//   const [donors, setDonors] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterData, setFilterData] = useState({ bloodGroup: '', state: '', district: '', city: '', });
//   const [showModal, setShowModal] = useState(false);
//   const [suggestion, setSuggestion] = useState('');
//   const [customReason, setCustomReason] = useState('');
//   const districts = filterData.state ? Object.keys(locationData[filterData.state]) : [];
//   const cities = filterData.state && filterData.district ? locationData[filterData.state][filterData.district] : [];
//   const fetchFilteredDonor = async () => {
//     try {
//       let url = 'https://mom-beta-server1.onrender.com/api/donar/donar';
//       const params = [];
//       if (filterData.state) params.push(`state=${encodeURIComponent(filterData.state)}`);
//       if (filterData.district) params.push(`district=${encodeURIComponent(filterData.district)}`);
//       if (filterData.city) params.push(`city=${encodeURIComponent(filterData.city)}`);
//       if (filterData.bloodGroup) params.push(`bloodGroup=${encodeURIComponent(filterData.bloodGroup)}`);
      
//       if (params.length > 0) {
//         url += '?' + params.join('&');
//       }
      
//       console.log('Fetching donors from:', url); // Log the URL being called
      
//       const response = await axios.get(url, {
//         validateStatus: function (status) {
//           return status < 500; // Reject only if the status code is greater than or equal to 500
//         }
//       });
      
//       console.log('Response status:', response.status);
//       console.log('Response data:', response.data);
      
//       if (response.status === 200 || response.status === 404) {
//         const res = response.data;
//         // If no donors found (404), treat it as an empty result rather than an error
//         if (response.status === 404) {
//           console.log('No donors found for the selected criteria');
//           setDonors([]);
//           return;
//         }
        
//         if (Array.isArray(res)) {
//           setDonors(res.length > 0 ? res : []);
//         } else if (res && res.data) {
//           setDonors(Array.isArray(res.data) ? res.data : [res.data]);
//         } else {
//           setDonors([]);
//         }
//       } else {
//         console.error('Server returned an error:', response.status, response.data);
//         // You might want to show an error message to the user here
//         setDonors([]);
//       }
//     } catch (error) {
//       console.error('Error fetching filtered donor:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         config: {
//           url: error.config?.url,
//           method: error.config?.method,
//           params: error.config?.params
//         }
//       });
//       setDonors([]);
//     }
//   };
//   useEffect(() => {
//     if (params.bloodGroup !== filterData.bloodGroup || params.state !== filterData.state || params.district !== filterData.district || params.city !== filterData.city
//     ) { setFilterData({ bloodGroup: params.bloodGroup || '', state: params.state || '', district: params.district || '', city: params.city || '', }); }
//   }, [filterData.bloodGroup, filterData.city, filterData.district, filterData.state, params]);
//   useEffect(() => {
//     if (filterData.state || filterData.district || filterData.city || filterData.bloodGroup) { fetchFilteredDonor(); }
//   }, [filterData]);
//   const updateFilterData = (key, value) => {
//     setFilterData((prev) => ({ ...prev, [key]: value }));
//   };
//   const handleSendReport = async () => {
//     const finalReport = suggestion === 'Other' ? customReason : suggestion;
//     try {
//       const response = await fetch('https://mom-beta-server1.onrender.com/api/report/reportdetails', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ report: finalReport }),
//       });
//       if (!response.ok) throw new Error('Report failed');
//       alert('Report sent successfully!');
//       setShowModal(false);
//       setSuggestion('');
//       setCustomReason('');
//     } catch (error) {
//       console.error('Report Error:', error);
//       alert('Failed to send report');
//     }
//   };
//   const DonorCard = ({ donor }) => (
//     <View style={styles.card}>
//       <Image source={{ uri: donor.imageUrl || 'https://via.placeholder.com/60' }} style={styles.avatar} />
//       <View style={{ flex: 1, marginLeft: 10 }}>
//         <Text style={styles.name}>{donor.name || 'Anonymous Donor'}</Text>
//         <Text style={styles.phone}>{donor.phone || 'Phone not available'}</Text>
//         <Text style={styles.available}>Available</Text>
//         <View style={styles.iconRow}>
//           <TouchableOpacity onPress={() => Linking.openURL(`tel:${donor.phone}`)}>
//             <Ionicons name="call" size={22} color="#00A99D" style={styles.icon} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => Linking.openURL(`sms:${donor.phone}`)} style={styles.iconMargin}>
//             <Ionicons name="chatbubble-ellipses" size={22} color="#00A99D" style={styles.icon} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setShowModal(true)}>
//             <Ionicons name="alert-circle" size={22} color="#00a99d" style={styles.icon} />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.bloodTypeContainer}>
//         <FontAwesome name="tint" size={28} color="red" />
//         <Text style={styles.bloodText}>{donor.bloodGroup || 'N/A'}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <View style={styles.container}>
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <MaterialIcons name="arrow-back" size={24} color="#00A99D" style={styles.arrowIcon} />
//           </TouchableOpacity>
//           <Text style={styles.title}>Available Donors</Text>
//           <View style={styles.filter}>
//             <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
//               <Ionicons name="filter" size={24} color="#00A99D" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         {showFilter && (
//           <View style={styles.filterBox}>
//             <Picker 
//               selectedValue={filterData.bloodGroup} 
//               onValueChange={(value) => updateFilterData('bloodGroup', value)}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select Blood Group" value="" />
//               {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
//                 <Picker.Item key={bg} label={bg} value={bg} />
//               ))}
//             </Picker>
            
//             <Picker 
//               selectedValue={filterData.state} 
//               onValueChange={(value) => { 
//                 updateFilterData('state', value); 
//                 updateFilterData('district', ''); 
//                 updateFilterData('city', ''); 
//               }}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select State" value="" />
//               {Object.keys(locationData).map((state) => (
//                 <Picker.Item key={state} label={state} value={state} />
//               ))}
//             </Picker>
            
//             <Picker 
//               selectedValue={filterData.district} 
//               onValueChange={(value) => { 
//                 updateFilterData('district', value); 
//                 updateFilterData('city', ''); 
//               }}
//               enabled={!!filterData.state}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select District" value="" />
//               {districts.map((district) => (
//                 <Picker.Item key={district} label={district} value={district} />
//               ))}
//             </Picker>
            
//             <Picker 
//               selectedValue={filterData.city} 
//               onValueChange={(value) => updateFilterData('city', value)} 
//               enabled={!!filterData.district}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select City" value="" />
//               {cities.map((city) => (
//                 <Picker.Item key={city} label={city} value={city} />
//               ))}
//             </Picker>
            
//             <TouchableOpacity 
//               style={styles.applyBtn} 
//               onPress={fetchFilteredDonor}
//             >
//               <Text style={{ color: 'white', textAlign: 'center' }}>Search</Text>
//             </TouchableOpacity>
//           </View>
//         )}
        
//         {/* Donor List */}
//         <View style={{ flex: 1, padding: 10 }}>
//           {console.log('Rendering donors:', donors)} {/* Debug log */}
//           {donors && donors.length > 0 ? (
//             <FlatList 
//               data={donors} 
//               keyExtractor={(item) => item._id || Math.random().toString()} 
//               renderItem={({ item }) => (
//                 <DonorCard donor={item} />
//               )} 
//               contentContainerStyle={{ paddingBottom: 100 }}
//             />
//           ) : (
//             <View style={styles.noDonorsContainer}>
//               <Text style={styles.noDonorsText}>No donors found matching your criteria.</Text>
//               <Text style={styles.tryAgainText}>Try adjusting your filters or check back later.</Text>
//             </View>
//           )}
//         </View>

//         {/* Report Modal */}
//         <Modal 
//           visible={showModal} 
//           transparent 
//           animationType="fade" 
//           onRequestClose={() => setShowModal(false)}
//         >
//           <View style={styles.overlay}>
//             <View style={styles.modalBox}>
//               <View style={styles.closeButtonContainer}>
//                 <TouchableOpacity onPress={() => setShowModal(false)}>
//                   <Ionicons name="close-circle" size={30} color="#00a99d" />
//                 </TouchableOpacity>
//               </View>
              
//               <Text style={styles.modalTitle}>Report an Issue</Text>
//               <Text style={styles.modalSubtitle}>
//                 Didn't find what you're looking for? Please report an issue or missing information.
//               </Text>
              
//               <Picker 
//                 selectedValue={suggestion} 
//                 onValueChange={setSuggestion} 
//                 style={styles.modalPicker}
//               >
//                 <Picker.Item label="Select a reason" value="" />
//                 <Picker.Item label="Not Available" value="Not Available" />
//                 <Picker.Item label="Not Answering the Call" value="Not Answering the Call" />
//                 <Picker.Item label="Not Interested" value="Not Interested" />
//                 <Picker.Item label="Wrong number" value="Wrong number" />
//                 <Picker.Item label="Donated recently" value="Donated recently" />
//                 <Picker.Item label="Can't donate anymore" value="Can't donate anymore" />
//                 <Picker.Item label="Other" value="Other" />
//               </Picker>
              
//               {suggestion === 'Other' && (
//                 <TextInput 
//                   style={styles.modalInput} 
//                   placeholder="Enter your reason" 
//                   placeholderTextColor="#999" 
//                   multiline 
//                   numberOfLines={3} 
//                   value={customReason} 
//                   onChangeText={setCustomReason} 
//                 />
//               )}
              
//               <TouchableOpacity 
//                 style={styles.sendButton}
//                 onPress={handleSendReport}
//               >
//                 <Text style={styles.sendButtonText}>Send Report</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// }; export default AvailableDonorsScreen;
// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: '#fff',
//     paddingTop: Platform.OS === 'ios' ? 50 : 10,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginLeft: 20,
//     flex: 1,
//   },
//   filter: { 
//     alignItems: 'flex-end',
//     marginRight: 10,
//   },
//   card: {
//     flexDirection: 'row',
//     padding: 15,
//     marginVertical: 8,
//     marginHorizontal: 10,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#f0f0f0',
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   phone: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   available: {
//     color: '#4CAF50',
//     fontSize: 12,
//     marginBottom: 8,
//   },
//   iconRow: {
//     flexDirection: 'row',
//     marginTop: 8,
//   },
//   icon: {
//     marginRight: 15,
//   },
//   bloodTypeContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 10,
//   },
//   bloodText: {
//     color: '#f44336',
//     fontWeight: 'bold',
//     marginTop: 4,
//   },
//   filterBox: {
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     borderRadius: 10,
//     margin: 10,
//   },
//   picker: {
//     backgroundColor: '#fff',
//     marginBottom: 15,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   applyBtn: {
//     backgroundColor: '#00A99D',
//     padding: 12,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   noDonorsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   noDonorsText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   tryAgainText: {
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//   },
//   modalBox: {
//     backgroundColor: 'white',
//     margin: 20,
//     borderRadius: 10,
//     padding: 20,
//     maxHeight: '80%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//     textAlign: 'center',
//   },
//   modalSubtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   modalPicker: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   modalInput: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   sendButton: {
//     backgroundColor: '#00A99D',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   sendButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   closeButtonContainer: {
//     alignItems: 'flex-end',
//     marginBottom: 10,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//   },
//   modalPicker: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10 },
//   arrowIcon: { marginLeft: 10 },
//   title: { fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: 10 },
//   filterBox: { backgroundColor: '#e0f2f1', margin: 10, borderRadius: 10, padding: 10 },
//   applyBtn: { backgroundColor: '#00A99D', padding: 10, marginTop: 10, borderRadius: 5 },
//   card: { flexDirection: 'row', backgroundColor: '#f7f7f7', margin: 10, padding: 10, borderRadius: 10, elevation: 3 },
//   avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
//   name: { fontSize: 16, fontWeight: 'bold' },
//   phone: { fontSize: 14, color: '#555' },
//   available: { fontSize: 14, color: 'green' },
//   iconRow: { flexDirection: 'row', marginTop: 5 },
//   icon: { marginRight: 15 },
//   bloodTypeContainer: { justifyContent: 'center', alignItems: 'center' },
//   bloodText: { fontSize: 16, fontWeight: 'bold', color: 'red' },
//   overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
//   modalBox: { backgroundColor: 'white', width: '90%', padding: 20, borderRadius: 10 },
//   closeButtonContainer: { alignItems: 'flex-end' },
//   subtitle: { fontSize: 14, color: '#555', marginVertical: 10 },
//   input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, textAlignVertical: 'top', marginBottom: 20, },
// });

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const locationData = {
  Telangana: {
    Hyderabad: ['Gachibowli', 'Madhapur', 'Uppal'],
    Rangareddy: ['Ghatkesar', 'LB Nagar'],
    HitechCity: ['Cyber Towers', 'Mindspace'],
  },
  'Andhra Pradesh': {
    Vijayawada: ['Labbipet', 'Benz Circle'],
  },
};

const AvailableDonorsScreen = () => {
  const params = useLocalSearchParams();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState({
    bloodGroup: '',
    state: '',
    district: '',
    city: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [customReason, setCustomReason] = useState('');

  const districts = filterData.state ? Object.keys(locationData[filterData.state]) : [];
  const cities = filterData.state && filterData.district ? locationData[filterData.state][filterData.district] : [];

  const fetchFilteredDonor = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = 'https://mom-beta-server1.onrender.com/api/donar/donar';
      const queryParams = [];
      const activeFilters = {};
      
      // Only add non-empty filters
      if (filterData.bloodGroup && filterData.bloodGroup.trim() !== "") {
        queryParams.push(`bloodGroup=${encodeURIComponent(filterData.bloodGroup.trim())}`);
        activeFilters.bloodGroup = filterData.bloodGroup.trim();
      }
      if (filterData.state && filterData.state.trim() !== "") {
        queryParams.push(`state=${encodeURIComponent(filterData.state.trim())}`);
        activeFilters.state = filterData.state.trim();
      }
      if (filterData.district && filterData.district.trim() !== "") {
        queryParams.push(`district=${encodeURIComponent(filterData.district.trim())}`);
        activeFilters.district = filterData.district.trim();
      }
      if (filterData.city && filterData.city.trim() !== "") {
        queryParams.push(`city=${encodeURIComponent(filterData.city.trim())}`);
        activeFilters.city = filterData.city.trim();
      }
      
      if (queryParams.length > 0) {
        url += '?' + queryParams.join('&');
      }
      
      console.log('Active filters:', activeFilters);
      console.log('Making API call to:', url);
      
      const response = await axios.get(url);
      console.log('API Response status:', response.status);
      console.log('API Response headers:', response.headers);
      console.log('API Response data:', JSON.stringify(response.data, null, 2));
      
      if (!response.data) {
        console.log('No data received from server');
        setDonors([]);
        setError('No data received from server');
        return;
      }

      // Handle the response data
      const donorData = Array.isArray(response.data) ? response.data : 
                       Array.isArray(response.data.data) ? response.data.data : 
                       [response.data];
      
      console.log('Parsed donor data:', donorData);
      
      // Apply filters on frontend as well for extra safety
      const validDonors = donorData.filter(donor => {
        if (!donor || typeof donor !== 'object') {
          console.log('Invalid donor object:', donor);
          return false;
        }
        
        // Basic validation
        const isValidDonor = donor.name || donor.phone || donor.bloodGroup;
        if (!isValidDonor) {
          console.log('Donor missing required fields:', donor);
          return false;
        }

        // Match all active filters
        for (const [key, value] of Object.entries(activeFilters)) {
          if (!donor[key] || donor[key].toLowerCase() !== value.toLowerCase()) {
            console.log(`Donor ${donor.name || 'Unknown'} filtered out due to mismatch on ${key}:`, 
              'Expected:', value.toLowerCase(), 
              'Got:', (donor[key] || '').toLowerCase()
            );
            return false;
          }
        }
        
        return true;
      });

      console.log('Final filtered donors:', validDonors);
      setDonors(validDonors);

      if (validDonors.length === 0) {
        setError('No donors found matching your criteria. Try adjusting your filters.');
      }
    } catch (error) {
      console.error('Error fetching donors:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      
      if (error.response?.status === 404) {
        setError('No donors found matching your criteria.');
      } else {
        setError(`Unable to fetch donors: ${error.message}`);
      }
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params && Object.keys(params).length > 0) {
      console.log('Initial fetch with params:', params);
      fetchFilteredDonor();
    } else {
      console.log('No initial params, skipping fetch');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const hasValidFilter = Object.values(filterData).some(value => value && value.trim() !== '');
    console.log('Filter data:', filterData);
    console.log('Has valid filter:', hasValidFilter);
    
    if (hasValidFilter) {
      fetchFilteredDonor();
    } else {
      setLoading(false);
    }
  }, [filterData]);

  const updateFilterData = (key, value) => {
    try {
      setFilterData(prev => {
        const newData = { ...prev, [key]: value };
        
        if (key === 'state') {
          newData.district = '';
          newData.city = '';
        } else if (key === 'district') {
          newData.city = '';
        }
        
        return newData;
      });
    } catch (error) {
      console.error('Error updating filter:', error);
      alert('Error updating filter. Please try again.');
    }
  };

  const handleSendReport = async () => {
    const finalReport = suggestion === 'Other' ? customReason : suggestion;
    
    if (!finalReport) {
      Alert.alert('Error', 'Please select a reason or enter a custom reason');
      return;
    }

    try {
      setLoading(true); // Add loading state

      console.log('Sending report with data:', { 
        report: finalReport,
        timestamp: new Date().toISOString(),
        type: 'donor_report'
      });

      const response = await axios.post(
        'https://mom-beta-server1.onrender.com/api/report/reportdetails',
        {
          report: finalReport,
          timestamp: new Date().toISOString(),
          type: 'donor_report'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 20000 // Increased timeout to 20 seconds since it's a free tier server
        }
      );

      console.log('Report response:', response.data);

      if (response.data && (response.status === 200 || response.status === 201)) {
        Alert.alert(
          'Success',
          'Report sent successfully!',
          [{ text: 'OK', onPress: () => {
            setShowModal(false);
            setSuggestion('');
            setCustomReason('');
          }}]
        );
      } else {
        throw new Error('Unexpected response: ' + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Report Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        error: error.toString()
      });
      
      let errorMessage = 'Failed to send report. Please try again.';
      let errorTitle = 'Error';

      if (error.message.includes('Network Error')) {
        errorTitle = 'No Internet Connection';
        errorMessage = 'Please check your internet connection and try again.';
      } else if (error.message.includes('timeout')) {
        errorTitle = 'Connection Timeout';
        errorMessage = 'The server is taking too long to respond. This might be due to poor internet connection or server issues. Please try again.';
      } else if (error.response?.status === 404) {
        errorMessage = 'The report service is currently unavailable. Please try again later.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Alert.alert(
        errorTitle,
        errorMessage,
        [
          { 
            text: 'Retry',
            onPress: () => {
              console.log('Retrying report submission...');
              handleSendReport();
            }
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              console.log('Report submission cancelled');
              setShowModal(false);
            }
          }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const DonorCard = ({ donor }) => {
    if (!donor) return null;

    return (
      <View style={styles.card}>
        <Image 
          source={{ uri: donor.imageUrl || 'https://via.placeholder.com/60' }} 
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.name}>{donor.name || 'Anonymous Donor'}</Text>
          <Text style={styles.phone}>{donor.phone || 'Phone not available'}</Text>
          <Text style={styles.available}>Available</Text>
          <View style={styles.iconRow}>
            {donor.phone && (
              <>
                <TouchableOpacity 
                  onPress={() => {
                    try {
                      Linking.openURL(`tel:${donor.phone}`);
                    } catch (error) {
                      console.error('Error opening phone:', error);
                      alert('Unable to make phone call at this time');
                    }
                  }}
                >
                  <Ionicons name="call" size={22} color="#00A99D" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => {
                    try {
                      Linking.openURL(`sms:${donor.phone}`);
                    } catch (error) {
                      console.error('Error opening SMS:', error);
                      alert('Unable to send SMS at this time');
                    }
                  }} 
                  style={styles.iconMargin}
                >
                  <Ionicons name="chatbubble-ellipses" size={22} color="#00A99D" style={styles.icon} />
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Ionicons name="alert-circle" size={22} color="#00a99d" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bloodTypeContainer}>
          <FontAwesome name="tint" size={28} color="red" />
          <Text style={styles.bloodText}>{donor.bloodGroup || 'N/A'}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#00A99D" style={styles.arrowIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Available Donors</Text>
          <View style={styles.filter}>
            <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
              <Ionicons name="filter" size={24} color="#00A99D" />
            </TouchableOpacity>
          </View>
        </View>

        {showFilter && (
          <View style={styles.filterBox}>
            <Picker 
              selectedValue={filterData.bloodGroup} 
              onValueChange={(value) => updateFilterData('bloodGroup', value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Blood Group" value="" />
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                <Picker.Item key={bg} label={bg} value={bg} />
              ))}
            </Picker>
            
            <Picker 
              selectedValue={filterData.state} 
              onValueChange={(value) => { 
                updateFilterData('state', value); 
                updateFilterData('district', ''); 
                updateFilterData('city', ''); 
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select State" value="" />
              {Object.keys(locationData).map((state) => (
                <Picker.Item key={state} label={state} value={state} />
              ))}
            </Picker>
            
            <Picker 
              selectedValue={filterData.district} 
              onValueChange={(value) => { 
                updateFilterData('district', value); 
                updateFilterData('city', ''); 
              }}
              enabled={!!filterData.state}
              style={[styles.picker, !filterData.state && styles.disabledPicker]}
            >
              <Picker.Item label="Select District" value="" />
              {districts.map((district) => (
                <Picker.Item key={district} label={district} value={district} />
              ))}
            </Picker>
            
            <Picker 
              selectedValue={filterData.city} 
              onValueChange={(value) => updateFilterData('city', value)} 
              enabled={!!filterData.district}
              style={[styles.picker, !filterData.district && styles.disabledPicker]}
            >
              <Picker.Item label="Select City" value="" />
              {cities.map((city) => (
                <Picker.Item key={city} label={city} value={city} />
              ))}
            </Picker>
            
            <TouchableOpacity 
              style={styles.applyBtn} 
              onPress={fetchFilteredDonor}
            >
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.contentContainer}>
          {loading ? (
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color="#00A99D" />
              <Text style={styles.loadingText}>Searching for donors...</Text>
            </View>
          ) : error ? (
            <View style={styles.centerContent}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton} 
                onPress={fetchFilteredDonor}
              >
                <Text style={styles.buttonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : donors.length === 0 ? (
            <View style={styles.centerContent}>
              <Text style={styles.emptyText}>No donors found</Text>
              <Text style={styles.emptySubText}>Try adjusting your search filters</Text>
            </View>
          ) : (
            <FlatList
              data={donors}
              renderItem={({ item }) => <DonorCard donor={item} />}
              keyExtractor={(item, index) => item._id?.toString() || index.toString()}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </View>

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
                enabled={!loading}
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
                  editable={!loading}
                />
              )}
              
              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  (!suggestion || (suggestion === 'Other' && !customReason)) && styles.sendButtonDisabled,
                  loading && styles.sendButtonDisabled
                ]}
                onPress={handleSendReport}
                disabled={!suggestion || (suggestion === 'Other' && !customReason) || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.sendButtonText}>Send Report</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
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
    opacity: 0.7
  },
});

export default AvailableDonorsScreen;

