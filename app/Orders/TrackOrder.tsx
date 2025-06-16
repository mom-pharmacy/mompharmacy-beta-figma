import OrderStatus from '@/components/OrdersComponents/OrderStatus';
import StatusHeader from '@/components/OrdersComponents/StatusHeader';
import { COLOR, screen } from '@/constants/color';
import { userAuth } from '@/Context/authContext';
import { useOrderActive } from '@/Context/orderContext';
import apiClient from '@/utils/apiClient';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrackOrder() {
  const [openOrderSummary, setOpenOrderSummary] = useState(false);
  const { ActiveOrderId } = useOrderActive();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { ExtractParseToken } = userAuth();

  const fetchOrderData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tokenAuth = await ExtractParseToken();
      if (!tokenAuth) {
        setError('Authentication required');
        return;
      }

      const response = await apiClient(`api/orderbyid/${ActiveOrderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokenAuth}`,
          'Content-Type': 'application/json'
        }
      });

      if (response && response.order) {
        setOrder(response.order);
      } else {
        setError('No order data found');
      }
    } catch (error) {
      console.error('Failed to fetch order data:', error);
      setError('Failed to load order data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [ActiveOrderId, ExtractParseToken]);

  useFocusEffect(
    useCallback(() => {
      fetchOrderData();
      const intervalId = setInterval(fetchOrderData, 5000);
      return () => clearInterval(intervalId);
    }, [fetchOrderData])
  );

  const handleCall = (phone) => {
    let phoneNumber = `tel:${phone}`;
    Linking.openURL(phoneNumber);
  }

  const handleMessage = (phone) => {
    let smsUrl = `sms:${phone}`;
    Linking.openURL(smsUrl);
  }

  const StatusRender = ({ title, icons }) => (
    <View style={trackPageStyles.orderStatusItems}>
      <View>{icons}</View>
      <Text style={trackPageStyles.statusTitle}>{title}</Text>
    </View>
  );

  const OrderItems = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLOR.primary} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchOrderData} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!order) {
      return <Text style={styles.noDataText}>No order data available</Text>;
    }

    if (!order.medicines || order.medicines.length === 0) {
      return <Text style={styles.noDataText}>No medicines found in this order</Text>;
    }

    return (
      <View style={styles.orderItemsContainer}>
        {order.medicines.map((medicine, index) => (
          <View key={index} style={styles.orderItemContainer}>
            <Image
              source={medicine.imageUrl ? { uri: medicine.imageUrl } : require("@/assets/images/Categories/babyoil.png")}
              style={styles.medicineImage}
            />
            <View style={styles.orderItemQuantityContainer}>
              <Text style={styles.quantityText}>x{medicine.quantity}</Text>
              <Text style={styles.priceText}>₹{medicine.price}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const orderDate = new Date(dateString);
    return `${orderDate.getDate()}/${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchOrderData} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView>
          <StatusHeader title="Track Order" />
          <View style={trackPageStyles.deliveryBoyETA}>
            <Image source={require("@/assets/images/deliveryboy.png")} style={styles.deliveryBoyImage} />

            <View style={trackPageStyles.ETAContainer}>
              <View style={trackPageStyles.outerCircle}>
                <View style={trackPageStyles.innerCircle}>
                  <Text style={trackPageStyles.arriving}>Arriving in</Text>
                  <Text style={trackPageStyles.ETA}>10 MINS</Text>
                  <Text style={trackPageStyles.way}>On the way</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={trackPageStyles.orderpack}>
            <Text style={styles.orderPackText}>Your Order is being packed</Text>
          </View>

          {order?.deliveryboy_id && (
            <View style={trackPageStyles.deliveryBoyContainer}>
              <View style={trackPageStyles.deliveryBoyDetailsContainer}>
                <Image source={require("@/assets/images/deliveryProfile.png")} style={styles.deliveryBoyProfileImage} />
                <View>
                  <Text style={styles.deliveryBoyName}>
                    {order.deliveryboy_id.name || 
                     `${order.deliveryboy_id.firstName || ''} ${order.deliveryboy_id.lastName || ''}`.trim() || 
                     'Heal Porter'}
                  </Text>
                  <Text style={styles.deliveryBoyRole}>Heal Porter</Text>
                </View>
              </View>

              <View style={trackPageStyles.deliveryIconsContainer}>
                <TouchableOpacity 
                  style={trackPageStyles.iconsBtn} 
                  onPress={() => handleCall(order.deliveryboy_id.mobileNumber)}
                >
                  <Ionicons name='call' size={20} color={COLOR.primary} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={trackPageStyles.iconsBtn} 
                  onPress={() => handleMessage(order.deliveryboy_id.mobileNumber)}
                >
                  <MaterialIcons name="message" size={20} color={COLOR.primary} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={trackPageStyles.orderIdContainer}>
            <View>
              <Text style={trackPageStyles.orderStatusTitle}>Order ID</Text>
              <Text style={styles.orderIdText}>{order?.orderId || 'N/A'}</Text>
            </View>
            <View>
              <Text style={trackPageStyles.orderStatusTitle}>Order Date & Time</Text>
              <Text style={styles.orderDateText}>{formatDate(order?.updatedAt)}</Text>
            </View>
          </View>

          <View style={trackPageStyles.orderItemHeadingContainer}>
            <Text style={trackPageStyles.orderItemHeading}>Item Detail(s)</Text>
          </View>
          <View style={trackPageStyles.orderItemAlign}>
            <OrderItems />
          </View>

          <OrderStatus />

          <TouchableOpacity 
            style={trackPageStyles.borderSummaryBtn} 
            onPress={() => setOpenOrderSummary(prev => !prev)}
          >
            <Text style={trackPageStyles.orderSummarybtnText}>Order Summary</Text>
            <AntDesign name={openOrderSummary ? "up" : "down"} size={24} color="black" />
          </TouchableOpacity>

          {openOrderSummary && order && (
            <View style={trackPageStyles.OrderSummaryDropdownContainer}>
              <View style={styles.summaryBox}>
                <Text style={styles.OrderSummary}>Order Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text style={styles.summaryValue}>₹{order.subtotal.toFixed(2)}</Text>
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
                  <Text style={styles.totalValue}>₹{(order.subtotal + 5 + 2.5 - 3).toFixed(0)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.payByLabel}>Pay By</Text>
                  <Text style={styles.cod}>COD/TNPL</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLOR.primary,
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  deliveryBoyImage: {
    width: 180,
    height: 163,
  },
  orderPackText: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  deliveryBoyProfileImage: {
    width: 40,
    height: 40,
  },
  deliveryBoyName: {
    fontSize: 16,
    fontWeight: '500',
  },
  deliveryBoyRole: {
    color: 'grey',
    fontSize: 16,
  },
  orderIdText: {
    color: "gray",
    fontSize: 16,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  orderDateText: {
    color: "gray",
    fontSize: 16,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  medicineImage: {
    width: 38,
    height: 40,
  },
  quantityText: {
    fontSize: 14,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 12
  },
  orderItemContainer: {
    backgroundColor: COLOR.light,
    padding: 8,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    position: "relative"
  },
  orderItemQuantityContainer: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "white",
    padding: 2,
    borderRadius: 12,
    alignItems: "center"
  },
  OrderSummary: {
    fontWeight: 'bold',
    fontSize: 15,
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
});

const trackPageStyles = StyleSheet.create({
  orderStatusContainer: {
    padding: 17,
    backgroundColor: COLOR.light,
    flexDirection: "row",
  },
  orderStatusItems: {
    width: screen.width / 4.2,
    justifyContent: "center",
    alignItems: "center",
  },
  statusTitle: {
    textAlign: "center"
  },
  orderIdContainer: {
    justifyContent: "space-between",
    padding: 20,
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 25,
  },
  orderStatusTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginInline: 10,
  },
  orderItemAlign: {
    flexDirection: "row",
    gap: 7,
    padding: 12,
    flexWrap: "wrap",
    marginTop:0
  },
  orderItemHeadingContainer: {
    padding: 12,
    marginHorizontal: 16,
    marginTop: 5,
  },
  orderItemHeading: {
    fontWeight: "600",
    fontSize: 14
  },
  borderSummaryBtn: {
    marginTop: 0,
    marginHorizontal: 12,
    padding: 12,
    backgroundColor: COLOR.light,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  orderSummarybtnText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  OrderSummaryDropdownContainer: {
    backgroundColor: COLOR.light,
    marginHorizontal: 12
  },
  deliveryBoyETA: {
    padding: 16,
    flexDirection: "row",
    margin: 10,
    borderWidth: 3,
    borderColor: "gray",
    borderRadius: 12,
    alignItems: "center",
  },
  ETAContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  arriving: {
    fontSize: 15,
    color: "gray",
    marginBottom: 12,
    marginHorizontal: 16,
    marginVertical: 25,
  },
  ETA: {
    fontSize: 20,
    color: COLOR.primary,
    marginHorizontal: 12,
    marginBottom: 12
  },
  way: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    marginHorizontal: 12,
  },
  deliveryBoyContainer: {
    margin: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 24
  },
  deliveryBoyDetailsContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingHorizontal: 12
  },
  deliveryIconsContainer: {
    flexDirection: "row",
    gap: 6,
    marginRight: 12
  },
  iconsBtn: {
    padding: 4,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  outerCircle: {
    backgroundColor: "#00A99D",
    height: 160,
    width: 160,
    borderRadius: 80,
    paddingRight: 20,
    justifyContent: 'center',
  },
  innerCircle: {
    backgroundColor: 'white',
    height: 140,
    width: 140,
    borderRadius: 70,
    alignItems: 'center',
    marginHorizontal: 9,
  },
  orderpack: {
    backgroundColor: '#D5ECE9',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
  }
});