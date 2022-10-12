import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Product from '../components/Product';
import { useTheme, useNavigation, useIsFocused } from '@react-navigation/native';
import Skeleton from '../components/Skeleton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import ProductType from '../store/types/product';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { fetchProducts } from '../store/actions/products';

type ContentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Content'>;

const PLACEHOLDER_ITEMS = 20;

interface ContentProps {
    search: string;
    products: ProductType[];
    categoryName: string;
    fetchProducts: () => Promise<void>;
}

const ContentScreen: React.FC<ContentProps> = ({ search, products, categoryName, fetchProducts }) => {

    const navigation = useNavigation<ContentScreenNavigationProp>();
    const [loading, setLoading] = useState<boolean>(true);
    const theme = useTheme();
    const [content, setContent] = useState<ProductType[]>([]);
    const [filtered, setFiltered] = useState<ProductType[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const isFocused = useIsFocused();
    const flatRef = useRef<FlatList>(null);

    useEffect(() => {
        const items = products.filter(product => product.category === categoryName);
        setContent(items);
        setFiltered(items);
        setLoading(false);
    }, [products]);

    const handleRefresh = () => {
        setRefresh(true);
        fetchProducts().then(() => {
            setRefresh(false);
        });
    }

    useEffect(() => {
        if (isFocused && content?.length > 0) {
            Promise.all(content?.filter((product: { name: string; }) => search.length === 0 || product.name.toUpperCase().indexOf(search.toUpperCase()) !== -1))
                .then((filtered) => {
                    setFiltered(filtered);
                    setLoading(false);
                });
        }
        else if (!isFocused) {
            setLoading(true);
        }
    }, [search, isFocused]);

    const handleItemPress = (item: ProductType) => {
        navigation.navigate('Detail', {
            name: item.name,
            description: item.description,
            price: item.price,
            avatar: item.avatar,
        });
    }

    const renderItem = useCallback(({ item }: { item: ProductType }) => {
        return (loading ? <Skeleton width={'48%'} height={200} borderRadius={5} marginBottom={20} /> :
            <Product
                name={item.name}
                price={item.price}
                category={item.category}
                description={item.description}
                avatar={item.avatar}
                developerEmail={item.developerEmail}
                onPress={() => handleItemPress(item)} />)
    }, [loading]);

    const EmptyView = () => {
        return (
            <View style={styles.centered}>
                <MaterialIcons name="error" size={50} color={"grey"} />
                <Text style={styles.notFound}>Product not found !</Text>
            </View>
        );
    }
    return (
        <View style={{ ...styles.screen, backgroundColor: theme.colors.background }}>
            {content && filtered.length === 0 ? <EmptyView /> :
                <FlatList
                    ref={flatRef}
                    refreshing={refresh}
                    onRefresh={handleRefresh}
                    scrollEnabled={!loading}
                    data={loading ? Array.from(Array(PLACEHOLDER_ITEMS).keys()) as unknown as ProductType[] : filtered}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 10 }}
                    contentContainerStyle={{ paddingTop: '2.5%', paddingBottom: '30%' }}
                />}
        </View>
    );
}

const mapStateToProps = (state: any) => ({
    products: state.ProductReducer.products,
});

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFound: {
        color: 'grey',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 15,
    }
});

export default connect(mapStateToProps, { fetchProducts })(ContentScreen);