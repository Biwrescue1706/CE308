// ./screens/DetailsScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

const DetailsScreen = ({ navigation }) => {
  return (
    <View>
      <Text
      onPress={()=>navigation.navigate('Home')}
      >Details Screen</Text>
    </View>
  );
};

export default DetailsScreen;
