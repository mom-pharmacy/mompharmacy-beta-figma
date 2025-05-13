import { router } from 'expo-router';
import React, { useCallback } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const images = [
  { src: require('../../assets/images/whatsapp.jpeg'), name: 'WhatsApp Ordering', type: 'whatsapp' },
  { src: require('../../assets/images/voice.jpeg'), name: 'Voice Ordering', type: 'voice' },
  { src: require('../../assets/images/call.jpeg'), name: 'Call Ordering', type: 'call' },
  { src: require('../../assets/images/emergency.jpeg'), name: 'Emergency Ordering', type: 'emergency' },
];

const actionHandlers = {
  whatsapp: () => Linking.openURL('https://wa.me/917702068334'),
  call: () => Linking.openURL('tel:7702068334'),
  voice: () => router.push('./Comingsoon/voice') ,
  emergency: () => router.push('./Comingsoon/comingsoon') ,
};

const Ordering = () => {
  const handlePress = useCallback((type) => {
    if (actionHandlers[type]) {
      actionHandlers[type]();
    }
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 10,
    
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
      paddingHorizontal:10
    
  },
  item: {
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#007E711A',
    margin: 5,
    borderRadius: 10,
    width: 80,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 10,
    marginBottom: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 11.7,
  },
});

export default Ordering;
