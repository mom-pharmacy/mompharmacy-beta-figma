import { Stack } from 'expo-router';
import React from 'react';
//to make code runnable
export default function BloodDonorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card'
      }}
    >
      <Stack.Screen 
        name="front"
        options={{
          title: 'Blood Donor'
        }}
      />
      <Stack.Screen 
        name="donardetails"
        options={{
          title: 'Available Donors'
        }}
      />
      <Stack.Screen 
        name="registration"
        options={{
          title: 'Register as Donor'
        }}
      />
    </Stack>
  );
} 