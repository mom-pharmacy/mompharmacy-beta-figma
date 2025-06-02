import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SuggestAndEarn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How suggest & earn works?</Text>
      
      <View style={styles.stepContainer}>
        <Text style={styles.number}>1</Text>
        <Text style={styles.stepText}>
          Select from Technical or Non technical Feature suggestion.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.number}>2</Text>
        <Text style={styles.stepText}>
          Tell us what you noticed or think we should add/ improve.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.number}>3</Text>
        <Text style={styles.stepText}>
          If your suggestion is valuable, we'll notify you and credit your reward.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 12,
    padding: 16,
    // width:300,
    backgroundColor: '#fff',
    margin: 16,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  number: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e0f0ea',
    textAlign: 'center',
    color: '#008b6a',
    fontWeight: '700',
    marginRight: 10,
    lineHeight: 24,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});

export default SuggestAndEarn;