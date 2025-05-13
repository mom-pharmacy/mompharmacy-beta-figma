import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/Login/medintro')}>
        <Icon name="chevron-left" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.placeholderBox}>
        <View style={styles.imgBackground1}></View>
        <View style={styles.imgBackground2}></View>
        <Image
          source={require('../../assets/images/3image.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <View style={[styles.indicator, styles.activeIndicator]} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.messageText}>
          Find your blood donor on minutes
        </Text>
        <View style={styles.tBox}></View>
      </View>

      <TouchableOpacity style={styles.centeredButton} onPress={() => router.replace('/BottomNavbar/home')}>
        <Icon name="chevron-right" size={40} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5322E',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  skipButton: {
    position: 'absolute',
    top: 65,
    right: 30,

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
    height: 160,
    width: 200,
    right: 60,
    marginTop: -130,
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
    backgroundColor: '#BE100C',
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
    fontFamily: 'DM Sans',
  },
  tBox: {
    height: 110,
    width: 110,
    backgroundColor: '#E5322E',
    marginTop: 40,
    marginBottom: -50,
    borderRadius: 100,
  },
  centeredButton: {
    backgroundColor: 'white',
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
