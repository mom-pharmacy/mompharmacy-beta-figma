import AntDesign from '@expo/vector-icons/build/AntDesign'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function footer() {
  return (
    
    <View>
        <Text style={{ textAlign: 'center', color: 'gray', marginBottom: 40, marginTop:30 }}>PROD - v 1.0.1(2)</Text>

        <Text style={{ fontSize: 29, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: 'gray' }}>Care Like Your <AntDesign name="heart" size={24} color="red" /> mom </Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: 'gray' }}>Made Love With mom Fam</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'gray' }}>Powered by </Text>
        <View style={{flexDirection:'row',padding:20,marginLeft:50}}>
            <View style={{flexDirection:'column',flex:1}}>
        <Image source={require('../../assets/images/mom.png') } style={{height:90,width:100}} /> 
        <Text>mom pharmacy</Text> 
        </View>
        <View style={{flexDirection:'column',flex:1}}>
           <Image source={require('../../assets/images/momlab.png') } style={{height:90,width:100}} /> 
           <Text>mom labs</Text>
           </View>       
        </View>



    </View>

  )
}

const styles = StyleSheet.create({
    popular2: {
        backgroundColor: "white",
        height: 'auto',

    },
    popular: {

        marginTop: 20,
        marginLeft: 15,
    },
    pop: {
        fontSize: 20,
        fontWeight: "bold",

    },
})