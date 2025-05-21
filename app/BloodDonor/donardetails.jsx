import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, Linking, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const locationData = { Telangana: { Hyderabad: ['Gachibowli', 'Madhapur', 'Uppal'], Rangareddy: ['Ghatkesar', 'LB Nagar'], HitechCity: ['Cyber Towers', 'Mindspace'], }, 'Andhra Pradesh': { Vijayawada: ['Labbipet', 'Benz Circle'], }, };
const AvailableDonorsScreen = () => {
  const params = useLocalSearchParams();
  const [donors, setDonors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState({ bloodGroup: '', state: '', district: '', city: '', });
  const [showModal, setShowModal] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [customReason, setCustomReason] = useState('');
  const districts = filterData.state ? Object.keys(locationData[filterData.state]) : [];
  const cities = filterData.state && filterData.district ? locationData[filterData.state][filterData.district] : [];
  const fetchFilteredDonor = async () => {
    try {
      let url = 'https://mom-beta-server1.onrender.com/api/donar/donar';
      const params = [];
      if (filterData.state) params.push(`state=${encodeURIComponent(filterData.state)}`);
      if (filterData.district) params.push(`district=${encodeURIComponent(filterData.district)}`);
      if (filterData.city) params.push(`city=${encodeURIComponent(filterData.city)}`);
      if (filterData.bloodGroup) params.push(`bloodGroup=${encodeURIComponent(filterData.bloodGroup)}`);
      if (params.length > 0) url += '?' + params.join('&');
      const response = await axios.get(url);
      const res = response.data;
      if (Array.isArray(res)) setDonors(res.length > 0 ? res : []);
      else if (res.data) setDonors([res.data]);
      else setDonors([]);
    } catch (error) {
      console.error('Error fetching filtered donor:', error);
      setDonors([]);
    }
  };
  useEffect(() => {
    if (params.bloodGroup !== filterData.bloodGroup || params.state !== filterData.state || params.district !== filterData.district || params.city !== filterData.city
    ) { setFilterData({ bloodGroup: params.bloodGroup || '', state: params.state || '', district: params.district || '', city: params.city || '', }); }
  }, [filterData.bloodGroup, filterData.city, filterData.district, filterData.state, params]);
  useEffect(() => {
    if (filterData.state || filterData.district || filterData.city || filterData.bloodGroup) { fetchFilteredDonor(); }
  }, [filterData]);
  const updateFilterData = (key, value) => {
    setFilterData((prev) => ({ ...prev, [key]: value }));
  };
  const handleSendReport = async () => {
    const finalReport = suggestion === 'Other' ? customReason : suggestion;
    try {
      const response = await fetch('https://mom-beta-server1.onrender.com/api/report/reportdetails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report: finalReport }),
      });
      if (!response.ok) throw new Error('Report failed');
      alert('Report sent successfully!');
      setShowModal(false);
      setSuggestion('');
      setCustomReason('');
    } catch (error) {
      console.error('Report Error:', error);
      alert('Failed to send report');
    }
  };
  const DonorCard = ({ donor }) => (
    <SafeAreaView>
      <GlobalStatusBar />
      <View style={styles.card}>
        <Image source={{ uri: donor.imageUrl || 'https://via.placeholder.com/60' }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{donor.name}</Text>
          <Text style={styles.phone}>{donor.phone}</Text>
          <Text style={styles.available}>Available</Text>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${donor.phone}`)}>
              <Ionicons name="call" size={22} color="#00A99D" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(`sms:${donor.phone}`)}>
              <Ionicons name="chatbubble-ellipses" size={22} color="#00A99D" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Ionicons name="alert-circle" size={22} color="#00a99d" style={styles.icon} />
            </TouchableOpacity>
          </View></View>
        <View style={styles.bloodTypeContainer}>
          <FontAwesome name="tint" size={28} color="red" />
          <Text style={styles.bloodText}>{donor.bloodGroup}</Text>
        </View></View>
      );
      return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <MaterialIcons name="arrow-back" size={20} color="#00A99D" style={styles.arrowIcon} onPress={() => router.back()} />
          <Text style={styles.title}>Available Donors</Text>
          <View style={styles.filter}>
            <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
              <Ionicons name="filter" size={24} color="#00A99D" />
            </TouchableOpacity>
          </View></View>
        {showFilter && (
          <View style={styles.filterBox}>
            <Picker selectedValue={filterData.bloodGroup} onValueChange={(value) => updateFilterData('bloodGroup', value)}>
              <Picker.Item label="Select Blood Group" value="" />{['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                <Picker.Item key={bg} label={bg} value={bg} />
              ))}</Picker>
            <Picker selectedValue={filterData.state} onValueChange={(value) => { updateFilterData('state', value); updateFilterData('district', ''); updateFilterData('city', ''); }} >
              <Picker.Item label="Select State" value="" />
              {Object.keys(locationData).map((state) => (
                <Picker.Item key={state} label={state} value={state} />
              ))}</Picker>
            <Picker selectedValue={filterData.district} onValueChange={(value) => { updateFilterData('district', value); updateFilterData('city', ''); }}
              enabled={!!filterData.state}>
              <Picker.Item label="Select District" value="" />
              {districts.map((district) => (
                <Picker.Item key={district} label={district} value={district} />
              ))}</Picker>
            <Picker selectedValue={filterData.city} onValueChange={(value) => updateFilterData('city', value)} enabled={!!filterData.district}>
              <Picker.Item label="Select City" value="" />
              {cities.map((city) => (
                <Picker.Item key={city} label={city} value={city} />
              ))}</Picker>
            <TouchableOpacity style={styles.applyBtn} onPress={fetchFilteredDonor}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Search</Text>
            </TouchableOpacity> </View>
        )}{donors.length > 0 ? (
          <FlatList data={donors} keyExtractor={(item) => item._id} renderItem={({ item }) => <DonorCard donor={item} />} contentContainerStyle={{ paddingBottom: 100 }} />
        ) : (<Text style={{ textAlign: 'center', marginTop: 20 }}>No donors found.</Text>)}
        <Modal visible={showModal} transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.modalBox}>
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Ionicons name="close-circle" size={30} color="#00a99d" />
                </TouchableOpacity></View>
              <Text style={styles.title}>Report</Text>
              <Text style={styles.subtitle}>Didn’t find what you are looking for? Please report an issue or missing information.</Text>
              <Picker selectedValue={suggestion} onValueChange={(itemValue) => setSuggestion(itemValue)} style={{ width: '100%', marginBottom: 20 }}>
                <Picker.Item label="Select a reason" value="" />
                <Picker.Item label="Not Available" value="Not Available" />
                <Picker.Item label="Not Answering the Call" value="Not Answering the Call" />
                <Picker.Item label="Not Interested" value="Not Interested" />
                <Picker.Item label="Wrong number" value="wrong number" />
                <Picker.Item label="Donated recently" value="donated recently" />
                <Picker.Item label="Can't donate anymore" value="Can't donate anymore" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
              {suggestion === 'Other' && (
                <TextInput style={styles.input} placeholder="Enter your reason" placeholderTextColor="#999" multiline numberOfLines={3} value={customReason} onChangeText={setCustomReason} />
              )}
              <Button title="Send" onPress={handleSendReport} color="#00a99d" />
            </View></View></Modal></View>
    </SafeAreaView>);
}; export default AvailableDonorsScreen;
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#fff' },
  filter: { flex: 1, alignItems: 'flex-end', marginRight: 10 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10 },
  arrowIcon: { marginLeft: 10 },
  title: { fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: 10 },
  filterBox: { backgroundColor: '#e0f2f1', margin: 10, borderRadius: 10, padding: 10 },
  applyBtn: { backgroundColor: '#00A99D', padding: 10, marginTop: 10, borderRadius: 5 },
  card: { flexDirection: 'row', backgroundColor: '#f7f7f7', margin: 10, padding: 10, borderRadius: 10, elevation: 3 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  phone: { fontSize: 14, color: '#555' },
  available: { fontSize: 14, color: 'green' },
  iconRow: { flexDirection: 'row', marginTop: 5 },
  icon: { marginRight: 15 },
  bloodTypeContainer: { justifyContent: 'center', alignItems: 'center' },
  bloodText: { fontSize: 16, fontWeight: 'bold', color: 'red' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: 'white', width: '90%', padding: 20, borderRadius: 10 },
  closeButtonContainer: { alignItems: 'flex-end' },
  subtitle: { fontSize: 14, color: '#555', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, textAlignVertical: 'top', marginBottom: 20, },
});
