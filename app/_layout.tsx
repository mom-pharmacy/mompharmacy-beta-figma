import GlobalStatusBar from "@/components/GlobalStatusBar";
import { AddressProvider } from "@/Context/addressContext";
import { AuthProvider } from "@/Context/authContext";
import { CartProvider } from "@/Context/cartContext";
import { LocationProvider } from "@/Context/locationContext";
import { Stack } from "expo-router";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GlobalStatusBar barStyle="dark-content" backgroundColor="#42beb5" />
      <LocationProvider>
        <PaperProvider>
          <AuthProvider>
            <AddressProvider>
              <CartProvider>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                </Stack>
              </CartProvider>
            </AddressProvider>
          </AuthProvider>
        </PaperProvider>
      </LocationProvider>
    </SafeAreaProvider>
  );
}
