import LoadingScreen from "@/components/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const isRegistrationComplete = userDetails?.name && userDetails?.email && userDetails?.mobileNo;

  const getUserDetails = useCallback(async (authToken) => {
    console.log(authToken)
    try {
      if (!authToken) throw new Error("Token not found! you are not loggedin");
      const response = await fetch('https://mom-beta-server1.onrender.com/api/user/user-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.userDetails); // ✅ Update local userDetails
      } else {
        console.error('Failed to fetch user details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('jwt_token');
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

  const loginWithOtp = async (mobileNo) => {
    
    try {
      const response = await fetch('https://mom-beta-server1.onrender.com/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNo }),
      });

      if (response.ok) {
        const data = await response.json();
        router.replace({ pathname: '/Login/otp', params: { user: mobileNo } });
        console.log('Login successful:', data);
      } else {
        Alert.alert('Login failed!', 'Unable to login. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp, mobileNo) => {
    console.log(mobileNo)
    try {
      const response = await fetch('https://mom-beta-server1.onrender.com/api/user/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, mobileNo }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('jwt_token', JSON.stringify(data.token));
        setToken(data.token);
        setIsLoggedIn(true);
        await getUserDetails(data.token); // ✅ Update user details after login
        console.log('OTP verified:', data);
        return data;
      } else {
        Alert.alert('OTP verification failed', 'Invalid OTP. Please try again.');
        return null;
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      Alert.alert('An error occurred during OTP verification. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('jwt_token');
      setToken(null);
      setIsLoggedIn(false);
      setUserDetails(null);
      router.replace('/Login/Login');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'An error occurred during logout. Please try again.');
    }
  };

  const postData = async (name, dob, gender) => {
    try {
      const storedToken = await AsyncStorage.getItem("jwt_token");
      const parsedToken = JSON.parse(storedToken);

      const response = await fetch("https://mom-beta-server1.onrender.com/api/user/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${parsedToken}`
        },
        body: JSON.stringify({
          name:name,
          dateOfBirth: dob,
          gender:gender
        })
      });

      if (response.ok) {
        console.log("User successfully registered");

        // ✅ After successful registration, refetch latest user details
        await getUserDetails(parsedToken);

        // router.replace("/Home/home");
      } else {
        const errorData = await response.text();
        console.error("Server error response:", errorData);
        Alert.alert("Registration Error", "Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error("this is from fetch signup:", e);
      Alert.alert("Network Error", "Failed to register. Check your internet or server.");
    }
  };

  const ExtractParseToken = async ()=>{
    const token = await AsyncStorage.getItem("jwt_token")
    const parsedToken = JSON.parse(token)
    return parsedToken
    }

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
      postData , 
      ExtractParseToken
    }}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

export const userAuth = ()=>{
  const context = useContext(AuthContext)
  if(!context) throw new Error("Error in login context")
  return context
}
