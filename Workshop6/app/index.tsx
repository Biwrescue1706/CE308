import React from "react";
import { View, StyleSheet } from "react-native";
import ImageList from "./ImageList";

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5f5" }
});
