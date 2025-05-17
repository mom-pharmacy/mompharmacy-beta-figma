import { userAuth } from '@/Context/authContext';
import { useCart } from '@/Context/cartContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Product = {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  imageUrl: string;
};


export default function SavedListScreen() {
  const { cartItem, addToCart } = useCart()
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const { ExtractParseToken } = userAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = await ExtractParseToken();
        if (!token) {
          console.warn('No token found');
          setLoading(false);
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
        const data = await res.json();

        if (res.ok) {
          setWishlist(data.wishlist.products);
        } else {
          console.warn(data.message || 'Failed to fetch wishlist');
        }
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [ExtractParseToken]);

 const handleAddToCart = (item: Product) => {
  const updatedCart = { ...cart, [item._id]: 1 };
  setCart(updatedCart);

  // Use the global cart context to add the item
  addToCart([{ ...item, quantity: 1 }]);
};


const handleIncrement = (item: Product) => {
  const newQuantity = (cart[item._id] || 0) + 1;
  setCart((prev) => ({ ...prev, [item._id]: newQuantity }));
  addToCart([{ ...item, quantity: newQuantity }]);
};

const handleDecrement = (item: Product) => {
  const currentQty = cart[item._id];
  if (currentQty > 1) {
    const newQty = currentQty - 1;
    setCart((prev) => ({ ...prev, [item._id]: newQty }));
    addToCart([{ ...item, quantity: newQty }]);
  } else {
    const updatedCart = { ...cart };
    delete updatedCart[item._id];
    setCart(updatedCart);
    addToCart([]); 
  }
};


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
          method: 'POST',
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

  const renderItem = (item: Product) => {
    const quantity = cart[item._id] || 0;
    return (
      <View key={item._id} style={styles.itemContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.itemInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>
            Rs {item.price}{' '}
            <Text style={styles.strikethrough}>Rs {item.originalPrice}</Text>{' '}
            {item.discount}
          </Text>

          {quantity === 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addButtonText}>Add to cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.controlsRow}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleDecrement(item)}
              >
                <Text style={styles.controlText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleIncrement(item)}
              >
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item._id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color="#00A99D"
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Saved Items</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00A99D" />
      ) : wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
      ) : (
        <ScrollView>
          {wishlist.map(renderItem)}
        </ScrollView>
      )}

      {wishlist.length > 0 && (
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => {
            const itemsToAdd = wishlist
              .filter((item) => cart[item._id]) 
              .map((item) => ({
                ...item,
                quantity: cart[item._id],
              }));

            if (itemsToAdd.length > 0) {
              addToCart(itemsToAdd);
              setWishlist([]);
              setCart({});
            } else {
              console.warn('No items selected to add to cart.');
            }
          }}

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
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
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
    borderRadius: 6,
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
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#e53935',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  proceedButton: {
    marginTop: 30,
    backgroundColor: '#00A99D',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
