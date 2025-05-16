import { userAuth } from '@/Context/authContext';
import { router } from 'expo-router';
import React from 'react';
import { View } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import GetStarted from './Login/getstart';

export default async function Index() {
  const {userDetails , isLoggedIn , isRegistrationComplete ,  ExtractParseToken  , loading} = userAuth()
  const token = await ExtractParseToken
  console.log(userDetails)

  if(loading){
    return <View style={{flex:1, justifyContent:"center" , alignItems:"center"}}>
      <ActivityIndicator size={"large"}/>
    </View>
  }
  console.log("this from index" , isLoggedIn , token)

  if(isLoggedIn && token ){
    console.log(userDetails.isRegistered)
    if(!userDetails.isRegistered) router.replace("/Login/signup")
    else router.replace("/BottomNavbar/home")
  }else{
    router.replace("/Login/Login")
  }
  return (
    
    <View style={{flex:1}}>
      <GetStarted/>
    </View>
  );
}
