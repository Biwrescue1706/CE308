import React, { useState, useEffect } from "react";
import {View,Image,Button,StyleSheet,Alert,ImageStyle,ViewStyle,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";

// ========== Main Component ==========

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

  const handleFilter = async () => {
    if (!image) return;
    const filteredUri = await applyFilter(image);
    setImage(filteredUri);
  };

  const handleSave = async () => {
    if (image && hasMediaPermission !== null) {
      await saveImage(image, hasMediaPermission);
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.buttonSpacing}>
        <Button title="เลือกรูปภาพ" onPress={pickImage} />
      </View>

      <View style={[styles.row, styles.buttonSpacing]}>
        <View style={styles.buttonInRow}>
          <Button title="หมุนซ้าย 90°"onPress={() => handleRotate("left")}disabled={!image}
          />
        </View>
        <View style={styles.buttonInRow}>
          <Button title="หมุนขวา 90°"onPress={() => handleRotate("right")}disabled={!image}/>
        </View>
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="ใส่ฟิลเตอร์"onPress={handleFilter}disabled={!image}/>
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="บันทึกรูปภาพ" onPress={handleSave} disabled={!image}/>
      </View>
    </View>
  );
}

// ========== Utility Functions ==========

const rotateImage = async (uri: string, direction: "left" | "right" = "right"): Promise<string> => {
  const rotateDegree = direction === "left" ? -90 : 90;

  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [
        { rotate: rotateDegree },
        { resize: { width: 300 } },
      ],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    return result.uri;
  } catch (error) {
    console.error("Error rotating image:", error);
    Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถหมุนรูปภาพได้");
    return uri;
  }
};

const applyFilter = async (uri: string): Promise<string> => {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [
        // ตัวอย่างฟิลเตอร์: ไม่มีจริง แค่ resize (คุณสามารถเพิ่ม grayscale, brightness ฯลฯ ได้ภายหลัง)
        { resize: { width: 300 } },
      ],
      { format: ImageManipulator.SaveFormat.JPEG }
    );

    return result.uri;
  } catch (error) {
    console.error("Error applying filter:", error);
    Alert.alert("ผิดพลาด", "ไม่สามารถใส่ฟิลเตอร์ได้");
    return uri;
  }
};

const saveImage = async (uri: string, hasPermission: boolean): Promise<void> => {
  if (!uri) {
    Alert.alert("ไม่สามารถบันทึกได้", "ไม่พบรูปภาพ");
    return;
  }

  if (!hasPermission) {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("ไม่สามารถบันทึกได้", "ต้องขอสิทธิ์เข้าถึงคลังภาพก่อน");
      return;
    }
  }

  try {
    await MediaLibrary.saveToLibraryAsync(uri);
    Alert.alert("สำเร็จ", "บันทึกรูปภาพเรียบร้อยแล้ว!");
  } catch (error) {
    console.error("Error saving image:", error);
    Alert.alert("ผิดพลาด", "ไม่สามารถบันทึกภาพได้");
  }
};

const requestMediaPermission = async (): Promise<boolean> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === "granted";
  } catch (error) {
    console.error("Error requesting media library permission:", error);
    return false;
  }
};

// ========== Styles ==========

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
