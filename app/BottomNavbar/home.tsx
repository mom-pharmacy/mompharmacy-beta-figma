import BloodDonation from '@/components/Home/bloodDonation';
import Body from '@/components/Home/body';
import Carousel from '@/components/Home/carousel';
import Footer from '@/components/Home/footer';
import Search from '@/components/Home/search';
import TopNavbar from '@/components/Home/topNavbar';
import UploadPrescription from '@/components/Home/uploadPrescription';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Home = () => {
  return (
    <View style={styles.screen}>
      
      <TopNavbar />
      <Search />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={styles.paddedSection}>
            <BloodDonation />
          </View>
          <Carousel />
          <View style={styles.paddedSection}>
            <UploadPrescription />
          </View>
          <Body />
          <View style={styles.paddedSection}>
            <Footer />
          </View>
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
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  paddedSection: {
    padding: 15,
  },
});

export default Home;
