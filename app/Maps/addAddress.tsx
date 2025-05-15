import { useLocationContext } from "@/Context/locationContext";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import MapView, { MapPressEvent, Marker, PoiClickEvent, Region } from "react-native-maps";


const AddAddress = () => {
  const { location, address, setLocation, updateAddress } = useLocationContext();

  const [region, setRegion] = useState<Region>({
    latitude: location?.latitude || 17.385044,
    longitude: location?.longitude || 78.486671,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    if (location) {
      setRegion(prev => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    }
  }, [location]);

  const setLocationAndAddress = async (coordinate: { latitude: number; longitude: number }) => {
    setLocation(coordinate);
    await updateAddress(coordinate.latitude, coordinate.longitude);
  };

  const handleMapPress = async (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    await setLocationAndAddress(coordinate);
  };
  const handlePoiClick = async (event: PoiClickEvent) => {
    const { coordinate } = event.nativeEvent;
    setLocationAndAddress(coordinate);
    await updateAddress(coordinate.latitude, coordinate.longitude);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight onPress={() => router.push('/Maps/myAddress')}>
          <AntDesign name="arrowleft" size={26} color="black" />
        </TouchableHighlight>
        <Text style={styles.title}>Select Address</Text>
      </View>

      <MapView
        style={styles.map}
        region={region}
        onPress={handleMapPress}
        onPoiClick={handlePoiClick}
        showsUserLocation
      >
        {location && <Marker coordinate={location} />}
      </MapView>

      <View style={styles.addressContainer}>
        <Text style={styles.label}>Selected Location</Text>
        <Text style={styles.address}>{address || "Fetching address..."}</Text>
      </View>

      <View style={styles.saveButtonWrapper}>
        <TouchableHighlight
          style={styles.saveButton}
          onPress={() => router.push({ pathname: './confirmAddress', params: { address: address || '' } })}
        >
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: { flexDirection: 'row', gap: 15, padding: 15, alignItems: 'center' },
  title: { fontSize: 15, fontWeight: 'bold' },
  map: { flex: 1 },
  addressContainer: { padding: 15, backgroundColor: "#fff", borderTopColor: "#ccc", borderTopWidth: 1 },
  label: { fontWeight: "bold", marginBottom: 5, fontSize: 22 },
  address: { fontSize: 15, color: "#333" },
  saveButtonWrapper: { alignItems: 'center' },
  saveButton: { height: 50, width: 350, backgroundColor: "#00a99d", borderRadius: 10, margin: 10, alignItems: 'center', justifyContent: 'center' },
  saveButtonText: { color: "white", fontSize: 18 },
});