import { COLOR } from '@/constants/color';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocationContext } from '../../Context/locationContext';

const { width, height } = Dimensions.get('window');
const TopNavbar = () => {
  const { shortAddress } = useLocationContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>medicine on minutes</Text>
      <View style={styles.addressContainer}>
     <TouchableOpacity onPress={()=>{router.push('/Maps/myAddress')}}>
      <View style={{flexDirection:'row'}}>
        <MaterialIcons name="location-on" size={24} color={COLOR.primary} />
        <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
          {shortAddress || "Fetching location..."}
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={30} color={COLOR.primary} />
        </View>
         </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={()=>{router.push('/Notification')}} >
        <MaterialIcons name="notifications" size={30} color={COLOR.primary} />
        </TouchableOpacity>
      </View>
     

  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.11,
    width: width,
    backgroundColor: COLOR.light,
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

  locationText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 3,
    flexShrink: 1,
  },
});

export default TopNavbar;