import { COLOR } from '@/constants/color';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function StatusHeader() {
  return (
    <View style={styles.statusContainer}>
      <Pressable style={styles.Container} onPress={()=>router.back()}>
      <AntDesign name="left" size={24} color={COLOR.secondary} />
      <Text style={styles.Text}>Cart</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({ 
      statusContainer:{
        padding:12 , 
        backgroundColor:"white" ,
        paddingLeft:20,
       
       
      }
      ,
      Container:{
 flexDirection:'row',
 gap:30
      },
      Text:{
        fontWeight:700,
        fontSize:22,
        color:'#00a99d'

      }
})