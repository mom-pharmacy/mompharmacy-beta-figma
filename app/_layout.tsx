import GlobalStatusBar from "@/components/GlobalStatusBar";
import { AddressProvider } from "@/Context/addressContext";
import { AuthProvider } from "@/Context/authContext";
import { CartProvider } from "@/Context/cartContext";
import { LocationProvider } from "@/Context/locationContext";
import { Stack } from "expo-router";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PushNotificationProvider from '../components/pushNotificationProvider';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GlobalStatusBar barStyle="dark-content" backgroundColor="#42beb5" />
      <PushNotificationProvider>
      <LocationProvider>
        <PaperProvider>
          <AuthProvider>
            <AddressProvider>
              <CartProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="Login" />
                  <Stack.Screen name="Login/signup" />
                  <Stack.Screen name="BottomNavbar" options={{ headerShown: false }} />
                  <Stack.Screen name="BottomNavbar/home" />
                  <Stack.Screen name="BottomNavbar/categories" />
                  <Stack.Screen name="BottomNavbar/cart" />
                  <Stack.Screen name="BottomNavbar/profile" options={{ headerShown: false }} />
                </Stack>
              </CartProvider>
            </AddressProvider>
          </AuthProvider>
        </PaperProvider>
      </LocationProvider>
      </PushNotificationProvider>
    </SafeAreaProvider>
  );
}
