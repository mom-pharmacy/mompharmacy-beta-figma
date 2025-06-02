import apiClient from "@/utils/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext({
    ActiveOrderId:null,
    updateActiveOrder:(orderId)=>{}
})

export function OrderProvider({children}){

    const [ActiveOrderId , setActiveOrder] = useState(null)

    async function getActiveOrders(){
        const token = await AsyncStorage.getItem("jwt_token")
        const parsedToken = JSON.parse(token)
        console.log("this is token from orders:",token)
        try{
            const options = {
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${parsedToken}`,
                    "Content-Type":"application/json"
                }
            }
            const activeOrders = await apiClient("api/activeOrder" , options)
            console.log("this is active order",activeOrders)
            setActiveOrder(activeOrders.data[0]._id)
        }catch(error){
            console.log("Error in fetching active orders" , error)
        }
    }

    function updateActiveOrder(orderId){
        setActiveOrder(orderId)
    }

    useEffect(()=>{
        getActiveOrders()
    } , [])

    
    return <OrderContext.Provider value={{ActiveOrderId , updateActiveOrder}}>
        {children}
    </OrderContext.Provider>
}

export function useOrderActive(){
    const context = useContext(OrderContext)
    if(!context) throw new Error("Order Context not found")
    return context
}
