import OrderStatus from '@/components/OrdersComponents/OrderStatus';
import StatusHeader from '@/components/OrdersComponents/StatusHeader';
import { COLOR, screen } from '@/constants/color';
import { userAuth } from '@/Context/authContext';
import { useOrderActive } from '@/Context/orderContext';
// import { useOrderActive } from '@/Context/orderContext';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';





export default function TrackOrder() {
  const [openOrderSummary, setOpenOrderSummary] = useState(false);
  const { ActiveOrderId } = useOrderActive();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const { ExtractParseToken } = userAuth();

  console.log("this is from orders tracking page" , ActiveOrderId)


const fetchOrderData = useCallback(async () => {
  const tokenAuth = await ExtractParseToken();
  if (!tokenAuth) {
    setError('Token not found');
    return;
  }
  try {
    const options = {
      headers: {
        "Authorization":` Bearer ${tokenAuth}`
      },
    };
    const response = await fetch(`http://192.168.1.16:3000/api/orderbyid/${ActiveOrderId}`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch order data');
    }
    const data = await response.json();
    setOrder(data.order);
  } catch (error) {
    setError(error.message);
  }
}, [ActiveOrderId]);

useFocusEffect(
  useCallback(() => {
    fetchOrderData();
    const intervalId = setInterval(fetchOrderData, 5000);
    return () => clearInterval(intervalId);
  }, [fetchOrderData])
);

  const handleCall = (phone) =>{
    let phoneNumber = `tel:${phone}`;
  Linking.openURL(phoneNumber);
  }

  const StatusRender = ({ title, icons }) => (
    <View style={trackPageStyles.orderStatusItems}>
      <View>{icons}</View>
      <Text style={trackPageStyles.statusTitle}>{title}</Text>
    </View>
  );

  const generateOrderId = ()=>{
    const standaredId = ActiveOrderId
    return standaredId
  }

  const OrderItems = () => {
    if (error) {
      return <Text>Error: {error}</Text>;
    }

    if (!order) {
      return <Text>Loading...</Text>;
    }

    if (!order.medicines || order.medicines.length === 0) {
      return <Text>No medicines found</Text>;
    }

   

    console.log("this is order" , order)

    return (
      <View style={styles.orderItemsContainer}>
        {order.medicines.map((medicine, index) => (
          <View key={index} style={styles.orderItemContainer}>
            <Image
              source={medicine.imageUrl ?{ uri: medicine.imageUrl } : require("@/assets/images/Categories/babyoil.png")}
              style={{ width: 40, height: 40 }}
            />
            <View style={styles.orderItemQuantityContainer}>
              <Text>x{medicine.quantity}</Text>
              <Text>{`₹${medicine.price}`}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

   const formatedDate = ()=>{
      const orderDate = new Date(order.updatedAt)
      const dateFormate = `${orderDate.getDate()}/${orderDate.getMonth()}/${orderDate.getFullYear()}`
      return dateFormate
    }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <StatusHeader title={"Track Order"} />
        <View style={trackPageStyles.deliveryBoyETA}>
          <Image source={require("@/assets/images/deliveryboy.png")} style={{ width: 160, height: 180 }} />
          <View style={trackPageStyles.ETAContainer}>
            <Text style={trackPageStyles.arriving}>Arriving in</Text>
            <Text style={trackPageStyles.ETA}>10 MINS</Text>
            <Text style={trackPageStyles.way}>On the way</Text>
          </View>
        </View>

        <View style={trackPageStyles.deliveryBoyContainer}>
          <View style={trackPageStyles.deliveryBoyDetailsContainer}>
            <Image source={require("@/assets/images/deliveryProfile.png")} style={{ width: 40, height: 40 }} />
            <View>
              {/* <Text>Amith Kumar</Text>
              <Text>Heal Porter</Text> */}
              <Text>
      {
        order?.deliveryboy_id
          ? order.deliveryboy_id.name ||
            `${order.deliveryboy_id.firstName || ''} ${order.deliveryboy_id.lastName || ''}`.trim()
          : 'Delivery Boy'
      }
      </Text>
          
            </View>
          </View>
          <View style={trackPageStyles.deliveryIconsContainer}>
            <TouchableOpacity style={trackPageStyles.iconsBtn } onPress={()=>{handleCall(order.deliveryboy_id.mobileNumber)}}>
              <Ionicons name='call' size={20} color={COLOR.primary} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={trackPageStyles.iconsBtn }>
              <MaterialCommunityIcons name="message-text" size={20} color={COLOR.primary} />
            </TouchableOpacity> */}
          </View>
        </View>

        {/* <View style={trackPageStyles.orderStatusContainer}>
          {orderStatusList.map(item => (
            <StatusRender key={item.id} title={item.title} icons={item.icon} />
          ))}
        </View> */}
     

        <View style={trackPageStyles.orderIdContainer}>
          <View>
            <Text style={trackPageStyles.orderStatusTitle}>Order ID</Text>
            <Text style={{color:"gray"}}>{generateOrderId() || 'N/A'}</Text>
          </View>
          <View>
            <Text style={trackPageStyles.orderStatusTitle}>Order Date & Time</Text>
            <Text style={{color:"gray"}}>{order?.updatedAt || Date.now()}</Text>
          </View>
        </View>

        <View style={trackPageStyles.orderItemHeadingContainer}>
          <Text style={trackPageStyles.orderItemHeading}>Order Detail(s)</Text>
        </View>
        <View style={trackPageStyles.orderItemAlign}>
          <OrderItems />
        </View>


         <OrderStatus/>


        <TouchableOpacity style={trackPageStyles.borderSummaryBtn} onPress={() => setOpenOrderSummary(prev => !prev)}>
          <Text style={trackPageStyles.orderSummarybtnText}>Order Summary</Text>
          <AntDesign name={openOrderSummary ? "up" : "down"} size={24} color="black" />
        </TouchableOpacity>

        {openOrderSummary && (
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
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginHorizontal: 12,
  },
  orderStatusTitle: {
    fontWeight: "bold",
  },
  orderItemAlign: {
    flexDirection: "row",
    gap: 7,
    padding: 12,
    flexWrap: "wrap"
  },
  orderItemHeadingContainer: {
    padding: 12,

    marginHorizontal: 20,
  },
  orderItemHeading: {
    fontWeight: "600",
    fontSize: 14
  },
  borderSummaryBtn: {
    marginTop: 12,
    marginHorizontal: 12,
    padding: 12,
    backgroundColor: COLOR.light,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  orderSummarybtnText: {
    fontWeight: "bold",
    fontSize: 18
  },
  OrderSummaryDropdownContainer: {
    backgroundColor: COLOR.light,
    marginHorizontal: 12
  },
  deliveryBoyETA: {
    padding: 12,
    flexDirection: "row",
    margin: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 12,
    alignItems: "center"
  },
  ETAContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20
  },
  arriving: {
    fontSize: 15,
    color: "gray",
    marginBottom: 12
  },
  ETA: {
    fontSize: 20,
    color: COLOR.primary,
    marginBottom: 12
  },
  way: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12
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
  }
});

const styles = StyleSheet.create({
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
});
