import { userAuth } from '@/Context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { View } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import GetStarted from './Login/getstart';

export default async function Index() {
  const {userDetails , isLoggedIn , isRegistrationComplete ,  ExtractParseToken  , loading} = userAuth()
  const token = await AsyncStorage.getItem("user")
  console.log(userDetails)

  if(loading){
    return <View style={{flex:1 , justifyContent:"center" , alignItems:"center"}}>
      <ActivityIndicator size={"large"}/>
    </View>
  }

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
