import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { userAuth } from "./authContext";


const AddressContext = createContext(null)

export const AddressProvider = ({ children }) => {

    const [primaryAddress, setPrimaryAddress] = useState(null)
    const [address, setAddress] = useState([])

    const {ExtractParseToken , userDetails} = userAuth()
  
    

    useEffect(() => {
        async function getAddress() {
            const token = await AsyncStorage.getItem('jwt_token')
            const parsedToken = JSON.parse(token)
            try {
                const options = {
                    headers: {
                        "Authorization": `Bearer ${parsedToken}`,
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch("https://mom-beta-server1.onrender.com/address/address", options)
                if (response.ok) {
                    const data = await response.json()
                    setAddress(data.data)
            
                }else{
                    console.log("something is" , response)
                }
            } catch (e) {
                console.log("Error in Fetching data", e)
            }
        }
        getAddress()
    }, [])

    useEffect(()=>{
        const primary = address.filter(item=>{
            console.log(item)
            return item._id===userDetails.primaryAddress
    })
        console.log("this is primary address" , primary)
        setPrimaryAddress(primary[0])
    } , [])



    async function setAddressAsPrimary() {
        const authToken = await ExtractParseToken()
        try{
            const options = {
                method:"PUT",
                headers:{
                    "Authorization":`Bearer ${authToken}`,
                    "Content-Type":"application/json"
                }
            } 
            const response = await fetch("https://mom-beta-server1.onrender.com/address/make-primary" , options)
            if(response.ok){
                return true
            }else{
                return false
            }
        }catch(e){
            console.log("Error in updating address", e)
            return false
        }
    }

    async function addAddress(data) {
         console.log("this is data" , data)
        const authToken = await ExtractParseToken()
        try{
            const options = {
                method:"POST" , 
                headers:{
                    "Authorization":`Bearer ${authToken}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
            const response = await fetch("https://mom-beta-server1.onrender.com/address/add-address" , options)
            const responseData = await response.json() 
            if(response.ok){
                console.log(responseData)
                setAddress(prev=>{
                    const newAddress = [...prev , responseData.address]
                    return newAddress
                })
                return true 

            }else{
                console.log(responseData)
                return false 
            }
        }catch(e){
            console.log("Error in adding address" , e)
            return false 
        }
    }

    async function deleteAddress(id) {
        const authToken = await ExtractParseToken()
        console.log("this is" , authToken)
        
        try{
            const options = {
                method:"DELETE" , 
                headers:{
                    "Authorization":`Bearer ${authToken}`
                }
            }
            const response = await fetch(`https://mom-beta-server1.onrender.com/address/delete/${id}` ,options)
            const data = await response.json()
            console.log("deleting the address" , data)
            if(response.ok){
                setAddress(prev=>{
                    const filtered = prev.filter(item=>item._id!==id)
                    return filtered
                })
                return true
            }else{
                return false
            }
        }catch(e){
            return false ;
        }
    }


    return <AddressContext.Provider value={{ primaryAddress, address , addAddress , deleteAddress , setAddressAsPrimary  }}>
        {children}
    </AddressContext.Provider>
}

export const useAddress = () => {
    const context = useContext(AddressContext)
    if (!context) {
        throw new Error("Addresss context not found")
    }
    return context
}