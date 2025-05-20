import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


import prescriptionImage from '@/assets/images/prescriptionimg.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  const handleUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Permission to access media library is required!');
      return;
    }

 
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });


    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      const selectedAsset = pickerResult.assets[0];
      const newPrescription = {
        id: Date.now().toString(),
        name: `Prescription ${prescriptions.length + 1}`,
        uri: selectedAsset.uri,
      };
      setPrescriptions([...prescriptions, newPrescription]);
    }
  };

  const handleSelect = (uri) => {
    Alert.alert('Selected Prescription', uri);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => handleSelect(item.uri)}
      >
        <Text style={styles.buttonText}>Select</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
    <View style={styles.container}>
        <View style={styles.headerRow}>
            <MaterialIcons name="arrow-back" size={24} color="#00A99D" style={styles.arrowIcon} onPress={()=>router.back()} />
            <Text style={styles.title}> My Prescriptions</Text>
        </View>

        <FlatList
          data={prescriptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <>
              <Image source={prescriptionImage} style={styles.image} />
              <Text style={styles.emptyText}>
                No prescriptions yet.{"\n"}Upload now to get started
              </Text>
            </>
          }
          contentContainerStyle={prescriptions.length === 0 && styles.emptyContainer}
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: -5,
  },
  arrowIcon: {
    marginLeft: -10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A99D',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: '#00A99D',
    paddingVertical: 12,
   
    borderRadius: 20,
    height: 45,
    width: 350,
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
   screen: {
    flex: 1,
    backgroundColor: '#fff',

  },
});

export default Prescription;
