import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import BloodDonation from '@/components/Home/bloodDonation';
import Body from '@/components/Home/body';
import Carousel from '@/components/Home/carousel';
import Footer from '@/components/Home/footer';
import SearchBar from '@/components/Home/search'; // renamed for clarity
import TopNavbar from '@/components/Home/topNavbar';
import UploadPrescription from '@/components/Home/uploadPrescription';

const Home = () => {
  // const handleSearchPress = () => {
  //   router.push('/Searching'); 
  // };

  return (
    <View style={styles.screen}>
      <TopNavbar />

      <TouchableOpacity style={styles.searchContainer}>
        <SearchBar />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.innerContent}>
            <BloodDonation />
            <Carousel />
            <UploadPrescription />
          </View>

          <Body />
          <Footer />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 15,
    marginTop: -90,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    paddingBottom: 20,
  },
  innerContent: {
    padding: 15,
  },
});

export default Home;
