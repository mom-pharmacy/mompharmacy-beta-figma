import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const locationData = {Telangana: {Hyderabad: ['Gachibowli', 'Madhapur', 'Uppal'],Rangareddy: ['Ghatkesar', 'LB Nagar'],'Hitech City': ['Cyber Towers', 'Mindspace']},'Andhra Pradesh': {Vijayawada: ['Labbipet', 'Benz Circle'],},};
const MyProfile = () => {
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedDistrict, setSelectedDistrict] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = React.useState('');
  const districts = selectedState ? Object.keys(locationData[selectedState]) : [];
  const cities = selectedDistrict && selectedState? locationData[selectedState][selectedDistrict]: [];
  const handleSearch = () => {
    const filters = {bloodGroup: selectedBloodGroup,state: selectedState,district: selectedDistrict,city: selectedCity,};
    router.push({
      pathname: './donardetails',params: filters,});
  };
  const renderBloodGroup = ({ item }) => {
    const isSelected = selectedBloodGroup === item;
    return (
      <TouchableOpacity style={[ styles.bloodGroupButton, isSelected && styles.selectedBloodGroup,]} onPress={() => setSelectedBloodGroup(item)}>
        <FontAwesome5 name="tint" size={40} color="#B22222" style={styles.bloodIcon} />
        <Text style={styles.bloodOverlayText}>{item}</Text>
      </TouchableOpacity>
    );};
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons name="arrow-back" size={20} color="#00A99D" style={styles.arrowIcon} onPress={()=>router.back()}/>
        <Text style={styles.title}>Blood Donor</Text>
        <Text style={styles.emptyText}></Text>
      </View>
      <View style={styles.cardCTA}>
        <View style={styles.ctaTextContainer}>
          <Text style={styles.cardText}>You carry the power to save lives. Share it</Text>
          <TouchableOpacity onPress={() => router.push('./registration')}>
            <Text style={styles.registerLink}>Register Here →</Text>
          </TouchableOpacity></View>
        <Image source={require('../../assets/images/blood.gif')} style={styles.ctaIcon}/></View>
      <Text style={styles.subHeading}>Looking for blood donor? Search Here</Text>
      <Text style={styles.label}>Select your blood group</Text>
      <FlatList data={bloodGroups} renderItem={renderBloodGroup} keyExtractor={(item) => item} numColumns={4} columnWrapperStyle={styles.bloodGroupRow} scrollEnabled={false}/>
      <View style={styles.st_dst}>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedState} style={styles.picker} onValueChange={(value) => { setSelectedState(value);setSelectedDistrict('');setSelectedCity('');}}>
            <Picker.Item label="Select State" value="" />
            {Object.keys(locationData).map((state) => (
              <Picker.Item key={state} label={state} value={state} />
            ))}
          </Picker></View>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedDistrict} style={styles.picker} onValueChange={(value) => { setSelectedDistrict(value);setSelectedCity('');
            }}
            enabled={!!selectedState}>
            <Picker.Item label="Select District" value="" />
            {districts.map((district) => (
              <Picker.Item key={district} label={district} value={district} />
            ))}</Picker></View></View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCity}
          style={styles.picker}
          onValueChange={setSelectedCity}
          enabled={!!selectedDistrict}>
          <Picker.Item label="Select City" value="" />
          {cities.map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}</Picker></View>
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../assets/images/below.png')}
          style={styles.bottomImage}
          resizeMode="contain"/>
      </View></ScrollView>
      </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  arrowIcon: { marginLeft: 10 },
  title: { fontSize: 20, color: 'black', marginLeft: 10 },
  emptyText: { flex: 1 },
  cardCTA: {flexDirection: 'row',backgroundColor: '#D5ECE9',borderRadius: 10,padding: 15,alignItems: 'center',marginBottom: 20,},
  ctaTextContainer: { flex: 1 },
  cardText: { fontSize: 16, fontWeight: '500', color: '#000' },
  registerLink: { color: '#007E71', fontSize: 16, marginTop: 5 },
  ctaIcon: { width: 50, height: 50 },
  subHeading: { fontSize: 18, marginBottom: 15, color: '#000' },
  label: { fontSize: 16, fontWeight: '600', marginVertical: 10, color: '#000' },
  bloodGroupRow: { justifyContent: 'space-between', marginBottom: 10 },
  bloodGroupButton: {width: 60, height: 60, backgroundColor: '#fff',borderRadius: 10, justifyContent: 'center',alignItems: 'center', margin: 5, position: 'relative',},
  selectedBloodGroup: { borderWidth: 2, borderColor: '#00a99d', borderRadius: 40 },
  bloodIcon: { position: 'absolute' },
  bloodOverlayText: {fontSize: 11, fontWeight: 'bold',color: '#fff', textAlign: 'center', zIndex: 1,},
  pickerContainer: {borderWidth: 1, borderColor: '#ccc',borderRadius: 5, marginBottom: 15,backgroundColor: '#007E711A', flex: 1,},
  picker: { height: 60, width: '100%', backgroundColor: '#007E711A' },
  st_dst: { flexDirection: 'row', gap: 15 },
  searchButton: {backgroundColor: '#00695C', padding: 15,borderRadius: 10, alignItems: 'center', marginBottom: 20,},
  searchText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  illustrationContainer: { alignItems: 'center', borderRadius: 10, padding: 20 },
  bottomImage: { width: 200, height: 150 },
});
export default MyProfile;