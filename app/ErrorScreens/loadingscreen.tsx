import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const LoadingScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const topImages = [
    require('../../assets/images/LoadingScreen/blood.png'),
    require('../../assets/images/LoadingScreen/doc.jpg'),
    require('../../assets/images/LoadingScreen/hos.jpg'),
    require('../../assets/images/LoadingScreen/lab.jpg'),
    require('../../assets/images/LoadingScreen/pills.jpg'),
    require('../../assets/images/LoadingScreen/print.jpg'),
  ];
  const bottomImages = [
    require('../../assets/images/LoadingScreen/text1.jpg'),
    require('../../assets/images/LoadingScreen/text2.jpg'),
    require('../../assets/images/LoadingScreen/text3.jpg'),
    require('../../assets/images/LoadingScreen/text4.jpg'),
    require('../../assets/images/LoadingScreen/text5.jpg'),
    require('../../assets/images/LoadingScreen/text6.jpg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === topImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    {/* <MaterialIcons name='arrow-back' size={24} color='#00A99D' 
    onPress={()=>router.back()} 
    /> */}
    
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <Image 
          source={topImages[currentImageIndex]} 
          style={styles.image} 
          resizeMode="contain"
        />
      </View>
      <View style={[styles.imageRow, { marginTop: -20 }]}>
        <Image 
          source={bottomImages[currentImageIndex]} 
          style={[styles.image, styles.bottomImage]} 
          resizeMode="contain"
        />
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  imageRow: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 'auto',
    padding: 0,
    margin: 0,
  },
  image: {
    width: width * 0.5, 
    height: height * 0.2, 
    margin: 0,
    padding: 0,
  },
  bottomImage: {
    width: width * 0.9,
    height: height * 0.2, 
    marginTop: -10, 
  },
});

export default LoadingScreen;
