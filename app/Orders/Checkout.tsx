import CartList from '@/components/OrdersComponents/CartList';
import OrderSummary from '@/components/OrdersComponents/OrderSummary';
import { useCart } from '@/context/cartContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const OrderReviewScreen = () => {
  const [items, setItems] = useState([
     {
       id: 1,
       name: 'Strepsils Orange',
       unit: '1 unit',
       price: 99,
       quantity: 1,
       image: require("@/assets/images/stepsils.png"),
     },
     {
       id: 2,
       name: 'Cold act',
       unit: '1 unit',
       price: 99,
       quantity: 1,
       image: require("@/assets/images/stepsils.png"),
     },
     {
       id: 3,
       name: 'Nasoclear Saline',
       unit: '1 unit',
       price: 99,
       quantity: 1,
       image: require('@/assets/images/stepsils.png'),
     },
   ]);

  const handleQuantityChange = (id, type) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          let newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const {subtotal , cartItems} = useCart()

  async function postOrders(medicines){
    // const tokenAuth = await ExtractParseToken()
    return false 
  }


  return (<>
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Order Review</Text>
     <CartList/>
      <View style={styles.addressBox}>
      <Ionicons name="location-outline" size={24} color="#007F5F" style={styles.icon} />
        <Text style={styles.addressTitle}>Deliver to</Text>
        <Text style={styles.address}>100ft Rd Madhapur <Text style={styles.inTime}>in 10mins</Text></Text>  
      </View>
      <OrderSummary/>
      <TouchableOpacity style={styles.proceedButton} onPress={()=>router.push('/Orders/OrderConfirmation')}>
        <Text style={styles.proceedText} >Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
     padding: 16,
      backgroundColor: '#fff' 
    },
    icon: {
      marginRight: 12,
    },
  
  title: {
     fontSize: 24,
      fontWeight: 'bold',
       marginBottom: 16 
      },

  deliveryBox: {
     backgroundColor: '#e7f6f2', 
     borderRadius: 12,
      padding: 12 },
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
  itemInfo: { 
    flex: 1
   },
  itemName: {
     fontWeight: 'bold'
     },
  itemUnit: { 
    color: '#666'
   },
  saveLater: { 
    color: '#007aff', textDecorationLine: 'underline', fontSize: 12 },

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
    backgroundColor: '#DFF4EF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 10,
  },

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

  proceedButton: {
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: -15,
    marginBottom: 5,
  },
  proceedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderReviewScreen;