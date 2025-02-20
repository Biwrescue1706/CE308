import { View, Text } from "react-native";

export default function HistoryScreen({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text
      onPress={()=>navigation.navigate('Histroy')}
      className="text-lg font-bold">ประวัติการยืม</Text>
    </View>
  );
}
