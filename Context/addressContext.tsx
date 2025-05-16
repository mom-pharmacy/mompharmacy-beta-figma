import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";


const AddressContext = createContext(null)

export const AddressProvider = ({ children }) => {

    const [primaryAddress, setPrimaryAddress] = useState("")
    const [address, setAddress] = useState([])

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



    async function setAddressAsPrimary() {
        try{
            const options = {} 
            const response = await fetch("" , options)
        }catch(e){
            console.log("Error in updating address", e)
        }
    }

    function addAddress() {

    }

    function deleteAddress() {

    }


    return <AddressContext.Provider value={{ primaryAddress, address }}>
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