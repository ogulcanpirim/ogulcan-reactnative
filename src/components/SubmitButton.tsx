import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { ActivityIndicator, Surface, TouchableRipple } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

interface SubmitButtonProps {
    label: string;
    onPress: () => void;
    loading?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {

    const theme = useTheme();
    const { onPress, label, loading } = props;

    return (
        <TouchableRipple style={styles.ripple} onPress={onPress} disabled={loading}>
            <Surface style={{ ...styles.container, backgroundColor: theme.colors.border }}>
                {loading ?
                    <ActivityIndicator size="small" color={theme.colors.text} />
                    :
                    <Text style={{ ...styles.label, color: theme.colors.text }}>{label}</Text>
                }
            </Surface>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    ripple: {
        position: 'absolute',
        bottom: '5%',
        width: '90%',
        alignSelf: 'center',
    },
    container: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 50,
    },
    label: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    }

})

export default SubmitButton;