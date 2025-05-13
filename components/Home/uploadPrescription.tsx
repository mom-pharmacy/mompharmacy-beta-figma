import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const UploadPrescription = () => (
     <TouchableOpacity onPress={() => { router.push("/prescription") }}>
    <View style={styles.container}>
       
        <View >
            <Image source={require('../../assets/images/prescription.jpeg')} style={{ height: 32, width: 24.54, }} />
        </View>
        <View style={styles.buttontext}>
            <Text style={{ fontWeight: 600, fontSize: 16, color: '#444444' }}>Upload Prescription</Text>
            <Text style={{ fontWeight: 400, fontSize: 14, color: '#444444' }}>Need a quick Service ?</Text>
        </View>
        
            
                <Text style={styles.register}>Upload Now </Text>
                <MaterialIcons name="arrow-forward" size={40} style={{ fontSize: 30, color: "#00a99d" }} />
            
        
    </View>
    </TouchableOpacity>

);
const styles = StyleSheet.create({
    container: {
        height: 62,
        borderRadius: 10,
        backgroundColor: '#007E710D',
        padding: 12,
        paddingHorizontal: 5,
        borderColor: '#007E71',
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: 10


    },
    buttontext: {
        marginLeft: 10,
        marginTop: -4,
    },
    register: {
        color: "#007E71",
        fontWeight: 600,
        fontSize: 16,
        width: 125.75,
        paddingVertical: 5,
        paddingLeft: 30,

    }
})


export default UploadPrescription