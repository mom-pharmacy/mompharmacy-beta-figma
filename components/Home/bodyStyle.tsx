import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View, } from 'react-native';


export default function bodyStyle({ name, sub, Icon,link }) {
    return (
     
         <Link href={link} asChild>
            
      <Pressable >
        <View style={styles.box}>
            <View style={styles.items}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {Icon}
                </View>
                    <Text style={styles.center}>{name}</Text>
                    <Text style={styles.center}>{sub}</Text> 
            </View>
        </View>
        </Pressable>
        
        </Link>
        
    )
}
const styles = StyleSheet.create({
    
    box: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      items: {
        height: 111,
        width: 110,
        gap: 5,
        padding: 16,
        borderWidth: 1,
        borderColor: "#b2d8d833",

        borderRadius: 10,
        flexDirection: "column",
        alignItems: "center",      
        justifyContent: "center",   
      },
      
    center: {
        textAlign: "center",
        marginBottom:-10,
        fontWeight:500

    },
   
});
