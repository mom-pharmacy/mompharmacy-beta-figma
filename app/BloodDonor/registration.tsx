import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, LayoutAnimation, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View, } from 'react-native';
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);}
const BASE_URL = 'https://mom-beta-server1.onrender.com/api/donar';
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };
  return (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.faqQuestion}>{question}</Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.faqAnswer}>{answer}</Text>}</View>
  );};
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [Pincode, setPincode] = useState('');
  const [district, setDistrict] = useState('');
  const [availability, setAvailability] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const handleSubmit = async () => {
    if (!name || !mobileNumber || !email || !bloodGroup || !state || !district || !city || !Pincode) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;}
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobileNumber)) {
      Alert.alert('Invalid Mobile Number', 'Mobile number must be exactly 10 digits.');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Email must be a valid Gmail address ending with @gmail.com.');
      return;
    }
    const dataToSend = {name,bloodGroup,dob: dob.toISOString().split('T')[0],phone: mobileNumber,email,state,city,district,availability,};
    try {
      console.log('Sending data to server:', dataToSend);
      const response = await axios.post(`${BASE_URL}/register`, dataToSend);
      console.log('Response from server:', response);
      if (response.status === 201) {
        Alert.alert('Success', 'Registration successful!');
        navigation.goBack();
      } else { Alert.alert('Error', response.data.message || 'Registration failed.');}
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Server error or request failed.');
    }};
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{flex:1}}>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
         
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}><MaterialIcons name="arrow-back" size={24} color="#00A99D" /></TouchableOpacity>
            <Text style={styles.headerTitle}>Register as Donor</Text></View>
          <TextInput style={styles.input} placeholder="Enter Your Name" placeholderTextColor="#000" value={name} onChangeText={setName}/>
          <TextInput style={styles.input} placeholder="+91 Enter Mobile Number" placeholderTextColor="#000" keyboardType="phone-pad" value={mobileNumber} onChangeText={setMobileNumber}/>
          <TextInput style={styles.input} placeholder="Enter Email" placeholderTextColor="#000"value={email} onChangeText={setEmail}/>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dropdown}>
            <Text>Date of Birth {dob.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker value={dob} mode="date" display="default" onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDob(selectedDate);
              }}/>)}
          <TextInput style={styles.input} placeholder="Select State" placeholderTextColor="#000" value={state} onChangeText={setState}/>
          <TextInput style={styles.input} placeholder="Select District" placeholderTextColor="#000" value={district} onChangeText={setDistrict}/>
          <TextInput style={styles.input} placeholder="Select City" placeholderTextColor="#000" value={city} onChangeText={setCity}/>
          <TextInput style={styles.input} placeholder="Enter Pincode" placeholderTextColor="#000" keyboardType="phone-pad" value={Pincode}
            onChangeText={setPincode}/>
          <Text style={styles.label}>Select your blood group</Text>
          <View style={styles.bloodGroupContainer}>
            {bloodGroups.map((bg) => {
              const isSelected = bloodGroup === bg;
              return (
                <TouchableOpacity key={bg} style={[styles.bloodDropWrapper, isSelected && styles.bloodDropWrapperSelected]} onPress={() => setBloodGroup(bg)}>
                  <View style={styles.bloodIconWrapper}>
                    <FontAwesome5 name="tint" size={40} color="#B22222" />
                    <Text style={styles.bloodOverlayText}>{bg}</Text>
                  </View></TouchableOpacity>
              );})}</View>
          <Text style={styles.label}>I am available to donate my blood?</Text>
          <View style={styles.availabilityContainer}>
            <TouchableOpacity onPress={() => setAvailability(true)} style={styles.checkboxRow}>
              <Checkbox value={availability === true} color="#00A99D" />
              <Text style={styles.checkboxLabel}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAvailability(false)} style={styles.checkboxRow}>
              <Checkbox value={availability === false} color="#00A99D" />
              <Text style={styles.checkboxLabel}>No</Text>
            </TouchableOpacity></View>
          <View style={styles.checkboxRow}>
            <Checkbox value={authorized} onValueChange={setAuthorized} color="#00A99D" />
            <Text style={styles.checkboxLabel}>Agree for Terms & Condition</Text></View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Register</Text></TouchableOpacity>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <FAQItem
            question="Who can donate?"
            answer="Healthy individuals between 18-65 years and above 50kg, and with a hemoglobin level of at least 12.5 g/dL."/>
          <FAQItem question="When to donate?" answer="Once every 6 months if healthy." />
          <FAQItem
            question="Which food should eat after donating blood?"
            answer={`Iron-rich: Lean meat, poultry, fish (like tuna and salmon), beans, spinach, fortified cereals, raisins, and legumes.
Vitamin C-rich: Citrus fruits, berries, bell peppers, tomatoes.
Hydrating: Water, juice, broth, and herbal tea.
Whole grains: Brown rice, quinoa, oats, and whole wheat bread.
Protein: Eggs, cashews, almonds.`}/>
          <Text style={styles.sectionMain}>Help a heart beat and become the hero someone needs.</Text>
          <View style={styles.bottomLogosContainer}>
            <View style={styles.logoBlock}>
              <Image source={require('../../assets/images/mom.png')} style={styles.logoImage} resizeMode="contain" />
              <Text style={styles.logoText}>mom pharmacy</Text></View>
            <View style={styles.logoBlock}>
              <Image source={require('../../assets/images/momlab.png')} style={styles.logoImage} resizeMode="contain"/>
              <Text style={styles.logoText}>mom labs</Text>
            </View></View></ScrollView></Pressable></SafeAreaView></KeyboardAvoidingView>);};
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 18, color: 'black', fontWeight: 'bold', textAlign: 'left', left:10 },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12 },
  dropdown: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 15, color: "#ccc" },
  label: { fontSize: 16, fontWeight: '600', marginVertical: 10 },
  bloodGroupContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 15 },
  bloodDropWrapper: { margin: 8, borderRadius: 40, padding: 5 },
  bloodDropWrapperSelected: { borderWidth: 2, borderColor: '#00A99D' },
  bloodIconWrapper: {width: 60,height: 60,borderRadius: 30,backgroundColor: 'white',alignItems: 'center',justifyContent: 'center',position: 'relative'},
  bloodOverlayText: { position: 'absolute', color: 'white', fontSize: 10, textAlign: 'center', zIndex: 1 },
  availabilityContainer: { flexDirection: 'row', marginBottom: 15, justifyContent: 'flex-start' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
  checkboxLabel: { fontSize: 14, marginLeft: 5 },
  button: {backgroundColor: '#00A99D',padding: 15,borderRadius: 10,alignItems: 'center',marginTop: 10},
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  sectionMain: { fontSize: 18, marginTop: 20, paddingTop: 20 },
  faqItem: { marginBottom: 10 },
  faqQuestion: { fontSize: 16, color: '#333' },
  faqAnswer: { fontSize: 14, color: '#555', marginTop: 5 },
  bottomLogosContainer: {flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',marginTop: 20,marginBottom: 30},
  logoBlock: { alignItems: 'center', width: 150 },
  logoImage: { width: 120, height: 80, marginBottom: 5 },
  logoText: { fontSize: 14, color: '#333', textAlign: 'center' },
});
export default RegisterScreen;