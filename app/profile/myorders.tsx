
import LoadingScreen from '@/components/LoadingScreen';
import { userAuth } from '@/Context/authContext';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderSummaryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Updated
  const [loading, setLoading] = useState(false);

  const { ExtractParseToken } = userAuth();
                                                                  
  useEffect(() => {
    const fetchOrders = async () => {
      const tokenAuth = await ExtractParseToken();
      console.log(tokenAuth);
      try {
        setLoading(true);
        const response = await fetch('https://mom-beta-server1.onrender.com/api/getorderuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenAuth}`,
          },
        });
        setLoading(false);
        const data = await response.json();
        if (data.success) {
          console.log(data);
          setOrders(data.orders);
        } else {
          console.error('Error fetching orders:', data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if(orders.length===0) return <View>
    <Text>You Haven't ordered yet</Text>
  </View>

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
      <View style={styles.headerRow}>
      <MaterialIcons
          name="arrow-back"
          size={26}
          color="#00A99D"
          style={styles.arrowIcon}
          onPress={() => router.back()}
        />
        <Text style={styles.header}>My Orders</Text>
      </View>

      {orders.map((order, index) => {
        const isExpanded = expandedOrderId === order._id;

        return (
          <View key={order._id} style={styles.deliveryBox}>
            {/* <Text>Your order is confirmed</Text> */}
            <Text style={styles.deliveredText}>
              Your order is {order.status}
              {/* <Text style={styles.bold}>9 minutes 3 sec</Text> */}
            </Text>
            <Text style={styles.shipmentText}>Shipment of {order.medicines.length} items</Text>

            {order.medicines.length > 0 ? (
              order.medicines.map((medicine, idx) => (
                <View key={idx} style={styles.productItem}>
                  <Image
                    source={{ uri: medicine?.medicine_id?.imageUrl ?? '' }}
                    style={styles.productImage}
                  />
                  <View>
                    <Text style={styles.productName}>
                      {medicine?.medicine_id?.medicine_name ?? 'N/A'}
                    </Text>
                    <Text style={styles.productQty}>{medicine.quantity}</Text>
                    {/* <Text style={styles.saveText}>Save for later</Text> */}
                  </View>
                </View>
              ))
            ) : (
              <Text>No medicines in this order</Text>
            )}

            <Text style={styles.totalText}>Total: {order.total_amount}</Text>

            <View style={{ height: 25 }} />

            <TouchableOpacity
              onPress={() =>
                setExpandedOrderId(isExpanded ? null : order._id)
              }
              style={styles.summaryToggle}
            >
              <Text style={styles.summaryToggleText}>Order Summary</Text>
              <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.orderSummary}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>{order.subtotal}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Shipping</Text>
                  <Text style={styles.summaryValue}>₹5.00</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Tax</Text>
                  <Text style={styles.summaryValue}>₹2.50</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Discount</Text>
                  <Text style={[styles.summaryValue, { color: 'green' }]}>- ₹3.00</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Pay By</Text>
                  <Text
                    style={[
                      styles.summaryValue,
                      { color: '#008080', fontWeight: 'bold' },
                    ]}
                  >
                    COD/TNPL
                  </Text>
                </View>
                <View style={[styles.summaryItem, styles.totalAmount]}>
                  <Text style={styles.summaryLabel}>Total</Text>
                  <Text style={[styles.summaryValue, { fontWeight: 'bold' }]}>
                    {order.total_amount}
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })}

      <View style={{ height: 30 }} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: '#f9f9f9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A99D',
    marginLeft: 8,
  },
  arrowIcon: {
    marginRight: 8,
  },
  deliveryBox: {
    backgroundColor: '#d9f2ef',
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
  },
  deliveredText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  shipmentText: {
    fontSize: 13,
    color: 'gray',
    marginBottom: 12,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    width: '60%',
  },
  productQty: {
    fontSize: 13,
    color: 'gray',
    marginTop: 2,
  },
  saveText: {
    fontSize: 12,
    color: '#007b7b',
    marginTop: 4,
    textDecorationLine: 'underline',
  },
  totalText: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
    color: '#222',
  },
  summaryToggle: {
    backgroundColor: '#d9f2ef',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryToggleText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  chevron: {
    fontSize: 18,
    color: '#333',
  },
  orderSummary: {
    backgroundColor: '#d9f2ef',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#444',
  },
  summaryValue: {
    fontSize: 14,
    color: '#444',
  },
  totalAmount: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 12,
    marginTop: 12,
  },
});

export default OrderSummaryScreen;
