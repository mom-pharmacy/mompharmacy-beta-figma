import { COLOR } from '@/constants/color'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useCart } from '../../Context/cartContext'

export default function CartItem({item}) {
  const {incrementItem , cartItems , decrementItem , removeFromCart} = useCart()
  const quantity = (itemId) => {
    const findItem = cartItems.find(item => item._id === itemId);
    console.log("this is cart item" , findItem)
    const isExist = cartItems.some(item=>item._id===itemId)
    console.log(isExist)
    return findItem ? findItem.quantity : 0;  // Return 0 if item not found
  };
    return (
        <View style={styles.itemRow}>
                   <Image source={{uri:item.imageUrl}} style={styles.itemImage} />
                   <View style={styles.itemInfo}>
                     <Text style={styles.itemName}>{item.medicine_name}</Text>
                     <Text style={styles.itemUnit}>{item.quantity}</Text>
                     <Text style={styles.saveLater}>Save for later</Text>
                   </View>
                   <View style={styles.counterBox}>
                     <View style={styles.counterControl}>
                       <TouchableOpacity onPress={()=>{
            quantity(item._id)>1? decrementItem(item._id):removeFromCart(item._id)
        }}>
                         <Text style={styles.counterBtn}>–</Text>
                       </TouchableOpacity>
                       <Text style={styles.counterValue}>{item.quantity}</Text>
                       <TouchableOpacity onPress={() => incrementItem(item._id)}>
                         <Text style={styles.counterBtn}>+</Text>
                       </TouchableOpacity>
                     </View>
                     <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
                   </View>
                 </View>
    )
}

const styles = StyleSheet.create({
    cartItemContainer:{
        flexDirection:"row" , 
        flex:1 , 
        justifyContent:"space-between",
        paddingVertical:12 ,
        alignItems:"center" , 
        marginTop:12
    },
    imageConatiner:{
        flexDirection:"row", 
        gap:3  ,
        
    },
    titleContainer:{
       
    } , 
    counterContainer:{
        flexDirection:"row" , 
        backgroundColor:COLOR.primary
    },
    title:{
        fontSize:15 ,
        fontWeight:"semibold"
    },
    imageBackground:{
        backgroundColor:"white",
        padding:4, 
        borderRadius:12

    },
    
  itemRow: { 
    flexDirection: 'row',
     alignItems: 'center', 
     marginVertical: 8 
    },
  itemImage: {
     width: 50, 
     height: 50,
      resizeMode: 'contain', 
      marginRight: 10 
    },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: 'bold' },
  itemUnit: { color: '#666' },
  saveLater: { color: 'gray ', textDecorationLine: 'underline', fontSize: 12 , },

  counterBox: { alignItems: 'center' },
  counterControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bfa5',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  counterBtn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },
  counterValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  itemPrice: { marginTop: 4, fontWeight: 'bold' },


})