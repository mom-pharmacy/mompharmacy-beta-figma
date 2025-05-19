import OrderStatus from '@/components/OrdersComponents/OrderStatus';
import OrderSummary from '@/components/OrdersComponents/OrderSummary';
import StatusHeader from '@/components/OrdersComponents/StatusHeader';
import { COLOR, screen } from '@/constants/color';
import { userAuth } from '@/Context/authContext';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export default function TrackOrder() {
  const [openOrderSummary, setOpenOrderSummary] = useState(false);
  const { orderId } = useLocalSearchParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const { ExtractParseToken } = userAuth();

  useEffect(() => {
    const fetchOrderData = async () => {
      const tokenAuth = await ExtractParseToken();
      if (!tokenAuth) {
        setError('Token not found');
        return;
      }
      try {
        const options = {
          headers:{
            "Authorization":`Bearer ${tokenAuth}`
          }
        }
        const response = await fetch(`https://mom-beta-server1.onrender.com/api/orderbyid/${orderId}` , options);
        console.log("this is from order " ,response)
        if (!response.ok) {
          throw new Error('Failed to fetch order data');
        }
        const data = await response.json();
        setOrder(data.order);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrderData();
  }, [orderId]);

  const StatusRender = ({ title, icons }) => (
    <View style={trackPageStyles.orderStatusItems}>
      <View>{icons}</View>
      <Text style={trackPageStyles.statusTitle}>{title}</Text>
    </View>
  );

  const generateOrderId = ()=>{
    const standaredId = orderId.slice(0 , 10).toString().toUpperCase() 
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
              source={medicine.image ?{ uri: medicine.image } : require("@/assets/images/Categories/babyoil.png")}
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

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <StatusHeader />
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
              <Text>Amith Kumar</Text>
              <Text>Heal Porter</Text>
            </View>
          </View>
          <View style={trackPageStyles.deliveryIconsContainer}>
            <TouchableOpacity style={trackPageStyles.iconsBtn}>
              <Ionicons name='call' size={20} color={COLOR.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={trackPageStyles.iconsBtn}>
              <MaterialCommunityIcons name="message-text" size={20} color={COLOR.primary} />
            </TouchableOpacity>
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
            <Text style={{color:"gray"}}>21 DEC 2024 1:00PM</Text>
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
            <OrderSummary />
          </View>
        )}
      </ScrollView>
    </View>
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
  }
});
