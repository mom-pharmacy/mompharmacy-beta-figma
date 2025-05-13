import { CartProvider } from "@/Context/cartContext";
import { LocationProvider } from "@/Context/locationContext";
import { Stack } from "expo-router";
import React from 'react';

export default function RootLayout() {
  return(
    <LocationProvider>
      <CartProvider>
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="BottomNavbar"  />
    </Stack>
    </CartProvider>
    </LocationProvider>
    
  ) ;
}
