import React from 'react';
import { NotificationProvider } from '../Context/notifficationContext';

const PushNotificationProvider = ({ children }) => {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  );
};

export default PushNotificationProvider;
