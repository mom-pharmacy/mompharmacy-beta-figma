import OrderSummary from '@/components/OrdersComponents/OrderSummary';
import StatusHeader from '@/components/OrdersComponents/StatusHeader';
import { COLOR, screen } from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const orderStatusList = [
    {
        id: 1,
        title: "Order Confirmed",
        isDone: false,
        icon: <Feather name="check-circle" size={24} color={COLOR.primary} />
    },
    {
        id: 2,
        title: "Order Packed",
        isDone: false,
        icon: <Octicons name="package" size={24} color={COLOR.primary} />
    },
    {
        id: 3,
        title: "Dispatched on the way",
        isDone: false,
        icon: <Feather name="truck" size={24} color={COLOR.primary} />
    },
    {
        id: 4,
        title: "Order Delivered",
        isDone: false,
        icon: <FontAwesome name="handshake-o" size={24} color="black" />
    },
]

const orderList = [
    {
        imageUrl: "ajajhdkjkajdfklaljhdf",
        quantity: 1
    },
    {
        imageUrl: "ajajhdkjkajdfklaljhdf",
        quantity: 1
    },
    {
        imageUrl: "ajajhdkjkajdfklaljhdf",
        quantity: 1
    },
    {
        imageUrl: "ajajhdkjkajdfklaljhdf",
        quantity: 1
    },
]

export default function TrackOrder() {

    const [openOrderSummary , setOpenOrderSummary] = useState(false)

    function StatusRender({ title, icons }) {
        return <View style={trackPageStyles.orderStatusItems} >
            <View>
                {icons}
            </View>
            <View>
                <Text style={trackPageStyles.statusTitle}> {title}</Text>
            </View>
        </View>
    }

    function OrderItems({ ordersItem }) {
        return <View style={trackPageStyles.orderItemContainer}>
            <Image source={require("@/assets/images/stepsils.png")} style={{ width: 40, height: 40 }} />
            <View style={trackPageStyles.orderItemQuantityContainer}>
                <Text>x1</Text>
            </View>
        </View>
    }


    console.log(openOrderSummary)

    return (
        <View style={{backgroundColor:"white"}}>
        <ScrollView>
            <StatusHeader />
            <View style={trackPageStyles.deliveryBoyETA}>
                <Image source={require("@/assets/images/delivery.png")} style={{width:160 , height:180}} />
                <View style={trackPageStyles.ETAContainer}>
                    <Text style={trackPageStyles.arriving}>Arriving in</Text>
                    <Text style={trackPageStyles.ETA}>10 MINS</Text>
                    <Text style={trackPageStyles.way}>On the way</Text>
                </View>
            </View>

            <View style={trackPageStyles.deliveryBoyContainer}>
                <View style={trackPageStyles.deliveryBoyDetailsContainer}>
                    <Image source={require("@/assets/images/deliveryboy.png")} style={{width:40 , height:40}}/>   
                    <View>
                        <Text>Amith Kumar</Text>
                        <Text>Heal Potter</Text>
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
            <View style={trackPageStyles.orderStatusContainer}>
                {orderStatusList.map(item => <StatusRender key={item.id} title={item.title} icons={item.icon} />)}
            </View>
            <View style={trackPageStyles.orderIdContainer}>
                <View>
                    <Text style={trackPageStyles.orderStatusTitle} >Order ID</Text>
                    <Text>48475893457</Text>
                </View>
                <View>
                    <Text style={trackPageStyles.orderStatusTitle}>Order Date & Time</Text>
                    <Text>21 DEC 2024 1:00PM</Text>
                </View>
            </View>
            <View style={trackPageStyles.orderItemHeadingContainer}>
                <Text style={trackPageStyles.orderItemHeading}>Order Detail(s)</Text>
            </View>
            <View style={trackPageStyles.orderItemAlign}>
            {orderList.map(item=><OrderItems ordersItem={item}/>)}
            </View>
            <TouchableOpacity style={trackPageStyles.borderSummaryBtn} onPress={()=>setOpenOrderSummary(prev=>!prev)}>
                <Text style={trackPageStyles.orderSummarybtnText}>Order Summary</Text>
                <View>
                <AntDesign name={`${openOrderSummary?"up":"down"}`} size={24} color="black"  />
                </View>
            </TouchableOpacity>
                {openOrderSummary && <View style={trackPageStyles.OrderSummaryDropdownContainer}><OrderSummary/></View>}

        </ScrollView>
        </View>
    )
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
        justifyContent: "space-around",
        padding: 20
    },
    orderStatusTitle: {
        fontWeight: "bold",
    },
    orderItemContainer: {
        backgroundColor: COLOR.light,
        padding: 8,
        width:70,
        height:70,
        justifyContent:"center",
        alignItems:"center" ,
        borderRadius:12
    },
    orderItemAlign:{
        flexDirection:"row",
        gap:7 , 
        padding:12
    },
    orderItemHeadingContainer:{
        padding:12 , 
        paddingHorizontal:20 ,
        
    },
    orderItemHeading:{
        fontWeight:"semibold",
        fontSize:14 
    },
    orderItemQuantityContainer:{
        position:"absolute" ,
        top:-10 ,
        right:0 ,
        backgroundColor:"white",
        padding:2,
        borderRadius:12
    },
    borderSummaryBtn:{
        marginTop:12 ,
        marginHorizontal:12 , 
        padding:12 , 
        backgroundColor:COLOR.light,
        flexDirection:"row" , 
        justifyContent:"space-between",
        paddingHorizontal:20
    },
    orderSummarybtnText:{
        fontWeight:"bold",
        fontSize:18
    } , 
    OrderSummaryDropdownContainer:{
        backgroundColor:COLOR.light , 
        marginHorizontal:12
    } , 
    deliveryBoyETA:{
        padding:12 , 
        flexDirection:"row",
        margin:20 ,
        borderWidth:1 , 
        borderColor:"gray" ,
        borderRadius:12 , 
        alignItems:"center"

    },
    ETAContainer:{
        justifyContent:"center",
        alignItems:"center" ,
        marginLeft:20
    },
    arriving:{
    fontSize:15 ,
    color:"gray",
    marginBottom:12 
    },
    ETA:{
        fontSize:20 ,
        color:COLOR.primary,
        marginBottom:12 
    },
    way:{
        fontSize:18 , 
        fontWeight:"bold",
        marginBottom:12 
    } , 
    deliveryBoyContainer:{
        margin:12 , 
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:24
    },
    deliveryBoyDetailsContainer:{
        flexDirection:"row" ,
        gap:6 ,
        alignItems:"center",
        paddingHorizontal:12

    },
    deliveryIconsContainer:{
        flexDirection:"row",
        gap:6 , 
        marginRight:12
        
    },
    iconsBtn:{
        padding:4 , 
        borderWidth:1 , 
        borderColor:"gray" ,
        borderRadius:20,
        width:30 , 
        height:30
    }
})