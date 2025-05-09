import { OTPWidget } from '@msg91comm/sendotp-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ededed',
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
  },
  button: {
    padding: 12,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

// export default App;



const widgetId = "3565686a4f72373035303633";
const tokenAuth = "446304AK8Lj78USO681c9619P1";

const App = () => {
    useEffect(() => {
        OTPWidget.initializeWidget(widgetId, tokenAuth); //Widget initialization
    }, [])

    const [number, setNumber] = useState('');

    const handleSendOtp = async () => {
        const data = {
            identifier: '918897558177'
        }
        const response = await OTPWidget.sendOTP(data);
        console.log(response);  
    }

    return (
        <View>
            <TextInput
                placeholder='Number'
                value={number}
                keyboardType='numeric'
                style={{ backgroundColor: '#ededed', margin: 10 }}
                onChangeText={(text) => {
                    setNumber(text)
                }}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                    handleSendOtp()
                }}
            >
                <Text>
                    Send OTP
                </Text>
            </TouchableOpacity>
        </View>
    );
}
    
export default App;