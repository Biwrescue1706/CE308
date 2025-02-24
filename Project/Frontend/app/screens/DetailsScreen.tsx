// ./screens/DetailsScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
      onPress={() => navigation.navigate('Home')}
      style={{ fontSize : 26 , fontWeight : 'bold'}}
      >Details Screen</Text>
    </View>
  );
};

export default DetailsScreen;
