import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Womencare from './womenCare';
import { useMedicine } from '@/Context/medicineContext';




export default function Categories() {
  const{category, Categories} = useMedicine()
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   fetch('https://mom-beta-server1.onrender.com/api/medicines/categories')
  //     .then(res => res.json())
  //     .then(data => {
  //       setCategories(data);
  //     })
  //     .catch(err => {
  //       console.error('Failed to fetch categories:', err);
  //     });
  // }, []);
  useEffect(()=>{Categories()},[])

  return (
    <View>
      <FlatList
        data={category}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
              <Text style={{ flex: 1, fontWeight: '500', fontSize: 20}} onPress={()=>router.push({pathname:'/CategoriesWiseMedicines', params:{CategoryId:item._id}})}>
                {item.category_name}
              </Text>
              <TouchableOpacity onPress={()=>router.push({pathname:'/CategoriesWiseMedicines', params:{CategoryId:item._id}})}>
              <Text style={{ fontWeight: '500', fontSize: 16, color: '#00a99d' }}>
                See All <AntDesign name="arrowright" size={20} color="#00a99d" />
              </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={item.subcategories.slice(0,4)}
              keyExtractor={(sub) => sub._id}
              numColumns={4} // Set number of columns to 4
              scrollEnabled={false}
              contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
              renderItem={({ item: sub }) => (
                <TouchableOpacity
                  onPress={() => {
                    // Navigate to medicine page
                    router.push({
                      pathname: '/medicine',
                      params: { subcategoryId: sub._id },
                    });
                  }}
                >
                  <Womencare
                    name={sub.subcategory_name}
                    Icon={
                      <Image
                        source={{ uri: sub.imageUrl }}
                        style={styles.icon}
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
  icon: {
    height: 60,
    width: 50,
  },
});