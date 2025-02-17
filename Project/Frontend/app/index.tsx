import { Stack } from "expo-router";
import { View , Text } from "react-native";
import Navbar from "./components/Navbar"; // ✅ ตรวจสอบ path

export default function Index() {
  return (
    <View>
    <Text>Hello</Text>
    <Navbar />
      <Stack />
  </View>

  );
}
