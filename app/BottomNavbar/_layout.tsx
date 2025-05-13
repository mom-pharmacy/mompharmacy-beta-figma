import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';
import React from 'react';

export default function bottomNavbar() {
  return (
    
      <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor: '#00a99d',
        tabBarInactiveTintColor: 'gray',}}>
        <Tabs.Screen name="home" options = {{tabBarLabel:"Home", tabBarIcon:({color})=><FontAwesome name="home" size={24} color="#888888" />}} />
        <Tabs.Screen name="categories" options = {{tabBarLabel:"Categories", tabBarIcon:({color}) =><Entypo name="menu" size={24} color="#888888" />}} />
        <Tabs.Screen name="cart" options={{tabBarLabel:"Cart", tabBarIcon:({color}) =><FontAwesome name="cart-plus" size={24} color="#888888"/>}} />
        <Tabs.Screen name="account" options={{tabBarLabel:"Account", tabBarIcon:({color}) =><FontAwesome6 name="user-large" size={24} color="#888888" />}} />
      </Tabs>

   
  )
}