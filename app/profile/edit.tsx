import InfoModal from '@/components/InfoModel';
import { COLOR } from '@/constants/color';
import { userAuth } from '@/Context/authContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const GENDER_OPTIONS = ['male', 'female', 'others'];
const BLOODGROUP_OPTIONS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const Dropdown = ({ label, value, setValue, options }) => {
  const [visible, setVisible] = useState(false);
  return (

    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: value ? '#000' : '#888' }}>
          {value || `Select ${label.toLowerCase()}`}
        </Text>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.dropdownBox}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => {
                  setValue(opt);
                  setVisible(false);
                }}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const EditUserScreen = () => {
  const { userDetails, getUserDetails, setUserDetails } = userAuth();
  const [user, setUser] = useState(userDetails);
  const [updating, setUpdating] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');

  // No-access modal visibility
  const [infoVisible, setInfoVisible] = useState(false);

  // Permission flags (false means no access)
  const canEditGender = false;
  const canEditBloodGroup = false;
  const canEditDOB = false;
  const canEditMobile = false;

  const filledFields = [user?.name, user?.mobileNo, user?.gender, user?.dateOfBirth, user?.bloodgroup, user?.email]
    .filter((f) => f && f.toString().trim() !== '').length;
  const profileCompletion = Math.round((filledFields / 6) * 100);

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!user?.name?.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user?.email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!re.test(user.email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const handleUpdate = async () => {
    if (!user || !user._id) {
      alert('User information is missing');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setUpdating(true);
    try {
      const tokenStr = await AsyncStorage.getItem('jwt_token');
      if (!tokenStr) {
        alert('Authentication token is missing. Please login again.');
        return;
      }

      const token = JSON.parse(tokenStr);

      const res = await fetch(`https://mom-beta-server1.onrender.com/api/user/user/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.name,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          bloodgroup: user.bloodgroup,
          mobileNo: user.mobileNo,
          email: user.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await getUserDetails(token);
        router.push({
          pathname: '/BottomNavbar/profile',
          params: { profileCompletion: profileCompletion.toString() },
        });
      } else {
        setInfoVisible(true);
      }
    } catch (e) {
      setInfoVisible(true);
    } finally {
      setUpdating(false);
    }
  };

  const onDateChange = (_, selectedDate) => {
    if (selectedDate && canEditDOB) {
      setUser({ ...user, dateOfBirth: selectedDate.toISOString().split('T')[0] });
    }
    if (Platform.OS === 'android') setShowDatePicker(false);
  };

  if (!user) return <View style={styles.center}><Text>No user found</Text></View>;

return (
  <SafeAreaView style={styles.mainContainer}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.statusContainer}>
        <Pressable style={styles.Container1} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={COLOR.secondary} />
          <Text style={styles.header}>Edit Profile</Text>
        </Pressable>
      </View>

      <View style={styles.avatarContainer}>
        <Image source={require('../../assets/images/profileimg.png')} style={styles.avatar} />
      </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={[styles.input, nameError ? styles.inputError : null]}
        value={user.name}
        onChangeText={(text) => {
          setUser({ ...user, name: text });
          if (nameError) setNameError('');
        }}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

      <Text style={styles.label}>Phone Number</Text>
      <TouchableOpacity onPress={() => setInfoVisible(true)}>
        <TextInput
          style={[styles.input, styles.noAccessBackground, { color: '#888' }]}
          value={user.mobileNo}
          keyboardType="phone-pad"
          editable={canEditMobile}
          onChangeText={(text) => setUser({ ...user, mobileNo: text })}
          maxLength={10}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        value={user.email}
        onChangeText={(text) => {
          setUser({ ...user, email: text });
          if (emailError) setEmailError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Gender</Text>
      {canEditGender ? (
        <Dropdown
          label="Gender"
          value={user.gender}
          setValue={(v) => setUser({ ...user, gender: v })}
          options={GENDER_OPTIONS}
        />
      ) : (
        <TouchableOpacity onPress={() => setInfoVisible(true)}>
          <View style={[styles.input, styles.noAccessBackground]}>
            <Text style={{ color: '#888', fontSize: 20, fontWeight: '400' }}>{user.gender || 'Not set'}</Text>
          </View>
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Date of Birth</Text>
      {canEditDOB ? (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={styles.input}
              value={user.dateOfBirth?.substring(0, 10)}
              editable={false}
              pointerEvents="none"
              placeholder="Select date"
              placeholderTextColor="#888"
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={user.dateOfBirth ? new Date(user.dateOfBirth) : new Date()}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={onDateChange}
            />
          )}
        </>
      ) : (
        <TouchableOpacity onPress={() => setInfoVisible(true)}>
          <TextInput
            style={[
              styles.input,
              styles.noAccessBackground,
              { color: '#888' }
            ]}
            value={user.dateOfBirth?.substring(0, 10)}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Blood Group</Text>
      {canEditBloodGroup ? (
        <Dropdown
          label="Blood Group"
          value={user.bloodgroup}
          setValue={(v) => setUser({ ...user, bloodgroup: v })}
          options={BLOODGROUP_OPTIONS}
        />
      ) : (
        <TouchableOpacity onPress={() => setInfoVisible(true)}>
          <View style={[styles.input, styles.noAccessBackground]}>
            <Text style={{ color: '#888', fontSize: 20, fontWeight: '400' }}>{user.bloodgroup || 'Not set'}</Text>
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity 
        style={[styles.submitButton, updating && styles.submitButtonDisabled]}
        onPress={handleUpdate}
        disabled={updating}
        activeOpacity={0.7}
      >
        <Text style={styles.submitButtonText}>
          {updating ? 'Updating...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </ScrollView>

    <InfoModal visible={infoVisible} onClose={() => setInfoVisible(false)} />
  </SafeAreaView>
);
}


const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 120, backgroundColor: '#fff', flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { marginTop: 10, fontWeight: '600', color: '#333', fontSize: 20},
  avatar: { width: 90, height: 90, borderRadius: 50, backgroundColor: '#d5ece9' },
  input: {
    backgroundColor: '#e8f1f0',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 6,
    color: '#000',
    borderWidth: 1,
    borderColor: '#e9f0eb',
    width: "100%",
    height: 52
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  submitButton: {
    backgroundColor: '#008080',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 2,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  noAccessBackground: {
    backgroundColor: '#f0f0f0',
  },
  avatarContainer: { alignItems: 'center' },
  statusContainer: { padding: 12, backgroundColor: 'white', paddingLeft: 20 },
  Container1: { flexDirection: 'row', gap: 30 },
  header: { fontWeight: '700', fontSize: 25, color: '#00a99d', paddingBottom: 20 },
  dropdownContainer: { marginTop: 10, marginBottom: 6 },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.15)' },
  dropdownBox: { marginHorizontal: 32, backgroundColor: '#fff', borderRadius: 8, paddingVertical: 8, elevation: 6 },
  optionText: { padding: 12, fontSize: 14, color: '#222' },
});

export default EditUserScreen;