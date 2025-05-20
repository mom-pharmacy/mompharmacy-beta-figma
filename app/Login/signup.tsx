import { userAuth } from '@/Context/authContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
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
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import WelcomeCard from './success';

const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Non-binary',
  'Prefer not to answer',
];

// --- Type for GenderDropdown props ---
type GenderDropdownProps = {
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
};

function GenderDropdown({ selectedGender, setSelectedGender }: GenderDropdownProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedGender(option);
    setDropdownVisible(false);
  };

  return (
    <View style={genderStyles.container}>
      <Text style={genderStyles.heading}>Gender</Text>
      <TouchableOpacity
        style={genderStyles.dropdownField}
        onPress={() => setDropdownVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[
          genderStyles.selectedText,
          !selectedGender && { color: '#888' }
        ]}>
          {selectedGender || 'Select your gender'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={genderStyles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setDropdownVisible(false)}
        >
          <View style={genderStyles.dropdownBox}>
            {GENDER_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={genderStyles.option}
                onPress={() => handleSelect(option)}
              >
                <Text style={genderStyles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const SignUpScreen = () => {
  const { ExtractParseToken, getUserDetails } = userAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState('');

  async function signupUser() {
    const AuthToken = await ExtractParseToken();

    try {
      const options = {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${AuthToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          dateOfBirth: dob,
          gender,
        })
      }
      const response = await fetch("https://mom-beta-server1.onrender.com/api/user/register", options)
      if (response.ok) {
        await getUserDetails(AuthToken)
        router.replace("/Login/success")
      } else {
        router.replace("/BottomNavbar/home")
      }
    } catch (e) {
      console.log("Error in signing up", e)
    }
  }

  const handleSignUp = async () => {
    if (!firstName.trim()) return Alert.alert('Validation Error', 'First name is required');
    if (!lastName.trim()) return Alert.alert('Validation Error', 'Last name is required');
    if (!dob.trim()) return Alert.alert('Validation Error', 'Date of birth is required');
    if (!gender) return Alert.alert('Validation Error', 'Gender is required');
    if (isChecked) {
      signupUser()
    } else {
      Alert.alert("Please accept the terms and conditions")
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

            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => router.push('/Login/medintro')}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <View style={styles.headerRow}>
              <Text style={styles.header}>Sign Up</Text>
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

            <GenderDropdown selectedGender={gender} setSelectedGender={setGender} />

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
                <Text style={styles.link} onPress={() => router.push('./t_and_c')}>
                  terms of services
                </Text>
                {' '}and{' '}
                <Text style={styles.link} onPress={() => router.push('./privacy')}>
                  privacy policy
                </Text>
              </Text>
            </View>
            <View>
              <Text style={styles.logintext}>Already have an account? {''}
                <Text style={styles.loginbutton} onPress={() => router.replace('/Login/Login')}>Login Now!</Text>
              </Text>
            </View>


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
  skipButton: {
    position: 'absolute',
    top: Platform.select({
      ios: hp('7%'),
      android: hp('3%')
    }),
    right: wp('5%'),
    zIndex: 1,
  },
  skipText: {
    fontSize: hp('2%'),
    color: '#007E71',
    fontWeight: '600',
  },
  logintext: {
    fontSize: hp('2.3%'),
    color: 'black',
    ...Platform.select({
      ios: {
        top: 15
      },
      android: {
        top: 10
      }
    })
  },
  loginbutton: {
    color: '#007E71',
    textDecorationLine: 'underline'
  }
});

const genderStyles = StyleSheet.create({
  container: {
    width: 326,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
    paddingLeft: 2,
  },
  dropdownField: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 25,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    paddingHorizontal: 16,
    backgroundColor: '#E8F1F0', // Matches input field
    justifyContent: 'center',
    height: 52, // Matches input field
  },
  selectedText: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  dropdownBox: {
    marginHorizontal: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#222',
  },
});

export default SignUpScreen;

function setModalVisible(arg0: boolean) {
  throw new Error('Function not implemented.');
}
function setShowDatePicker(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function setDob(formatted: string) {
  throw new Error('Function not implemented.');
}

function signupUser() {
  throw new Error('Function not implemented.');
}

function getUserDetails(AuthToken: any) {
  throw new Error('Function not implemented.');
}