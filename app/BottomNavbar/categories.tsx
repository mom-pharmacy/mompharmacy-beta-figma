import BannerCarousel from '@/components/Home/carousel';
import TopNavbar from '@/components/Home/topNavbar';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';

import Categories1 from '../../components/Categoriess/categories';

import Search from '@/components/Home/search';
import Footer from "../../components/Home/footer";

const { height } = Dimensions.get('window');

const Categories = () => {
  return (
    <View style={styles.screen}>
      <TopNavbar />
      <Search />
      <ScrollView  
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.container}>
          <BannerCarousel />
          <TouchableHighlight  onPress={() => { router.push('../Detailsl/details') }}>
            <Categories1 />
          </TouchableHighlight>
          
        
          <Footer />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    backgroundColor: '#fff',
  },
})

export default Categories;
