import "./global.css";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import ProductForm from "./component/ProductForm";

// import ItemCard from "./component/ItemCard";
// import CustomButton from "./component/CustomButton";
// import { items } from "./component/Dataset";

// export default function Index() {
//   return (
//     // <View className="flex-1 justify-center items-center bg-blue-500">
//     //   <Text className="text-white text-lg font-bold"> Hello NativeWind with TypeScript!</Text>
//     // </View>
//   )
// }

// export default function Index() {
//   return (
//     <View className="flex-1 p-6 bg-gray-100">
//       <Text className="text-xl font-bold mb-6">สินค้าทั้งหมด</Text>
      
//       <FlatList
//         data={items} 
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <ItemCard 
//             productName={item.productName} 
//             price={item.price} 
//             pcs={item.pcs} 
//             btnSize={item.btnSize as "small" | "medium" | "large"}
//             btnColor={item.btnColor as "primary" | "secondary" | "danger"}
//           />
//         )}
//       />
//     </View>
//   );
// }
export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center">
      <ProductForm />
    </SafeAreaView>
  );
}
