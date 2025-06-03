<<<<<<< Updated upstream

import Footer from '@/components/Home/footer';
import StatusHeader from '@/components/OrdersComponents/StatusHeader';
import { userAuth } from '@/Context/authContext';
import { useCart } from '@/Context/cartContext';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState, } from 'react';
=======
import Cart from "@/components/Cart/cart";
import Footer from "@/components/Home/footer";
import StatusHeader from "@/components/OrdersComponents/StatusHeader";
import { userAuth } from "@/Context/authContext";
import { useCart } from "@/Context/cartContext";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
>>>>>>> Stashed changes
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

const { width } = Dimensions.get("window");

export default function Details() {
  const [showDescription, setShowDescription] = useState(false);
<<<<<<< Updated upstream
  const [isSaved, setIsSaved] = useState(false)
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);


  const {
    itemId, itemName, itemImage, itemPrice, description, use,
    ingredients, dose, manufacturer,
    notFor, sideEffects, store,
    expiryDate, manufactureDate, subcategories
=======
  const [isSaved, setIsSaved] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  const {
    itemId,
    itemName,
    itemImage,
    itemPrice,
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
    subcategories,
>>>>>>> Stashed changes
  } = useLocalSearchParams();
  const imageUrl = Array.isArray(itemImage) ? itemImage[0] : itemImage;
  const parsedSubcategories = subcategories
    ? Array.isArray(subcategories)
      ? subcategories
      : JSON.parse(subcategories)
    : [];
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    subcategories: parsedSubcategories

=======
    subcategories: parsedSubcategories,
>>>>>>> Stashed changes
  };
  console.log("Sending subcategories:", item.subcategories);

  const { addToCart, cartItems, incrementItem, decrementItem, removeFromCart } =
    useCart();

  const isInCart = cartItems.some((cartItem) => cartItem._id === itemId);

  const quantity = (itemId) => {
    const findItem = cartItems.find((item) => item._id === itemId);
    return findItem ? findItem.quantity : 0;
  };

<<<<<<< Updated upstream
  const { ExtractParseToken } = userAuth()


=======
  const { ExtractParseToken } = userAuth();

>>>>>>> Stashed changes
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = await ExtractParseToken();
        if (!token) {
          console.warn("No token found");
          setLoading(false);
          return;
        }

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await fetch(
          `https://mom-beta-server1.onrender.com/api/wishlist/getwishlist`,
          options
        );
        setLoading(false);
        const data = await res.json();
<<<<<<< Updated upstream
        console.log(data.wishlist.products.map(item => item))
=======
        console.log(data.wishlist.products.map((item) => item));
>>>>>>> Stashed changes

        console.log(data);
        if (res.ok) {
          setWishlist(data.wishlist.products);
        } else {
          console.warn(data.message || "Failed to fetch wishlist");
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
      }
    };

    fetchWishlist();
  }, [ExtractParseToken]);

<<<<<<< Updated upstream

  const handleWishlistToggle = async () => {
    const newState = !isSaved
    setIsSaved(newState)
    const tokenAuth = await ExtractParseToken()


    if (newState) {
      try {
        const response = await fetch('https://mom-beta-server1.onrender.com/api/wishlist/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAuth}`,
          },
          body: JSON.stringify({
            userId: '682354e783196e87d42a7cbc',
            productId: itemId,

          }),
        })
=======
  const handleWishlistToggle = async () => {
    const newState = !isSaved;
    setIsSaved(newState);
    const tokenAuth = await ExtractParseToken();

    if (newState) {
      try {
        const response = await fetch(
          "https://mom-beta-server1.onrender.com/api/wishlist/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenAuth}`,
            },
            body: JSON.stringify({
              userId: "682354e783196e87d42a7cbc",
              productId: itemId,
            }),
          }
        );
>>>>>>> Stashed changes

        const data = await response.json();

        if (response.ok) {
          console.log("Wishlist added:", data);
        } else {
          console.warn("Wishlist failed:", data?.message || "Error");
        }
      } catch (error) {
        console.error("Wishlist error:", error);
      }
    }
<<<<<<< Updated upstream
  }




=======
  };
>>>>>>> Stashed changes

  return (
    <SafeAreaView>
      <StatusHeader title={itemName.slice(0, 10)} />
      <ScrollView style={styles.container}>
        <View style={styles.contentWrapper}>
<<<<<<< Updated upstream
          <TouchableOpacity onPress={() => router.push('/BottomNavbar/cart')} style={styles.cartContainer}>
            <Image source={require('../../assets/images/cart.jpeg')} style={styles.carttxt} />
            {cartItems.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItems.length}</Text>
              </View>
            )}
          </TouchableOpacity>

=======
>>>>>>> Stashed changes
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.productImage}
              resizeMode="contain"
            />
<<<<<<< Updated upstream


=======
            <Cart></Cart>
>>>>>>> Stashed changes
          </View>

          <View style={styles.deliveryRow}>
            <View style={styles.tag}>
<<<<<<< Updated upstream
              <Image source={require('../../assets/images/Categories/bike.png')} style={styles.icon} />
=======
              <Image
                source={require("../../assets/images/Categories/bike.png")}
                style={styles.icon}
              />
>>>>>>> Stashed changes
              <Text>30 min</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={handleWishlistToggle}
                style={{
                  height: 25,
                  width: 40,
                  borderRadius: 5,
                  marginBottom: 5,
<<<<<<< Updated upstream
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {loading ? <ActivityIndicator /> : <>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    {isSaved || wishlist.find(items => items._id === item._id) ? (

                      <FontAwesome name="bookmark" size={20} color="#00A99D" />
                    ) : (
                      <Feather name="bookmark" size={20} color="gray" />
                    )}

                    {/* </>} */}
                    <Text style={{ right: 55, fontWeight: 'bold', fontSize: 16, color: '#007E71' }}>Save</Text>
                  </View>
                </>}

              </TouchableOpacity>

=======
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {isSaved ||
                      wishlist.find((items) => items._id === item._id) ? (
                        <FontAwesome
                          name="bookmark"
                          size={20}
                          color="#00A99D"
                        />
                      ) : (
                        <Feather name="bookmark" size={20} color="gray" />
                      )}

                      {/* </>} */}
                      <Text
                        style={{
                          right: 55,
                          fontWeight: "bold",
                          fontSize: 16,
                          color: "#007E71",
                        }}
                      >
                        Save
                      </Text>
                    </View>
                  </>
                )}
              </TouchableOpacity>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                <Text style={styles.btnText} allowFontScaling={false}>Add To Cart</Text>
=======
                <Text style={styles.btnText} allowFontScaling={false}>
                  Add To Cart
                </Text>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
          </TouchableHighlight>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Key Information</Text>
<<<<<<< Updated upstream
            <Text style={styles.boldText1}><Text style={styles.boldText}>Use: </Text>{use}</Text>
            <Text style={styles.boldText1}><Text style={styles.boldText}>Ingredients: </Text>{ingredients}</Text>
            <Text style={styles.boldText1}><Text style={styles.boldText}>Dose: </Text>{dose}</Text>
            <Text style={styles.boldText1}><Text style={styles.boldText2}>Not for: </Text><Text style={styles.notFor}>{notFor}</Text></Text>
            <Text style={styles.boldText1}><Text style={styles.boldText}>Side effects: </Text>{sideEffects}</Text>
            <Text style={styles.boldText1}><Text style={styles.boldText}>Store: </Text>{store}</Text>
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
=======
            <Text style={styles.boldText1}>
              <Text style={styles.boldText}>Use: </Text>
              {use}
            </Text>
            <Text style={styles.boldText1}>
              <Text style={styles.boldText}>Ingredients: </Text>
              {ingredients}
            </Text>
            <Text style={styles.boldText1}>
              <Text style={styles.boldText}>Dose: </Text>
              {dose}
            </Text>
            <Text style={styles.boldText1}>
              <Text style={styles.boldText2}>Not for: </Text>
              <Text style={styles.notFor}>{notFor}</Text>
            </Text>
            <Text style={styles.boldText1}>
              <Text style={styles.boldText}>Side effects: </Text>
              {sideEffects}
            </Text>
            <Text style={styles.boldText1}>
              <Text style={styles.boldText}>Store: </Text>
              {store}
            </Text>
            <Text>
              <Text style={styles.boldText}>Expires on or after: </Text>
              {new Date(expiryDate).toISOString().split("T")[0]}
            </Text>
            <Text>
              <Text style={styles.boldText}>Manufactured on: </Text>
              {new Date(manufactureDate).toISOString().split("T")[0]}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowDescription(!showDescription)}
            style={styles.dropdownHeader}
          >
>>>>>>> Stashed changes
            <Text style={styles.sectionTitle}>Product Description</Text>
            <Text style={styles.boldText3}>{showDescription}</Text>
          </TouchableOpacity>

          {showDescription && (
            <View style={styles.descriptionBox}>
              <Text>{description}</Text>
            </View>
          )}

          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    bottom: 10,
  },
  contentWrapper: {
    padding: width * 0.04,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: width * 0.03,
<<<<<<< Updated upstream
    flexDirection: 'row',
    marginHorizontal: 100,
    marginBlockStart: 70
=======
    flexDirection: "row",
    marginHorizontal: 100,
    marginBlockStart: 70,
>>>>>>> Stashed changes
  },
  productImage: {
    height: width * 0.5,
    width: width * 0.4,
  },
  deliveryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: width * 0.03,
    // backgroundColor: '#acd9d4'
  },
  tag: {
<<<<<<< Updated upstream
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ACD9D4',
=======
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ACD9D4",
>>>>>>> Stashed changes
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  mainPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  strikePrice: {
    textDecorationLine: "line-through",
    color: "gray",
    marginRight: 5,
  },
  discount: {
    color: "green",
  },
  offerBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  offerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  boldText: {
    fontWeight: "bold",
    marginRight: 5,
    color: "black",
  },
  boldText1: {
<<<<<<< Updated upstream
    color: '#666666',
    marginRight: 5,
  },
  boldText2: {
    color: '#c03a3a',
    fontWeight: 'bold',
  },
  boldText3: {
    color: '#666666',
=======
    color: "#666666",
    marginRight: 5,
  },
  boldText2: {
    color: "#c03a3a",
    fontWeight: "bold",
  },
  boldText3: {
    color: "#666666",
>>>>>>> Stashed changes
  },
  smallText: {
    fontSize: 12,
  },
  premiumText: {
    fontWeight: "bold",
    color: "#00776c",
  },
  buyNowButton: {
    backgroundColor: "#00a99d",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 15,
    width: width * 0.5,
    alignSelf: "center",
  },
  buyNowText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: "#e5f2f1",
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
    color: "#007E71",
  },
  notFor: {
    color: "#666666",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e5f2f1",
    padding: width * 0.04,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  descriptionBox: {
    backgroundColor: "#e5f2f1",
    padding: width * 0.04,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 30,
  },
  medicineBtn: {
    backgroundColor: "#00a99d",
    height: 36,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: "bold",

    color: "#fff",
  },
  quantityIcon: {
    paddingHorizontal: 10,
  },

  cartContainer: {
    position: 'relative',
    padding: 10,
    
  },
  carttxt: {
    width: 30,
    height: 30,
    marginLeft:310
   
  },
  badge: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: '#00a99d',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
<<<<<<< Updated upstream




=======
>>>>>>> Stashed changes
