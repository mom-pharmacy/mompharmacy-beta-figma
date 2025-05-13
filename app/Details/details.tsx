import Footer from '@/components/Home/footer'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableHighlight, View } from 'react-native'

export default function details() {
  const { itemId, itemName, itemImage, itemPrice, description, use,
    ingredients, dose, manufacturer,
    notFor, sideEffects, store,
    expiryDate, manufactureDate } = useLocalSearchParams()

  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        <View style={{ padding: 10, height: 300, marginVertical: 10, marginLeft: 70 }}>
          <Image
            source={{ uri: Array.isArray(itemImage) ? itemImage[0] : itemImage }}
            style={{ height: 200, width: 180 }}
            resizeMode="contain"
          />

        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, height: 25, borderRadius: 5, marginBottom: 5 }}>30 min <Image source={require("../../assets/images/Categories/bike.png")} style={{ height: 20, width: 20 }} /></Text>
          <Text style={{ backgroundColor: "#e5f2f1", height: 25, borderRadius: 5, marginBottom: 5 }}>Save <Image source={require("../../assets/images/Categories/save.png")} style={{ height: 20, width: 20 }} /> </Text>
        </View>
        <View style={{ backgroundColor: "#e5f2f1", height: 110, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
            <Text>{itemName}</Text>
            <Text style={{ flex: 1 }}></Text>
          </View>
          <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
            <Text>{itemPrice}</Text>
            <Text>Rs 149 </Text>
            <Text>21% off</Text>
          </View>
          <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#fff', padding: 7, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', flex: 1, marginTop: 4 }}>
              <Text>Rs 79 </Text>
              <Text>Rs 149 </Text>
              <Text>30% off</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text>To avail this offer</Text>
              <Text>Get Premium </Text>
            </View>
          </View>
        </View>
        <TouchableHighlight style={{ height: 40, width: '40%', backgroundColor: '#00a99d', borderRadius: 50, marginLeft: '30%', marginVertical: 10 }}>
          <Text style={{ textAlign: 'center', color: '#fff', padding: 10 }}>Buy Now</Text>
        </TouchableHighlight>

        <View style={{ backgroundColor: "#e5f2f1", padding: 10, borderRadius: 10, marginBottom: 7 }}>
          <Text>Key Information</Text>
          <Text>Use:{use}</Text>
          <Text>Ingredients:{ingredients}</Text>
          <Text>Dose:{dose}</Text>
          <Text>Not for:{notFor}</Text>
          <Text>Side effects:{sideEffects}</Text>
          <Text>Store:{store}</Text>
        </View>
        <View style={{ backgroundColor: "#e5f2f1", padding: 10, borderRadius: 10 }}>
          <Text>Product Description</Text>
          <Text>{description}</Text>
        </View>

        <Footer />
      </View>
    </ScrollView>

  )
}