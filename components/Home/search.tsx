import { COLOR } from '@/constants/color';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Search() {
  const handleSearchPress = () => {
    router.push('/Searching');
  };

  return (
    <TouchableOpacity onPress={handleSearchPress} activeOpacity={0.8}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color={COLOR.primary} />
        <Text style={styles.fakeInput}>Search...</Text>
        <MaterialIcons name="mic" size={30} color={COLOR.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
