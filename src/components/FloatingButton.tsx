import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type NavigationStackProp = StackNavigationProp<RootStackParamList, 'Create'>;

interface FloatingButtonProps {
    disabled: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ disabled }) => {
    const theme = useTheme();
    const navigation = useNavigation<NavigationStackProp>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Create')}
            disabled={disabled}
            style={{ ...styles.container, backgroundColor: theme.colors.border }}
            activeOpacity={0.9}>
            <Feather name="plus" size={35} color={theme.colors.text} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '7.5%',
        right: '5%',
        width: 60,
        height: 60,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
    }
});

export default React.memo(FloatingButton);