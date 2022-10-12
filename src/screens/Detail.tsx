import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useTheme, useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import BottomSheet from '../components/BottomSheet';
import validator from 'validator';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>

const screenHeight = Dimensions.get('window').height;

const DetailScreen: React.FC<PropsWithChildren> = () => {

    const theme = useTheme();
    const opacity = useRef(new Animated.Value(0)).current;
    const [valid, setValid] = useState<boolean>(false);
    const route = useRoute<DetailScreenRouteProp>();
    const { name, description, price, avatar } = route.params;


    useEffect(() => {
        setValid(validator.isURL(avatar as string));
    }, [avatar]);

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [opacity]);

    return (
        <View style={{ ...styles.screen, backgroundColor: theme.colors.background }}>
            <Header transparent={true} />
            <View style={styles.imageContainer}>
                <Animated.Image
                    onError={() => setValid(false)}
                    style={{ ...styles.image, opacity, resizeMode: valid ? 'contain' : 'center' }}
                    source={valid ? { uri: avatar } : require('../assets/placeholder.png')}
                />
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.15)' }} />
            </View>
            <BottomSheet name={name} description={description} price={price} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    imageContainer: {
        top: 50,
        height: screenHeight * 0.45,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
        //'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
        resizeMode: 'contain',
    },

    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default DetailScreen;

