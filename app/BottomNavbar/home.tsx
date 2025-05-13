import BloodDonation from '@/components/Home/bloodDonation'
import Body from '@/components/Home/body'
import Carousel from '@/components/Home/carousel'
import Footer from '@/components/Home/footer'
import TopNavbar from '@/components/Home/topNavbar'
import UploadPrescription from '@/components/Home/uploadPrescription'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'



const Home = () => {
  return (
    <View style={styles.screen}>
      <TopNavbar /> 
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
         <View style={{padding:15}}>
          <BloodDonation />
          
          <Carousel />
          <UploadPrescription />
          </View>
           <Body />
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
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    paddingBottom: 20, 
  },
})

export default Home;
