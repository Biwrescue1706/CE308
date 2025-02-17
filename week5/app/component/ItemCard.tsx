import { View, Text, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

interface ItemProps {
  productName: string;
  price: number;
  pcs: number;
  btnSize: "small" | "medium" | "large";
  btnColor: "primary" | "secondary" | "danger";
}

export default function ItemCard({ productName, price, pcs, btnSize, btnColor }: ItemProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>ซื้อสินค้า: {productName}</Text>
      <Text style={styles.text}>ราคา: {price} บาท</Text>
      <Text style={styles.text}>จำนวนสินค้า: {pcs} ชิ้น</Text>
      <CustomButton
        title="สั่งซื้อ"
        size={btnSize}
        color={btnColor}
        onPress={() => alert(`ซื้อ ${productName}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#D1D5DB", // สีเทาอ่อน
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#000",
  }
});
