// import { useCart } from '@/Context/cartContext'
// import { router } from 'expo-router'
// import React from 'react'
// import { Image, Platform, StyleSheet, TouchableOpacity, View ,Text} from 'react-native'
// // import { MaterialIcons } from '@expo/vector-icons'

// export default function Cart() {
//     const {cartItems}=useCart()
//     return (
//         <View>
//              <TouchableOpacity onPress={() => { router.push('/BottomNavbar/cart') }} >
//                         <Image source={require('../../assets/images/cart.jpeg')} style={styles.carttxt}></Image>
//                         {cartItems.length > 0 && (
//                             <View style={styles.badge}>
//                                 <Text style={styles.badgeText}>{cartItems.length}</Text>
//                             </View>
//                         )}
//                     </TouchableOpacity>

//         </View>
//     )
// }

// const styles = StyleSheet.create({
    //  badge: {
    //     position: 'absolute',
    //     right: -6,
    //     top: -3,
    //     backgroundColor: '#00a99d',
    //     borderRadius: 8,
    //     minWidth: 16,
    //     height: 16,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     paddingHorizontal: 2,
    // },
    // badgeText: {
    //     color: '#fff',
    //     fontSize: 10,
    //     fontWeight: 'bold',
    // },
    // carttxt: {
    //     ...Platform.select({
    //         ios: {
    //             marginHorizontal: 45,
    //             marginBlockEnd: 170,
    //             height: 25,
    //             width: 30,
    //             textAlign: 'center',
    //             position: "absolute",
    //             top: -170
    //         },
    //         android: {
    //             marginHorizontal: 45,
    //             marginBlockEnd: 170,
    //             height: 25,
    //             width: 30,
    //             textAlign: 'center',
    //             position: "absolute",
    //             top: -170
    //         },
            
    //     })
    // }
// })