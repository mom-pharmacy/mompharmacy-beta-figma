import { COLOR } from '@/constants/color';
import { userAuth } from '@/Context/authContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditUserScreen = () => {
  const {userDetails} = userAuth()
  console.log(userDetails)
  const [user, setUser] = useState(userDetails);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  

  const handleUpdate = async () => {
    if (!user || !user._id) return;
   

    setUpdating(true);
    try {
      const res = await fetch(`https://mom-beta-server1.onrender.com/api/user/updat/${userDetails._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        Alert.alert('Success', 'User updated successfully');
      } else {
        Alert.alert('Error', data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update failed:', error);
      Alert.alert('Error', 'Something went wrong during update');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No user found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView >
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.statusContainer}>
      <Pressable style={styles.Container1} onPress={()=>router.back()}>
      <AntDesign name="left" size={24} color={COLOR.secondary} />
      <Text style={styles.Text}>Edit User Details</Text>
      </Pressable>
    </View>

      <View style={styles.avatarContainer}>
        <Image
          source={require('../../assets/images/profileimg.png')}
          style={styles.avatar}
        />
        <Text style={styles.changePhotoText}>Change Profile Picture</Text>
      </View>

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />

      <Text style={styles.label}>Mobile:</Text>
      <TextInput
        style={styles.input}
        value={user.mobileNo}
        onChangeText={(text) => setUser({ ...user, mobileNo: text })}
        keyboardType="phone-pad"
        editable={false}
      />
  
      <Text style={styles.label}>Gender:</Text>
      <TextInput
        style={styles.input}
        value={user.gender}
        onChangeText={(text) => setUser({ ...user, gender: text })}
      />

      <Text style={styles.label}>Date of Birth:</Text>
      <TextInput
        style={styles.input}
        value={user.dateOfBirth?.substring(0, 10)}
        onChangeText={(text) => setUser({ ...user, dateOfBirth: text })}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={user.primaryAddress}
        onChangeText={(text) => setUser({ ...user, primaryAddress: text })}
      />

     

      <Button
        title={updating ? 'Updating...' : 'Submit'}
        onPress={handleUpdate}
        disabled={updating}
        color="#008080"
      />
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  changePhotoText: {
    color: '#008080',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00A99D',
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
    color: '#333',
  },
  avatar: {
    width: 100,
    height: 89,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  input: {
    backgroundColor: '#e9f0eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#333',
    fontSize: 14,
    marginBottom: 6,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
     statusContainer:{
        padding:12 , 
        backgroundColor:"white" ,
        paddingLeft:20,
       
       
      }
      ,
      Container1:{
 flexDirection:'row',
 gap:30
      },
      Text:{
        fontWeight:700,
        fontSize:22,
        color:'#00a99d'

      }
});

export default EditUserScreen;