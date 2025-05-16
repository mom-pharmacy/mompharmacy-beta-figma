import { router } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.skipbox}>
        <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/BottomNavbar/home')}>
          <Text style={styles.skipText}>skip</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('./medintro')}>
        <Icon name="chevron-left" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.placeholderBox}>
        <View style={styles.imgBackground1}></View>
        <View style={styles.imgBackground2}></View>
        <Image
          source={require('../../assets/images/2image.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
        <View style={[styles.indicator, styles.activeIndicator]} />
        <View style={styles.indicator} />
      </View>

      <View style={styles.textBox}>
        <Text style={styles.messageText}>
          get lab tests done from the comfort of your Home
        </Text>
        <View style={styles.tBox}></View>
      </View>

      <TouchableOpacity style={styles.centeredButton} onPress={() => router.push('./donarintro')}>
        <Icon name="chevron-right" size={40} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9D24',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  skipbox: {
    position: 'absolute',
    top: hp('6%'),
    right: wp('2%'),
    zIndex: 1,
    borderRadius: 30,
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('5%'),
  },
  skipButton: {
    paddingVertical: hp('0.7%'),
    paddingHorizontal: wp('4%'),
    backgroundColor: '#DA7C08',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      android: {
        bottom: 15
      }
    })
  },
  skipText: {
    fontSize: hp('2.2%'),
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    // top: hp('7.5%'),
    left: wp('5%'),
    padding: hp('0.5%'),
    color: 'black',
    zIndex: 1,
    ...Platform.select({
      android: {
        top: 30
      },
      ios: {
        top: 60
      }
    })
    
  },
  placeholderBox: {
    height: hp('35%'),
    width: wp('60%'),
    marginBottom: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBackground1: {
    height: hp('28%'),
    width: hp('28%'),
    right: wp('10%'),
    marginTop: hp('13%'),
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    position: 'absolute',
    zIndex: 0,
    ...Platform.select({
      andorid: {
        right: 40
      },
      ios: {
        right: 0
      }
    })
  },
  imgBackground2: {
    height: hp('20%'),
    width: hp('20%'),
    right: wp('6%'),
    marginTop: hp('1%'),
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    position: 'absolute',
    zIndex: 1,
    ...Platform.select({
      ios: {
        bottom: 10
      },
      andorid: {
        bottom: 10
        },
    })
  },
  image: {
    height: hp('30%'),
    width: wp('75%'),
    marginTop: hp('2%'),
    alignSelf: 'center',
    zIndex: 2,
    ...Platform.select({
      android: { 
        top: 70
      },
      ios: { 
        top: 70
      }
    })
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginVertical: hp('4%'),
    marginTop: hp('1.5%'),
  },
  indicator: {
    width: wp('2.2%'),
    height: wp('2.2%'),
    borderRadius: wp('1.1%'),
    backgroundColor: '#ccc',
    marginHorizontal: wp('1%'),
    ...Platform.select({
      ios: {
        top: 30
      }
    })
  },
  activeIndicator: {
    backgroundColor: 'white',
    width: wp('6%'),
  },
  textBox: {
    backgroundColor: '#DA7C08',
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
    marginTop: 40,
    height: 200,
    ...Platform.select({
      ios: {
        top: 97
      },
      android: {
        top: 50
      }
    })
  },
  messageText: {
    color: '#fff',
    fontSize: hp('2.7%'),
    textAlign: 'center',
  },
  tBox: {
    height: 110,
    width: 110,
    backgroundColor: '#FF9D24',
    marginTop: 35,
    marginBottom: -50,
    borderRadius: 100,
    ...Platform.select({
      ios: {
        marginTop: 40
      },
      android: {
        marginTop: 40
      }
    })
  },
  centeredButton: {
    backgroundColor: '#E5322E',
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    alignSelf: 'center',
    ...Platform.select({
      android: {
        top: 50
      },
      ios: { 
       top: 90 
      }
    })
  },
});