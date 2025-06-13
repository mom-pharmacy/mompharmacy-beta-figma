import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

const UnifiedOnboardingScreen = ({
    imageSource,
    messageText,
    activeIndex,
    
    onNext,
    onBack,
    showBack = false,
    theme = {}
}) => {
    const {
        backgroundColor = '#7DD0CA',
        textBoxColor = '#00A99D',
        buttonColor = '#FF9D24',
        circleBackground = 'rgba(255,255,255,0.25)',
    } = theme;

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {/* Skip Button */}
            <View style={[styles.skipBox, { backgroundColor: textBoxColor }]}>
                <TouchableOpacity style={styles.skipButton} onPress={() => router.push('/BottomNavbar/home')}>
                    <Text style={styles.skipText}>skip</Text>
                </TouchableOpacity>
            </View>

            {/* Back Button */}
            {showBack && (
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <MaterialIcons name="arrow-left" size={30} color="black" />
                </TouchableOpacity>
            )}

            {/* Content */}
            <View style={styles.contentWrapper}>
                {/* Image with Background Circles */}
                <View style={styles.placeholderBox}>
                    <View style={[styles.imgBackground1, { backgroundColor: circleBackground }]} />
                    <View style={[styles.imgBackground2, { backgroundColor: circleBackground }]} />
                    <Image source={imageSource} style={styles.image} />
                </View>

                {/* Indicators */}
                <View style={styles.indicatorContainer}>
                    {[0, 1, 2].map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                index === activeIndex && styles.activeIndicator,
                            ]}
                        />
                    ))}
                </View>
                <View style={{ marginTop: 120 }}>
                    {/* Text Box */}
                    <View style={[styles.textBox, { backgroundColor: textBoxColor }]}>
                        <Text
                            style={styles.messageText}
                            numberOfLines={3}
                            ellipsizeMode="tail"
                            allowFontScaling={false}
                        >
                            {messageText}
                        </Text>

                        <View style={[styles.tBox, { backgroundColor }]} />
                    </View>


                    {/* Next Button */}
                    <TouchableOpacity style={[styles.centeredButton, { backgroundColor: buttonColor }]} onPress={onNext}>
                        <Icon name="chevron-right" size={40} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default UnifiedOnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
    },
    skipBox: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        right: 20,
        zIndex: 2,
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    skipButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    skipText: {
        fontSize: width * 0.045,
        color: 'black',
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: Platform.OS === 'ios' ? 60 : 40,
        zIndex: 2,
    },
    contentWrapper: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    placeholderBox: {
        height: height * 0.35,
        width: width * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    imgBackground1: {
        height: width * 0.65,
        width: width * 0.65,
        borderRadius: width * 0.65,
        position: 'absolute',
        top: 60,
    },
    imgBackground2: {
        height: width * 0.45,
        width: width * 0.45,
        borderRadius: width * 0.45,
        position: 'absolute',
        top: 100,
    },
    image: {
        height: height * 0.3,
        width: width * 0.7,
        position: 'absolute',
        top: 70,
    },
    indicatorContainer: {
        flexDirection: 'row',
        marginTop: 40,
        marginBottom: 20,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeIndicator: {
        backgroundColor: 'white',
        width: 22,
        borderRadius: 4,
    },
    textBox: {
        borderRadius: 30,
        paddingVertical: 40,
        paddingHorizontal: 20,
        width: '90%',
        alignItems: 'center',
        height: 210,
        marginTop: 5,
    },


    messageText: {
        color: '#fff',
        fontSize: width * 0.06,
        textAlign: 'center',
        lineHeight: 26,

    },
    tBox: {
        height: 100,
        width: 100,
        marginTop: 50,
        borderRadius: 100,
    },
    centeredButton: {
        position: 'absolute',
        bottom: "-10%",
        alignSelf: 'center',
        borderRadius: 40,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
});