import { router } from 'expo-router'
import React from 'react'
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons'

export default function Cart() {
    return (
        <View>
            <TouchableOpacity onPress={() => router.push('/BottomNavbar/cart')}>
                <Image source={require('../../assets/images/cart.jpeg')} style={styles.carttxt}></Image>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    carttxt: {
        ...Platform.select({
            ios: {
                marginHorizontal: 45,
                marginBlockEnd: 170,
                height: 25,
                width: 30,
                textAlign: 'center',
                position: "absolute",
                top: -170
            },
            android: {
                marginHorizontal: 45,
                marginBlockEnd: 170,
                height: 25,
                width: 30,
                textAlign: 'center',
                position: "absolute",
                top: -170
            }
        })
    }
})