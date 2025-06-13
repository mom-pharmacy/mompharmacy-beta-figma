import UnifiedOnboardingScreen from '@/components/onBoardingScreen';
import { router } from 'expo-router';
import React from 'react';

export default function Screen2() {
  return (
     <UnifiedOnboardingScreen
      imageSource={require('@/assets/images/2image.png')}
      messageText="get lab tests done from the comfort of your home"
      activeIndex={1}
      onNext={() => router.push('./donarintro')}
      onBack={() => router.push('./medintro')}
      showBack
      theme={{
        backgroundColor: '#FF9D24',
        textBoxColor: '#DA7C08',
        buttonColor: '#E5322E',
        circleBackground: 'rgba(255,255,255,0.25)',
      }}
    />
    
  );
}