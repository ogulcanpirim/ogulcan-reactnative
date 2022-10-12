import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Alert } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import SubmitButton from '../components/SubmitButton';
import CategoryPicker from '../components/CategoryPicker';
import { getCategories } from '../services';
import Feather from 'react-native-vector-icons/Feather';
import { addProduct } from '../store/actions/products';
import { connect } from 'react-redux';
import ProductType from '../store/types/product';
import CategoryType from '../store/types/category';
import validator from 'validator';

interface CreateScreenProps {
    addProduct: (product: ProductType) => Promise<void>;
    error: boolean;
}

const CreateScreen: React.FC<CreateScreenProps> = ({ addProduct, error }) => {

    const mounted = useRef<boolean>();
    const theme = useTheme();
    const navigation = useNavigation();
    const [form, setForm] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        loading: false,
    });
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState<CategoryType>();

    const fetchCategories = useCallback(async () => {
        const response = await getCategories();
        if (mounted.current) {
            setCategories(response.categories);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        mounted.current = true;
        fetchCategories();
        return () => {
            mounted.current = false;
        }
    }, []);


    const handleSubmit = async () => {
        setForm({ ...form, loading: true });

        if (!form.title || !form.price || !form.description || !form.image || !selected) {
            Alert.alert('Please fill all fields in order to add a product !');
            setForm({ ...form, loading: false });
            return;
        }

        if (!validator.isURL(form.image)) {
            Alert.alert('Please enter a valid image url !');
            setForm({ ...form, loading: false });
            return;
        }

        const newProduct: ProductType = {
            name: form.title,
            price: parseFloat(form.price),
            description: form.description,
            avatar: form.image,
            category: selected?.name ?? '',
            developerEmail: 'opirim@gmail.com'
        };

        await addProduct(newProduct);

        if (error) {
            Alert.alert('Something went wrong, please try again !');
            setForm({ ...form, loading: false });
            return;
        }

        setLoading(false);
        navigation.goBack();
    };

    const Loading = useCallback(() => {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size={"large"} color={theme.colors.text} />
            </View>
        );
    }, [theme]);

    return (
        <SafeAreaView style={{ ...styles.screen, backgroundColor: theme.colors.background }}>
            {loading ? <Loading /> :
                <>
                    <View style={styles.header}>
                        <View style={styles.goBack}>
                            <TouchableOpacity style={styles.chevronPadding} onPress={() => navigation.goBack()}>
                                <Feather name="chevron-left" size={30} color={theme.colors.text} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ ...styles.headerText, color: theme.colors.text }}>Add Product</Text>
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            label="Title"
                            right={<TextInput.Affix text={`${form.title.length}/50`} textStyle={{ color: 'grey' }} />}
                            maxLength={50}
                            mode="flat"
                            value={form.title}
                            underlineColor={theme.colors.text}
                            onChangeText={text => setForm({ ...form, title: text })}
                            theme={{ colors: { primary: theme.colors.text, text: theme.colors.text, background: theme.colors.background, placeholder: theme.colors.text } }}
                        />
                        <TextInput
                            style={styles.input}
                            label="Price"
                            left={<TextInput.Affix text="$" textStyle={{ color: theme.colors.text }} />}
                            maxLength={7}
                            mode="flat"
                            value={form.price.toString()}
                            underlineColor={theme.colors.text}
                            onChangeText={text => setForm({ ...form, price: text })}
                            theme={{ colors: { primary: theme.colors.text, text: theme.colors.text, background: theme.colors.background, placeholder: theme.colors.text } }}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            numberOfLines={4}
                            label="Description"
                            mode="flat"
                            multiline={true}
                            maxLength={200}
                            blurOnSubmit={true}
                            value={form.description}
                            underlineColor={theme.colors.text}
                            onChangeText={text => setForm({ ...form, description: text })}
                            theme={{ colors: { primary: theme.colors.text, text: theme.colors.text, background: theme.colors.background, placeholder: theme.colors.text } }}
                        />
                        <TextInput
                            style={styles.input}
                            label="Image URL"
                            mode="flat"
                            value={form.image}
                            underlineColor={theme.colors.text}
                            onChangeText={text => setForm({ ...form, image: text })}
                            theme={{ colors: { primary: theme.colors.text, text: theme.colors.text, background: theme.colors.background, placeholder: theme.colors.text } }}
                        />
                        <Text style={{ ...styles.categoryHeader, color: theme.colors.text }}>Select Category</Text>
                        <CategoryPicker
                            selected={selected}
                            setSelected={setSelected}
                            categories={categories}
                        />
                    </View>
                    <SubmitButton
                        loading={form.loading}
                        label="Add"
                        onPress={handleSubmit}
                    />
                </>}
        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => ({
    error: state.ProductReducer.error
});

const params = {
    addProduct
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    form: {
        marginHorizontal: 20,
    },

    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },

    goBack: {
        position: 'absolute',
        left: '2.5%',
    },

    chevronPadding: {
        padding: 10
    },

    categoryHeader: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
    },

    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default connect(mapStateToProps, params)(CreateScreen);