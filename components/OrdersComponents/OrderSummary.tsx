import { useCart } from '@/context/cartContext'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function OrderSummary() {
    const {subtotal} = useCart()
  return (
     <View style={styles.summaryBox}>
          <Text style={styles.OrderSummary}>Order Summary</Text>
            <View style={styles.summaryRow}>
             
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>₹5.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>₹2.50</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.discountValue}>– ₹3.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{(subtotal + 5 + 2.5 - 3).toFixed(0)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.payByLabel}>Pay By</Text>
              <Text style={styles.cod}>COD/TNPL</Text>
            </View>
          </View>
  )
}

const styles = StyleSheet.create({
    OrderSummary: {
        fontWeight: 'bold',
        fontSize:15,
     },
     
     addressTitle: {
        fontWeight: 'bold' 
       },
     address: {
        marginTop: 4
        },
        inTime: {
         color: '#444',
       
       },
     summaryBox: {
       marginVertical: 20,
       paddingHorizontal: 20,
     },
     summaryRow: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginVertical: 4,
     },
     summaryLabel: {
       fontSize: 16,
       color: '#333',
     },
     summaryValue: {
       fontWeight: '500',
     },
     discountValue: {
        fontWeight: '500',
        color: 'green',
      },
      totalLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
      },
      totalValue: {
        fontWeight: 'bold',
      },
      payByLabel: {
        fontSize: 15,
        color: '#555',
      },
      cod: {
        fontSize: 16,
        color: '#0BA29D',
        fontWeight: '600',
      },
})