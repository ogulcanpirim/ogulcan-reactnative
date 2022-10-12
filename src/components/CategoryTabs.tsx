import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchBar from './SearchBar';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Skeleton from './Skeleton';
import FloatingButton from './FloatingButton';
import ContentScreen from '../screens/Content';

import { connect } from 'react-redux';
import { fetchProducts } from '../store/actions/products';
import { fetchCategories } from '../store/actions/categories';
import productReducer from '../store/reducers/products';
import categoryReducer from '../store/reducers/categories';
import CategoryType from '../store/types/category';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get("window").width;


interface CategoryTabsProps {
    categories: CategoryType[];
    fetchProducts: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    productError: boolean;
    categoryError: boolean;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, productError, categoryError, fetchProducts, fetchCategories }) => {

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchData = () => {
        setLoading(true);
        fetchCategories().then(() => {
            fetchProducts().then(() => {
                setLoading(false);
            });
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const Loading = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.tabContainer}>
                    {Array.from(Array(5).keys()).map((_, index) =>
                    (<View key={index.toString()} style={{ marginHorizontal: 5 }}>
                        <Skeleton width={120} height={50} borderRadius={20} />
                    </View>)
                    )}
                </View>
                <View style={styles.itemContainer}>
                    {Array.from(Array(10).keys()).map((_, index) =>
                    (<View key={index.toString()} style={{}}>
                        <Skeleton width={screenWidth * 0.48} height={200} borderRadius={10} marginBottom={20} />
                    </View>)
                    )}
                </View>
            </SafeAreaView>
        );
    }

    const ErrorView = () => {
        return (
            <View style={styles.centered}>
                <MaterialIcons name="error" color="grey" size={50} />
                <Text style={styles.error}>An error occurred while loading the page.</Text>
                <TouchableOpacity onPress={() => fetchData()}>
                    <Text style={[styles.again, { color: theme.colors.primary }]}>Try again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const theme = useTheme();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SearchBar disabled={(productError || categoryError)} search={search} setSearch={setSearch} />
            {loading ? <Loading /> : (productError || categoryError) ? <ErrorView /> :
                <Tab.Navigator screenOptions={{
                    tabBarIndicatorStyle: {
                        height: '100%',
                        borderRadius: 20,
                        backgroundColor: theme.colors.text,
                    },
                    tabBarLabelStyle: {
                        fontSize: 16,
                        textTransform: 'none',
                    },

                    tabBarItemStyle: {
                        width: 120,
                    },

                    tabBarInactiveTintColor: theme.colors.text,
                    tabBarActiveTintColor: theme.colors.background,
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        marginHorizontal: 10,
                        marginBottom: 10,
                    },
                    tabBarScrollEnabled: true,

                }}>
                    {categories.map((category, index) => (
                        <Tab.Screen
                            key={index.toString()}
                            name={category.name}
                            children={() => <ContentScreen search={search} categoryName={category.name} />} />
                    ))}
                </Tab.Navigator>}
            <FloatingButton disabled={(productError || categoryError)}/>
        </SafeAreaView>
    );
}

const mapStateToProps = (state: any) => ({
    categories: state.CategoryReducer.categories,
    productError: state.ProductReducer.error,
    categoryError: state.CategoryReducer.error,
})

const params = {
    productReducer,
    categoryReducer,
    fetchProducts,
    fetchCategories,
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
    },
    itemContainer: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },

    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    error: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: '500',
        color: 'grey',
    },

    again: {
        fontSize: 18,
        fontWeight: '500',
    }
})

export default connect(mapStateToProps, params)(CategoryTabs);