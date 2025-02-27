import { View, StyleSheet } from "react-native";
import AxiosExample from "./basic";

export default function Index() {
  return (
    <View
      style= {styles.container}
    >
      <AxiosExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container :{ flex : 1 , justifyContent : 'center' , alignItems : 'center' }
})