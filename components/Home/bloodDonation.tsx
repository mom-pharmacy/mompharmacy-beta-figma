import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
const BloodDonation = () => (
  <View style={styles.container}>
    <View >
        <Image source={require('../../assets/images/blooddonation.jpeg')} style={{height:32,width:24.54}} />
    </View>
    <View style={styles.buttontext} >
    <Text style={{fontWeight:600, fontSize:16, color:'#444444'}}>Blood Donation</Text>
    <Text style={{fontWeight:400, fontSize:14, color:'#444444'}}>Want to donate blood ?</Text>
    </View>
    <Text style={styles.register} onPress={()=>{router.push('/BloodDonor/front')}}>Register Now </Text>
    <MaterialIcons name="arrow-forward" size={40} style={{fontSize:30,color:"#B5000A"}} />
    
  </View>
);
const styles=StyleSheet.create({
    container:{
        height:62,
        borderRadius:10,
        backgroundColor:'#B5000A0D',
        padding:12,
        paddingHorizontal:5,
        borderColor:'#B5000A',
        borderWidth:1,
        flexDirection:'row',
        paddingVertical:10,
        paddingLeft:10


    },
    buttontext:{
        marginLeft:10,
        marginTop:-4,
    },
    register:{
        color:"#B5000A",
        fontWeight:600,
        fontSize:16,
        width:125.75,
        paddingVertical:5,
        paddingLeft:30,
        
    }
})


export default BloodDonation