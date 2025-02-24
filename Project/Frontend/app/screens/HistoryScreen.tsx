import { View, Text } from "react-native";

export default function HistoryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
      onPress={() => navigation.navigate('Home')}
      style={{ fontSize : 26 , fontWeight : 'bold'}}>ประวัติการยืม</Text>
    </View>
  );
}
