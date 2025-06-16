import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

export default function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text><ActivityIndicator /></Text>
    </View>
  )
}