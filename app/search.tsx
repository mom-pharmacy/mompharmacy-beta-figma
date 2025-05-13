import EvilIcons from '@expo/vector-icons/EvilIcons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
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
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchData(filtered);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          ) : (
            <Image
              source={require('../assets/images/medicine.png')}
              style={styles.image}
            />
          )}
        </View>

        {!cartItems.some(ci => ci._id === item._id) ? (
          <TouchableOpacity
            onPress={() => addToCart(item)}
            style={styles.addToCartButton}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counterContainer}>
            <TouchableOpacity
              onPress={() =>
                quantity(item._id) > 1
                  ? decrementItem(item._id)
                  : removeFromCart(item._id)
              }
            >
              <Text style={styles.counterBtn}>−</Text>
            </TouchableOpacity>
            <Text style={styles.counterText}>{quantity(item._id)}</Text>
            <TouchableOpacity onPress={() => incrementItem(item._id)}>
              <Text style={styles.counterBtn}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.expiry}>{item.Expirydate}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <EvilIcons name="search" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search medicines"
          value={searchQuery}
          onChangeText={onChangeHandler}
        />
      </View>

      {error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : searchData.length === 0 ? (
        <Text style={styles.noResults}>No results found.</Text>
      ) : (
        
            <FlatList 
              
              data={searchData}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              
              contentContainerStyle={styles.grid}
              />
       
     
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 90,
  },
  cardContainer: {
    width: '30%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 12,
    padding: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 10,
  },
  addToCartButton: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderColor: '#00a99d',
    borderWidth: 1,
    borderRadius: 18,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  addToCartText: {
    fontSize: 12,
    color: '#00a99d',
    fontWeight: 'bold',
  },
  counterContainer: {
    marginTop: 6,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#00a99d',
    borderWidth: 1,
    borderRadius: 18,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  counterBtn: {
    fontSize: 14,
    color: '#00a99d',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  counterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
    color: '#000',
    textAlign: 'center',
  },
  expiry: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00a99d',
    marginTop: 2,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  noResults: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default SearchComponent;