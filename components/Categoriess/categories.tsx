import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Womencare from './womenCare';

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
    <View>
      
       

        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View>
               <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
          <Text style={{ flex: 1, fontWeight: '500', fontSize: 20 }}> {item.category_name}</Text>
          <Text style={{ fontWeight: '500', fontSize: 16, color: '#00a99d' }}>
            See All <AntDesign name="arrowright" size={20} color="#00a99d" />
          </Text>
        </View>
              <FlatList
                data={item.subcategories}
                keyExtractor={(sub) => sub._id}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
                renderItem={({ item: sub }) => (
                  <TouchableOpacity
                    onPress={() => {
                      // You could navigate or open a modal to show medicines
                      console.log(`Subcategory ${sub._id} clicked`);
                      router.push({ pathname:'/medicine',  params: { subcategoryId: sub._id }})
                    }}
                  >
                    <Womencare
                      name={sub.subcategory_name}
                      Icon={
                        <Image
                          source={{ uri: sub.imageUrl }}
                          style={{ height: 60, width: 50 }}
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
