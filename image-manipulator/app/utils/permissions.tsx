import * as MediaLibrary from 'expo-media-library';

export const requestMediaPermission = async (): Promise<boolean> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error("Error requesting media library permission:", error);
    return false;
  }
};
