import { COLOR } from '@/constants/color';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useLocationContext } from '../../Context/locationContext';

const { width, height } = Dimensions.get('window');
const TopNavbar = () => {
  const { shortAddress } = useLocationContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>medicine on minutes</Text>
     <TouchableHighlight onPress={()=>{router.push('/Maps/myAddress')}}>
      <View style={styles.addressContainer}>
        <MaterialIcons name="location-on" size={24} color={COLOR.primary} />
        <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
          {shortAddress || "Fetching location..."}
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={30} color={COLOR.primary} />
        <View style={{ flex: 1 }} />
        <MaterialIcons name="notifications" size={30} color={COLOR.primary} />
      </View>
      </TouchableHighlight>

    {/* <View style={styles.searchContainer}>
      <MaterialIcons name="search" size={24} color={COLOR.primary} />
      <TextInput
        style={styles.search}
        placeholder="Search..."
        placeholderTextColor={COLOR.textLight}
      />
      <MaterialIcons name="mic" size={30} color={COLOR.primary} />
    </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.22,
    width: width,
    backgroundColor: COLOR.background,
    paddingHorizontal: 20,
  },
  title: {
    color: COLOR.primary,
    fontSize: 24,
    fontWeight: 700,
    textAlign: 'center',

    paddingTop: 15,
    paddingBottom: 10,
  },
  addressContainer: {

    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  address: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 20,
    color: COLOR.text,
    paddingLeft: 5,
  },
  // searchContainer: {
  //   width: '100%',
  //   height: 56,
  //   borderRadius: 10,
  //   backgroundColor: '#fff',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderColor: COLOR.primary,
  //   borderWidth: 1,
  //   paddingHorizontal: 15,
  //   marginTop: 10,

  // },
  // search: {
  //   flex: 1,
  //   height: '100%',
  //   fontSize: 16,
  //   borderRadius: 10,
  //   paddingLeft: 10,
  //   color: COLOR.text,
  // },
  locationText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 3,
    flexShrink: 1,
  },
});

export default TopNavbar;