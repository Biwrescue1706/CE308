import React, { useState, useEffect } from "react";
import { View, Image, Button, StyleSheet, ImageStyle, ViewStyle, } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { rotateImage, applyFilter, saveImage } from "./utils/imageUtils";
import { requestMediaPermission } from "./utils/permissions";


export default function ImageEditor(): JSX.Element {
  const [image, setImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const granted = await requestMediaPermission();
      setHasMediaPermission(granted);
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setRotation(0);
    }
  };

  const handleRotate = async (direction: "left" | "right") => {
    if (!image) return;
    const newUri = await rotateImage(image, direction);
    setImage(newUri);
    const degree = direction === "left" ? -90 : 90;
    setRotation((rotation + degree + 360) % 360);
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.buttonSpacing}>
        <Button title="เลือกรูปภาพ" onPress={pickImage} />
      </View>

      <View style={[styles.row, styles.buttonSpacing]}>
        <View style={styles.buttonInRow}>
          <Button
            title="หมุนซ้าย 90°"
            onPress={() => handleRotate("left")}
            disabled={!image}
          />
        </View>
        <View style={styles.buttonInRow}>
          <Button
            title="หมุนขวา 90°"
            onPress={() => handleRotate("right")}
            disabled={!image}
          />
        </View>
      </View>

      <View style={styles.buttonSpacing}>
        <Button
          title="ใส่ฟิลเตอร์ไม่ได้"
          onPress={applyFilter}
          disabled={!image}
        />
      </View>

      <View style={styles.buttonSpacing}>
        <Button
          title="บันทึกรูปภาพ"
          onPress={() => {
            if (image && hasMediaPermission !== null) {
              saveImage(image, hasMediaPermission);
            }
          }}
          disabled={!image}
        />
      </View>
    </View>
  );
}

type Styles = {
  container: ViewStyle;
  image: ImageStyle;
  buttonSpacing: ViewStyle;
  row: ViewStyle;
  buttonInRow: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  buttonSpacing: {
    marginBottom: 10,
    width: 250,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonInRow: {
    flex: 1,
    marginHorizontal: 5,
  },
});
