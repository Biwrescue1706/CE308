import * as React from "react";
import { View, Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function Home({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>หน้าแรก</Text>
    </View>
  );
}
