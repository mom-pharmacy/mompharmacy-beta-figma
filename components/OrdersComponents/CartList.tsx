import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useCart } from '../../Context/cartContext'
import CartItem from './cartItem'

export default function CartList() {
  const { cartItems } = useCart()
  return (
    <View style={styles.deliveryBox}>
      <Text style={styles.deliveryTime}>Delivery on 10 minutes</Text>
      <Text style={styles.shipment}>Shipment of {cartItems.length} items</Text>

      {cartItems.map((item, index) => (
        <CartItem item={item} key={index} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  deliveryBox: {
    backgroundColor: '#e7f6f2',
    borderRadius: 12,
    padding: 12,
  },
  deliveryTime: {
    fontWeight: 'bold',
    fontSize: 16
  },
  shipment: {
    color: '#555',
    marginBottom: 8
  },
})