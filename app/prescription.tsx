import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const PrescriptionUploadScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [notes, setNotes] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleCaptureCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'Camera access is needed');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
      Alert.alert('Captured Image', result.assets[0].uri);
    }
  };

  const handleSelectGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
      Alert.alert('Selected from Gallery', result.assets[0].uri);
    }
  };

  const handleUploadPDF = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (result.type === 'success') {
      setSelectedFile(result);
      Alert.alert('PDF Selected', result.name);
    }
  };

  const handleChoosePrevious = () => {
    const previousFile = {
      name: 'previous_prescription.pdf',
      uri: 'https://example.com/previous_prescription.pdf',
    };
    setSelectedFile(previousFile);
    Alert.alert('Selected Previous Upload', previousFile.name);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      Alert.alert('No file selected', 'Please select or capture a file first.');
      return;
    }

    if (!name || !age) {
      Alert.alert('Missing Info', 'Please enter your name and age.');
      return;
    }

    setModalVisible(true);
  };

  const handleSendToWhatsApp = () => {
    const phoneNumber = '7780530888';
    const fileName = selectedFile?.name || selectedFile?.uri || 'No file';
    const message = `*Prescription Upload*\n\n👤 Name: ${name}\n🎂 Age: ${age}\n📝 Notes: ${notes || 'None'}\n📎 File: ${fileName}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    setModalVisible(false);
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open WhatsApp. Make sure it is installed.');
    });
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Upload Prescription</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.optionButtonHalf} onPress={handleCaptureCamera}>
            <View style={styles.optionLeft}>
              <Icon name="camera-outline" size={24} color="#008080" />
              <Text style={styles.optionText}>Camera</Text>
            </View>
            <Icon name="chevron-forward-outline" size={24} color="#008080" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButtonHalf} onPress={handleSelectGallery}>
            <View style={styles.optionLeft}>
              <Icon name="images-outline" size={24} color="#008080" />
              <Text style={styles.optionText}>Gallery</Text>
            </View>
            <Icon name="chevron-forward-outline" size={24} color="#008080" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.optionButtonFull} onPress={handleUploadPDF}>
          <View style={styles.optionLeft}>
            <Icon name="folder-outline" size={24} color="#008080" />
            <Text style={styles.optionText}>Upload PDF</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#008080" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButtonFull} onPress={handleChoosePrevious}>
          <View style={styles.optionLeft}>
            <Icon name="document-text-outline" size={24} color="#008080" />
            <Text style={styles.optionText}>Previous Uploads</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#008080" />
        </TouchableOpacity>

        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Enter your age"
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Additional notes (optional)"
          style={styles.input}
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Submission</Text>
              <Text>Send details to WhatsApp?</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSendToWhatsApp}>
                  <Text style={styles.modalOk}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#007E710D',
    flexGrow: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
    bottom: 10,
    ...Platform.select({
      ios:{
        bottom: 40
      }
    })
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    bottom: 10,
    ...Platform.select({
      ios:{
        bottom: 40
      }
    })
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionButtonHalf: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00a99d',
    width: '48%',
  },
  optionButtonFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00a99d',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00a99d',
    marginVertical: 8,
  },
  uploadButton: {
    backgroundColor: '#008080',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  modalCancel: {
    color: '#888',
    fontSize: 16,
  },
  modalOk: {
    color: '#008080',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PrescriptionUploadScreen;