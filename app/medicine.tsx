import { useCart } from '@/Context/cartContext';
import { COLOR } from '@/constants/color';
import apiClient from '@/utils/apiClient';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Medicines({ limit }) {
  const [sortType, setSortType] = useState('low');
  const [showDropdown, setShowDropdown] = useState(false);
  const [medicine, setMedicine] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { subcategoryId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    addToCart,
    cartItems,
    incrementItem,
    decrementItem,
    removeFromCart,
  } = useCart();

  const quantity = (itemId) => {
    const findItem = cartItems.find((item) => item._id === itemId);
    return findItem ? findItem.quantity : 0;
  };

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient(`api/medicines/subcategories/${subcategoryId}/medicines`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response) {
        setMedicine(response);
      } else {
        setError('No medicines found');
      }
    } catch (error) {
      console.error('Failed to fetch medicines:', error);
      setError('Failed to load medicines. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [subcategoryId]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  const filteredMedicines = medicine.filter((item) =>
    (item.medicine_name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMedicines = [...filteredMedicines].sort((a, b) =>
    sortType === 'low' ? a.price - b.price : b.price - a.price
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchMedicines} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getSortLabel = () =>
    sortType === 'low' ? 'Sort: Low to High' : 'Sort: High to Low';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={28} color={COLOR.primary} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search medicines"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.title} allowFontScaling={false}>
          Popular Medicines
        </Text>

        <View style={styles.sortWrapper}>
          <TouchableOpacity
            onPress={() => setShowDropdown((prev) => !prev)}
            style={styles.sortButton}
          >
            <Text style={styles.sortButtonText} allowFontScaling={false}>
              {getSortLabel()}
            </Text>
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => {
                  setSortType('low');
                  setShowDropdown(false);
                }}
              >
                <Text allowFontScaling={false}>Low to High</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => {
                  setSortType('high');
                  setShowDropdown(false);
                }}
              >
                <Text allowFontScaling={false}>High to Low</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={limit ? sortedMedicines.slice(0, limit) : sortedMedicines}
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
                  subcategories: JSON.stringify(item.subcategories || []),
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
    </SafeAreaView>
  );
}

const Womencare = ({
  item,
  cartItems,
  addToCart,
  incrementItem,
  decrementItem,
  removeFromCart,
  quantity,
}) => {
  const isInCart = cartItems.some((cartItem) => cartItem._id === item._id);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        <Text style={styles.cardTitle} numberOfLines={2} allowFontScaling={false}>
          {item.medicine_name}
        </Text>
        <View style={styles.nameContainer}>
          <Text style={styles.cardPrice} allowFontScaling={false}>
            Rs {item.price}
          </Text>
        </View>

        {!isInCart ? (
          <TouchableOpacity
            style={styles.medicineBtn}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.btnText}>Add To Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.medicineBtn}>
            <TouchableOpacity
              style={styles.quantityIcon}
              onPress={() =>
                quantity(item._id) > 1
                  ? decrementItem(item._id)
                  : removeFromCart(item._id)
              }
            >
              <Text style={styles.quantityIconText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity(item._id)}</Text>
            <TouchableOpacity
              style={styles.quantityIcon}
              onPress={() => incrementItem(item._id)}
            >
              <Text style={styles.quantityIconText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLOR.primary,
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sortWrapper: {
    position: 'relative',
  },
  sortButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  sortButtonText: {
    color: COLOR.primary,
    fontWeight: '500',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  grid: {
    paddingBottom: 100,
  },
  cardContainer: {
    width: wp('45%'),
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: wp('35%'),
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardPrice: {
    fontSize: 16,
    color: COLOR.primary,
    fontWeight: 'bold',
  },
  medicineBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    padding: 8,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityIcon: {
    backgroundColor: '#fff',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLOR.primary,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

