import * as React from "react";
import { View, Text } from "react-native";

export default function Home({ navigation }) {
  return (
    <View>
      <Text
        onPress={()=>navigation.navigate('Home')}
      >Welcome to Home Page</Text>
    </View>
  );
}
