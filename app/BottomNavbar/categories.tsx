import BannerCarousel from '@/components/Home/carousel';
import TopNavbar from '@/components/Home/topNavbar';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';

import Categories1 from '../../components/Categoriess/categories';

import GlobalStatusBar from '@/components/GlobalStatusBar';
import Search from '@/components/Home/search';
import FloatOrders from '@/components/TrackOrder/FloatOrders';
import { useOrderActive } from '@/Context/orderContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from "../../components/Home/footer";

const { height } = Dimensions.get('window');

const Categories = () => {

  const {ActiveOrderId} = useOrderActive()
  return (
    <SafeAreaView style={styles.screen}>
      <GlobalStatusBar />
      {ActiveOrderId && <FloatOrders/>}
      <TopNavbar showBack={true} onBack={null}/>
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
    </SafeAreaView>
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
