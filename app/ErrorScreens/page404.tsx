import { Video as ExpoVideo, ResizeMode } from 'expo-av'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Page404 = () => {
  return (
    <>
    <View style={styles.container}>
      <MaterialIcons 
        name='arrow-back' 
        size={24} 
        color='#00A99D'
        onPress={() => router.back()}
        style={styles.backButton}
      />
      <ExpoVideo
        source={require('../../assets/images/ErrorScreen/404video.mp4')}
        style={styles.video}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN as any}
        isLooping
        shouldPlay
        isMuted
      />
      
      <Text style={styles.text1}>OOPS!</Text>
      <Text style={styles.text2}>Error Loading</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 40,
  },
  video: {
    width: '100%',
    height: '80%',
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00000080',
    textAlign: 'center',
    bottom: 70,
  },
  text2:{
    fontSize: 20,
    color: '#00000080',
    textAlign: 'center',
    bottom: 70,
  }
})

export default Page404