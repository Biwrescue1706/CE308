import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

// Custom Input Component
const CustomInput = ({ label, value, onChangeText, placeholder }: any) => {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-lg font-medium">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={label === "ราคา" || label === "จำนวน" ? "numeric" : "default"}
      />
    </View>
  );
};

// Custom Button Component
const CustomButton = ({ title, onPress }: any) => {
  return (
    <TouchableOpacity
      className="bg-blue-600 py-3 rounded-lg items-center active:opacity-75"
      onPress={onPress}
    >
      <Text className="text-white text-lg font-medium">{title}</Text>
    </TouchableOpacity>
  );
};

// Main Form Component
const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [pcs, setPcs] = useState("");

  const handleSubmit = () => {
    if (!productName || !price || !pcs) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }
    Alert.alert("ข้อมูลถูกส่งแล้ว!", `ชื่อสินค้า: ${productName}\nราคา: ${price}\nจำนวน: ${pcs}`);
  };

  return (
    <View className="p-6 bg-white h-full">
        <Text className="text-4xl font-bold mb-4" >กรอกข้อมูลสินค้า</Text>
      <CustomInput
        label="ชื่อสินค้า"
        value={productName}
        onChangeText={setProductName}
        placeholder="กรอกชื่อสินค้า"
      />
      <CustomInput
        label="ราคา"
        value={price}
        onChangeText={setPrice}
        placeholder="กรอกราคา"
      />
      <CustomInput
        label="จำนวน"
        value={pcs}
        onChangeText={setPcs}
        placeholder="กรอกจำนวน"
      />
      <CustomButton title="ยืนยัน" onPress={handleSubmit} />
    </View>
  );
};

export default ProductForm;
