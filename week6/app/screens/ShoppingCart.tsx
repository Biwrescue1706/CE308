import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addItem, removeItem, clearCart } from '../redux/cartSlice';

const ShoppingCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddItem = () => {
    if (name && price && quantity) {
      dispatch(
        addItem({
          id: Math.random().toString(),
          name,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        })
      );
      setName('');
      setPrice('');
      setQuantity('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="ชื่อสินค้า" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="ราคา" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="จำนวน" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <Button title="เพิ่มลงตะกร้า" onPress={handleAddItem} />

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.quantity} ชิ้น - {item.price * item.quantity} บาท</Text>
            <Button title="ลบ" onPress={() => dispatch(removeItem(item.id))} />
          </View>
        )}
      />

      <Text style={styles.total}>ยอดรวม: {totalAmount} บาท</Text>
      <Button title="ล้างตะกร้า" onPress={() => dispatch(clearCart())} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ShoppingCart;