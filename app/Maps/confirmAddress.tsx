import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { Pressable, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { COLOR } from '@/constants/color';
import { useAddress } from '@/Context/addressContext';
import { userAuth } from '@/Context/authContext';
import { useLocationContext } from '@/Context/locationContext';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddressForm() {
  const { address } = useLocalSearchParams();
  const {location}=useLocationContext()
  console.log("googleLoc", location)
  const addressDetails = address.split(",")
  console.log("this is Address", addressDetails)

  const [contactName, setContactName] = useState("");
  const [contact, setContact] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [buildingBlockNumber, setBuildingBlockNumber] = useState("");

  const { addAddress } = useAddress()
  const { userDetails } = userAuth()


  const addressParts = (address as string)?.split(',') || [];

  const street = addressParts.slice(0, 2).join(',').trim();
  const city = addressParts[2]?.trim() || '';
  const region = addressParts[3]?.trim() || '';
  const country = addressParts[4]?.trim() || '';
  const pincode = parseInt(addressParts[5]?.trim() || '0');



  const pickContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const pickedContact = await Contacts.presentContactPickerAsync();

      if (pickedContact) {
        setContactName(pickedContact.name || '');
        setContact(pickedContact.phoneNumbers?.[0]?.number || '');
      }
    } else {
      console.log('Permission denied');
    }
  };

  const handleLocation = async () => {
    const data = {
      userid: userDetails._id,
      state: addressDetails[3],
      city: addressDetails[2],
      country: addressDetails[4],
      street: `${contactName},${houseNumber}, ${buildingBlockNumber}`,
      pincode: addressDetails[5],
      currentLocation: {
        lattitude:location?.latitude,
        logitude:location?.longitude
      }
    }


    const isAdded = await addAddress(data)
    if (isAdded) {
      router.back(); // Go back once
      setTimeout(() => {
        router.back(); // Go back again after a short delay
      }, 100);
    }
  }





  return (
    <>
      <SafeAreaView style={styles.screen}>

        <View style={styles.statusContainer}>
          <Pressable style={styles.Container} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={COLOR.secondary} />
            <Text style={styles.Text}>Confirm Address</Text>
          </Pressable>
        </View>
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
      </SafeAreaView >
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
  screen: {
    flex: 1,
    backgroundColor: '#fff',

  },
  statusContainer: {
    padding: 12,
    backgroundColor: "white",
    paddingLeft: 20,

  }
  ,
  Container: {
    flexDirection: 'row',
    gap: 30
  },
  Text: {
    fontWeight: 700,
    fontSize: 22,
    color: '#00a99d'

  }
};
