import { COLOR } from '@/constants/color';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useCart } from '../Context/cartContext';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [error, setError] = useState(null);

  const { cartItems, addToCart, incrementItem, decrementItem, removeFromCart } = useCart();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('https://mom-beta-server.onrender.com/api/medicines');
        const json = await response.json();

        if (response.status === 200 && Array.isArray(json)) {
          setData(json);
          setSearchData(json);
        } else {
          setError(json?.message || 'Unexpected response from server');
        }
      } catch (err) {
        setError('Failed to fetch medicines');
      }
    };

    fetchMedicines();
  }, []);

  const quantity = (itemId) => {
    const found = cartItems.find(item => item._id === itemId);
    return found ? found.quantity : 0;
  };

const onChangeHandler = (text) => {
  setSearchQuery(text);

  const filtered = data.filter(item =>
    (item.name ?? '').toLowerCase().includes(text.toLowerCase())
  );

  setSearchData(filtered);
};

  return (
    <ScrollView >
    
      <View style={styles.searchContainer}>
        <EvilIcons name="search" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search medicines"
          value={searchQuery}
          onChangeText={onChangeHandler}
        />
      </View>
      
      <FlatList
        data={searchData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/Details/details',
                params: {
                  itemId: item._id,
                  itemName: item.medicine_name,
                  itemImage: item.imageUrl,
                  itemPrice: item.price,
                  description: item.description,
                  use: item.use,
                  ingredients: item.ingredients,
                  dose: item.dose,
                  manufacturer: item.manufacturer,
                  notFor: item.notFor,
                  sideEffects: item.sideEffects,
                  store: item.store,
                  expiryDate: item.expiryDate,
                  manufactureDate: item.manufactureDate,
                  subcategoryId:item.subcategories
                },
              })
            }
          >
            <Womencare
              item={item}
              cartItems={cartItems}
              addToCart={addToCart}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
              removeFromCart={removeFromCart}
              quantity={quantity}
            />
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.grid}
        scrollEnabled={true}
      />
      
    
    </ScrollView>
  );
}

const Womencare = ({ item, cartItems, addToCart, incrementItem, decrementItem, removeFromCart, quantity }) => {
  const isInCart = cartItems.some(cartItem => cartItem._id === item._id);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.medicine_name}</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.cardPrice}>Rs {item.price}</Text>
        </View>

        {!isInCart ? (
          <TouchableOpacity style={styles.medicineBtn} onPress={() => addToCart(item)}>
            <Text style={styles.btnText}>Add To Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() =>
                quantity(item._id) > 1 ? decrementItem(item._id) : removeFromCart(item._id)
              }
            >
              <Text style={styles.quantityBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity(item._id)}</Text>
            <TouchableOpacity
              style={styles.quantityBtn}
              onPress={() => incrementItem(item._id)}
            >
              <Text style={styles.quantityBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: -20,
  },
  header: {
    padding: 10,
    backgroundColor: '#fff',
  },

   searchContainer: {
   width: '93%',
    height: 56,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLOR.primary,
    borderWidth: 1,
    paddingHorizontal: 15,
    margin:15,
    marginBottom:50,
    marginTop: 10,
  },
  searchInput: {
     flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: COLOR.textLight,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
  grid: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: 180,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#b2d8d833',
    margin: 10,
  },
  cardImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardPrice: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  medicineBtn: {
    backgroundColor: '#00a99d',
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityBtn: {
    backgroundColor: '#00a99d',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  quantityBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SearchComponent;