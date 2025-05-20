import axios from 'axios';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function VoiceSearch() {
  const [recording, setRecording] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert('Please grant microphone permissions');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording URI:', uri);

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setIsRecording(false);
      await sendToGoogleCloud(base64);
    } catch (err) {
      console.error('Error stopping recording', err);
    }
  };

  const sendToGoogleCloud = async (audioBase64) => {
    try {
      const response = await axios.post(
        'https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyCCaz184aZz0RrY6Z13bjOB5l_p0SPLifc',
        {
          config: {
            encoding: 'MP3', // works best with .m4a in Expo
            sampleRateHertz: 44100,
            languageCode: 'en-US',
          },
          audio: {
            content: audioBase64,
          },
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const transcript = response.data.results
        ?.map((r) => r.alternatives[0].transcript)
        .join(' ') || '';
      setTranscript(transcript);
    } catch (error) {
      console.error('Google API Error:', error.response?.data || error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Text style={{ marginTop: 20, fontSize: 16 }}>Transcript: {transcript}</Text>
    </View>
  );
}
