import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";

const CartCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  // ตรวจสอบค่าของ count และแสดง Alert ตามเงื่อนไข
  useEffect(() => {
    if (count === 10) {
      Alert.alert("แจ้งเตือน", "ถึงจำนวนสูงสุดแล้ว");
    } else if (count === 0) {
      Alert.alert("แจ้งเตือน", "ไม่สามารถลดได้อีก");
    }
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>สินค้าในตะกร้า: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="เพิ่มสินค้า"
          onPress={() => setCount((prev) => (prev < 10 ? prev + 1 : prev))}
        />
        <Button
          title="ลดสินค้า"
          onPress={() => setCount((prev) => (prev > 0 ? prev - 1 : prev))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default CartCounter;
