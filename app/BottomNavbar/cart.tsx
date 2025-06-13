import StatusHeader from '@/components/OrdersComponents/StatusHeader'
import ProtectedLayout from '@/components/ProtectedRoute'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Cart1 from '../Orders/Cart'

const Cart = () => {
  return (
    <ProtectedLayout>
      {/* <TopNavbar /> */}
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        >
        <StatusHeader title={"Cart"} />

        {/* <View style={styles.container}>
          <View style={{ paddingHorizontal: 10 }}>
            <UploadPrescription />
          </View>
          <Ordering />
          <Medicines limit={2} />
          <Categories1 />

          <Footer />
        </View> */}
        <Cart1 />
      </ScrollView>
    </SafeAreaView>
    </ProtectedLayout>
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

  },
  container: {
    backgroundColor: '#fff',
  },
})



export default Cart