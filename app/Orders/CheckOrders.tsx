
import React from "react";
import { useOrderActive } from "@/Context/orderContext"
import { useEffect } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import ActiveOrderItems from "@/components/TrackOrder/ActiveOrderItems";
import LoadingScreen from "../ErrorScreens/loadingscreen";
import { SafeAreaView } from "react-native-safe-area-context";

function CheckOrders() {
  const {orderIDs , loadingOrders} = useOrderActive()
  console.log("this is order ids from check orders", orderIDs)

  if(loadingOrders) return <LoadingScreen/>

  return  <SafeAreaView style={{flex:1}}>
    <ScrollView style={styles.container}>
        <Text style={styles.header}>Multiple orders</Text>
        {orderIDs.map(item=><ActiveOrderItems activeOrderId={item} />)}
        </ScrollView>
        </SafeAreaView>
  
}

export default CheckOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
})