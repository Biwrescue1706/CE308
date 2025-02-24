import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import CounterScreen from "./screens/CounterScreen";
// import ShoppingCart from "./screens/ShoppingCart";
import TodoScreen from './screens/TodoScreen';

export default function Index() {
  return (
    <Provider store={store}>
      {/* <CounterScreen/> */}
      <TodoScreen />
    </Provider>
  );
}
