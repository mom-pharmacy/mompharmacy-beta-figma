import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,

  TouchableOpacity,
  View,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const backgroundImages = [
  require('../../assets/images/back1.png'),
  require('../../assets/images/back2.png'),
  require('../../assets/images/back3.png'),
  require('../../assets/images/back4.png'),
  require('../../assets/images/back5.png'),
  require('../../assets/images/back6.png'),
  require('../../assets/images/back7.png'),
  require('../../assets/images/back8.png'),
];


const generateBackgroundLayout = (cols = 5, rows = 9, spacing = 16) => {
  const cellWidth = width / cols;
  const cellHeight = height / rows;
  const items = [];

  let index = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const size = Math.min(cellWidth, cellHeight) - spacing + 10; 
      const xOffset = (cellWidth - size) / 2;
      const yOffset = (cellHeight - size) / 2;
      const left = c * cellWidth + xOffset;
      const top = r * cellHeight + yOffset;
      const rotate = Math.random() * 30 - 15;
      const opacity = 0.3 + Math.random() * 0.9;

      items.push({
        key: `${r}-${c}`,
        source: backgroundImages[index % backgroundImages.length],
        top,
        left,
        size,
        rotate,
        opacity,
      });
      index++;
    }
  }

  return items;
};

export default function Index() {
  const backgroundLayout = generateBackgroundLayout();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#00bfa5" barStyle="light-content" />

      
      {backgroundLayout.map(item => (
        <Image
          key={item.key}
          source={item.source}
          style={[
            styles.bgImage,
            {
              top: item.top,
              left: item.left,
              width: item.size,
              height: item.size,
              transform: [{ rotate: `${item.rotate}deg` }],
              opacity: item.opacity,
            },
          ]}
          resizeMode="contain"
        />
      ))}

     
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Mom Pharmacy</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/Login/Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgImage: {
    position: 'absolute',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Platform.select({
      ios: hp('18%'),
      android: hp('15%'),
      default: hp('17%'),
    }),
  },
  logo: {
    width: wp('60%'),
    height: wp('60%'),
    maxWidth: 300,
    maxHeight: 300,
  },
  title: {
    fontSize: hp('4%'),
    color: '#007E71',
    marginTop: hp('2.5%'),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007E71',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('12%'),
    borderRadius: 30,
    elevation: 5,
    height: hp('7%'),
    width: wp('55%'),
    alignSelf: 'center',
    marginTop: hp('3%'),
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});