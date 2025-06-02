import { COLOR } from '@/constants/color';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Magnify from '../../assets/images/magnifier';
import VoiceInput from '../VoiceInput';
export default function Search() {
  const handleSearchPress = () => {
    router.push('/Searching');
  };
  const [transcript, setTranscript] = useState('');

  const handleTranscript = (text) => {
    setTranscript(text);
    if (text?.trim()) {
      router.push({ pathname: '/Searching', params: { query: text } });
    }
  };

  return (
    <View style={styles.search}>
      <TouchableOpacity onPress={handleSearchPress} activeOpacity={0.8}>
        <View style={styles.searchContainer}>
           <Magnify width={25} height={25}/>
        <Text style={styles.fakeInput}>
          {transcript ? transcript : 'Search...'}
        </Text>
        <VoiceInput onTranscript={handleTranscript} />

        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: COLOR.light,
    padding: 15
  },
  searchContainer: {
    width: '100%',
    height: 56,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLOR.primary,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginTop: 10,

  },
  fakeInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: COLOR.textLight,
  },
});