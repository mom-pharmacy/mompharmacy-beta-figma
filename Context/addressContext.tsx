import React, { createContext, useContext, useEffect, useState } from "react";


const AddressContext = createContext(null)

export const AddressProvider = ({ children }) => {

    const [primaryAddress, setPrimaryAddress] = useState("")
    const [address, setAddress] = useState([])

    useEffect(() => {
        async function getAddress() {
            try {
                const options = {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODBmNTAyZTJhZjgzMTM5ODFjMDdjOTUiLCJpYXQiOjE3NDU4NDE3NjV9.Rw2q8d83dOOSvqlusMd-7IOW2QBCl8KT6_sCnEzTlcQ",
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch("https://mom-beta-server1.onrender.com/address/address", options)
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
            
                }
            } catch (e) {
                console.log("Error in Fetching data", e)
            }
        }
        getAddress()
    }, [])


    function updateAddress() {

    }

    function setAddressAsPrimary() {

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