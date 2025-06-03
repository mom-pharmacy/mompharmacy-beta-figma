import { useCart } from '@/Context/cartContext';
import StatusHeader from '@/components/OrdersComponents/StatusHeader';
import { COLOR } from '@/constants/color';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

export default function CategoriesWiseMedicines() {
    const { CategoryId } = useLocalSearchParams();
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('all');
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
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
        if (!CategoryId) return;

        fetch(`https://mom-beta-server1.onrender.com/api/medicines/categories/${CategoryId}`)
            .then((res) => res.json())   

            .then((data) => {
                setSubcategories(data.subcategories || []);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [CategoryId]);

    useEffect(() => {
        if (selectedSubcategory === 'all') {
            fetch(`https://mom-beta-server1.onrender.com/api/medicines/medicines`)
                .then(res => res.json())
                .then(data => setMedicines(data || []))
                .catch(err => console.error('Failed to fetch all medicines:', err));
        } else {
            fetch(`https://mom-beta-server1.onrender.com/api/medicines/subcategories/${selectedSubcategory}/medicines`)
                .then((res) => res.json())
                .then((data) => setMedicines(data || []))
                .catch((err) => console.error('Failed to fetch medicines:', err));
        }
    }, [selectedSubcategory]);

    const renderSubcategoryItem = ({ item }) => {
    const isSelected = selectedSubcategory === item._id;

    return (
        <View>
            <TouchableOpacity
                onPress={() => setSelectedSubcategory(item._id)}
                style={{
                    marginTop: 15,
                    alignItems: 'center',
                    marginHorizontal: 8,
                    padding: 5,
                    borderRadius: 10,
                    height: 70,
                    width: 70,
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected ? COLOR.primary : '#ccc',
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                }}
            >
                {item._id === 'all' ? (
                    <View
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 10,
                            backgroundColor: '#eee',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontWeight: 'bold' }}>All</Text>
                    </View>
                ) : (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={{ width: 60, height: 60, borderRadius: 10 }}
                        resizeMode="contain"
                    />
                )}
            </TouchableOpacity>
            <Text style={{ fontSize: 12, marginTop: 5, textAlign: 'center' }}>
                {item.subcategory_name}
            </Text>
        </View>
    );
};



    const renderMedicineItem = ({ item }) => (
        <View style={styles.cardContainer}>
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
                        
            <View style={styles.card}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
                </View>
                <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.medicine_name}
                </Text>
                <Text style={styles.cardPrice}>Rs {item.price}</Text>

                {!cartItems.some((cartItem) => cartItem._id === item._id) ? (
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
                            <Text style={styles.btnText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity(item._id)}</Text>
                        <TouchableOpacity
                            style={styles.quantityIcon}
                            onPress={() => incrementItem(item._id)}
                        >
                            <Text style={styles.btnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusHeader title={'Categories'} />
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[{ _id: 'all', subcategory_name: 'All', imageUrl: 'All' }, ...subcategories]}
                keyExtractor={(item) => item._id}
                renderItem={renderSubcategoryItem}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />

            {/* {selectedSubcategory !== 'all' && (
                <> */}

                    <FlatList
                        data={medicines}
                        keyExtractor={(item) => item._id}
                        renderItem={renderMedicineItem}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                        contentContainerStyle={styles.grid}
                        scrollEnabled={true}
                    />
                {/* </> */}
            {/* )} */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    cardContainer: {
        width: screenWidth / 2 - 20,
        margin: 10,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,

    },
    cardImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',


    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginVertical: 5,
        textAlign: 'left',
    },
    cardPrice: {
        fontSize: 13,
        fontWeight: 'bold',
        color: COLOR.primary,
        textAlign: 'left',
    },
    medicineBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        padding: 10,
        backgroundColor: COLOR.primary,
        borderRadius: 20,
        alignContent: 'center'
    },
    btnText: {
        color: '#fff',
        paddingHorizontal: 10,
        textAlign: 'center',
    },
    quantityIcon: {
        paddingHorizontal: 10,
    },
    quantity: {
        color: '#fff',
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    grid: {
        paddingBottom: 100,
    },
});
