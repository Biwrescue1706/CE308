import "./global.css";
import { Text, View, FlatList } from "react-native";
import ItemCard from "./component/ItemCard";
import CustomButton from "./component/CustomButton";
import { items } from "./component/Dataset";

// export default function Index() {
//   return (
//     // <View className="flex-1 justify-center items-center bg-blue-500">
//     //   <Text className="text-white text-lg font-bold"> Hello NativeWind with TypeScript!</Text>
//     // </View>
//   )
// }


export default function Index() {
  return (
    <View className="flex-1 p-4 bg-gray-100">
      <FlatList
        data={items} // ใช้ dataset ที่นำเข้า
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4">
            <ItemCard productName={item.productName} price={item.price} pcs={item.pcs}
            />
            <CustomButton title="สั่งซื้อ"
              size={item.btnSize as "small" | "medium" | "large"}
              color={item.btnColor as "primary" | "secondary" | "danger"}
              onPress={() => alert(`ซื้อ ${item.productName}`)}
            />
          </View>
        )}
      />
    </View>
  );
}
