import axios from 'axios';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Micro from '../assets/images/microphone';

export default function VoiceInput({ onTranscript, style }) {
const recordingRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');

const startRecording = async () => {
  try {
    const { granted } = await Audio.requestPermissionsAsync();
    if (!granted) {
      Alert.alert('Permission Required', 'Please grant microphone access.');
      return;
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );

    if (recording) {
      recordingRef.current = recording;
      setIsRecording(true);
      setIsLoading(true);
      console.log('Recording started');

      setTimeout(() => {
        console.log('Stopping recording after 3 seconds');
        stopRecording();
      }, 3000);
    }
  } catch (error) {
    console.error('Failed to start recording:', error);
  }
};

const stopRecording = async () => {
  try {
    const recording = recordingRef.current;
    if (!recording) {
      console.log('No recording to stop');
      return;
    }

    console.log('Stopping recording...');
    setIsRecording(false);
    setIsLoading(true);

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording URI:', uri);

    const base64Audio = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    recordingRef.current = null;
    await sendToGoogleCloud(base64Audio);
  } catch (error) {
    console.error('Error stopping recording:', error);
  } finally {
    setIsLoading(false);
  }
};


  const sendToGoogleCloud = async (audioBase64) => {
    try {
      const response = await axios.post(
        'https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyCCaz184aZz0RrY6Z13bjOB5l_p0SPLifc',
        {
          config: {
            encoding: 'AMR',
            sampleRateHertz: 8000,
            languageCode: 'en-US',
          },
          audio: {
            content: audioBase64,
          },
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const fullTranscript =
        response.data.results?.map((r) => r.alternatives[0].transcript).join(' ') || '';

      setTranscript(fullTranscript);
      onTranscript?.(fullTranscript);
    } catch (error) {
      console.error('Google Cloud API Error:', error.response?.data || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={isRecording ? null : startRecording} 
        style={[styles.microphoneContainer, style]}
      >
        <Micro width={100} height={100} style={styles.voice}/>
      </TouchableOpacity>

      <Modal transparent visible={isLoading} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#00a99d" />
            <Text style={styles.modalText}>
              {isRecording ? 'Listening...' : 'Processing...'}
              <Text>{transcript}</Text>
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voice:{
    marginRight:-40,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  microphoneContainer: {
    marginLeft: 'auto',
    padding: 5
  }
});

