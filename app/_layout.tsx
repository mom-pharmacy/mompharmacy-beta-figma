import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../Context/authContext'; // adjust path if needed

export default function RootLayout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Stack screenOptions={{headerShown:false}} />
      </AuthProvider>
    </PaperProvider>
  );
}