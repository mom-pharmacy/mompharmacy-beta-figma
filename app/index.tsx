import { userAuth } from '@/Context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { View } from "react-native";
import GetStarted from './Login/getstart';

export default async function Index() {
  const {userDetails , isLoggedIn , isRegistrationComplete  } = userAuth() 
  const token = await AsyncStorage.getItem("user")


  if(isLoggedIn && token){
    router.replace("/BottomNavbar/home")
  }else{
    router.replace("/Login/Login")
  }
  return (
    <View style={{flex:1}}>
      <GetStarted/>
    </View>
  );
}
