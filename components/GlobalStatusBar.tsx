import React from 'react';
import { Platform, StatusBar } from 'react-native';
const GlobalStatusBar = ({ barStyle = 'dark-content', backgroundColor = '#FFFFFF' }) => {
  return (
    <StatusBar
      barStyle={barStyle}
      backgroundColor={backgroundColor}
      translucent={Platform.OS === 'android' ? false : true}
    />
  );
};
export default GlobalStatusBar;