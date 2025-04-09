import React, { useState, useRef } from "react";
import {View,Image,Button,StyleSheet,Alert,PanResponder,Dimensions,Animated,Text,TouchableOpacity,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import { Surface } from "gl-react-expo";
import { Node, Shaders, GLSL } from "gl-react";

const windowWidth = Dimensions.get("window").width;
const IMAGE_SIZE = 300;

// ฟิลเตอร์ Grayscale
const shaders = Shaders.create({
  Grayscale: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D image;
      void main () {
        vec4 c = texture2D(image, uv);
        float gray = dot(c.rgb, vec3(0.299, 0.587, 0.114));
        gl_FragColor = vec4(vec3(gray), c.a);
      }`
  }
});

const Grayscale = ({ children }: { children: any }) => (
  <Node shader={shaders.Grayscale} uniforms={{ image: children }} />
);

export default function ImageEditor(): JSX.Element {
  const [image, setImage] = useState<string | null>(null);
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean | null>(null);
  const [useFilter, setUseFilter] = useState<boolean>(false);

  const [cropBox, setCropBox] = useState({ x: 100, y: 100, width: 100, height: 100 });
  const cropBoxPosition = useRef(new Animated.ValueXY({ x: cropBox.x, y: cropBox.y })).current;
  const cropBoxSize = useRef({ width: cropBox.width, height: cropBox.height });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        cropBoxPosition.setOffset({
          x: cropBoxPosition.x._value,
          y: cropBoxPosition.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: cropBoxPosition.x, dy: cropBoxPosition.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        cropBoxPosition.flattenOffset();
        cropBoxPosition.extractOffset();
        setCropBox((prev) => ({
          ...prev,
          x: cropBoxPosition.x._value,
          y: cropBoxPosition.y._value,
        }));
      },
    })
  ).current;

  React.useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(status === "granted");
    })();
  }, []);

  const pickImage = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setUseFilter(false);
    }
  };

  const cropImage = async (): Promise<void> => {
    if (!image) return;

    const cropped = await ImageManipulator.manipulateAsync(
      image,
      [
        {
          crop: {
            originX: cropBox.x,
            originY: cropBox.y,
            width: cropBox.width,
            height: cropBox.height,
          },
        },
      ],
      {
        compress: 1,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    setImage(cropped.uri);
    setUseFilter(false);
  };

  const saveImage = async (): Promise<void> => {
    if (!image || !hasMediaPermission) {
      Alert.alert("ไม่สามารถบันทึกได้", "ต้องขอสิทธิ์เข้าถึงคลังภาพก่อน");
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(image);
      Alert.alert("สำเร็จ", "บันทึกรูปภาพเรียบร้อยแล้ว!");
    } catch (error) {
      Alert.alert("ผิดพลาด", "ไม่สามารถบันทึกภาพได้");
    }
  };

  const toggleFilter = (): void => {
    setUseFilter((prev) => !prev);
  };

  const renderGrid = () => {
    const lines = [];
    const gridSize = 3;
    const spacing = IMAGE_SIZE / gridSize;

    for (let i = 1; i < gridSize; i++) {
      lines.push(
        <View
          key={`v-${i}`}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: spacing * i,
            width: 1,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
        />
      );
      lines.push(
        <View
          key={`h-${i}`}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: spacing * i,
            height: 1,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
        />
      );
    }
    return lines;
  };

  const resizeCropBox = (delta: number) => {
    const newSize = cropBoxSize.current.width + delta;
    setCropBox((prev) => ({
      ...prev,
      width: newSize,
      height: newSize,
    }));
    cropBoxSize.current = { width: newSize, height: newSize };
  };

  return (
    <View style={styles.container}>
      {image && (
        <View style={styles.imageWrapper}>
          {useFilter ? (
            <Surface style={styles.image}>
              <Grayscale>{{ uri: image }}</Grayscale>
            </Surface>
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}

          {renderGrid()}

          <Animated.View
            {...panResponder.panHandlers}
            style={[styles.cropBox, cropBoxPosition.getLayout(), {
              width: cropBox.width,
              height: cropBox.height,
            }]}
          />

          <TouchableOpacity
            style={styles.resizeHandle}
            onPress={() => resizeCropBox(20)}
          >
            <Text style={styles.resizeText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.resizeHandle, { top: 40 }]}
            onPress={() => resizeCropBox(-20)}
          >
            <Text style={styles.resizeText}>-</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonSpacing}>
        <Button title="เลือกรูปภาพ" onPress={pickImage} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="ครอปรูปภาพ" onPress={cropImage} disabled={!image} />
      </View>

      <View style={styles.buttonSpacing}>
        <Button
          title={useFilter ? "เอาฟิลเตอร์ออก" : "ใส่ฟิลเตอร์ Grayscale"}
          onPress={toggleFilter}
          disabled={!image}
        />
      </View>

      <View style={styles.buttonSpacing}>
        <Button title="บันทึกรูปภาพ" onPress={saveImage} disabled={!image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageWrapper: {
    position: "relative",
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginBottom: 20,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  cropBox: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    zIndex: 10,
  },
  buttonSpacing: {
    marginBottom: 10,
    width: 250,
  },
  resizeHandle: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 4,
  },
  resizeText: {
    color: 'white',
    fontSize: 20,
  },
});
