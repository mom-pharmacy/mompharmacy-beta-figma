import UnifiedOnboardingScreen from '@/components/onBoardingScreen'; // Adjust path as needed
import { router } from 'expo-router';
import React from 'react';


export default function Screen3() {
  return (
    <UnifiedOnboardingScreen
      imageSource={require('@/assets/images/3image.png')}
      messageText="find your blood donor on minutes and save your life "
      activeIndex={2}
      onNext={() => router.replace('/BottomNavbar/home')}
      onBack={() => router.push('/Login/labintro')}
      showBack
      theme={{
        backgroundColor: '#E5322E',
        textBoxColor: '#BE100C',
        buttonColor: '#FFFFFF',
        circleBackground: 'rgba(255,255,255,0.25)',
      }}
    />
  );
}