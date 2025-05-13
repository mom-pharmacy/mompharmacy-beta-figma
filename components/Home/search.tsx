import { COLOR } from '@/constants/color';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function search() {
  return (
    <View>
        <TouchableOpacity  >
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color={COLOR.primary} />
        <TextInput
          style={styles.search}
          placeholder="Search..."
          placeholderTextColor={COLOR.textLight}
        />
        <MaterialIcons name="mic" size={30} color={COLOR.primary} />
      </View>
      </TouchableOpacity>
    </View>
  )
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
  search: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 10,
    color: COLOR.text,
  },
})