import * as React from "react";
import { View, Text } from "react-native";

export default function SearchScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text
        onPress={() => navigation.navigate('Home')}
        className="text-lg font-bold">ค้นหาหนังสือ</Text>
    </View>
  );
}
