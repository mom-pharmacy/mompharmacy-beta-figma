// success.tsx
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const WelcomeCard = () => {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>You’re in!</Text>
        <Text style={styles.text}>Welcome to mom pharmacy</Text>
        <Text style={styles.text}>your health, our priority</Text>
        <TouchableOpacity onPress={()=> router.replace('./medintro')} style={styles.arrowButton} >
        <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default WelcomeCard;

const styles = StyleSheet.create({
  container: {
   
    justifyContent: 'center',
    alignItems: 'center',
    padding: 19,
    paddingVertical:'65%',
    backgroundColor: '#fff',
    
  },
  card: {
    backgroundColor: '#fff', 
    width: 280,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: "#0af0de",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
    
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
  },
  arrowButton: {
    marginTop:10,
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: "50%",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    
  },
});
