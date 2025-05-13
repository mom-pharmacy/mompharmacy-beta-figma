import { userAuth } from '@/Context/authContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
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
import { Checkbox } from 'react-native-paper';

const slides = [
  require('../../assets/images/1image.png'),
  require('../../assets/images/2image.png'),
  require('../../assets/images/3image.png'),
];

export default function LoginScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const {loginWithOtp} = userAuth()

  const taglineText = (
    <>
      Medicine on <Text style={{ color: '#007E71' }}>10 minutes</Text> at your Doorstep
    </>
  );

  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(input)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    if (!isChecked) {
      Alert.alert('Terms Not Accepted', 'You must accept the terms and privacy policy to continue.');
      return;
    }

    setLoading(true);
    console.log(input)
    await loginWithOtp(input)
    setLoading(false)

    // try {
    //   const payload = { mobileNo: input }; 
    //   console.log('Sending JSON:', JSON.stringify(payload));

    //   const response = await fetch('https://mom-beta-server1.onrender.com/api/user/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     router.push('/Login/otp');
    //   } else {
    //     Alert.alert('Error', data.message || 'Failed to send OTP.');
    //   }
    // } catch (error) {
    //   Alert.alert('Error', 'Network error. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleInputChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    setInput(cleaned);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.topSection}>
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
              renderItem={({ item }) => <Image source={item} style={styles.image} />}
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

            <Text style={styles.skipbutton}>
              <Text style={styles.skiplink} onPress={() => router.push('/Login/medintro')}>
                Skip
              </Text>
            </Text>

            <Text style={styles.tagline}>{taglineText}</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.bottomCard}>
          <Text style={styles.mobileLabel}>Enter your Mobile Number</Text>
          <View style={styles.phoneContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={handleInputChange}
              keyboardType="numeric"
              maxLength={10}
              returnKeyType="done"
            />
          </View>

          <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.otpText}>Get OTP</Text>
            )}
          </TouchableOpacity>

          <View style={styles.checkboxRow}>
            <View style={styles.checkboxBorder}>
              <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => setIsChecked(!isChecked)}
                color="#007E71"
                uncheckedColor="#007E71"
              />
            </View>
            <Text style={styles.checkboxText}>
              By clicking, I accept the{' '}
              <TouchableOpacity onPress={() => router.push('./t_and_c')}>
                <Text style={styles.link}>terms of services</Text>
              </TouchableOpacity>{' '}
              and{' '}
              <TouchableOpacity onPress={() => router.push('./privacy')}>
                <Text style={styles.link}>privacy policy</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>

        <Text style={styles.heading}>
          <Text style={styles.signupLink} onPress={() => router.push('/Login/signup')}>
            Sign Up Now!
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    top: 0,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  image: {
    width: 370,
    height: 300,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 10,
    bottom: 20,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    top: 10,
  },
  activeDot: {
    backgroundColor: '#007E71',
  },
  tagline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 0,
    top: 10,
  },
  bottomCard: {
    backgroundColor: '#E5F2F1',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'flex-start',
    top: 40,
  },
  mobileLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginLeft: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 60,
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    color: 'black',
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  otpButton: {
    backgroundColor: '#007E71',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  otpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxText: {
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 8,
  },
  link: {
    color: '#007E71',
    textDecorationLine: 'underline',
  },
  heading: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    bottom: 40,
  },
  signupLink: {
    color: '#007E71',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  skipbutton: {
    fontSize: 18,
    position: 'absolute',
    top: 60,
    right: 30,
  },
  skiplink: {
    color: 'black',
    fontWeight: 'bold',
  },
  checkboxBorder: {
    borderWidth: 1,
    borderColor: '#007E71',
    borderRadius: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});
