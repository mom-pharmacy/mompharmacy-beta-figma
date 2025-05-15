import Footer from '@/components/Home/footer';
import { useCart } from '@/Context/cartContext';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Details() {
  const [showDescription, setShowDescription] = useState(false);
   const [isSaved, setIsSaved] = useState(false)

  const {
    itemId, itemName, itemImage, itemPrice, description, use,
    ingredients, dose, manufacturer,
    notFor, sideEffects, store,
    expiryDate, manufactureDate,subcategories
  } = useLocalSearchParams();
  const imageUrl = Array.isArray(itemImage) ? itemImage[0] : itemImage;
  const parsedSubcategories = subcategories
  ? Array.isArray(subcategories)
    ? subcategories
    : JSON.parse(subcategories)
  : [];


  const item = {
    _id: itemId,
    medicine_name: itemName,
    imageUrl: itemImage,
    price: itemPrice,
    description,
    use,
    ingredients,
    dose,
    manufacturer,
    notFor,
    sideEffects,
    store,
    expiryDate,
    manufactureDate,
   subcategories:parsedSubcategories

  };
  console.log('Sending subcategories:', item.subcategories);

  const {
    addToCart,
    cartItems,
    incrementItem,
    decrementItem,
    removeFromCart,
  } = useCart();

  const isInCart = cartItems.some((cartItem) => cartItem._id === itemId);

  const quantity = (itemId) => {
    const findItem = cartItems.find((item) => item._id === itemId);
    return findItem ? findItem.quantity : 0;
  };


   const handleWishlistToggle = async () => {
    const newState = !isSaved
    setIsSaved(newState)

    if (newState) {
      try {
        const response = await fetch('https://mom-beta-server1.onrender.com/api/wishlist/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: '682354e783196e87d42a7cbc', 
            productId: itemId,
          
          }),
        })

        const data = await response.json()

        if (response.ok) {
          console.log('Wishlist added:', data)
        } else {
          console.warn('Wishlist failed:', data?.message || 'Error')
        }
      } catch (error) {
        console.error('Wishlist error:', error)
      }
    }
  }



  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.deliveryRow}>
          <View style={styles.tag}>
            <Image source={require('../../assets/images/Categories/bike.png')} style={styles.icon} />
            <Text>30 min</Text>
          </View>
          <View style={styles.tag}>
             <TouchableOpacity
            onPress={handleWishlistToggle}
            style={{
              height: 25,
              width: 40,
              borderRadius: 5,
              marginBottom: 5,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {isSaved ? (
              <FontAwesome name="heart" size={20} color="red" />
            ) : (
              <Feather name="heart" size={20} color="gray" />
            )}
          </TouchableOpacity>
       
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{itemName}</Text>
            <Text style={styles.subtitle}>Prescription Drug</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.mainPrice}>Rs {itemPrice}</Text>
            <Text style={styles.strikePrice}>Rs149</Text>
            <Text style={styles.discount}>21% off</Text>
          </View>

          <View style={styles.offerBox}>
            <View style={styles.offerLeft}>
              <Text style={styles.boldText}>Rs 79</Text>
              <Text style={styles.strikePrice}>Rs149</Text>
              <Text style={styles.discount}>30% off</Text>
            </View>
            <View>
              <Text style={styles.smallText}>To avail this offer</Text>
              <Text style={styles.premiumText}>Get Premium</Text>
            </View>
          </View>
        </View>

        <TouchableHighlight
          underlayColor="#006b64"
          style={styles.buyNowButton}
        >
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
                  quantity(itemId) > 1
                    ? decrementItem(itemId)
                    : removeFromCart(itemId)
                }
              >
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity} allowFontScaling={false}>
                {quantity(itemId)}
              </Text>
              <TouchableOpacity
                style={styles.quantityIcon}
                onPress={() => incrementItem(itemId)}
              >
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
            </View>
          )}

        </TouchableHighlight>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Key Information</Text>
          <Text><Text style={styles.boldText}>Use: </Text>{use}</Text>
          <Text><Text style={styles.boldText}>Ingredients: </Text>{ingredients}</Text>
          <Text><Text style={styles.boldText}>Dose: </Text>{dose}</Text>
          <Text><Text style={styles.boldText}>Not for: </Text><Text style={styles.notFor}>{notFor}</Text></Text>
          <Text><Text style={styles.boldText}>Side effects: </Text>{sideEffects}</Text>
          <Text><Text style={styles.boldText}>Store: </Text>{store}</Text>
          <Text>
            <Text style={styles.boldText}>Expires on or after: </Text>
            {new Date(expiryDate).toISOString().split('T')[0]}
          </Text>
          <Text>
            <Text style={styles.boldText}>Manufactured on: </Text>
            {new Date(manufactureDate).toISOString().split('T')[0]}
          </Text>

        </View>

        <TouchableOpacity onPress={() => setShowDescription(!showDescription)} style={styles.dropdownHeader}>
          <Text style={styles.sectionTitle}>Product Description</Text>
          <Text>{showDescription}</Text>
        </TouchableOpacity>

        {showDescription && (
          <View style={styles.descriptionBox}>
            <Text>{description}</Text>
          </View>
        )}

        <Footer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

  },
  contentWrapper: {
    padding: width * 0.04,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: width * 0.03,
  },
  productImage: {
    height: width * 0.5,
    width: width * 0.4,
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: width * 0.03,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
   
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 30,
  },
  icon: {
    height: 18,
    width: 18,
    marginRight: 5,
  },
  saveText: {
    marginRight: 5,
  },
  card: {
    backgroundColor: "#e5f2f1",
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: 15,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  strikePrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    marginRight: 5,
  },
  discount: {
    color: 'green',
  },
  offerBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  smallText: {
    fontSize: 12,
  },
  premiumText: {
    fontWeight: 'bold',
    color: '#00776c',
  },
  buyNowButton: {
    backgroundColor: '#00a99d',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
    width: width * 0.5,
    alignSelf: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: '#e5f2f1',
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  notFor: {
    color: 'red',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e5f2f1',
    padding: width * 0.04,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  descriptionBox: {
    backgroundColor: '#e5f2f1',
    padding: width * 0.04,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 30,
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

  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: 'bold',

    color: '#fff',
  },
  quantityIcon: {
    paddingHorizontal: 10,

  }
});


