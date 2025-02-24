import * as React from "react";
import { View, Text , Button} from "react-native";


export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize : 26 , fontWeight : 'bold'}}>Welcome to Home Page </Text>
      
    </View>
  );
}
