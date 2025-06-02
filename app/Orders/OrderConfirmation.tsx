import { useOrderActive } from '@/Context/orderContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OrderConfirmationModal = ({ visible, orderId }) => {
  console.log("hhgh", orderId)
  const {updateActiveOrder} = useOrderActive()

  function handleTrackOrder(){
     updateActiveOrder(orderId)
     router.replace({
                pathname: './TrackOrder',
                params: { orderId }
              })
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle-outline" size={100} color="#007F5F" />
          </View>
          <Text style={styles.title}>Order confirmed</Text>
          <Text style={styles.subtitle}>Your order is on its way</Text>

          <TouchableOpacity style={styles.button} onPress={handleTrackOrder}>
            <Text style={styles.buttonText}>Track Your Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#C8F3EA',
    padding: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: '#007F5F',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default OrderConfirmationModal;