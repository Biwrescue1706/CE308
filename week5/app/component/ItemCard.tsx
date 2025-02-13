import { View, Text } from "react-native";

type ItemCardProps = {
  productName: string;
  price: number;
  pcs: number;
};

export default function ItemCard({ productName, price, pcs }: ItemCardProps) {
  return (
    <View className="p-5 bg-gray-300 rounded-lg shadow-md">
      <Text className="text-3xl font-bold">ซื้อสินค้า : {productName}</Text>
      <Text className="text-black">ราคา: {price} บาท</Text>
      <Text className="text-black">จำนวนสินค้า: {pcs} ชิ้น</Text>
    </View>
  );
}
