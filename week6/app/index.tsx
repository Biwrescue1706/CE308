import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CounterScreen from "./screens/CounterScreen";

export default function Index() {
  return (
    <Provider store={store}>
      <CounterScreen/>
    </Provider>
  );
}
