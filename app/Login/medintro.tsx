import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width, height} = Dimensions.get('window');

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
    borderRadius: 4,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  skipBox: {
    backgroundColor: '#00A99D',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 20,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    zIndex: 1,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skipText: {
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: 'bold',
  },
  placeholderBox: {
    height: height * 0.35,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: height * 0.3,
    width: width * 0.7,
    position: 'absolute',
    ...Platform.select({
      android: {
        top: 85
      },
      ios: {
        top: 70
      }
    })
  },
  imgBackground1: {
    height: width * 0.65,
    width: width * 0.65,
    borderRadius: width * 0.65,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    position: 'absolute',
    top: 60,
  },
  imgBackground2: {
    height: width * 0.45,
    width: width * 0.45,
    borderRadius: width * 0.45,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    position: 'absolute',
    top: 100,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 40,
    ...Platform.select({
      ios: {
        left: 10
      },
      android: {
        left: 10
      }
    })
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
    ...Platform.select({
      android: {
        top: 40
      },
      ios: {
        top: 20
      }
    })
  },
  activeIndicator: {
    backgroundColor: 'white',
    width: 22,
    position: 'absolute',
    ...Platform.select({
      android: {
        top: 40,
        right:30
      },
      ios: {
        right: 30
      }
    })
  },
  textBox: {
    backgroundColor: '#00A99D',
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    // height: height * 0.25,
    height: 210,
    ...Platform.select({
      android: {
        top:100
      },
      ios: {
        top: 130
      }
    })
  },
  messageText: {
    color: '#fff',
    fontSize: width * 0.065,
    textAlign: 'center',
  },
  tBox: {
    height: 110,
    width: 110,
    backgroundColor: '#7DD0CA',
    marginTop: 48,
    borderRadius: 100,
  },
  centeredButton: {
    backgroundColor: '#FF9D24',
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25,
    ...Platform.select({
      android: {
        top:75
      },
      ios: {
        top: 100
      }
    })
  },
});
