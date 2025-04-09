import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export const rotateImage = async (uri: string, direction: 'left' | 'right' = 'right'): Promise<string> => {
  const rotateDegree = direction === 'left' ? -90 : 90;

  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [
        { rotate: rotateDegree },
        { resize: { width: 300 } }, // Optionally adjust or make dynamic
      ],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    return result.uri;
  } catch (error) {
    console.error("Error rotating image:", error);
    Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถหมุนรูปภาพได้");
    return uri; // fallback to original
  }
};

/**
 * Dummy filter handler.
 * Could be replaced with actual filter manipulation later.
 */
export const applyFilter = async (): Promise<void> => {
  Alert.alert('ฟิลเตอร์', 'ทำไม่ได้');
};

/**
 * Saves the given image URI to the media library after checking or requesting permissions.
 * @param uri Image URI to save.
 * @param hasPermission Whether the app already has media library permissions.
 */
export const saveImage = async (uri: string, hasPermission: boolean): Promise<void> => {
  if (!uri) {
    Alert.alert("ไม่สามารถบันทึกได้", "ไม่พบรูปภาพ");
    return;
  }

  if (!hasPermission) {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
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
