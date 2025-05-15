import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { DIMENSIONS, getBorderRadius, getDimension, getFontSize, getSpacing } from '../../constants/dimensions';
import { userAuth } from '../../Context/authContext';
import { sendSmsOtp } from '../../lib/otp';

const slides = [
  require('../../assets/images/1image.png'),
  require('../../assets/images/2image.png'),
  require('../../assets/images/3image.png'),
];

export default function OtpScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { verifyOtp, postData } = userAuth();
  const params = useLocalSearchParams();
  const user = params.phone as string;
  const isRegistration = params.isRegistration === 'true';
  useEffect(() => {
    let intervalId: number;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer]);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(autoScroll);
  }, [currentIndex]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (text === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const fullOtp = otp.join('');
    console.log('Submitting OTP:', fullOtp);

    try {
      const isValid = await verifyOtp(fullOtp, user);
      console.log('OTP verification result:', isValid);

      if (isValid.success) {
        if (isRegistration) {
          console.log('OTP verified for registration, proceeding to complete registration');

          // Get registration data from params or AsyncStorage
          let registrationData;
          try {
            if (params.registrationData) {
              registrationData = JSON.parse(params.registrationData as string);
            } else {
              const storedData = await AsyncStorage.getItem('pendingRegistration');
              if (!storedData) {
                throw new Error('No registration data found');
              }
              registrationData = JSON.parse(storedData);
            }
          } catch (e) {
            console.error('Error getting registration data:', e);
            Alert.alert('Error', 'Registration data not found. Please try again.');
            router.replace('/Login/signup');
            return;
          }

          console.log('Completing registration with data:', registrationData);

          // Complete registration with full name
          const fullName = `${registrationData.firstName} ${registrationData.lastName}`;
          const registrationResult = await postData(
            fullName,
            registrationData.dob,
            registrationData.gender,
            user
          );

          if (registrationResult.success) {
            // Clear stored registration data
            await AsyncStorage.removeItem('pendingRegistration');
            console.log('Registration completed successfully');

            // Show success message
            Alert.alert(
              'Registration Successful!',
              'Your account has been created successfully.',
              [
                {
                  text: 'Continue',
                  onPress: () => router.replace('/Login/medintro')
                }
              ]
            );
          } else {
            console.error('Registration failed:', registrationResult.message);
            Alert.alert(
              'Registration Failed',
              registrationResult.message || 'Failed to complete registration. Please try again.',
              [
                {
                  text: 'Try Again',
                  onPress: () => router.replace('/Login/signup')
                },
                {
                  text: 'Cancel',
                  style: 'cancel'
                }
              ]
            );
          }
        } else {
          // Normal login flow
          console.log('Login successful, navigating to medintro');
          router.replace('/Login/medintro');
        }
      } else {
        console.error('OTP verification failed:', isValid.message);
        Alert.alert(
          'Invalid OTP',
          isValid.message || 'Please check the OTP and try again.',
          [
            {
              text: 'Try Again',
              onPress: () => {
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
              }
            },
            {
              text: 'Cancel',
              style: 'cancel'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      Alert.alert(
        'Error',
        'An error occurred while verifying OTP. Please try again.',
        [
          {
            text: 'Try Again',
            onPress: () => {
              setOtp(['', '', '', '', '', '']);
              inputRefs.current[0]?.focus();
            }
          },
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ]
      );
    }
  };

  const handleResendOtp = async () => {
    if (canResend) {
      setOtp(['', '', '', '', '', '']);
      setTimer(30);
      setCanResend(false);
      try {
        await sendSmsOtp(typeof user === 'string' ? user : user[0]);
        console.log("OTP resent successfully");
        Alert.alert('OTP Resent', 'A new OTP has been sent to your phone');
      } catch (error) {
        console.error("Error resending OTP:", error);
        Alert.alert('Error', 'Failed to resend OTP. Please try again.');
        setCanResend(true);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <FlatList
              ref={flatListRef}
              data={slides}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
                setCurrentIndex(index);
              }}
              renderItem={({ item }) => (
                <Image source={item} style={styles.logo} />
              )}
              keyExtractor={(_, index) => index.toString()}
            />
            <View style={styles.pagination}>
              {slides.map((_, index) => (
                <View
                  key={index}
                  style={[styles.dot, currentIndex === index ? styles.activeDot : null]}
                />
              ))}
            </View>

            <View style={styles.bottomCard}>
              <Text style={styles.heading}>Almost there!</Text>
              <Text style={styles.subtext}>Enter the secret code</Text>
              <Text style={styles.otpSent}>OTP sent via SMS to {user}</Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={ref => {
                      inputRefs.current[index] = ref;
                    }}
                    style={styles.otpBox}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    autoFocus={index === 0}
                  />
                ))}
              </View>

              <View style={styles.resendRow}>
                <Text style={styles.resendText}>
                  {canResend ? '' : `Wait for ${timer} seconds to `}
                </Text>
                <TouchableOpacity onPress={handleResendOtp} disabled={!canResend}>
                  <Text style={[styles.resendText, !canResend && { opacity: 0.5 }]}>
                    Resend the OTP
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleVerifyOtp} style={styles.verifyButton}>
                <Text style={styles.verifyButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: getSpacing(20),
    paddingTop: DIMENSIONS.SAFE_AREA_TOP + getSpacing(20),
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  logo: {
    width: DIMENSIONS.SCREEN_WIDTH,
    height: getDimension(300),
    resizeMode: 'contain',
    marginBottom: getSpacing(10),
  },
  pagination: {
    flexDirection: 'row',
    marginTop: getSpacing(10),
    position: 'absolute',
    bottom: getSpacing(10),
  },
  dot: {
    height: getDimension(10),
    width: getDimension(10),
    backgroundColor: '#ccc',
    borderRadius: getBorderRadius(5),
    marginHorizontal: getSpacing(5),
  },
  activeDot: {
    backgroundColor: '#007E71',
  },
  heading: {
    fontSize: getFontSize(22),
    fontWeight: 'bold',
    marginBottom: getSpacing(10),
    textAlign: 'center',
  },
  subtext: {
    fontSize: getFontSize(22),
    color: 'black',
    textAlign: 'center',
    marginBottom: getSpacing(10),
    fontWeight: 'bold',
  },
  otpSent: {
    fontSize: getFontSize(13),
    color: '#777',
    marginBottom: getSpacing(20),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: DIMENSIONS.OTP.INPUT_SPACING,
    marginBottom: getSpacing(20),
    paddingHorizontal: DIMENSIONS.OTP.CONTAINER_PADDING,
  },
  otpBox: {
    width: DIMENSIONS.OTP.INPUT_SIZE,
    height: DIMENSIONS.OTP.INPUT_SIZE,
    borderRadius: getBorderRadius(5),
    backgroundColor: '#d5ece9',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getSpacing(10),
    gap: getSpacing(4),
    flexWrap: 'wrap',
  },
  resendText: {
    fontSize: getFontSize(14),
    color: '#007AFF',
  },
  verifyButton: {
    backgroundColor: '#007E71',
    height: DIMENSIONS.BUTTON.HEIGHT,
    width: DIMENSIONS.SCREEN_WIDTH - getSpacing(40),
    borderRadius: DIMENSIONS.BUTTON.BORDER_RADIUS,
    marginTop: getSpacing(30),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: getFontSize(16),
    fontWeight: 'bold',
  },
  bottomCard: {
    backgroundColor: '#E5F2F1',
    borderTopLeftRadius: 140,
    borderTopRightRadius: 140,
    paddingTop: 40,
    paddingHorizontal: 70,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'flex-start',
    bottom: -25,
  },
});
