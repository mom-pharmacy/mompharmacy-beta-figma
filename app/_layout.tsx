import { AuthProvider } from "@/Context/authContext";
import { CartProvider } from "@/Context/cartContext";
import { LocationProvider } from "@/Context/locationContext";
import { Stack } from "expo-router";
import React from 'react';
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return(
    <LocationProvider>
      <PaperProvider>
      <AuthProvider>
      <CartProvider>
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index"  />
    </Stack>
    </CartProvider>
    </AuthProvider>
    </PaperProvider>
    </LocationProvider>
    
  ) ;
}
