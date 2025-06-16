import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { userAuth } from '@/Context/authContext';
import { useCart } from '@/Context/cartContext';

import { default as LoadingScreen, default as Page404 } from '../ErrorScreens/loadingscreen';

type Product = {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  imageUrl: string;
};

export default function SavedListScreen() {
  const { cartItems, addToCart, decrementItem, incrementItem, removeFromCart } = useCart();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { ExtractParseToken } = userAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError(false);
        const token = await ExtractParseToken();
        if (!token) {
          console.warn('No token found');
          setLoading(false);
          setError(true);
          return;
        }

        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await fetch(
          `https://mom-beta-server1.onrender.com/api/wishlist/getwishlist`,
          options
        );

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        const data = await res.json();

        setWishlist(data.wishlist.products);
      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [ExtractParseToken]);

  const handleDelete = async (id: string) => {
    try {
      const token = await ExtractParseToken();
      if (!token) {
        console.warn('No token found for deletion');
        return;
      }
      const res = await fetch(
        'https://mom-beta-server1.onrender.com/api/wishlist/remove',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: id }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setWishlist((prev) => prev.filter((item) => item._id !== id));
        const updatedCart = { ...cart };
        delete updatedCart[id];
        setCart(updatedCart);
      } else {
        console.warn(data.message);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const quantity = (itemId: string) => {
    const findItem = cartItems.find((item) => item._id === itemId);
    return findItem ? findItem.quantity : 0;
  };

  const renderItem = (item: Product) => {
    return (
      <View key={item._id} style={styles.itemContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.itemInfo}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.name}>{item.name || item.medicine_name}</Text>
              <Text style={styles.price}>
                Rs {item.price}{' '}
                <Text style={styles.strikethrough}>Rs {item.originalPrice}</Text>{' '}
                {item.discount}
              </Text>
            </View>
            <View style={{ marginTop: 29, marginRight: 10 }}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item._id)}
              >
                <AntDesign name="delete" size={24} color={'gray'} />
              </TouchableOpacity>
            </View>
          </View>

          {quantity(item._id) === 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                addToCart(item);
              }}
            >
              <Text style={styles.addButtonText}>Add to cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.controlsRow}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => {
                  quantity(item._id) > 1 ? decrementItem(item._id) : removeFromCart(item._id);
                }}
              >
                <Text style={styles.controlText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity(item._id)}</Text>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => incrementItem(item._id)}
              >
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  // Show Loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  // Show Error screen if error
  if (error) {
    return <Page404 />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="#00A99D"
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Saved Items</Text>
      </View>

      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
      ) : (
        <ScrollView>{wishlist.map(renderItem)}</ScrollView>
      )}

      {wishlist.length > 0 && (
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => router.push('/BottomNavbar/cart')}
        >
          <Text style={styles.proceedButtonText}>
            Proceed with Cart Items ({Object.keys(wishlist).length})
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A99D',
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 10,
    elevation: 1,
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
    width: 180,
  },
  price: {
    color: '#444',
    fontSize: 14,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 13,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#00A99D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  controlText: {
    fontSize: 18,
    color: '#333',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {},
  proceedButton: {
    marginTop: 30,
    backgroundColor: '#00A99D',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});