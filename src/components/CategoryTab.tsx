import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import { type Theme } from '@react-navigation/native';

interface CategoryTabProps {
    onPress: () => void;
    theme: Theme;
    name: string;
    selected: boolean;
};

const CategoryTab: React.FC<CategoryTabProps> = ({ theme, onPress, name, selected }) => {

    const scale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleOnPressIn = useCallback(() => {
        Animated.timing(scale, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [scale]);

    const handleOnPressOut = useCallback(() => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [scale]);

    const selectedBackground = {
        backgroundColor: theme.colors.primary,
    };

    const selectedText = {
        color: '#fff',
    }

    return (
        <TouchableOpacity onPressIn={handleOnPressIn} onPressOut={handleOnPressOut} onPress={onPress} activeOpacity={0.7}>
            <Animated.View style={[styles.container, { transform: [{ scale }] }, { backgroundColor: theme.colors.text }, selected && { ...selectedBackground }]}>
                <Text style={[styles.text, { color: theme.colors.background }, selected && { ...selectedText }]}>{name}</Text>
            </Animated.View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginHorizontal: 5,
        height: 40,
        backgroundColor: 'green',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 16,
        fontWeight: '500',
    },
})

export default React.memo(CategoryTab);