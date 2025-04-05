import React, { useState } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default function ImageEditor() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
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
          { rotate: 90 }, // หมุนภาพ 90 องศา
          { resize: { width: 300 } }, // ปรับขนาดเป็นความกว้าง 300px
          { flip: ImageManipulator.FlipType.Vertical }, // พลิกภาพในแนวตั้ง
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // บีบอัดและบันทึกในรูปแบบ JPEG
      );
      setImage(manipResult.uri); // อัพเดทภาพที่แก้ไขแล้ว
    } catch (error) {
      console.error('Error editing image:', error);
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
      // ในที่นี้เราจะเก็บภาพที่แก้ไขแล้วในที่ไหนบางที่ (สามารถใช้ฟังก์ชันเพิ่มเติมเพื่อบันทึก)
      console.log("Saved image URI:", savedImage.uri);
    } catch (error) {
      console.error('Error saving image:', error);
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
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});
