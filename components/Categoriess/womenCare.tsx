import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const womenCare = ({ name, Icon }) => {
    return (
        <View style={styles.box}>
            <View style={styles.items}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {Icon}
                </View>
                <Text style={styles.center}>{name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      items: {
        height: 111,
        width: 110,
        gap: 5,
        padding: 16,
        
        flexDirection: "column",
        alignItems: "center",      
        justifyContent: "center",   
      },
      
    center: {
        textAlign: "center",
        marginBottom:-10,
        fontSize:12
       

    },
    

})

export default womenCare