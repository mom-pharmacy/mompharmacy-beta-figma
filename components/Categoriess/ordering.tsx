import { router } from 'expo-router';
import React, { useCallback } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  { src: require('../../assets/images/whatsapp.jpeg'), name: 'WhatsApp Ordering', type: 'whatsapp' },
  { src: require('../../assets/images/voice.jpeg'), name: 'Voice Ordering', type: 'voice' },
  { src: require('../../assets/images/call.jpeg'), name: 'Call Ordering', type: 'call' },
  { src: require('../../assets/images/emergency.jpeg'), name: 'Emergency Ordering', type: 'emergency' },
];

const actionHandlers = {
  whatsapp: () => Linking.openURL('https://wa.me/917702068334'),
  call: () => Linking.openURL('tel:7702068334'),
  voice: () => router.push('./Voice'),
  emergency: () => router.push('./Comingsoon/comingsoon'),
};

const Ordering = () => {
  const handlePress = useCallback((type) => {
    if (actionHandlers[type]) {
      actionHandlers[type]();
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.rowContainer}>
        {images.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => handlePress(item.type)}
          >
            <Image source={item.src} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const scaleFont = (size) => size * PixelRatio.getFontScale();
const itemWidth = width / 4 - 10; 

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: 20, 
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 20, 
    paddingHorizontal: 5,
  },
  item: {
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: '#007E711A',
    borderRadius: 10,
    width: itemWidth,
    backgroundColor: '#fff',
  },
  image: {
    width: itemWidth * 0.6,
    height: itemWidth * 0.6,
    borderRadius: 8,
    marginBottom: 6,
  },
  text: {
    textAlign: 'center',
    fontSize: scaleFont(11),
  },
});

export default Ordering;