import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.skipBox}>
        <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/BottomNavbar/home')}>
          <Text style={styles.skipText}>skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.placeholderBox}>
        <View style={styles.imgBackground1}></View>
        <View style={styles.imgBackground2}></View>
        <Image 
          source={require('@/assets/images/1image.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.indicatorContainer}>
        <View style={[styles.indicator, styles.activeIndicator]} />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
      </View>


      <View style={styles.textBox}>
        <Text style={styles.messageText}>
          medicine on 10 minutes at your Doorstep
        </Text>
        <View style={styles.tBox}></View>
      </View>

      
      <TouchableOpacity style={styles.centeredButton} onPress={() => router.push('./labintro')}>
        <Icon name="chevron-right" size={40} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7DD0CA',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 4
  },
  skipBox: {
    backgroundColor: '#00A99D', 
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 55, 
    right: 20,
    zIndex: 1,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 5,
  },
  placeholderBox: {
    height: 300,
    width: 100,
    marginBottom: 90,
  },
  image: {
    height: 255,
    width: 300,
    right: 110,
    marginTop: -200,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginVertical: 60,
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: 'white',
    width: 22,
  },
  textBox: {
    backgroundColor: '#00A99D',
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
    marginTop: 60,
    height: 200,
  },
  messageText: {
    color: '#fff',
    fontSize: 27,
    textAlign: 'center',
  },
  tBox: {
    height: 110,
    width: 110,
    backgroundColor: '#7DD0CA',
    marginTop: 40,
    marginBottom: -50,
    borderRadius: 100,
  },
  highlight: {
    fontWeight: 'bold',
  },
  centeredButton: {
    backgroundColor: '#FF9D24',
    borderRadius: 50,
    width: 80,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
  },
  imgBackground1: {
    height: 250,
    width: 250,
    right: 80,
    marginTop: 100,
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
  },
  imgBackground2: {
    height: 180,
    width: 180,
    right: 45,
    marginTop: -210,
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', 
  },
});
