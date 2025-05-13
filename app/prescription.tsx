import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PrescriptionUploadScreen = () => {
  const handleCaptureCamera = () => {
    console.log('Capture with Camera pressed');

  };

  const handleSelectGallery = () => {
    console.log('Select from Gallery pressed');
  
  };

  const handleUploadPDF = () => {
    console.log('Upload PDF from File Manager pressed');

  };

  const handleChoosePrevious = () => {
    console.log('Choose From Previous Uploads pressed');
    
  };

  const handleUpload = () => {
    console.log('Upload button pressed');
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prescription</Text>
       <View style={styles.c_d}>
      <TouchableOpacity style={styles.optionButton} onPress={handleCaptureCamera}>
        <View style={styles.optionLeft}>
          <Icon name="camera-outline" size={24} color="#008080" />
          <Text style={styles.optionText}>Capture with Camera</Text>
        </View>
        <Icon name="chevron-forward-outline" size={24} color="#008080" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={handleSelectGallery}>
        <View style={styles.optionLeft}>
          <Icon name="images-outline" size={24} color="#008080" />
          <Text style={styles.optionText}>Select from Gallery</Text>
        </View>
        <Icon name="chevron-forward-outline" size={24} color="#008080" />
      </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.optionButton} onPress={handleUploadPDF}>
        <View style={styles.optionLeft}>
          <Icon name="folder-outline" size={24} color="#008080" />
          <Text style={styles.optionText}>Upload PDF from File Manager</Text>
        </View>
        <Icon name="chevron-forward-outline" size={24} color="#008080" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={handleChoosePrevious}>
        <View style={styles.optionLeft}>
          <Icon name="document-text-outline" size={24} color="#008080" />
          <Text style={styles.optionText}>Choose From Previous Uploads</Text>
        </View>
        <Icon name="chevron-forward-outline" size={24} color="#008080" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#007E710D',
    
  },
  c_d:{
    
      flexDirection:'row',
       gap:20,
       
    
  
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderWidth:1,
       borderRadius:15,
       borderColor:'#00a99d'
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    backgroundColor: '#008080',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PrescriptionUploadScreen;