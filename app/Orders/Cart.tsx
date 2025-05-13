import CartList from '@/components/OrdersComponents/CartList';
import StatusHeader from '@/components/OrdersComponents/StatusHeader';
import { COLOR, screen } from '@/constants/color';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../../Context/cartContext';
import Recommended from '../Recommended';



const OrderReviewScreen = () => {

 
  const [items, setItems] = useState([
    {
      _id: 1,
      name: 'Strepsils Orange',
      unit: '1 unit',
      price: 99,
      quantity: 1,
      image: require("@/assets/images/Categories/babyoil.png"),
    },
    {
      _id: 2,
      name: 'Cold act',
      unit: '1 unit',
      price: 99,
      quantity: 1,
      image: require("@/assets/images/Categories/babyoil.png"),
    },
    {
      _id: 3,
      name: 'Nasoclear Saline',
      unit: '1 unit',
      price: 99,
      quantity: 1,
      image: require('@/assets/images/Categories/babyoil.png'),
    },
  ]);

  const {cartItems , subtotal} = useCart()


  console.log(cartItems)

  const handleQuantityChange = (id, type) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item._id === id) {
          let newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  if(cartItems.length<1){
   return <View style={{flex:1 , justifyContent:"center" , alignItems:"center"}}>
    <Text style={{fontSize:18 , color:"gray" , fontWeight:"bold"}}>Your cart is Empty</Text>
   </View>
  }

  return (
    <View style={styles.mainContainer}>
      <StatusHeader />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
       
        <CartList/>
        <View style={styles.recommendedContainer}>
          <Text style={styles.recommended}>Recommended</Text>
        </View>

        <ScrollView horizontal={true}>
          <Recommended />
          {/* <View style={styles.recommendedCardContainer}>
            {items.map(item => (
              <MedicineCard key={item._id} item={item} />
            ))}
          </View> */}
        </ScrollView>
      </ScrollView>

      {/* Fixed at bottom */}
      <View style={styles.proccedContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.discountPrice}>Rs {subtotal}</Text>
          {/* <Text style={styles.originalPrice}>Rs 300</Text> */}
        </View>
        <View>
          <TouchableOpacity style={styles.proccedBtn} onPress={()=>router.push("/Orders/Checkout")}>
            <Text style={styles.proccedBtnText}>Add Address and proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },

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

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10
  },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: 'bold' },
  itemUnit: { color: '#666' },
  saveLater: { color: '#007aff', textDecorationLine: 'underline', fontSize: 12 },

  counterBox: { alignItems: 'center' }, 
  counterControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  counterBtn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  counterValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  itemPrice: { marginTop: 4, fontWeight: 'bold' },

  addressBox: {
    backgroundColor: '#e7f6f2',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },
  addressTitle: { fontWeight: 'bold' },
  address: { marginTop: 4 },
  inTime: { color: 'green' },

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
    fontSize: 16,
    color: '#555',
  },
  cod: {
    fontSize: 16,
    color: '#0BA29D',
    fontWeight: '600',
  },

  proceedButton: {
    backgroundColor: '#00bfa5',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  proceedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recommendedContainer: {
    marginVertical: 12,
    marginHorizontal: 12
  },
  recommended: {
    fontSize: 17,
    fontWeight: "bold"
  },
  recommendedCardContainer: {
    flexDirection: "row",
    gap: 12
  },
  proccedContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: COLOR.light,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
  },
  mainContainer: {
    flex: 1,
    height: screen.width
  },
  priceContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 14
  },
  proccedBtn: {
    padding: 20,
    backgroundColor: COLOR.primary,
    borderRadius: 12,

  },
  proccedBtnText:{
    color:"white"
  },
  discountPrice:{
    color:COLOR.primary ,
    fontSize:17,
    fontWeight:"bold"
  },
  originalPrice:{
    textDecorationLine:'line-through'
  }

});

export default OrderReviewScreen;