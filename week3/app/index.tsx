import { Text, View } from "react-native";
// import CartCounter from "./component/CartCounter";
// import BatteryMonitor from "./component/BatteryMonitor";
import Calculator from "./component/Calculator";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <CartCounter /> */}
      {/* <BatteryMonitor /> */}
      <Calculator />
    </View>
  );
}
