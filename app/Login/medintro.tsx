import UnifiedOnboardingScreen from '@/components/onBoardingScreen';
import { router } from 'expo-router';
import React from 'react';

export default function Screen1() {
  return (
    <UnifiedOnboardingScreen
      imageSource={require('@/assets/images/1image.png')}
      messageText="medicine in 10 minutes at your doorstep order now"
      activeIndex={0}
      onNext={() => router.push('./labintro')}
      theme={{
        backgroundColor: '#7DD0CA',
        textBoxColor: '#00A99D',
        buttonColor: '#FF9D24',
        circleBackground: 'rgba(255,255,255,0.25)',
      }}
    />
  );
}