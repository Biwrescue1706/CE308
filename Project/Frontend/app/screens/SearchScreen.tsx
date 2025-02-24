import * as React from "react";
import { View, Text } from "react-native";

export default function SearchScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => navigation.navigate('Home')}
        style={{ fontSize : 26 , fontWeight : 'bold'}} >ค้นหาหนังสือ</Text>
    </View>
  );
}
