import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Foundation from 'react-native-vector-icons/Foundation';
import ProductType from '../store/types/product';
import validator from 'validator';

interface ProductProps extends ProductType {
  onPress: () => void;
};

const Product: React.FC<ProductProps> = ({ name, price, avatar, onPress }) => {

  const theme = useTheme();
  const [valid, setValid] = useState<boolean>(true);

  useEffect(() => {
    setValid(validator.isURL(avatar as string));
  }, [avatar]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ ...styles.image, resizeMode: valid ? 'contain' : 'cover' }}
          source={valid ? { uri: avatar } : require('../assets/placeholder.png')}
        />
      </View>
      <View style={{ ...styles.infoContainer, backgroundColor: theme.colors.card }}>
        <Text style={{ ...styles.title, color: theme.colors.text }} ellipsizeMode={'tail'} numberOfLines={1}>{name}</Text>
        <Text style={{ ...styles.price, color: theme.colors.text }}>{price + '$'}</Text>
        <View style={styles.editContainer}>
          <TouchableOpacity onPress={onPress}>
            <Foundation name="indent-more" size={22.5} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '48%',
    height: 200,
    marginBottom: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  imageContainer: {
    height: 140,
  },

  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

  },
  infoContainer: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 10,
  },

  title: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },

  price: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },

  editContainer: {
    position: 'absolute',
    right: 10,
    bottom: 5,
  }
});

export default Product;