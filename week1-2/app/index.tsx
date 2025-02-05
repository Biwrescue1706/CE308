
import Profile from "./component/props";
import Calculator from "./workshop1/Calculator";


// import Basicfunction from "./component/function";
// import Counter from "./component/class";

// export default function Index(){
//   return(
//     <Basicfunction name="Phuwanat"/>
//   )
// }

// export default function Index() {
//   return (
//     <View style={styles.appContrainer}>
//       <Profile name="Phuwanat" age={20} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   appContrainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems:'center',
//   },
// });
import React from "react";
import { View, StyleSheet } from 'react-native';
import ShoppingCart from "./workshop1/ShoppingCart";
export default function Index() {
  const cartItems = [
    { name: 'Apple', quantity: 3 },
    { name: 'Banana', quantity: 2 },
    { name: 'Orange', quantity: 5 },
  ];

  return (
    <View style={styles.appContainer}>
      <ShoppingCart items={cartItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
});

