import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ImageEdit() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(1);
  const [contrast, setContrast] = useState<number>(1);
  const [saturation, setSaturation] = useState<number>(1);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
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
      setImageUri(result.assets[0].uri);
      // reset filters
      setBrightness(1);
      setContrast(1);
      setSaturation(1);
    }
  };

  const rotate = async (direction: 'left' | 'right') => {
    if (!imageUri) return;
    const degrees = direction === 'left' ? -90 : 90;
    const result = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ rotate: degrees }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImageUri(result.uri);
  };

  const applyFilters = async () => {
    if (!imageUri) return;
    const result = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        {
          // Apply color controls
          // Expo doesn't directly support brightness/contrast, so we simulate via additional libs or preset filters.
          // In real case, you'd use gl-image-filters or WebGL.
          // Here we simulate with resize to fake apply (just reprocess).
          resize: { width: 300 },
        },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImageUri(result.uri);
  };

  const saveImage = async () => {
    if (!imageUri || !hasPermission) {
      Alert.alert('ไม่สามารถบันทึก', 'ยังไม่ได้อนุญาตให้เข้าถึงคลังภาพ');
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(imageUri);
      Alert.alert('✅ สำเร็จ', 'บันทึกรูปภาพเรียบร้อยแล้ว');
    } catch (error) {
      Alert.alert('ผิดพลาด', 'ไม่สามารถบันทึกรูปภาพได้');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <View style={styles.spacing}>
        <Button title="เลือกรูปภาพ" onPress={pickImage} />
      </View>

      <View style={[styles.row, styles.spacing]}>
        <View style={styles.buttonHalf}>
          <Button title="หมุนซ้าย" onPress={() => rotate('left')} disabled={!imageUri} />
        </View>
        <View style={styles.buttonHalf}>
          <Button title="หมุนขวา" onPress={() => rotate('right')} disabled={!imageUri} />
        </View>
      </View>

      {imageUri && (
        <>
          <Text style={styles.label}>ความสว่าง: {brightness.toFixed(1)}</Text>
          <Slider
            minimumValue={0}
            maximumValue={2}
            step={0.1}
            value={brightness}
            onValueChange={setBrightness}
            style={styles.slider}
          />

          <Text style={styles.label}>ความคมชัด: {contrast.toFixed(1)}</Text>
          <Slider
            minimumValue={0}
            maximumValue={2}
            step={0.1}
            value={contrast}
            onValueChange={setContrast}
            style={styles.slider}
          />

          <Text style={styles.label}>ความอิ่มสี: {saturation.toFixed(1)}</Text>
          <Slider
            minimumValue={0}
            maximumValue={2}
            step={0.1}
            value={saturation}
            onValueChange={setSaturation}
            style={styles.slider}
          />

          <View style={styles.spacing}>
            <Button title="ใช้ฟิลเตอร์ (จำลอง)" onPress={applyFilters} />
          </View>
        </>
      )}

      <View style={styles.spacing}>
        <Button title="บันทึกรูปภาพ" onPress={saveImage} disabled={!imageUri} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  spacing: {
    marginVertical: 10,
    width: 250,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonHalf: {
    flex: 1,
    marginHorizontal: 5,
  },
  slider: {
    width: 250,
  },
  label: {
    marginTop: 10,
    fontSize: 14,
  },
});
