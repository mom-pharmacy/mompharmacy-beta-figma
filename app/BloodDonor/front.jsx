import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

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

  const [stateOpen, setStateOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [stateItems, setStateItems] = useState(
    Object.keys(locationData).map((key) => ({ label: key, value: key }))
  );

  const [districtOpen, setDistrictOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtItems, setDistrictItems] = useState([]);

  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [cityItems, setCityItems] = useState([]);

  const handleSearch = () => {
    const filters = {
      bloodGroup: selectedBloodGroup,
      state: selectedState,
      district: selectedDistrict,
      city: selectedCity,
    };
    router.push({
      pathname: './donardetails',
      params: filters,
    });
  };

  useEffect(() => {
    if (selectedState) {
      const districts = Object.keys(locationData[selectedState]).map((d) => ({
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
    if (selectedState && selectedDistrict) {
      const cities = locationData[selectedState][selectedDistrict].map((c) => ({
        label: c,
        value: c,
      }));
      setCityItems(cities);
      setSelectedCity('');
    }
  }, [selectedDistrict]);

  const renderBloodGroup = ({ item }) => {
    const isSelected = selectedBloodGroup === item;
    return (
      <TouchableOpacity
        style={[styles.bloodGroupButton, isSelected && styles.selectedBloodGroup]}
        onPress={() => setSelectedBloodGroup(item)}
      >
        <FontAwesome5 name="tint" size={40} color="#B22222" style={styles.bloodIcon} />
        <Text style={styles.bloodOverlayText}>{item}</Text>
      </TouchableOpacity>
    );
  };

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
            <Text style={styles.cardText}>You carry the power to save lives. Share it</Text>
            <TouchableOpacity onPress={() => router.push('./registration')}>
              <Text style={styles.registerLink}>Register Here →</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/images/blood.gif')}
            style={styles.ctaIcon}
          />
        </View>

        <Text style={styles.subHeading}>Looking for blood donor? Search Here</Text>
        <Text style={styles.label}>Select your blood group</Text>

        <FlatList
          data={bloodGroups}
          renderItem={renderBloodGroup}
          keyExtractor={(item) => item}
          numColumns={4}
          columnWrapperStyle={styles.bloodGroupRow}
          scrollEnabled={false}
        />

        {/* State Dropdown */}
        <DropDownPicker
          open={stateOpen}
          value={selectedState}
          items={stateItems}
          setOpen={setStateOpen}
          setValue={setSelectedState}
          setItems={setStateItems}
          placeholder="Select State"
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          zIndex={3000}
          zIndexInverse={1000}
        />

        {/* District Dropdown */}
        <DropDownPicker
          open={districtOpen}
          value={selectedDistrict}
          items={districtItems}
          setOpen={setDistrictOpen}
          setValue={setSelectedDistrict}
          setItems={setDistrictItems}
          placeholder="Select District"
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          disabled={!selectedState}
          zIndex={2000}
          zIndexInverse={2000}
        />

        {/* City Dropdown */}
        <DropDownPicker
          open={cityOpen}
          value={selectedCity}
          items={cityItems}
          setOpen={setCityOpen}
          setValue={setSelectedCity}
          setItems={setCityItems}
          placeholder="Select City"
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          disabled={!selectedDistrict}
          zIndex={1000}
          zIndexInverse={3000}
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
  ctaTextContainer: { flex: 1 },
  cardText: { fontSize: 16, fontWeight: '500', color: '#000' },
  registerLink: { color: '#007E71', fontSize: 16, marginTop: 5 },
  ctaIcon: { width: 50, height: 50 },
  subHeading: { fontSize: 18, marginBottom: 15, color: '#000' },
  label: { fontSize: 16, fontWeight: '600', marginVertical: 10, color: '#000' },
  bloodGroupRow: { justifyContent: 'space-between', marginBottom: 10 },
  bloodGroupButton: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    position: 'relative',
  },
  selectedBloodGroup: {
    borderWidth: 2,
    borderColor: '#00a99d',
    borderRadius: 40,
  },
  bloodIcon: { position: 'absolute' },
  bloodOverlayText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    zIndex: 1,
  },
  dropdown: {
    backgroundColor: '#007E711A',
    borderColor: '#ccc',
    marginBottom: 15,
    zIndex: 1000,
  },
  dropdownText: {
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#00695C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  illustrationContainer: { alignItems: 'center', borderRadius: 10, padding: 20 },
  bottomImage: { width: 200, height: 150 },
});

export default MyProfile;