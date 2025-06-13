import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendOtp = async (email: string): Promise<void> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`OTP for ${email}: ${otp}`);
  await AsyncStorage.setItem('generated_otp', otp);
};

export const sendSmsOtp = async (phone: string): Promise<void> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`OTP for ${phone}: ${otp}`);
  await AsyncStorage.setItem('generated_otp', otp);
};

export const verifyOtp = async (inputOtp: string): Promise<boolean> => {
  const storedOtp = await AsyncStorage.getItem('generated_otp');
  return inputOtp === storedOtp;
};