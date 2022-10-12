import React, { useRef, useState } from "react";
import { View, StyleSheet, Animated, Dimensions, Easing, Text, Image, Keyboard } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;

interface SearchBarProps {
    search: string;
    setSearch: (text: string) => void;
    disabled: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, disabled }) => {
    const theme = useTheme();
    const width = useRef(new Animated.Value(50)).current;
    const [focused, setFocused] = useState(false);

    const expand = () => {
        Animated.timing(width, {
            toValue: screenWidth * 0.95,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
        setFocused(true);
    }
    const collapse = () => {
        Animated.timing(width, {
            toValue: 50,
            duration: 200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start();
        setFocused(false);
    }

    const handleInputPress = () => {
        if (search.length > 0 && focused && !disabled) {
            collapse();
            setSearch("");
            Keyboard.dismiss();
        }
    }

    return (
        <View style={styles.container}>
            {!focused && <Text style={{ ...styles.header, color: theme.colors.text }}>Products</Text>}
            <Animated.View style={{ ...styles.inputContainer, width }}>
                <TextInput
                    disabled={disabled}
                    onFocus={expand}
                    onBlur={() => search.length === 0 && collapse()}
                    style={styles.input}
                    right={<TextInput.Icon
                        forceTextInputFocus={!focused}
                        color={theme.colors.text}
                        name={search.length > 0 && focused ? "close" : "magnify"}
                        onPress={handleInputPress}
                    />}
                    mode="outlined"
                    returnKeyType={"search"}
                    outlineColor="transparent"
                    theme={{ colors: { primary: theme.colors.text, text: theme.colors.text } }}
                    placeholder="Type here to search products..."
                    placeholderTextColor={theme.colors.text}
                    value={search}
                    onChangeText={text => {
                        setSearch(text);
                    }}
                />
            </Animated.View>
            {!focused && <Image source={require('../assets/logo.png')} style={styles.logo} />}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: '2.5%',
        alignItems: 'center',
        marginBottom: 5,
    },

    inputContainer: {
        alignSelf: 'flex-end',
    },

    header: {
        position: 'absolute',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500',
        left: 0,
        right: 0,
    },

    input: {
        backgroundColor: 'transparent',
        width: '100%',
        alignSelf: 'center',
    },

    logo: {
        width: 35,
        height: 35,
        marginLeft: 5,
    }
});


export default SearchBar;