import CartList from '@/components/OrdersComponents/CartList';
import OrderSummary from '@/components/OrdersComponents/OrderSummary';
import { userAuth } from '@/Context/authContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../../Context/cartContext';
import OrderConfirmationModal from './OrderConfirmation';

const OrderReviewScreen = () => {
  const { cartItems, subtotal, updateQuantity } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [ medicine, setMedicine]=useState([])

  const {ExtractParseToken} = userAuth()

  const handleQuantityChange = (id, type) => {
    const item = cartItems.find((item) => item.id === id);
    if (!item) return;
    const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
    updateQuantity(id, newQty > 0 ? newQty : 1);

  };

  async function postOrders(medicines) {

    const tokenAuth = await ExtractParseToken()
    
    const addressId = "6815a9c9f92b58dc500aa3da";

    const orderMedicines = medicines.map((item) => {
      console.log(item)
      return({
      medicine_id: item._id,
      quantity: item.quantity,
      price: item.price,
      imageUrl: item.imageUrl,
      name:item.medicine_name
   })});

    const orderData = {
      address_id: addressId,
      medicines: orderMedicines,
      ETA: 10,
      subtotal: subtotal,
      shippingFee: 5,
      tax: 2.5,
      discount: 3,
      total_amount: subtotal + 5 + 2.5 - 3,
      paymentMethod: "COD",
    };

    try {
      const response = await fetch('https://mom-beta-server1.onrender.com/api/add-order', {
        method: 'POST',
        headers: {
          "Authorization":`Bearer ${tokenAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Order placed successfully:', data.order);
        setOrderId(data.order._id);
        setMedicine(data.order.medicines)
      
        setModalVisible(true);
      } else {
        console.error('Error placing order:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Order Review</Text>

      <CartList/>

      <View style={styles.addressBox}>
        <Ionicons name="location-outline" size={24} color="#007F5F" style={styles.icon} />
        <View>
          <Text style={styles.addressTitle}>Deliver to</Text>
          <Text style={styles.address}>
            100ft Rd Madhapur <Text style={styles.inTime}>in 10mins</Text>
          </Text>

        </View>
        <TouchableOpacity onPress={()=>{
          router.push("/Maps/myAddress")
        }}>
          <Text>Change</Text>
        </TouchableOpacity>
      </View>

      <OrderSummary />

      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => postOrders(cartItems)}
      >
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>

      <OrderConfirmationModal visible={modalVisible} orderId={orderId} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addressBox: {
    backgroundColor: '#DFF4EF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    marginLeft:-1,
    marginRight:-1
  },
  addressTitle: {
    fontWeight: 'bold',
  },
  address: {
    marginTop: 4,
  },
  inTime: {
    color: '#444',
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
  changeBtn: {
    marginLeft: 60,
    fontWeight: 'bold',
    marginTop: -20,
  }
});

export default OrderReviewScreen;
