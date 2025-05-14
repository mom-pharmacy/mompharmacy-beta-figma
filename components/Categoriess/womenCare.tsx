import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

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
        marginHorizontal:6,
    },
    items: {
        height: 111,
        width: width * 0.22, 
        gap: 5,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:10,
        marginBottom:10,
    },
    center: {
        textAlign: 'center',
        marginTop: 5, 
        fontSize: 11,
    },
});

export default womenCare;