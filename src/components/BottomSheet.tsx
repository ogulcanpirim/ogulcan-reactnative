import { StyleSheet, Text, View, Dimensions, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

interface BottomSheetProps {
    name: string;
    description: string;
    price: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ name, description, price }) => {

    const theme = useTheme();
    const translateY = useRef(new Animated.Value(screenHeight * 0.3)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 500,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            useNativeDriver: true,
        }).start();

        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={{ ...styles.container, backgroundColor: theme.colors.card, transform: [{ translateY }] }}>
            <View style={styles.infoContainer}>
                <Animated.Text style={{ ...styles.name, color: theme.colors.text, opacity }}>{name}</Animated.Text>
                <Animated.Text style={{ ...styles.price, color: theme.colors.text, opacity }}>{price + '$'}</Animated.Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Animated.Text style={{ ...styles.description, color: theme.colors.text, opacity }}>{description}</Animated.Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        height: screenHeight * 0.55,
        padding: 30,
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 99,
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    name: {
        fontSize: 20,
        fontWeight: '600',
        width: '70%',
    },

    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    descriptionContainer: {
        marginVertical: 30,
        flex: 1,
    },

    description: {
        fontSize: 18,
        fontWeight: '400',
        color: 'grey',
        textAlign: 'justify',
    }
})

export default React.memo(BottomSheet);