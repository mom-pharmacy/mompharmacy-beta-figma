import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function About() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <MaterialIcons
            name="arrow-back"
            size={26}
            color="#00A99D"
            style={styles.arrowIcon}
            onPress={() => router.back()}
          />
          <Text style={styles.header}>About Us</Text>
        </View>

        <View style={styles.cardContainer}>
          <BlurView intensity={85} tint="light" style={styles.card}>
            <Text style={styles.title}>Who We Are</Text>
            <Text style={styles.text}>
              We are a healthcare delivery platform committed to bringing medical supplies and essential medications to your doorstep quickly, safely, and reliably.
              Mom Pharmacy is one of Bangalore's fastest-growing digital healthcare delivery startups. Our mission is simple: medicines delivered to your doorstep in just 10 minutes. From essential tablets to over-the-counter wellness products, we are transforming how people access pharmaceutical care with speed, precision, and compassion.
            </Text>

            <Text style={styles.title}>Our Mission</Text>
            <Text style={styles.text}>
              We aim to simplify access to critical healthcare by ensuring medications are delivered within minutes. Fast service. Full trust. Always.
            </Text>

            <Text style={styles.title}>Our Services</Text>
            <Text style={styles.text}>
              • Real-time order tracking{'\n'}
              • 24/7 customer assistance{'\n'}
              • Delivery within 10 minutes
            </Text>
          </BlurView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1EDEC',
  },
  scrollContainer: {
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  arrowIcon: {
    paddingRight: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A99D',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#00856F',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 18,
  },
});