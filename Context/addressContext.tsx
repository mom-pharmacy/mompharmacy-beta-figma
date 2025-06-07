

import apiClient from "@/utils/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { userAuth } from "./authContext";
import LoadingScreen from "../app/ErrorScreens/loadingscreen";
import Page404 from "../app/ErrorScreens/page404";

const AddressContext = createContext(null);

export const AddressProvider = ({ children }) => {
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 

  const { ExtractParseToken, userDetails } = userAuth();

  useEffect(() => {
    async function getAddress() {
      setLoading(true);
      setError(false);

      try {
        const token = await AsyncStorage.getItem("jwt_token");
        const parsedToken = JSON.parse(token);

        const options = {
          headers: {
            Authorization: `Bearer ${parsedToken}`,
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          "https://mom-beta-server1.onrender.com/address/address", options)

        if (response.ok) {
          const data = await response.json();
          setAddress(data.data);
        } else {
          console.error("Fetch error:", response.status);
          setError(true); 
        }
      } catch (e) {
        console.error("Error in Fetching data", e);
        setError(true); 
      } finally {
        setLoading(false);
      }
    }

    getAddress();
  }, []);

  useEffect(() => {
    if (userDetails) setPrimaryAddress(userDetails.primaryAddress);
  }, [userDetails]);

  async function setAddressAsPrimary(addressId) {
    setPrimaryAddress(addressId);
    const authToken = await ExtractParseToken();

    try {
      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await apiClient(`address/make-primary/${addressId}`, options);
      return !!response;
    } catch (e) {
      console.error("Error in updating address", e);
      return false;
    }
  }

  async function addAddress(data) {
    const authToken = await ExtractParseToken();
    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await apiClient("address/add-address", options);

      if (response) {
        setAddressAsPrimary(response.address._id);
        setAddress((prev) => [...prev, response.address]);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error("Error in adding address", e);
      return false;
    }
  }

  function getPrimaryAddress() {
    if (!address) return null;
    const primaryAddressFull = address.find((item) => item._id === primaryAddress);
    if (primaryAddressFull) {
      return `${primaryAddressFull.street},${primaryAddressFull.pincode},${primaryAddressFull.city},${primaryAddressFull.state}`;
    }
    return null;
  }

  async function deleteAddress(id) {
    const authToken = await ExtractParseToken();
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await fetch(
        `https://mom-beta-server1.onrender.com/address/delete/${id}`,
        options
      );
      const data = await response.json();

      if (response.ok) {
        setAddress((prev) => prev.filter((item) => item._id !== id));
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

 
  if (loading)
     return <LoadingScreen />;
  if (error)
     return <Page404 />;

  return (
    <AddressContext.Provider
      value={{
        primaryAddress,
        address,
        addAddress,
        deleteAddress,
        setAddressAsPrimary,
        getPrimaryAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("Address context not found");
  }
  return context;
};
