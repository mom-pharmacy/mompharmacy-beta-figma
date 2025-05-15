import { AntDesign } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';


import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function AddressForm() {
  const { address } = useLocalSearchParams();

  const [contactName, setContactName] = useState("");
  const [contact, setContact] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [buildingBlockNumber, setBuildingBlockNumber] = useState("");


  const addressParts = (address as string)?.split(',') || [];

  const street = addressParts.slice(0, 2).join(',').trim();
  const city = addressParts[2]?.trim() || '';
  const region = addressParts[3]?.trim() || '';
  const country = addressParts[4]?.trim() || '';
  const pincode = parseInt(addressParts[5]?.trim() || '0');



  const pickContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const pickedContact = await Contacts.presentContactPickerAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (pickedContact) {
        setContactName(pickedContact.name || '');
        setContact(pickedContact.phoneNumbers?.[0]?.number || '');
      }
    } else {
      console.log('Permission denied');
    }
  };

  const handleLocation = async () => {
    try {


      const url = "https://mom-beta-server1.onrender.com/address/add-address";

      const bodyData = {
        userid: 1,
        state: "telff",
        city: "djf",
        street: "jrtinj",


      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      console.log(region)
      console.log("Response received");

      const result = await response.json();
      console.log(result);
      console.log(region)

      if (response.ok) {
        console.warn("Address Added Successfully!");
      } else {
        console.warn("Failed to add address:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error in posting address:", error);
    }
  };

  return (
    <>

      <View style={{ padding: 20, }}>


        {/* <TouchableOpacity style={styles.headerRow}  onPress={()=>router.push('/Maps/addAddress')}>
            <Ionicons name="chevron-back-outline" size={20} color="#00A99D"  />
            <Text style={styles.title}>Address</Text>

            </TouchableOpacity> */}




        <TextInput
          placeholder="House No."
          style={styles.input}
          value={houseNumber}
          onChangeText={setHouseNumber}
        />


        <TextInput
          placeholder="Building & Block No."
          style={styles.input}
          value={buildingBlockNumber}
          onChangeText={setBuildingBlockNumber}
        />


        <View style={{
          height: 50,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 15,
          marginBottom: 15,
          fontSize: 16,
          backgroundColor: '#fff',
          flexDirection: 'row',
        }}>
          <TextInput
            placeholder="Receiver Name"
            value={contactName}
            editable={false}
            style={{ flex: 1 }}
          />
          <TouchableHighlight onPress={pickContact} style={{ padding: 10 }}>
            <AntDesign name="contacts" size={24} color="black" />
          </TouchableHighlight>
        </View>

        {/* Receiver Contact */}
        <TextInput
          placeholder="Receiver Number"
          value={contact}
          style={styles.input}
          editable={false}
        />

        {/* Save Address Button */}
        <TouchableOpacity style={styles.button} onPress={handleLocation}>
          <Text style={styles.buttonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </>

  );
}

const styles = {
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  headerRow:
  {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00a99d',
    marginBottom: 3,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
};