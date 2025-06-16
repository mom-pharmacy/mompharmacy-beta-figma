import { useCart } from '@/Context/cartContext';
import StatusHeader from '@/components/OrdersComponents/StatusHeader';
import { COLOR } from '@/constants/color';
import apiClient from '@/utils/apiClient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Subcategory = {
    _id: string;
    subcategory_name: string;
    imageUrl?: string;
};

type Medicine = {
    _id: string;
    medicine_name: string;
    imageUrl: string;
    price: number;
    description?: string;
    use?: string;
    ingredients?: string[];
    dose?: string;
    manufacturer?: string;
    notFor?: string[];
    sideEffects?: string[];
    store?: string;
    expiryDate?: string;
    manufactureDate?: string;
    subcategories?: string[];
};

const screenWidth = Dimensions.get('window').width;

export default function CategoriesWiseMedicines() {
    const { CategoryId } = useLocalSearchParams<{ CategoryId: string }>();
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const {
        addToCart,
        cartItems,
        incrementItem,
        decrementItem,
        removeFromCart,
    } = useCart();

    const quantity = useCallback((itemId: string): number => {
        const findItem = cartItems.find((item) => item._id === itemId);
        return findItem ? findItem.quantity : 0;
    }, [cartItems]);

    useEffect(() => {
        if (!CategoryId) return;

        const fetchSubcategories = async () => {
            try {
                setLoading(true);
                const response = await apiClient(`api/medicines/categories/${CategoryId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response && response.subcategories) {
                    setSubcategories(response.subcategories);
                    setError(null);
                } else {
                    setError('No subcategories found');
                }
            } catch (err) {
                console.error('Error fetching subcategories:', err);
                setError('Failed to load subcategories. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategories();
    }, [CategoryId]);

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                setLoading(true);
                const url = selectedSubcategory === 'all'
                    ? 'api/medicines/medicines'
                    : `api/medicines/subcategories/${selectedSubcategory}/medicines`;
                
                const response = await apiClient(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response) {
                    setMedicines(Array.isArray(response) ? response : []);
                    setError(null);
                } else {
                    setError('No medicines found');
                    setMedicines([]);
                }
            } catch (err) {
                console.error('Error fetching medicines:', err);
                setError('Failed to load medicines. Please try again.');
                setMedicines([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, [selectedSubcategory]);

    const renderSubcategoryItem = useCallback(({ item }: { item: Subcategory }) => {
        const isSelected = selectedSubcategory === item._id;

        return (
            <View style={styles.subcategoryContainer}>
                <TouchableOpacity
                    onPress={() => setSelectedSubcategory(item._id)}
                    style={[
                        styles.subcategoryButton,
                        isSelected && styles.subcategoryButtonSelected
                    ]}
                    accessibilityLabel={item.subcategory_name}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                >
                    {item._id === 'all' ? (
                        <View style={styles.allCategoryIcon}>
                            <Text style={styles.allCategoryText}>All</Text>
                        </View>
                    ) : (
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.subcategoryImage}
                            resizeMode="contain"
                        />
                    )}
                </TouchableOpacity>
                <Text style={styles.subcategoryName} numberOfLines={1}>
                    {item.subcategory_name}
                </Text>
            </View>
        );
    }, [selectedSubcategory]);

    const handleMedicinePress = useCallback((item: Medicine) => {
        router.push({
            pathname: '/Details/details',
            params: {
                itemId: item._id,
                itemName: item.medicine_name,
                itemImage: item.imageUrl,
                itemPrice: item.price,
                description: item.description,
                use: item.use,
                ingredients: item.ingredients?.join(','),
                dose: item.dose,
                manufacturer: item.manufacturer,
                notFor: item.notFor?.join(','),
                sideEffects: item.sideEffects?.join(','),
                store: item.store,
                expiryDate: item.expiryDate,
                manufactureDate: item.manufactureDate,
                subcategories: JSON.stringify(item.subcategories || []),
            },
        });
    }, []);

    const renderMedicineItem = useCallback(({ item }: { item: Medicine }) => {
        const itemQuantity = quantity(item._id);
        const isInCart = itemQuantity > 0;

        return (
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    onPress={() => handleMedicinePress(item)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                >
                    <View style={styles.card}>
                        <View style={styles.cardImageContainer}>
                            <Image 
                                source={{ uri: item.imageUrl }} 
                                style={styles.cardImage} 
                                resizeMode="contain"
                                accessibilityIgnoresInvertColors
                            />
                        </View>
                        <Text style={styles.cardTitle} numberOfLines={2}>
                            {item.medicine_name}
                        </Text>
                        <Text style={styles.cardPrice}>Rs {item.price.toFixed(2)}</Text>

                        {!isInCart ? (
                            <TouchableOpacity
                                style={styles.medicineBtn}
                                onPress={(e) => {
                                    e.stopPropagation();
                                    addToCart(item);
                                }}
                                accessibilityLabel={`Add ${item.medicine_name} to cart`}
                                accessibilityRole="button"
                            >
                                <Text style={styles.btnText}>Add To Cart</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        itemQuantity > 1 ? decrementItem(item._id) : removeFromCart(item._id);
                                    }}
                                    accessibilityLabel={`Decrease quantity of ${item.medicine_name}`}
                                    accessibilityRole="button"
                                >
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantityText} accessibilityLabel={`${itemQuantity} in cart`}>
                                    {itemQuantity}
                                </Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        incrementItem(item._id);
                                    }}
                                    accessibilityLabel={`Increase quantity of ${item.medicine_name}`}
                                    accessibilityRole="button"
                                >
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }, [addToCart, decrementItem, handleMedicinePress, incrementItem, quantity, removeFromCart]);

    const subcategoriesWithAll = useMemo(() => [
        { _id: 'all', subcategory_name: 'All', imageUrl: '' },
        ...subcategories
    ], [subcategories]);

    if (loading && medicines.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusHeader title="Categories" />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLOR.primary} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusHeader title="Categories" />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={() => {
                            setSelectedSubcategory('all');
                            setError(null);
                        }}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    
    return (
        <SafeAreaView style={styles.container}>
            <StatusHeader title="Categories" />
            
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={subcategoriesWithAll}
                keyExtractor={(item) => `subcat-${item._id}`}
                renderItem={renderSubcategoryItem}
                contentContainerStyle={styles.subcategoriesContainer}
                style={styles.subcategoriesList}
                keyboardShouldPersistTaps="handled"
            />
            
            {medicines.length > 0 ? (
                <FlatList
                    data={medicines}
                    keyExtractor={(item) => `med-${item._id}`}
                    renderItem={renderMedicineItem}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.gridContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    ListHeaderComponent={<View style={styles.gridHeader} />}
                    ListFooterComponent={<View style={styles.gridFooter} />}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No medicines found</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: '#ff4444',
        marginBottom: 20,
        textAlign: 'center',
    },
    retryButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLOR.primary,
        borderRadius: 5,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    subcategoriesContainer: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    subcategoriesList: {
        maxHeight: 120,
    },
    subcategoryContainer: {
        width: 80,
        alignItems: 'center',
        marginRight: 8,
    },
    subcategoryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        padding: 8,
        borderRadius: 10,
        height: 70,
        width: 70,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    subcategoryButtonSelected: {
        borderWidth: 2,
        borderColor: COLOR.primary,
    },
    subcategoryImage: {
        width: 54,
        height: 54,
        borderRadius: 8,
    },
    allCategoryIcon: {
        width: 54,
        height: 54,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    allCategoryText: {
        fontWeight: 'bold',
        color: '#333',
    },
    subcategoryName: {
        fontSize: 12,
        marginTop: 6,
        textAlign: 'center',
        color: '#333',
    },

    gridContainer: {
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 100,
    },
    gridHeader: {
        height: 4,
    },
    gridFooter: {
        height: 20,
    },
    cardContainer: {
        width: (screenWidth - 30) / 2,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    card: {
        backgroundColor: '#D5ECE9',
        borderRadius: 12,
        padding: 12,
        height: 240,
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        marginBottom: 8,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
        lineHeight: 18,
        minHeight: 36,
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOR.primary,
        marginBottom: 8,
    },
    medicineBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        backgroundColor: COLOR.primary,
        borderRadius: 18,
        overflow: 'hidden',
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 36,
        backgroundColor: COLOR.primary,
        borderRadius: 18,
        paddingHorizontal: 4,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 20,
    },
    quantityText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        minWidth: 20,
        textAlign: 'center',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});