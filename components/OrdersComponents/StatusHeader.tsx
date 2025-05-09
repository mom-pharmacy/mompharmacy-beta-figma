import { COLOR } from '@/constants/color';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export default function StatusHeader() {
  return (
    <View style={styles.statusContainer}>
      <Pressable onPress={()=>router.back()}>
      <AntDesign name="left" size={24} color={COLOR.secondary} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({ 
      statusContainer:{
        padding:12 , 
        backgroundColor:"white" ,
        paddingLeft:20
      }
})