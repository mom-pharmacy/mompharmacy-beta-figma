import { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { searchDonors } from './searchDonors';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const locationData = {
  Telangana: {
    Hyderabad: ['Gachibowli', 'Madhapur', 'Uppal'],
    Rangareddy: ['Ghatkesar', 'LB Nagar'],
    'Hitech City': ['Cyber Towers', 'Mindspace'],
  },
  'Andhra Pradesh': {
    Vijayawada: ['Labbipet', 'Benz Circle'],
  },
};

const MyProfile = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [bloodOpen, setBloodOpen] = useState(false);
  const [bloodItems, setBloodItems] = useState(bloodGroups.map(bg => ({ label: bg, value: bg })));

  const [stateOpen, setStateOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [stateItems, setStateItems] = useState(Object.keys(locationData).map(state => ({ label: state, value: state })));

  const [districtOpen, setDistrictOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtItems, setDistrictItems] = useState([]);

  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [cityItems, setCityItems] = useState([]);

  const handleSearch = async () => {
    const filters = {};
    if (selectedBloodGroup) filters.bloodGroup = selectedBloodGroup;
    if (selectedState) filters.state = selectedState;
    if (selectedDistrict) filters.district = selectedDistrict;
    if (selectedCity) filters.city = selectedCity;

    if (Object.keys(filters).length === 0) {
      Alert.alert('Search Error', 'Please select at least one search criteria');
      return;
    }

    try {
      const donors = await searchDonors(filters);
      router.push({
        pathname: '/BloodDonor/donardetails',
        params: { donors: JSON.stringify(donors) },
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    if (selectedState) {
      const districts = Object.keys(locationData[selectedState] || {}).map(d => ({
        label: d,
        value: d,
      }));
      setDistrictItems(districts);
      setSelectedDistrict('');
      setSelectedCity('');
      setCityItems([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedDistrict && locationData[selectedState]?.[selectedDistrict]) {
      const cities = locationData[selectedState][selectedDistrict].map(c => ({
        label: c,
        value: c,
      }));
      setCityItems(cities);
      setSelectedCity('');
    }
  }, [selectedDistrict, selectedState]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <MaterialIcons
            name="arrow-back"
            size={20}
            color="#00A99D"
            style={styles.arrowIcon}
            onPress={() => router.back()}
          />
          <Text style={styles.title}>Blood Donor</Text>
          <Text style={styles.emptyText}></Text>
        </View>

        <View style={styles.cardCTA}>
          <View style={styles.ctaTextContainer}>
            <Text style={styles.cardText}>You carry the power to save</Text>
            <Text style={styles.cardText}>lives, Share it</Text>
            <TouchableOpacity onPress={() => router.push('./registration')}>
              <Text style={styles.registerLink}>Register Here →</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/images/blood1.gif')}
            style={styles.ctaIcon}
          />
        </View>

        <Text style={styles.subHeading}>Looking for blood donor? Search Here</Text>

        <View style={styles.locationfields}>
          <DropDownPicker
            open={stateOpen}
            value={selectedState}
            items={stateItems}
            setOpen={setStateOpen}
            setValue={setSelectedState}
            setItems={setStateItems}
            placeholder="Select State"
            style={styles.statedrop}
            textStyle={styles.dropdownText}
            listMode="MODAL"
            onOpen={() => {
              setDistrictOpen(false);
              setCityOpen(false);
              setBloodOpen(false);
            }}
          />

          <DropDownPicker
            open={districtOpen}
            value={selectedDistrict}
            items={districtItems}
            setOpen={setDistrictOpen}
            setValue={setSelectedDistrict}
            setItems={setDistrictItems}
            placeholder="Select District"
            style={styles.disdrop}
            textStyle={styles.dropdownText}
            disabled={!selectedState}
            listMode="MODAL"
            onOpen={() => {
              setStateOpen(false);
              setCityOpen(false);
              setBloodOpen(false);
            }}
          />
        </View>

        <DropDownPicker
          open={cityOpen}
          value={selectedCity}
          items={cityItems}
          setOpen={setCityOpen}
          setValue={setSelectedCity}
          setItems={setCityItems}
          placeholder="Select City"
          style={styles.citydrop}
          textStyle={styles.dropdownText}
          disabled={!selectedDistrict}
          listMode="MODAL"
          onOpen={() => {
            setStateOpen(false);
            setDistrictOpen(false);
            setBloodOpen(false);
          }}
        />

        <DropDownPicker
          open={bloodOpen}
          value={selectedBloodGroup}
          items={bloodItems}
          setOpen={setBloodOpen}
          setValue={setSelectedBloodGroup}
          setItems={setBloodItems}
          placeholder="Select Blood Group"
          style={styles.blooddrop}
          textStyle={styles.dropdownText}
          onOpen={() => {
            setStateOpen(false);
            setDistrictOpen(false);
            setCityOpen(false);
          }}
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>

        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/images/below.png')}
            style={styles.bottomImage}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  arrowIcon: { marginLeft: 10 },
  title: { fontSize: 20, color: 'black', marginLeft: 10 },
  emptyText: { flex: 1 },
  cardCTA: {
    flexDirection: 'row',
    backgroundColor: '#D5ECE9',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  locationfields: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  disdrop: {
    backgroundColor: '#007E711A',
    width: '50%',
    right: 170,
    borderRadius: 5,
    borderColor: 'white',
  },
  citydrop: { backgroundColor: '#007E711A', borderColor: 'white', bottom: 8 },
  blooddrop: { backgroundColor: '#007E711A', borderColor: 'white', top: 1, marginBottom: 15 },
  ctaTextContainer: { flex: 1 },
  cardText: { fontSize: 20, fontWeight: '500', color: '#000' },
  registerLink: { top: 5, color: '#007E71', fontSize: 18, marginTop: 5 },
  ctaIcon: { width: 90, height: 100, Top: 97.5 },
  subHeading: { fontSize: 18, marginBottom: 5, color: '#444444' },
  statedrop: {
    backgroundColor: '#007E711A',
    borderColor: 'white',
    right: 5,
    marginBottom: 15,
    width: '50%',
  },
  dropdownText: { color: '#000' },
  searchButton: {
    backgroundColor: '#00695C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: 202,
    height: 55,
    margin: 'auto',
    marginTop: 12,
  },
  searchText: { color: '#fff', fontWeight: '600', fontSize: 18 },
  illustrationContainer: { alignItems: 'center', borderRadius: 10, padding: 10 },
  bottomImage: { width: 345, height: 250 },
});

export default MyProfile;