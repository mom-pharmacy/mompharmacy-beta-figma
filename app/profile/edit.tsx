import { COLOR } from '@/constants/color';
import { userAuth } from '@/Context/authContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import ProfileCompletionCard from './Percentage';

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
              <TouchableOpacity key={opt} onPress={() => {
                setValue(opt);
                setVisible(false);
              }}>
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
  const { userDetails, getUserDetails } = userAuth();
  const [user, setUser] = useState(userDetails);
  const [updating, setUpdating] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const filledFields = [user?.name, user?.mobileNo, user?.gender, user?.dateOfBirth, user?.bloodgroup]
    .filter((f) => f && f.toString().trim() !== '').length;
  const profileCompletion = Math.round((filledFields / 5) * 100);

  const handleUpdate = async () => {
    if (!user || !user._id) return;
    setUpdating(true);
    try {
      const res = await fetch(`https://mom-beta-server1.onrender.com/api/user/user/update/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'User updated');
        const token = JSON.parse(await AsyncStorage.getItem('jwt_token'));
        await getUserDetails(token);
        router.push({ pathname: '/BottomNavbar/profile', params: { profileCompletion: profileCompletion.toString() } });
      } else Alert.alert('Error', data.message || 'Update failed');
    } catch (e) {
      Alert.alert('Error', 'Update error');
    } finally {
      setUpdating(false);
    }
  };

  const onDateChange = (_, selectedDate) => {
    if (selectedDate) setUser({ ...user, dateOfBirth: selectedDate.toISOString().split('T')[0] });
    if (Platform.OS === 'android') setShowDatePicker(false);
  };

  if (!user) return <View style={styles.center}><Text>No user found</Text></View>;

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.statusContainer}>
          <Pressable style={styles.Container1} onPress={() => router.back()}>
            <AntDesign name="left" size={24} color={COLOR.secondary} />
            <Text style={styles.header}>Edit User Details</Text>
          </Pressable>
        </View>

        {/* <ProfileCompletionCard percentage={profileCompletion} /> */}

        <View style={styles.avatarContainer}>
          <Image source={require('../../assets/images/profileimg.png')} style={styles.avatar} />
          <Text style={styles.changePhotoText}>Change Profile Picture</Text>
        </View>

        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
        />

        <Text style={styles.label}>Mobile:</Text>
        <TextInput style={styles.input} value={user.mobileNo} keyboardType="phone-pad" editable={false} />

        <Dropdown
          label="Gender"
          value={user.gender}
          setValue={(v) => setUser({ ...user, gender: v })}
          options={GENDER_OPTIONS}
        />

        <Text style={styles.label}>Date of Birth:</Text>
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

        <Dropdown
          label="Blood Group"
          value={user.bloodgroup}
          setValue={(v) => setUser({ ...user, bloodgroup: v })}
          options={BLOODGROUP_OPTIONS}
        />

        <Button title={updating ? 'Updating...' : 'Submit'} onPress={handleUpdate} disabled={updating} color="#008080" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, paddingBottom: 100, backgroundColor: '#fff', flexGrow: 1 },
  changePhotoText: { color: '#008080', marginTop: 8, fontSize: 14, fontWeight: '500' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { marginTop: 10, fontWeight: '600', color: '#333' },
  avatar: { width: 100, height: 89, borderRadius: 50, backgroundColor: '#ddd' },
  input: { backgroundColor: '#e9f0eb', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 6 },
  avatarContainer: { alignItems: 'center', marginBottom: 10, },
  statusContainer: { padding: 12, backgroundColor: 'white', paddingLeft: 20 },
  Container1: { flexDirection: 'row', gap: 30 },
  header: { fontWeight: '700', fontSize: 22, color: '#00a99d', paddingBottom:30},
  dropdownContainer: { marginTop: 10, marginBottom: 6 },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.15)' },
  dropdownBox: { marginHorizontal: 32, backgroundColor: '#fff', borderRadius: 8, paddingVertical: 8, elevation: 6 },
  optionText: { padding: 12, fontSize: 14, color: '#222' },
});

export default EditUserScreen;