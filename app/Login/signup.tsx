import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, Checkbox } from 'react-native-paper';

import { userAuth } from '../../Context/authContext';
import WelcomeCard from './success';

const SignUpScreen = () => {
  const { postData, loginWithOtp } = userAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);

  const handleSignUp = async () => {
    if (!firstName.trim()) return Alert.alert('Validation Error', 'First name is required');
    if (!lastName.trim()) return Alert.alert('Validation Error', 'Last name is required');
    if (!dob.trim()) return Alert.alert('Validation Error', 'Date of birth is required');
    if (!email.trim()) return Alert.alert('Validation Error', 'Email is required');
    if (!validateEmail(email)) return Alert.alert('Validation Error', 'Enter a valid email address');
    if (!phone.trim()) return Alert.alert('Validation Error', 'Phone number is required');
    if (!validatePhone(phone)) return Alert.alert('Validation Error', 'Enter a valid 10-digit phone number');

    try {
      console.log('Starting signup process for phone:', phone);
      
      // First, send OTP
      const loginResult = await loginWithOtp(phone);
      console.log('Login/OTP result:', loginResult);
      
      if (!loginResult.success) {
        console.error('Failed to send OTP:', loginResult.message);
        return; // Alert is shown by loginWithOtp
      }

      // Store the registration details temporarily
      const registrationData = {
        firstName,
        lastName,
        dob,
        email,
        gender: 'not_specified'
      };
      console.log('Storing registration data:', registrationData);
      
      await AsyncStorage.setItem('pendingRegistration', JSON.stringify(registrationData));

      // Navigate to OTP screen with registration flag
      console.log('Navigating to OTP screen for registration');
      router.push({
        pathname: '/Login/otp',
        params: { 
          phone, 
          isRegistration: 'true',
          registrationData: JSON.stringify(registrationData) // Pass registration data in params
        }
      });
    } catch (error) {
      console.error("Error during sign-up:", error);
      Alert.alert(
        "Registration Error", 
        "Something went wrong during signup. Please try again."
      );
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      const formatted = selectedDate.toISOString().split('T')[0];
      setDob(formatted);
    }
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

  const closeModal = () => setModalVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.outerContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.headerRow}>
              <Text style={styles.header}>Sign Up</Text>
              <TouchableOpacity onPress={() => router.push('./medintro')}>
                <View style={styles.skipbox}>
                  <Text style={styles.skipText}>skip</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              placeholderTextColor="#888"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              placeholderTextColor="#888"
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Select your date of birth"
                placeholderTextColor="#888"
                value={dob}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dob ? new Date(dob) : new Date()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={onDateChange}
              />
            )}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />

            <Button 
              mode="contained" 
              style={styles.signUpButton} 
              onPress={handleSignUp}
              disabled={!isChecked}
            >
              <Text style={styles.signText}>Sign up</Text>
            </Button>

            <View style={styles.checkboxRow}>
              <View style={styles.checkboxBorder}>
                <Checkbox
                  status={isChecked ? 'checked' : 'unchecked'}
                  onPress={() => setIsChecked(!isChecked)}
                  color="#007E71"
                  uncheckedColor="#007E71"
                />
              </View>
              <Text style={styles.checkboxText}>
                By clicking, I accept the{' '}
                <TouchableOpacity onPress={() => router.push('./t_and_c')}>
                  <Text style={styles.link}>terms of services</Text>
                </TouchableOpacity>
                {' '}and{' '}
                <TouchableOpacity onPress={() => router.push('./privacy')}>
                  <Text style={styles.link}>privacy policy</Text>
                </TouchableOpacity>
              </Text>
            </View>

            <View style={styles.socialContainer}>
              <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
              <Image source={require('../../assets/images/fb.png')} style={styles.fbIcon} />
              <Image source={require('../../assets/images/x.png')} style={styles.twit} />
            </View>

            <TouchableOpacity onPress={() => router.push('./Login')}>
              <Text style={styles.loginLink}>Already have an account? Login</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1 }}>
          <BlurView
            intensity={90}
            tint="light"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}
          >
            <View style={{
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 30,
              alignItems: 'center',
              width: '90%',
              maxWidth: 350,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 5,
            }}>
              <WelcomeCard />
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#00A99D',
    top: 10,
    left: 10,
  },
  skipText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: '#000',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    fontSize: 20,
  },
  input: {
    width: 326,
    height: 52,
    backgroundColor: '#E8F1F0',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  signUpButton: {
    marginTop: 24,
    width: 189,
    height: 52,
    borderRadius: 25,
    backgroundColor: '#007E71',
    justifyContent: 'center',
  },
  signText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  terms: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: '600',
    color: '#555',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  loginLink: {
    textAlign: 'center',
    color: '#00A99D',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 15,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  fbIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  twit: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  skipbox: {
    backgroundColor: '#007E71',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 15,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  checkboxBorder: {
    borderWidth: 1,
    borderColor: '#007E71',
    borderRadius: 4,
  },
  checkboxText: {
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 8,
    fontSize: 14,
  },
  link: {
    color: '#00A99D',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;