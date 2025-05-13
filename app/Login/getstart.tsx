import { router } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
    marginTop: 250,
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 32,
    color: '#007E71',
    marginTop: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#007E71',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    height: 58,
    width: 219,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});