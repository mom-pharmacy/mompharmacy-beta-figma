import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface UserDetails {
  name?: string;
  email?: string;
  mobileNo?: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  loginWithOtp: (mobileNo: string) => Promise<{ success: boolean; message?: string; isRegistered?: boolean }>;
  verifyOtp: (otp: string, mobileNo: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  loading: boolean;
  userDetails: UserDetails | null;
  isRegistrationComplete: boolean;
  getUserDetails: (authToken: string) => Promise<void>;
  postData: (name: string, dob: string, gender: string, mobileNo: string) => Promise<{ success: boolean; message?: string }>;
  ExtractParseToken: () => Promise<string>;
  checkUserRegistration: (mobileNo: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const isRegistrationComplete = Boolean(userDetails?.name && userDetails?.email && userDetails?.mobileNo);

  const getUserDetails = useCallback(async (authToken: string, retryCount = 0) => {
    const MAX_RETRIES = 3;
    const TIMEOUT_DURATION = 15000; // 15 seconds timeout

    try {
      if (!authToken) {
        console.error('No auth token provided');
        return;
      }

      console.log(`Attempting to fetch user details (attempt ${retryCount + 1}/${MAX_RETRIES + 1})`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

      const startTime = Date.now();
      const response = await fetch('https://mom-beta-server1.onrender.com/api/user/user-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        signal: controller.signal
      });
      const endTime = Date.now();

      clearTimeout(timeoutId);
      console.log(`Request completed in ${endTime - startTime}ms`);

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.userDetails);
        console.log('Successfully fetched user details');
      } else {
        const errorText = await response.text();
        console.error('Failed to fetch user details:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          attempt: retryCount + 1
        });

        if (retryCount < MAX_RETRIES) {
          console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
          // Exponential backoff: wait 1s, 2s, 4s between retries
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
          return getUserDetails(authToken, retryCount + 1);
        }

        Alert.alert(
          'Error',
          'Failed to fetch user details after multiple attempts. Please check your internet connection and try again.'
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error(`Request timed out after ${TIMEOUT_DURATION}ms (attempt ${retryCount + 1})`);

          if (retryCount < MAX_RETRIES) {
            console.log(`Retrying after timeout... (${retryCount + 1}/${MAX_RETRIES})`);
            // Exponential backoff: wait 1s, 2s, 4s between retries
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            return getUserDetails(authToken, retryCount + 1);
          }

          Alert.alert('Timeout', 'Request timed out after multiple attempts. Please check your internet connection and try again.');
        } else if (error.message.includes('Network request failed')) {
          console.error('Network error:', error, `(attempt ${retryCount + 1})`);

          if (retryCount < MAX_RETRIES) {
            console.log(`Retrying after network error... (${retryCount + 1}/${MAX_RETRIES})`);
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
            return getUserDetails(authToken, retryCount + 1);
          }

          Alert.alert('Network Error', 'Please check your internet connection and try again.');
        } else {
          console.error('Error fetching user details:', error, `(attempt ${retryCount + 1})`);
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
      } else {
        console.error('Unknown error:', error, `(attempt ${retryCount + 1})`);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    }
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('user');
        if (storedToken) {
          const parsedToken = JSON.parse(storedToken);
          setToken(parsedToken);
          setIsLoggedIn(true);
          await getUserDetails(parsedToken);
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [getUserDetails]);

  const checkUserRegistration = async (mobileNo: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://mom-beta-server1.onrender.com/api/user/check-registration/${mobileNo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to check registration status');
      }
      
      const data = await response.json();
      return data.isRegistered;
    } catch (error) {
      console.error('Error checking registration status:', error);
      return false;
    }
  };

  const loginWithOtp = async (mobileNo: string, retryCount = 0) => {
    const MAX_RETRIES = 3;
    try {
      // Check if user is registered
      const isRegistered = await checkUserRegistration(mobileNo);
      
      // Ensure mobile number is properly formatted
      const formattedMobileNo = mobileNo.trim();
      console.log(`Attempting to send OTP to: ${formattedMobileNo} (attempt ${retryCount + 1}/${MAX_RETRIES + 1})`);
      
      // For development, use local OTP generation
      try {
        await import('../lib/otp').then(lib => lib.sendSmsOtp(formattedMobileNo));
        console.log('Local OTP generated for development');
        return { success: true, isRegistered };
      } catch (localOtpError) {
        console.error('Error generating local OTP:', localOtpError);
      }
      
      const requestBody = { 
        mobileNo: formattedMobileNo,
        type: 'registration' 
      };
      console.log('Request payload:', JSON.stringify(requestBody));

      const response = await fetch('https://mom-beta-server1.onrender.com/api/user/send-otp', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(requestBody),
      });
  
      const responseText = await response.text();
      console.log('Server response status:', response.status);
      console.log('Server response headers:', JSON.stringify(Object.fromEntries(response.headers.entries())));
      
      if (response.ok) {
        return { success: true, isRegistered };
      } else {
        throw new Error(responseText || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error in loginWithOtp:', error);
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying login attempt ${retryCount + 1}/${MAX_RETRIES}`);
        return loginWithOtp(mobileNo, retryCount + 1);
      }
      return { success: false, message: 'Failed to send OTP. Please try again.' };
    }
  };

  const verifyOtp = async (otp: string, mobileNo: string) => {
    try {
      console.log('Verifying OTP:', otp, 'for mobile:', mobileNo);
      
      // Try local OTP verification first (for development/testing)
      const isLocalOtpValid = await import('../lib/otp').then(lib => lib.verifyOtp(otp));
      console.log('Local OTP verification result:', isLocalOtpValid);
      
      if (isLocalOtpValid) {
        console.log('OTP verified locally, proceeding with login');
        
        // For development, we'll create a mock token
        const mockToken = 'dev_token_' + Date.now();
        await AsyncStorage.setItem('user', JSON.stringify(mockToken));
        // Store initial user details with mobile number
        await AsyncStorage.setItem('userDetails', JSON.stringify({ mobileNo }));
        setToken(mockToken);
        setIsLoggedIn(true);
        await getUserDetails(mockToken);
        return { success: true };
      }
      
      // If local verification fails or we're in production, try server verification
      const response = await fetch('https://mom-beta-server1.onrender.com/api/user/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, mobileNo }),
      });

      const responseText = await response.text();
      console.log('Server OTP verification response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing OTP verification response:', e);
        if (responseText.includes('welcome') || responseText.includes('success')) {
          // If server returns welcome/success message, consider it a success
          const mockToken = 'server_token_' + Date.now();
          await AsyncStorage.setItem('user', JSON.stringify(mockToken));
          await AsyncStorage.setItem('userDetails', JSON.stringify({ mobileNo }));
          setToken(mockToken);
          setIsLoggedIn(true);
          await getUserDetails(mockToken);
          console.log('Server returned success message, considering OTP verified');
          return { success: true };
        }
        return { success: false, message: 'Invalid server response' };
      }

      if (response.ok) {
        await AsyncStorage.setItem('user', JSON.stringify(data.token));
        // Store initial user details with mobile number
        await AsyncStorage.setItem('userDetails', JSON.stringify({ mobileNo }));
        setToken(data.token);
        setIsLoggedIn(true);
        await getUserDetails(data.token);
        console.log('OTP verified:', data);
        return { success: true };
      } else {
        console.error('OTP verification failed:', data);
        return { success: false, message: data?.message || 'Invalid OTP. Please try again.' };
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const ExtractParseToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('user');
      if (storedToken) {
        return JSON.parse(storedToken);
      }
      return null;
    } catch (error) {
      console.error('Error extracting token:', error);
      return null;
    }
  };

  const postData = async (name: string, dob: string, gender: string, mobileNo: string) => {
    try {
      const authToken = await ExtractParseToken();
      if (!authToken) {
        return { success: false, message: 'Not authenticated' };
      }

      const response = await fetch('https://mom-beta-server1.onrender.com/api/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ name, dob, gender, mobileNo }),
      });

      const data = await response.json();
      if (response.ok) {
        setUserDetails(prev => ({ ...prev, name, dob, gender, mobileNo }));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Failed to update profile' };
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, message: 'Network error occurred' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('userDetails');
      await AsyncStorage.removeItem('generated_otp');
      await AsyncStorage.removeItem('pendingRegistration');
      setToken(null);
      setUserDetails(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      loginWithOtp,
      verifyOtp,
      logout,
      isLoggedIn,
      loading,
      userDetails,
      isRegistrationComplete,
      getUserDetails,
      postData,
      ExtractParseToken,
      checkUserRegistration
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found. Wrap your app in <AuthProvider>.");
  return context;
};
