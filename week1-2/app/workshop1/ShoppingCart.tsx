import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CartItem {
  name: string;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {items.map((item, index) => (
        <Text key={index} style={styles.item}>
          {item.name} - {item.quantity} pcs
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ShoppingCart;
