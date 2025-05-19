import * as Location from "expo-location";
import React, { createContext, useContext, useEffect, useState } from "react";

// Types
type LocationType = {
  latitude: number;
  longitude: number;
};

type GoogleLocType = {
  pincode: string;
  street: string;
  city: string;
  country: string;
};

type LocationContextType = {
  location: LocationType | null;
  address: string;
  shortAddress: string;
  setLocation: (location: LocationType) => void;
  updateAddress: (lat: number, lon: number) => Promise<void>;
  googleLoc: GoogleLocType;
  city: string;
  country: string;
};

// Context
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Provider
export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [address, setAddress] = useState("Fetching location...");
  const [shortAddress, setShortAddress] = useState("Fetching location...");
  const [googleLoc, setGoogleLoc] = useState<GoogleLocType>({
    pincode: "",
    street: "",
    city: "",
    country: "",
  });

  const updateAddress = async (latitude: number, longitude: number) => {
    try {
      const res = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (res.length > 0) {
        const loc = res[0];
        const full = `${loc.name || ""}, ${loc.street || ""}, ${loc.city || ""}, ${loc.region || ""}, ${loc.country || ""}, ${loc.postalCode || ""}`;
        const short = `${loc.name || ""}, ${loc.city || ""}`;

        setGoogleLoc({
          pincode: loc.postalCode || "",
          street: loc.street || "",
          city: loc.city || "",
          country: loc.country || "",
        });

        setShortAddress(short);
        setAddress(full);

        console.log("Location updated:", { short, full });
      }
    } catch (err) {
      console.error("Error updating address", err);
      setAddress("Error fetching address");
      setShortAddress("Error fetching address");
    }
  };

  const fetchInitialLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };
    setLocation(coords);
    await updateAddress(coords.latitude, coords.longitude);
  };

  useEffect(() => {
    fetchInitialLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        address,
        shortAddress,
        setLocation,
        updateAddress,
        googleLoc,
        city: googleLoc.city,
        country: googleLoc.country,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Hook
export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocationContext must be used within LocationProvider");
  return context;
};
