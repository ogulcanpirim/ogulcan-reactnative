import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme, useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

interface HeaderProps {
    title?: string;
    transparent?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, transparent = false }) => {
    const navigation = useNavigation();
    const theme = useTheme();
    return (
        <View style={styles.container}>
            <View style={[styles.goBack, transparent && styles.transparent, { backgroundColor: theme.colors.border }]}>
                <View style={styles.title}>
                    <TouchableOpacity style={styles.backPadding} onPress={() => navigation.goBack()}>
                        <Feather name="chevron-left" size={30} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>
            </View>
            {title && <Text style={{ ...styles.title, color: theme.colors.text }}>{title}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        zIndex: 99,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },

    goBack: {
        position: 'absolute',
        left: '2.5%',
    },

    transparent: {
        borderRadius: 10,
        opacity: 0.5,
    },

    backPadding: {
        padding: 10
    }
})

export default React.memo(Header);