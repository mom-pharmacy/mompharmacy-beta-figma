import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const banners = [
  {
    image: require('../../assets/images/delivery.png'),
    title: 'Medicine delivery',
    description: 'Get your health, delivered within 10 minutes',
    buttonText: 'Book Now',
  },
  {
    image: require('../../assets/images/below.png'),
    title: 'Blood Donor Finder',
    description: 'Find nearby blood donors quickly 24/7',
    buttonText: 'Find Now',
    link: '/BloodDonor/front'
  },
  {
    image: require('../../assets/images/doctorpatient.png'),
    title: 'Doctor consultations',
    description: 'Consult a doctor instantly anytime-anywhere',
    buttonText: 'Book Now',
  },
  {
    image: require('../../assets/images/labtech.png'),
    title: 'Lab tests',
    description: 'Book lab tests from home fast, easy, 24/7',
    buttonText: 'Schedule Now',
  },
  {
    image: require('../../assets/images/hospital1.png'),
    title: 'Hospital Finder',
    description: 'Find nearby hospitals for urgent needs',
    buttonText: 'Find Now',
  },
];

const ITEM_WIDTH = screenWidth * 0.919;
const SPACING = screenWidth * 0.010;

const BannerCarousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % banners.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderItem = ({ item }) => (
    <View style={styles.bannerWrapper}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={()=>{router.push(item.link)}}>{item.buttonText} →</Text>
          </TouchableOpacity>
        </View>
        <Image source={item.image} style={styles.image} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH + SPACING,
          offset: (ITEM_WIDTH + SPACING) * index,
          index,
        })}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
      />
      <View style={styles.pagination}>
        {banners.map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === currentIndex ? '#00bfa5' : '#ccc' },
            ]}
            onPress={() => {
              flatListRef.current.scrollToIndex({ index: i, animated: true });
              setCurrentIndex(i);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10,},
  bannerWrapper: {
    width: ITEM_WIDTH,
    marginRight: SPACING,
    marginBottom:10,
    
    
    
  },
  card: {
    backgroundColor: '#f2f9f9',
    borderRadius: 16,
    padding: 9,
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  image: {
    width: 125,
    height: 125,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#202020',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#00a99d',
    fontWeight: '800',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 1,
  },
  dot: {
    width: 6,
    height:6,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});

export default BannerCarousel;
