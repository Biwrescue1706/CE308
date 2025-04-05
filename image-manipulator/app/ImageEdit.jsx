import React, { useState } from "react";
import { View, Image, Button, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default function ImageEditor() {
  const [image, setImage] = useState<string | null>(null);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need access to your gallery.");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const editImage = async () => {
    if (!image) return;
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        image,
        [
          { rotate: 90 },
          { resize: { width: 300 } },
          { flip: ImageManipulator.FlipType.Vertical },
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImage(manipResult.uri);
    } catch (error) {
      console.error("Error editing image:", error);
    }
  };

  const saveImage = async () => {
    if (!image) return;
    try {
      const savedImage = await ImageManipulator.manipulateAsync(
        image,
        [],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      console.log("Saved image URI:", savedImage.uri);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="เลือกภาพ" onPress={pickImage} />
      <Button title="แก้ไขภาพ" onPress={editImage} disabled={!image} />
      <Button title="บันทึกภาพ" onPress={saveImage} disabled={!image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
});
