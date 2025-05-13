import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

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
    );
};

const styles = StyleSheet.create({
    box: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    items: {
        height: 111,
        width: (width / 4) - 20, 
        padding: 16,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
       
        
    },
    center: {
        textAlign: "center",
        marginBottom: -10,
        fontSize: 12,
        color: '#333',
    },
});

export default womenCare;
