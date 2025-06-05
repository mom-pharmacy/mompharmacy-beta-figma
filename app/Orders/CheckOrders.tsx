
import React from "react";
import { useOrderActive } from "@/Context/orderContext"
import { useEffect } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import ActiveOrderItems from "@/components/TrackOrder/ActiveOrderItems";

function CheckOrders() {
  const {orderIDs} = useOrderActive()
  console.log("this is order ids from check orders", orderIDs)

  return <ScrollView style={styles.container}>
        <Text style={styles.header}>Multiple orders</Text>
        {orderIDs.map(item=><ActiveOrderItems activeOrderId={item} />)}
        </ScrollView>
  
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