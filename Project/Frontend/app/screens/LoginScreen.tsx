import { View, Text } from "react-native";

export default function LoginScreen({ navigation }) {
    return (
      <View>
        <Text
        onPress={()=>navigation.navigate('Login')}
        >Login Screen</Text>
      </View>
    );
  }
  