import { useCart } from '@/Context/cartContext';
import { COLOR } from '@/constants/color';
import { router, useLocalSearchParams } from 'expo-router';
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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Medicines({ limit }) {
  const [sortType, setSortType] = useState('low');
  const [showDropdown, setShowDropdown] = useState(false);
  const [medicine, setMedicine] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { subcategoryId } = useLocalSearchParams();
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

  useEffect(() => {
    const fetchMedicinesSub = async () => {
      try {
        const res = await fetch(
          `https://mom-beta-server1.onrender.com/api/medicines/subcategories/${subcategoryId}/medicines`
        );
        const data = await res.json();
        setMedicine(data);
      } catch (err) {
        console.error('Failed to fetch medicines:', err);
      }
    };

    fetchMedicinesSub();
  }, []);

  const filteredMedicines = medicine.filter((item) =>
    (item.medicine_name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMedicines = [...filteredMedicines].sort((a, b) =>
    sortType === 'low' ? a.price - b.price : b.price - a.price
  );

  const getSortLabel = () =>
    sortType === 'low' ? 'Sort: Low to High' : 'Sort: High to Low';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
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
            <Text style={styles.btnText} allowFontScaling={false}>Add To Cart</Text>
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
              <Text style={styles.btnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity} allowFontScaling={false}>
              {quantity(item._id)}
            </Text>
            <TouchableOpacity
              style={styles.quantityIcon}
              onPress={() => incrementItem(item._id)}
            >
              <Text style={styles.btnText}>+</Text>
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
search:{
      backgroundColor: COLOR.light,
      padding:15
  },
  header: {
    paddingHorizontal: wp('4%'),
    paddingTop: hp('1%'),
    marginBottom: hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('5%'),
    color: '#333',
  },
  sortWrapper: {
    position: 'relative',
  },
  sortButton: {
    backgroundColor: '#00a99d',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: 8,
    zIndex: 1,
  },
  sortButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: hp('6%'),
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    zIndex: 10,
    width: wp('35%'),
  },
  dropdownOption: {
    padding: 10,
  },
  grid: {
    paddingBottom: hp('3%'),
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
  },
  cardContainer: {
    width: wp('45%'),
    marginBottom: hp('2%'),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#b2d8d833',
  },
  cardImage: {
    width: '100%',
    height: hp('13%'),
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: wp('3.5%'),
    marginBottom: 6,
    color: '#333',
    lineHeight: wp('4.5%'),
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
    height: 36,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp('3.5%'),
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    color: '#fff',
  },
  quantityIcon: {
    paddingHorizontal: 10,
  },
  searchInput: {
    width: '100%',
    height: 56,
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLOR.primary,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginTop: 10,
  },
});