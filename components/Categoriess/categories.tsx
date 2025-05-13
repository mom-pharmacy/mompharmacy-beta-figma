import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Womencare from './womenCare';

// Get screen width and height
const { width, height } = Dimensions.get('window');

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://mom-beta-server1.onrender.com/api/medicines/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(err => {
        console.error('Failed to fetch categories:', err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{item.category_name}</Text>
              <Text style={styles.seeAllText}>
                See All <AntDesign name="arrowright" size={20} color="#00a99d" />
              </Text>
            </View>

            <FlatList
              data={item.subcategories}
              keyExtractor={(sub) => sub._id}
              numColumns={4}
              scrollEnabled={false}
              contentContainerStyle={styles.subcategoryList}
              renderItem={({ item: sub }) => (
                <TouchableOpacity
                  onPress={() => {
                    console.log(`Subcategory ${sub._id} clicked`);
                    router.push({ pathname: '/medicine', params: { subcategoryId: sub._id } });
                  }}
                >
                  <Womencare
                    name={sub.subcategory_name}
                    Icon={
                      <Image
                        source={{ uri: sub.imageUrl }}
                        style={styles.subcategoryImage}
                      />
                    }
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categoryTitle: {
    flex: 1,
    fontWeight: '500',
    fontSize: 20,
    color: '#333',
  },
  seeAllText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#00a99d',
  },
  subcategoryList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  subcategoryImage: {
    width: width / 4 - 20,  // Responsive width based on screen size
    height: 70,
   
    borderRadius: 10,
  },
});
